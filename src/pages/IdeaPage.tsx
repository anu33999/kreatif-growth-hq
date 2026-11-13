import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Archive, ArrowLeft, Copy, Trash2, Wand2 } from 'lucide-react';
import { db, now, uid } from '../lib/db';
import type { Format, Master } from '../lib/types';
import { AUDIENCES, FORMAT_LABEL, FORMAT_PLATFORM, PILLARS, STATUSES } from '../lib/types';
import { ADAPTATION_RULES } from '../content/platforms';
import { newPostFrom } from '../lib/workflow';
import { PostTable } from '../components/common';
import { Empty, Field, PageHead, SampleTag, useToast } from '../components/ui';

const FIELDS: { k: keyof Master; label: string; rows?: number }[] = [
  { k: 'idea', label: 'Original idea', rows: 3 },
  { k: 'problem', label: 'Business problem / subject', rows: 3 },
  { k: 'argument', label: 'Main argument or story', rows: 3 },
  { k: 'sources', label: 'Verified research and sources', rows: 3 },
  { k: 'approvedClaims', label: 'Approved claims (only what you can prove)', rows: 3 },
  { k: 'proof', label: 'Required proof or examples', rows: 2 },
  { k: 'sourceMaterial', label: 'Original script or source material', rows: 4 },
  { k: 'visualConcept', label: 'Visual concept', rows: 2 },
  { k: 'leadOffer', label: 'Lead-generation offer', rows: 2 },
  { k: 'nextAction', label: 'Recommended next action', rows: 2 },
  { k: 'lessons', label: 'Results and lessons (after publishing)', rows: 3 },
];

