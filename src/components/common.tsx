import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { db, now, uid } from '../lib/db';
import type { Format, Master, Platform, Post, Status, Workspace } from '../lib/types';
import { AUDIENCES, FORMAT_LABEL, FORMAT_PLATFORM, PILLARS, PLATFORM_LABEL, STATUSES } from '../lib/types';
import { newPostFrom, progressOf } from '../lib/workflow';
import { Field, Modal, PlatformTag, Progress, SampleTag, StatusTag, useToast } from './ui';

export function useParam(name: string): [string | null, (v: string | null) => void] {
  const [sp, setSp] = useSearchParams();
  return [sp.get(name), (v) => {
    const next = new URLSearchParams(sp);
    if (v == null) next.delete(name); else next.set(name, v);
    setSp(next, { replace: true });
  }];
}

export const fmtDate = (d?: string) => {
  if (!d) return '—';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
};

export function CreatePostModal({ onClose, format: initialFormat, master, workspace = 'agency', date, platform }: {
  onClose: () => void; format?: Format; master?: Master; workspace?: Workspace; date?: string; platform?: Platform;
}) {
  const nav = useNavigate();
  const toast = useToast();
  const formats = (Object.keys(FORMAT_LABEL) as Format[]).filter((f) => !platform || FORMAT_PLATFORM[f] === platform);
  const [format, setFormat] = useState<Format>(initialFormat ?? formats[0]);
  const [title, setTitle] = useState(master?.title ?? '');
  const [d, setD] = useState(date ?? '');
  const [masterId, setMasterId] = useState(master?.id ?? '');
  const masters = useLiveQuery(() => db.masters.where('workspace').equals(workspace).toArray(), [workspace]) ?? [];
  const create = async () => {
    const m = masters.find((x) => x.id === masterId);
    const p = newPostFrom(format, m, { workspace, date: d || undefined, status: 'Planned' });
    if (title.trim()) p.title = title.trim();
    await db.posts.add(p);
    toast('Created — opening the production workspace');
    onClose();
    nav((workspace === 'ngo' ? '/ngo/post/' : '/post/') + p.id);
  };
  return (
    <Modal title="Create content" onClose={onClose} footer={<><button className="btn" onClick={onClose}>Cancel</button><button className="btn primary" onClick={create}>Create</button></>}>
      <div className="grid-form">
        <Field label="Format">
          <select className="select" value={format} onChange={(e) => setFormat(e.target.value as Format)}>
            {formats.map((f) => <option key={f} value={f}>{FORMAT_LABEL[f]}</option>)}
          </select>
        </Field>
        <Field label="Publish date"><input className="input" type="date" value={d} onChange={(e) => setD(e.target.value)} /></Field>
        <Field label="Title" wide><input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Working title (defaults to idea + format)" /></Field>
        <Field label="Master idea (copies audience, objective, campaign)" wide>
          <select className="select" value={masterId} onChange={(e) => setMasterId(e.target.value)}>
            <option value="">— None —</option>
            {masters.map((m) => <option key={m.id} value={m.id}>{m.ideaNo ? `#${m.ideaNo} ` : ''}{m.title}</option>)}
          </select>
        </Field>
      </div>
      <p className="small muted" style={{ marginTop: 12 }}>The new record starts with a format-specific skeleton (hooks, scenes or slides, edit steps, checklist) for you to fill in. Nothing is AI-generated.</p>
    </Modal>
  );
}

export function NewIdeaModal({ onClose, workspace = 'agency', seed }: { onClose: () => void; workspace?: Workspace; seed?: Partial<Master> }) {
  const nav = useNavigate();
  const [m, setM] = useState<Partial<Master>>({ title: '', idea: '', pillar: PILLARS[0], audience: AUDIENCES[0], funnel: 'Reach', effort: 'Medium', ...seed });
  const save = async () => {
    if (!m.title?.trim()) return;
    const rec: Master = { id: uid('idea'), workspace, status: 'Idea', createdAt: now(), updatedAt: now(), idea: '', ...m, title: m.title.trim() } as Master;
    await db.masters.add(rec);
    onClose();
    nav((workspace === 'ngo' ? '/ngo/idea/' : '/idea/') + rec.id);
  };
  const set = (k: keyof Master, v: string) => setM((x) => ({ ...x, [k]: v }));
  return (
    <Modal title="New master idea" onClose={onClose} footer={<><button className="btn" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!m.title?.trim()} onClick={save}>Save idea</button></>}>
      <div className="grid-form">
        <Field label="Title" wide><input className="input" autoFocus value={m.title ?? ''} onChange={(e) => set('title', e.target.value)} /></Field>
        <Field label="Idea / business problem" wide><textarea className="textarea" value={m.idea ?? ''} onChange={(e) => set('idea', e.target.value)} /></Field>
        <Field label="Pillar"><select className="select" value={m.pillar} onChange={(e) => set('pillar', e.target.value)}>{PILLARS.map((p) => <option key={p}>{p}</option>)}</select></Field>
        <Field label="Audience"><select className="select" value={m.audience} onChange={(e) => set('audience', e.target.value)}>{AUDIENCES.map((p) => <option key={p}>{p}</option>)}</select></Field>
        <Field label="Funnel stage"><select className="select" value={m.funnel} onChange={(e) => set('funnel', e.target.value)}>{['Reach', 'Trust', 'Conversion'].map((p) => <option key={p}>{p}</option>)}</select></Field>
        <Field label="Effort"><select className="select" value={m.effort} onChange={(e) => set('effort', e.target.value)}>{['Low', 'Medium', 'High'].map((p) => <option key={p}>{p}</option>)}</select></Field>
      </div>
    </Modal>
  );
}

