import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Download, Upload } from 'lucide-react';
import { db, downloadBlob, exportBackup, getSetting, importBackup, setSetting, today } from '../lib/db';
import { DEPLOY_GUIDE, HELP_TOPICS, LIMITATIONS, STORAGE_NOTE } from '../content/help';
import { resetToStarter } from '../seed';
import { useParam } from '../components/common';
import { sha256 } from '../components/LockScreen';
import { Field, Modal, PageHead, Prose, Tabs, useToast } from '../components/ui';

export default function Help() {
  const [tab, setTab] = useParam('tab');
  const [topic, setTopic] = useParam('topic');
  const cur = tab ?? 'manual';
  return (
    <div style={{ ['--area' as string]: 'var(--a-learn)' }}>
      <PageHead eyebrow="Learn" area="learn" title="How to use Growth HQ"
        lede="Numbered instructions for every workflow, plus backup, deployment and what is and isn’t built." />
      <Tabs value={cur as 'manual'} onChange={(t) => setTab(t === 'manual' ? null : t)} tabs={[
        { id: 'manual', label: 'Operating manual' }, { id: 'map' as 'manual', label: 'Interface map' }, { id: 'backup' as 'manual', label: 'Backup & restore' },
        { id: 'deploy' as 'manual', label: 'Launch & deploy' }, { id: 'status' as 'manual', label: 'What’s built / not built' }, { id: 'settings' as 'manual', label: 'Settings' },
      ]} />
      {cur === 'manual' && (
        <div className="stack" style={{ gap: 0 }}>
          {HELP_TOPICS.map((h) => (
            <details key={h.id} className="disc" open={topic === h.id} onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && setTopic(h.id)}>
              <summary><span className="muted" style={{ width: 22 }}>{h.n}</span>{h.title}<span className="grow" /><span className="small muted">{h.where}</span></summary>
              <div className="disc-body"><Prose text={h.body} /></div>
            </details>
          ))}
        </div>
      )}
      {cur === 'map' && <InterfaceMap />}
      {cur === 'backup' && <Backup />}
      {cur === 'deploy' && <div className="panel panel-pad"><Prose text={DEPLOY_GUIDE} /></div>}
      {cur === 'status' && (
        <div className="stack">
          <div className="table-wrap"><table className="t"><thead><tr><th>Feature</th><th>Status</th><th>Detail</th></tr></thead>
            <tbody>{LIMITATIONS.map((l) => <tr key={l.feature}><td className="list-title">{l.feature}</td><td><span className="tag warn">{l.status}</span></td><td className="wrap small">{l.detail}</td></tr>)}</tbody></table></div>
          <div className="panel panel-pad"><h4>Working in this build</h4><Prose text={`- Navigation, universal search (⌘K or /), filters on every list\n- Create, edit, duplicate, archive and delete ideas, posts, assets, leads, campaigns, research items and NGO facts\n- Calendar (month + list) across Instagram, LinkedIn, Facebook, YouTube with platform/status/format/campaign filters\n- Master ideas → platform adaptations with their own scripts, captions, CTAs, assets, checklists and dates\n- Production checklists with completion gating; Guide me step by step with saved progress\n- Lead tracker with follow-ups and CSV export; lead report by platform with attribution confidence\n- Manual results entry, CSV import/export, per-platform analytics, weekly/monthly/30/60/90-day reviews\n- Asset library with uploaded previews; prompt builder; photography briefs; brand templates\n- Asha NGO workspace with identity verification, sourced facts and safeguards\n- JSON backup and restore (merge or replace); optional passcode screen; light/dark theme`} /></div>
        </div>
      )}
      {cur === 'settings' && <Settings />}
    </div>
  );
}

