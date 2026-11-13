import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Plus } from 'lucide-react';
import { db, now, today, uid } from '../lib/db';
import type { ResearchItem } from '../lib/types';
import { useParam } from '../components/common';
import { Empty, Ext, Field, Modal, PageHead, Prose, useToast } from '../components/ui';

const AREAS: ResearchItem['area'][] = ['Objective', 'Fact', 'Audience', 'Persona', 'Positioning', 'Pillar', 'Competitor', 'Platform', 'Tool', 'Hypothesis', 'Decision'];
const VER = ['Verified (primary)', 'Organisation claim', 'Third-party', 'Estimate', 'Unresolved', 'Unknown', 'Recommendation', 'Assumption'];

export default function Strategy() {
  const items = useLiveQuery(() => db.research.toArray());
  const [open, setOpen] = useParam('open');
  const [area, setArea] = useParam('area');
  const [q, setQ] = useState('');
  const [ver, setVer] = useState('');
  const list = useMemo(() => (items ?? []).filter((r) => (!area || r.area === area) && (!ver || r.verification === ver) &&
    (!q || `${r.title} ${r.body} ${r.sourceTitle ?? ''}`.toLowerCase().includes(q.toLowerCase()))), [items, area, q, ver]);
  const add = async () => {
    const id = uid('res');
    await db.research.add({ id, area: (area as ResearchItem['area']) ?? 'Fact', title: 'New research item', body: '', checked: today(), verification: 'Unresolved', platform: 'all', createdAt: now(), updatedAt: now() });
    setOpen(id);
  };
  return (
    <div>
      <PageHead eyebrow="Plan" area="plan" title="Strategy & Research"
        lede="Audience, positioning, pillars, competitors, platform facts, hypotheses and decisions — each with its source, date checked and whether it is a verified fact, an organisation claim, a third-party report, or a recommendation."
        actions={<button className="btn primary" onClick={add}><Plus />New item</button>} />
      <div className="filters">
        <input className="input" placeholder="Search research" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search research" />
        <select className="select" value={ver} onChange={(e) => setVer(e.target.value)} aria-label="Verification"><option value="">Any verification</option>{VER.map((v) => <option key={v}>{v}</option>)}</select>
      </div>
      <div className="row" style={{ marginBottom: 16, gap: 6 }}>
        <button className={`btn sm ${!area ? 'primary' : ''}`} onClick={() => setArea(null)}>All</button>
        {AREAS.map((a) => <button key={a} className={`btn sm ${area === a ? 'primary' : ''}`} onClick={() => setArea(a)}>{a} <span className="muted">{(items ?? []).filter((r) => r.area === a).length}</span></button>)}
      </div>
      {list.length === 0 ? <Empty title="Nothing here yet" /> : (
        <div className="stack" style={{ gap: 0 }}>
          {AREAS.filter((a) => list.some((r) => r.area === a)).map((a) => (
            <section key={a} className="section">
              <h3 style={{ marginBottom: 10 }}>{a === 'Fact' ? 'Company facts' : a + (a.endsWith('s') ? '' : a === 'Persona' ? 's' : a === 'Hypothesis' ? '' : 's')}</h3>
              {list.filter((r) => r.area === a).map((r) => (
                <details key={r.id} className="disc" open={open === r.id}>
                  <summary>
                    <span className="grow">{r.title}</span>
                    {r.verification && <span className={`tag ${r.verification.startsWith('Verified') ? 'ok' : r.verification === 'Recommendation' ? 'gold' : r.verification === 'Unresolved' || r.verification === 'Assumption' ? 'warn' : ''}`}>{r.verification}</span>}
                    {r.confidence && <span className="tag">conf. {r.confidence}</span>}
                  </summary>
                  <div className="disc-body">
                    <Prose text={r.body || '—'} />
                    <div className="row small muted" style={{ marginTop: 8 }}>
                      {r.sourceUrl ? <Ext href={r.sourceUrl}>{r.sourceTitle ?? 'Source'}</Ext> : r.sourceTitle ? <span>Source: {r.sourceTitle}</span> : <span>No source recorded</span>}
                      {r.checked && <span>· checked {r.checked}</span>}
                      <span className="grow" /><button className="btn sm" onClick={() => setOpen(r.id + ':edit')}>Edit</button>
                    </div>
                  </div>
                </details>
              ))}
            </section>
          ))}
        </div>
      )}
      {open?.endsWith(':edit') && <EditItem id={open.replace(':edit', '')} onClose={() => setOpen(null)} />}
      {open && !open.endsWith(':edit') && (items ?? []).find((r) => r.id === open)?.title === 'New research item' && <EditItem id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function EditItem({ id, onClose }: { id: string; onClose: () => void }) {
  const toast = useToast();
  const r = useLiveQuery(() => db.research.get(id), [id]);
  const [d, setD] = useState<ResearchItem | null>(null);
  if (r && !d) setD(r);
  if (!d) return null;
  const set = (k: keyof ResearchItem, v: string) => setD({ ...d, [k]: v });
  return (
    <Modal wide title="Edit research item" onClose={onClose} footer={<>
      <button className="btn danger" onClick={async () => { if (confirm('Delete this item?')) { await db.research.delete(d.id); onClose(); } }}>Delete</button>
      <div className="grow" /><button className="btn" onClick={onClose}>Cancel</button>
      <button className="btn primary" onClick={async () => { await db.research.put({ ...d, updatedAt: now() }); toast('Saved'); onClose(); }}>Save</button></>}>
      <div className="grid-form">
        <Field label="Title" wide><input className="input" value={d.title} onChange={(e) => set('title', e.target.value)} /></Field>
        <Field label="Area"><select className="select" value={d.area} onChange={(e) => set('area', e.target.value)}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select></Field>
        <Field label="Verification"><select className="select" value={d.verification ?? ''} onChange={(e) => set('verification', e.target.value)}>{VER.map((v) => <option key={v}>{v}</option>)}</select></Field>
        <Field label="Confidence"><select className="select" value={d.confidence ?? ''} onChange={(e) => set('confidence', e.target.value)}><option value="">—</option><option>High</option><option>Medium</option><option>Low</option></select></Field>
        <Field label="Date checked"><input type="date" className="input" value={d.checked ?? ''} onChange={(e) => set('checked', e.target.value)} /></Field>
        <Field label="Body" wide><textarea className="textarea" style={{ minHeight: 200 }} value={d.body} onChange={(e) => set('body', e.target.value)} /></Field>
        <Field label="Source title"><input className="input" value={d.sourceTitle ?? ''} onChange={(e) => set('sourceTitle', e.target.value)} /></Field>
        <Field label="Source URL"><input className="input" value={d.sourceUrl ?? ''} onChange={(e) => set('sourceUrl', e.target.value)} /></Field>
      </div>
    </Modal>
  );
}