export interface PostFilters { platform: string; status: string; format: string; campaign: string; q: string; showArchived: boolean }

export function PostTable({ posts, showPlatform = true, empty }: { posts: Post[]; showPlatform?: boolean; empty?: React.ReactNode }) {
  const nav = useNavigate();
  if (!posts.length) return <>{empty}</>;
  return (
    <div className="table-wrap">
      <table className="t">
        <thead><tr><th>Date</th><th>Title</th>{showPlatform && <th>Platform</th>}<th>Format</th><th>Status</th><th style={{ width: 120 }}>Production</th></tr></thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="click" onClick={() => nav((p.workspace === 'ngo' ? '/ngo/post/' : '/post/') + p.id)}>
              <td className="muted" style={{ whiteSpace: 'nowrap' }}>{fmtDate(p.date)}{p.time ? ` · ${p.time}` : ''}</td>
              <td><div className="list-title">{p.title}</div><div className="list-meta row" style={{ gap: 6 }}>{p.account}{p.sample && <SampleTag />}</div></td>
              {showPlatform && <td><PlatformTag platform={p.platform} /></td>}
              <td className="muted small">{FORMAT_LABEL[p.format]}</td>
              <td><StatusTag status={p.status} /></td>
              <td><Progress value={progressOf(p)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PostFilterBar({ f, set, campaigns, platformFixed }: {
  f: PostFilters; set: (f: PostFilters) => void; campaigns: { id: string; name: string }[]; platformFixed?: boolean;
}) {
  return (
    <div className="filters">
      <input className="input" placeholder="Filter by text" value={f.q} onChange={(e) => set({ ...f, q: e.target.value })} aria-label="Filter by text" />
      {!platformFixed && (
        <select className="select" value={f.platform} onChange={(e) => set({ ...f, platform: e.target.value })} aria-label="Platform">
          <option value="">All platforms</option>
          {(['instagram', 'linkedin', 'facebook', 'youtube'] as Platform[]).map((p) => <option key={p} value={p}>{PLATFORM_LABEL[p]}</option>)}
        </select>
      )}
      <select className="select" value={f.format} onChange={(e) => set({ ...f, format: e.target.value })} aria-label="Format">
        <option value="">All formats</option>
        {(Object.keys(FORMAT_LABEL) as Format[]).filter((x) => !platformFixed || !f.platform || FORMAT_PLATFORM[x] === f.platform).map((x) => <option key={x} value={x}>{FORMAT_LABEL[x]}</option>)}
      </select>
      <select className="select" value={f.status} onChange={(e) => set({ ...f, status: e.target.value })} aria-label="Status">
        <option value="">All statuses</option>
        {STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>
      <select className="select" value={f.campaign} onChange={(e) => set({ ...f, campaign: e.target.value })} aria-label="Campaign">
        <option value="">All campaigns</option>
        {campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <label className="row small muted" style={{ gap: 6 }}><input type="checkbox" checked={f.showArchived} onChange={(e) => set({ ...f, showArchived: e.target.checked })} />Show archived</label>
    </div>
  );
}

export function usePostFilter(posts: Post[] | undefined, f: PostFilters) {
  return useMemo(() => (posts ?? []).filter((p) =>
    (!f.platform || p.platform === f.platform) && (!f.status || p.status === f.status) && (!f.format || p.format === f.format) &&
    (!f.campaign || p.campaignId === f.campaign) && (f.showArchived || p.status !== 'Archived' || f.status === 'Archived') &&
    (!f.q || `${p.title} ${p.hook ?? ''} ${p.caption ?? ''} ${p.body ?? ''} ${(p.tags ?? []).join(' ')}`.toLowerCase().includes(f.q.toLowerCase())),
  ).sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999') || (a.time ?? '').localeCompare(b.time ?? '')), [posts, f]);
}

export const emptyFilters = (platform = ''): PostFilters => ({ platform, status: '', format: '', campaign: '', q: '', showArchived: false });

export const STATUS_ORDER: Record<Status, number> = Object.fromEntries(STATUSES.map((s, i) => [s, i])) as Record<Status, number>;