function InterfaceMap() {
  const rows = [
    ['Sidebar', 'Plan (gold) · Produce (clay) · Learn (sage) · Grow (olive) / Measure (violet) · Research (rose). The coloured bar shows where you are.'],
    ['Top bar', 'Search everything (⌘K or /), light/dark toggle, “How to use”.'],
    ['Overview', 'Today’s tasks, upcoming posts, production queues, goals, leads and NGO status — all counted from saved data.'],
    ['Post workspace', 'Tabs left to right follow production order: Brief → Objective & concept → Script → Shots → Assets → AI video → Voiceover → Edit → Publish → Checklist → Guide me → Results.'],
    ['Studios', 'Each platform: Content list, Guide me, Formats & workflow, Strategy, Profile copy, Specs & sources, Lead pathway.'],
  ];
  return (
    <div className="stack">
      <svg viewBox="0 0 760 300" role="img" aria-label="Annotated layout: sidebar on the left, top search bar, main workspace with tabs" style={{ width: '100%', maxWidth: 760, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10 }}>
        <rect x="16" y="16" width="170" height="268" rx="6" fill="var(--bg-2)" stroke="var(--line)" />
        {['Overview', 'Calendar', 'Strategy', 'Library', 'IG Studio', 'LI Studio', 'FB Studio', 'YT Studio', 'Learning', 'Leads', 'Analytics', 'Asha NGO'].map((t, i) => <text key={t} x="32" y={46 + i * 19} fill="var(--text-2)" fontSize="11" fontFamily="Inter">{t}</text>)}
        <rect x="200" y="16" width="544" height="34" rx="6" fill="var(--bg-2)" stroke="var(--line)" />
        <text x="216" y="38" fill="var(--text-3)" fontSize="12" fontFamily="Inter">⌕ Search posts, scripts, prompts, assets, sources, leads…</text>
        <rect x="200" y="62" width="544" height="222" rx="6" fill="var(--bg-2)" stroke="var(--line)" />
        <text x="216" y="88" fill="var(--text)" fontSize="16" fontFamily="Georgia">Post title</text>
        {['Brief', 'Concept', 'Script', 'Shots', 'Assets', 'AI', 'Voice', 'Edit', 'Publish', 'Check', 'Guide', 'Results'].map((t, i) => <text key={t} x={216 + i * 43} y="112" fill={i === 10 ? 'var(--accent)' : 'var(--text-3)'} fontSize="10" fontFamily="Inter">{t}</text>)}
        <line x1="216" y1="120" x2="728" y2="120" stroke="var(--line)" />
        <circle cx="100" cy="300" r="0" />
        {[[100, 8, '1'], [470, 8, '2'], [660, 70, '3'], [660, 104, '4']].map(([x, y, n]) => <g key={n as string}><circle cx={x as number} cy={(y as number) + 4} r="9" fill="var(--accent)" /><text x={(x as number) - 3.5} y={(y as number) + 8} fontSize="11" fill="var(--accent-ink)" fontFamily="Inter">{n}</text></g>)}
      </svg>
      <ol className="prose small"><li>Navigation grouped by area.</li><li>Universal search.</li><li>Status selector, duplicate, archive, delete.</li><li>Production tabs in order — “Guide” walks you through them one step at a time.</li></ol>
      <div className="table-wrap"><table className="t"><tbody>{rows.map(([a, b]) => <tr key={a}><td className="list-title" style={{ width: 160 }}>{a}</td><td className="small">{b}</td></tr>)}</tbody></table></div>
    </div>
  );
}