export default function IdeaPage() {
  const { id } = useParams();
  const loc = useLocation();
  const isNgo = loc.pathname.startsWith('/ngo');
  const nav = useNavigate();
  const toast = useToast();
  const master = useLiveQuery(() => db.masters.get(id!), [id]);
  const posts = useLiveQuery(() => db.posts.where('masterId').equals(id!).toArray(), [id]);
  const campaigns = useLiveQuery(() => db.campaigns.toArray()) ?? [];
  const [draft, setDraft] = useState<Master | null>(null);
  const [picked, setPicked] = useState<Format[]>([]);

  useEffect(() => { if (master) setDraft(master); }, [master]);
  if (master === undefined) return <div className="muted">Loading…</div>;
  if (!master || !draft) return <Empty title="Idea not found" action={<Link to="/library">Back to library</Link>} />;

  const dirty = JSON.stringify(draft) !== JSON.stringify(master);
  const save = async () => { await db.masters.put({ ...draft, updatedAt: now() }); toast('Idea saved'); };
  const set = (k: keyof Master, v: unknown) => setDraft({ ...draft, [k]: v });

  const existing = new Set((posts ?? []).map((p) => p.format));
  const createAdaptations = async () => {
    if (dirty) await save();
    const created = picked.map((f) => newPostFrom(f, draft, { workspace: draft.workspace }));
    await db.posts.bulkAdd(created);
    if (draft.status === 'Idea') await db.masters.update(draft.id, { status: 'Planned', updatedAt: now() });
    toast(`${created.length} platform version${created.length > 1 ? 's' : ''} created`);
    setPicked([]);
  };
  const duplicate = async () => {
    const c = { ...structuredClone(master), id: uid('idea'), title: master.title + ' (copy)', ideaNo: undefined, sample: false, createdAt: now(), updatedAt: now() };
    await db.masters.add(c); nav((isNgo ? '/ngo/idea/' : '/idea/') + c.id);
  };
  const archive = async () => { await db.masters.update(master.id, { status: master.status === 'Archived' ? 'Idea' : 'Archived', updatedAt: now() }); toast(master.status === 'Archived' ? 'Restored' : 'Archived'); };
  const remove = async () => {
    if (!confirm(`Delete “${master.title}”? Linked platform posts are kept but unlinked.`)) return;
    await db.posts.where('masterId').equals(master.id).modify({ masterId: undefined });
    await db.masters.delete(master.id); nav(isNgo ? '/ngo?tab=content' : '/library');
  };
  const rules = ADAPTATION_RULES;
  const allFormats = (Object.keys(FORMAT_LABEL) as Format[]).filter((f) => FORMAT_PLATFORM[f] !== 'website' && FORMAT_PLATFORM[f] !== 'email' || isNgo);
  const ngoBlocked = isNgo;

  return (
    <div>
      <Link to={isNgo ? '/ngo?tab=content' : '/library'} className="small row" style={{ gap: 4, marginBottom: 10 }}><ArrowLeft size={14} />{isNgo ? 'NGO content studio' : 'Content Library'}</Link>
      <PageHead eyebrow={isNgo ? 'NGO master idea' : `Master idea${master.ideaNo ? ' #' + master.ideaNo : ''}`} area={isNgo ? 'ngo' : 'plan'} title={master.title}
        lede={<span className="row">{master.sample && <SampleTag />}<span>Stable ID: <code>{master.id}</code> — renaming never breaks links.</span></span>}
        actions={<>
          <button className="btn" onClick={duplicate}><Copy />Duplicate</button>
          <button className="btn" onClick={archive}><Archive />{master.status === 'Archived' ? 'Restore' : 'Archive'}</button>
          <button className="btn danger" onClick={remove}><Trash2 />Delete</button>
          <button className="btn primary" disabled={!dirty} onClick={save}>{dirty ? 'Save changes' : 'Saved'}</button>
        </>} />

      {isNgo && <div className="notice ngo section"><strong>NGO safeguards apply.</strong> Use only verified organisation information and consented material. Do not publish until the organisation’s identity is confirmed and it has approved the content.</div>}

      <div className="cols-main">
        <div className="stack" style={{ gap: 22 }}>
          <div className="panel panel-pad">
            <div className="grid-form">
              <Field label="Title" wide><input className="input" value={draft.title} onChange={(e) => set('title', e.target.value)} /></Field>
              <Field label="Audience"><select className="select" value={draft.audience ?? ''} onChange={(e) => set('audience', e.target.value)}><option value="">—</option>{[...AUDIENCES, 'Supporters, volunteers and donors of the NGO'].map((a) => <option key={a}>{a}</option>)}</select></Field>
              <Field label="Pillar"><select className="select" value={draft.pillar ?? ''} onChange={(e) => set('pillar', e.target.value)}>{PILLARS.map((a) => <option key={a}>{a}</option>)}</select></Field>
              <Field label="Funnel"><select className="select" value={draft.funnel ?? ''} onChange={(e) => set('funnel', e.target.value)}><option value="">—</option>{['Reach', 'Trust', 'Conversion'].map((a) => <option key={a}>{a}</option>)}</select></Field>
              <Field label="Effort"><select className="select" value={draft.effort ?? ''} onChange={(e) => set('effort', e.target.value)}>{['Low', 'Medium', 'High'].map((a) => <option key={a}>{a}</option>)}</select></Field>
              <Field label="Campaign"><select className="select" value={draft.campaignId ?? ''} onChange={(e) => set('campaignId', e.target.value || undefined)}><option value="">—</option>{campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
              <Field label="Status"><select className="select" value={draft.status} onChange={(e) => set('status', e.target.value)}>{STATUSES.map((a) => <option key={a}>{a}</option>)}</select></Field>
              {FIELDS.map((x) => (
                <Field key={x.k} label={x.label} wide>
                  <textarea className="textarea" rows={x.rows} style={{ minHeight: (x.rows ?? 2) * 24 + 16 }} value={(draft[x.k] as string) ?? ''} onChange={(e) => set(x.k, e.target.value)} />
                </Field>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><h3>Platform versions ({posts?.length ?? 0})</h3><span className="small muted">Each has its own script, caption, CTA, assets, checklist and date</span></div>
            <div className="panel-pad"><PostTable posts={posts ?? []} empty={<div className="muted small">No platform versions yet — use the adaptation engine.</div>} /></div>
          </div>
        </div>

        <div className="stack" style={{ gap: 22 }}>
          <div className="panel" style={{ ['--area' as string]: 'var(--a-prod)' }}>
            <div className="panel-head"><h3><Wand2 size={16} style={{ verticalAlign: -2 }} /> Adaptation engine</h3></div>
            <div className="panel-pad stack small">
              <p className="muted" style={{ margin: 0 }}>Pick only the formats that suit this idea. Each version is created with platform-specific structure — never the same caption everywhere.</p>
              {ngoBlocked && <div className="notice ngo">NGO versions stay in the NGO workspace and out of agency calendars unless you choose to show them.</div>}
              {allFormats.map((fmt) => {
                const r = rules.find((x) => x.format === fmt);
                const suggested = master.formats?.includes(fmt);
                return (
                  <label key={fmt} className="check" style={{ alignItems: 'flex-start' }}>
                    <input type="checkbox" checked={picked.includes(fmt)} onChange={(e) => setPicked(e.target.checked ? [...picked, fmt] : picked.filter((x) => x !== fmt))} />
                    <span style={{ textDecoration: 'none', color: 'inherit' }}>
                      <strong>{FORMAT_LABEL[fmt]}</strong>{suggested && <span className="tag gold" style={{ marginLeft: 6 }}>suggested</span>}{existing.has(fmt) && <span className="tag" style={{ marginLeft: 6 }}>exists</span>}
                      {r && <div className="muted">{r.why} <em>Change:</em> {r.change}</div>}
                    </span>
                  </label>
                );
              })}
              <button className="btn primary" disabled={!picked.length} onClick={createAdaptations}>Create {picked.length || ''} version{picked.length === 1 ? '' : 's'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
