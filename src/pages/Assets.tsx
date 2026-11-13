import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { Copy, Plus, Trash2, Upload } from 'lucide-react';
import { db, now, uid } from '../lib/db';
import type { Asset, AssetSource } from '../lib/types';
import { useParam } from '../components/common';
import { CopyBlock, Empty, Field, Modal, PageHead, Tabs, useToast } from '../components/ui';

const SOURCES: AssetSource[] = ['Original', 'AI-generated', 'Licensed', 'Client-supplied', 'Screen recording'];
const STATUSES: Asset['status'][] = ['Needed', 'Briefed', 'In progress', 'Ready', 'Used'];

export default function Assets() {
  const [tab, setTab] = useParam('tab');
  const [open, setOpen] = useParam('open');
  const assets = useLiveQuery(() => db.assets.toArray());
  const [f, setF] = useState({ q: '', source: '', status: '', type: '' });
  const cur = tab ?? 'assets';
  const list = useMemo(() => (assets ?? []).filter((a) => (cur === 'templates' ? a.isTemplate : !a.isTemplate) &&
    (!f.q || `${a.name} ${a.prompt ?? ''} ${a.brief ?? ''}`.toLowerCase().includes(f.q.toLowerCase())) &&
    (!f.source || a.source === f.source) && (!f.status || a.status === f.status) && (!f.type || a.type === f.type)), [assets, f, cur]);
  const types = [...new Set((assets ?? []).map((a) => a.type))];
  const create = async () => {
    const id = uid('as');
    await db.assets.add({ id, name: 'New asset', type: 'Image', source: 'Original', status: 'Needed', postIds: [], isTemplate: cur === 'templates', createdAt: now(), updatedAt: now() });
    setOpen(id);
  };
  return (
    <div>
      <PageHead eyebrow="Produce" area="prod" title="Asset Library" lede="Every image, clip, screenshot, cover and template — with its source, rights, prompt, file location and the posts that use it."
        actions={<button className="btn primary" onClick={create}><Plus />New {cur === 'templates' ? 'template' : 'asset'}</button>} />
      <Tabs value={cur as 'assets'} onChange={(t) => setTab(t === 'assets' ? null : t)} tabs={[
        { id: 'assets', label: 'Assets', count: assets?.filter((a) => !a.isTemplate).length },
        { id: 'templates' as 'assets', label: 'Brand templates', count: assets?.filter((a) => a.isTemplate).length },
      ]} />
      <div className="filters">
        <input className="input" placeholder="Search name, prompt, brief" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} aria-label="Search assets" />
        <select className="select" value={f.source} onChange={(e) => setF({ ...f, source: e.target.value })} aria-label="Source"><option value="">All sources</option>{SOURCES.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="select" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })} aria-label="Status"><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="select" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })} aria-label="Type"><option value="">All types</option>{types.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      {list.length === 0 ? <Empty title="No assets match" /> : cur === 'templates' ? (
        <div className="table-wrap"><table className="t">
          <thead><tr><th>Template</th><th>Platform</th><th>Size</th><th>Purpose</th><th>Safe areas</th><th>Export</th><th>Status</th></tr></thead>
          <tbody>{list.map((a) => <tr key={a.id} className="click" onClick={() => setOpen(a.id)}><td className="list-title">{a.name}</td><td className="small">{a.platform}</td><td className="small">{a.dims}</td><td className="wrap small">{a.template?.purpose}</td><td className="wrap small">{a.template?.safeAreas}</td><td className="small">{a.template?.export}</td><td className="small">{a.status}</td></tr>)}</tbody>
        </table></div>
      ) : (
        <div className="table-wrap"><table className="t">
          <thead><tr><th /><th>Asset</th><th>Type</th><th>Source</th><th>Status</th><th>Used in</th><th>Location</th></tr></thead>
          <tbody>{list.map((a) => <AssetRow key={a.id} a={a} onOpen={() => setOpen(a.id)} />)}</tbody>
        </table></div>
      )}
      <p className="small muted" style={{ marginTop: 10 }}>Uploaded previews are stored in this browser (IndexedDB) and included in backups. Keep full-resolution originals in Drive/Dropbox and paste the link in “File location”.</p>
      {open && <AssetModal id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function useFileUrl(fileId?: string) {
  const file = useLiveQuery(() => (fileId ? db.files.get(fileId) : undefined), [fileId]);
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    if (!file) { setUrl(undefined); return; }
    const u = URL.createObjectURL(file.blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  return { url, mime: file?.mime };
}

function AssetRow({ a, onOpen }: { a: Asset; onOpen: () => void }) {
  const { url, mime } = useFileUrl(a.fileId);
  return (
    <tr className="click" onClick={onOpen}>
      <td style={{ width: 64 }}>{url && mime?.startsWith('image') ? <img src={url} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} /> : <div style={{ width: 48, height: 48, borderRadius: 4, background: 'var(--bg-2)', border: '1px solid var(--line)' }} />}</td>
      <td style={{ minWidth: 220 }}><div className="list-title">{a.name}</div>{a.prompt && <div className="list-meta">has prompt</div>}</td>
      <td className="small">{a.type}</td><td className="small">{a.source}</td>
      <td><span className={`tag ${a.status === 'Ready' || a.status === 'Used' ? 'ok' : a.status === 'Needed' ? 'warn' : ''}`}>{a.status}</span></td>
      <td className="small">{a.postIds?.length ?? 0} post(s)</td>
      <td className="small muted" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.location ?? '—'}</td>
    </tr>
  );
}

function AssetModal({ id, onClose }: { id: string; onClose: () => void }) {
  const toast = useToast();
  const a = useLiveQuery(() => db.assets.get(id), [id]);
  const posts = useLiveQuery(() => db.posts.toArray()) ?? [];
  const [d, setD] = useState<Asset | null>(null);
  const { url, mime } = useFileUrl(a?.fileId);
  useEffect(() => { if (a && (!d || d.id !== a.id)) setD(a); }, [a]); // eslint-disable-line react-hooks/exhaustive-deps
  if (a === undefined || !d) return null;
  if (!a) return <Modal title="Asset" onClose={onClose}><Empty title="Asset not found" /></Modal>;
  const set = (k: keyof Asset, v: unknown) => setD({ ...d, [k]: v });
  const save = async () => { await db.assets.put({ ...d, updatedAt: now() }); toast('Asset saved'); onClose(); };
  const upload = async (file: File) => {
    if (file.size > 25 * 1024 * 1024) { toast('Preview files must be under 25 MB — store the original elsewhere and paste its link.', 'error'); return; }
    const fid = uid('file');
    await db.files.add({ id: fid, name: file.name, mime: file.type, blob: file, createdAt: now() });
    if (d.fileId) await db.files.delete(d.fileId);
    const next = { ...d, fileId: fid, updatedAt: now() };
    setD(next); await db.assets.put(next); toast('Preview uploaded');
  };
  const del = async () => { if (!confirm('Delete this asset?')) return; if (a.fileId) await db.files.delete(a.fileId); await db.assets.delete(a.id); onClose(); };
  const dup = async () => { const nid = uid('as'); await db.assets.add({ ...structuredClone(a), id: nid, name: a.name + ' (adapted)', fileId: undefined, postIds: [], notes: `Adapted from ${a.name} (${a.id}). ${a.notes ?? ''}`, createdAt: now(), updatedAt: now() }); toast('Copy created for another destination — original kept'); };
  const linked = posts.filter((p) => d.postIds?.includes(p.id));
  return (
    <Modal wide title={d.isTemplate ? 'Template' : 'Asset'} onClose={onClose} footer={<>
      <button className="btn danger" onClick={del}><Trash2 />Delete</button>
      <button className="btn" onClick={dup}><Copy />Adapt for another platform</button>
      <div className="grow" /><button className="btn" onClick={onClose}>Cancel</button><button className="btn primary" onClick={save}>Save</button>
    </>}>
      <div className="cols-main" style={{ gridTemplateColumns: 'minmax(0,1fr) 260px' }}>
        <div className="grid-form">
          <Field label="Name" wide><input className="input" value={d.name} onChange={(e) => set('name', e.target.value)} /></Field>
          <Field label="Type"><input className="input" value={d.type} onChange={(e) => set('type', e.target.value)} list="asset-types" /></Field>
          <datalist id="asset-types">{['Image', 'Photograph', 'Screenshot', 'Screen recording', 'Video clip', 'Graphic', 'Icon', 'Background', 'Cover', 'Template', 'Audio'].map((x) => <option key={x} value={x} />)}</datalist>
          <Field label="Source"><select className="select" value={d.source} onChange={(e) => set('source', e.target.value)}>{SOURCES.map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Creation status"><select className="select" value={d.status} onChange={(e) => set('status', e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
          <Field label="Dimensions"><input className="input" value={d.dims ?? ''} onChange={(e) => set('dims', e.target.value)} /></Field>
          <Field label="File location / link" wide><input className="input" value={d.location ?? ''} onChange={(e) => set('location', e.target.value)} placeholder="Google Drive / Dropbox / Canva link" /></Field>
          <Field label="Usage permissions" wide><input className="input" value={d.permissions ?? ''} onChange={(e) => set('permissions', e.target.value)} /></Field>
          <Field label="Creation method" wide><textarea className="textarea" value={d.method ?? ''} onChange={(e) => set('method', e.target.value)} /></Field>
          <Field label="Brief (photo/design)" wide><textarea className="textarea" value={d.brief ?? ''} onChange={(e) => set('brief', e.target.value)} /></Field>
          <Field label="Prompt" wide><textarea className="textarea" value={d.prompt ?? ''} onChange={(e) => set('prompt', e.target.value)} /></Field>
          {d.isTemplate && (['purpose', 'elements', 'palette', 'typography', 'safeAreas', 'logo', 'export'] as const).map((k) => (
            <Field key={k} label={k} wide><input className="input" value={d.template?.[k] ?? ''} onChange={(e) => set('template', { ...d.template, [k]: e.target.value })} /></Field>
          ))}
          <Field label="Notes" wide><textarea className="textarea" value={d.notes ?? ''} onChange={(e) => set('notes', e.target.value)} /></Field>
        </div>
        <div className="stack">
          {url ? (mime?.startsWith('image') ? <img src={url} className="thumb" alt={d.name} /> : mime?.startsWith('video') ? <video src={url} className="thumb" controls /> : <div className="small">Stored file: {mime}</div>) : <div className="thumb" style={{ display: 'grid', placeItems: 'center' }}><span className="small muted">No preview</span></div>}
          <label className="btn"><Upload />Upload preview<input type="file" accept="image/*,video/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} /></label>
          {d.prompt && <CopyBlock label="Prompt" text={d.prompt} />}
          <div><div className="copy-label">Used in</div>{linked.length ? linked.map((p) => <div key={p.id}><Link to={'/post/' + p.id} onClick={onClose} className="small">{p.title}</Link></div>) : <div className="small muted">Not linked — link it from a post’s Assets tab.</div>}</div>
        </div>
      </div>
    </Modal>
  );
}