function Backup() {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'merge' | 'replace'>('merge');
  const [busy, setBusy] = useState(false);
  const counts = useLiveQuery(async () => ({ posts: await db.posts.count(), ideas: await db.masters.count(), assets: await db.assets.count(), leads: await db.leads.count(), files: await db.files.count() }));
  const last = useLiveQuery(() => getSetting<string | null>('lastBackup', null));
  const download = async () => {
    setBusy(true);
    try { downloadBlob(await exportBackup(true), `growth-hq-backup-${today()}.json`); await setSetting('lastBackup', new Date().toISOString()); toast('Backup downloaded'); }
    catch (e) { toast('Backup failed: ' + (e as Error).message, 'error'); }
    setBusy(false);
  };
  const restore = async () => {
    if (!file) return;
    if (mode === 'replace' && !confirm('Replace ALL current data with this backup? Download a backup of the current data first if unsure.')) return;
    setBusy(true);
    try { const r = await importBackup(await file.text(), mode); toast(`Restored (${r.mode}): ${Object.entries(r.counts).map(([k, v]) => `${v} ${k}`).slice(0, 4).join(', ')}…`); setFile(null); }
    catch (e) { toast((e as Error).message, 'error'); }
    setBusy(false);
  };
  return (
    <div className="cols-2">
      <div className="stack">
        <div className="panel panel-pad stack">
          <h3>Download backup</h3>
          <p className="small muted" style={{ margin: 0 }}>{counts ? `${counts.posts} posts · ${counts.ideas} ideas · ${counts.assets} assets · ${counts.leads} leads · ${counts.files} uploaded previews` : '…'}<br />Last backup: {last ? new Date(last).toLocaleString() : 'never'}</p>
          <button className="btn primary" disabled={busy} onClick={download}><Download />Download backup (.json)</button>
        </div>
        <div className="panel panel-pad stack">
          <h3>Restore from backup</h3>
          <input type="file" accept="application/json,.json" onChange={(e) => setFile(e.target.files?.[0] ?? null)} aria-label="Backup file" />
          <div className="seg"><button className={mode === 'merge' ? 'on' : ''} onClick={() => setMode('merge')}>Merge (keep current, update matching)</button><button className={mode === 'replace' ? 'on' : ''} onClick={() => setMode('replace')}>Replace everything</button></div>
          <button className="btn" disabled={!file || busy} onClick={restore}><Upload />Restore</button>
        </div>
      </div>
      <div className="panel panel-pad"><Prose text={STORAGE_NOTE} /></div>
    </div>
  );
}

function Settings() {
  const toast = useToast();
  const hash = useLiveQuery(() => getSetting<string | null>('lockHash', null));
  const [code, setCode] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div className="cols-2">
      <div className="panel panel-pad stack">
        <h3>Privacy lock</h3>
        <p className="small muted" style={{ margin: 0 }}>Asks for a passcode when Growth HQ is opened in a new tab. Stops casual viewing on a shared computer — it is not encryption or server security. Status: {hash ? 'on' : 'off'}.</p>
        <Field label="New passcode (min 4 characters)"><input className="input" type="password" value={code} onChange={(e) => setCode(e.target.value)} /></Field>
        <div className="row">
          <button className="btn primary" disabled={code.length < 4} onClick={async () => { await setSetting('lockHash', await sha256('ka:' + code)); try { sessionStorage.setItem('ka-unlocked', '1'); } catch { /* ignore */ } setCode(''); toast('Passcode set'); }}>Set passcode</button>
          {hash && <button className="btn" onClick={async () => { await setSetting('lockHash', null); toast('Lock removed'); }}>Remove lock</button>}
        </div>
      </div>
      <div className="panel panel-pad stack">
        <h3>Reset to starter content</h3>
        <p className="small muted" style={{ margin: 0 }}>Deletes everything in this browser and reloads the original starter strategy, ideas and launch plan. Download a backup first.</p>
        <button className="btn danger" onClick={() => setConfirmReset(true)}>Reset…</button>
      </div>
      {confirmReset && <Modal title="Reset all data?" onClose={() => setConfirmReset(false)} footer={<><button className="btn" onClick={() => setConfirmReset(false)}>Cancel</button><button className="btn danger" onClick={async () => { await resetToStarter(); setConfirmReset(false); toast('Reset to starter content'); }}>Delete everything and reset</button></>}>
        <p>This permanently deletes your posts, leads, results, assets and uploaded previews in this browser. It cannot be undone without a backup file.</p>
      </Modal>}
    </div>
  );
}
