import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { db } from '../lib/db';
import type { Format } from '../lib/types';
import { AUDIENCES, FORMAT_LABEL, PILLARS, STATUSES } from '../lib/types';
import { CreatePostModal, NewIdeaModal, PostFilterBar, PostTable, emptyFilters, usePostFilter, useParam } from '../components/common';
import { Empty, PageHead, SampleTag, StatusTag, Tabs } from '../components/ui';

export default function Library() {
  const nav = useNavigate();
  const [tab, setTab] = useParam('tab');
  const masters = useLiveQuery(() => db.masters.where('workspace').equals('agency').toArray());
  const posts = useLiveQuery(() => db.posts.where('workspace').equals('agency').toArray());
  const campaigns = useLiveQuery(() => db.campaigns.toArray()) ?? [];
  const [newIdea, setNewIdea] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [f, setF] = useState({ q: '', audience: '', pillar: '', format: '', funnel: '', effort: '', campaign: '', status: '' });
  const [pf, setPf] = useState(emptyFilters());
  const filteredPosts = usePostFilter(posts, pf);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of posts ?? []) if (p.masterId) c[p.masterId] = (c[p.masterId] ?? 0) + 1;
    return c;
  }, [posts]);

  const ideas = useMemo(() => (masters ?? []).filter((m) =>
    (!f.q || `${m.title} ${m.idea} ${m.problem ?? ''}`.toLowerCase().includes(f.q.toLowerCase())) &&
    (!f.audience || m.audience === f.audience) && (!f.pillar || m.pillar === f.pillar) && (!f.format || m.formats?.includes(f.format as Format)) &&
    (!f.funnel || m.funnel === f.funnel) && (!f.effort || m.effort === f.effort) && (!f.campaign || m.campaignId === f.campaign) &&
    (!f.status ? m.status !== 'Archived' : m.status === f.status),
  ).sort((a, b) => (a.ideaNo ?? 999) - (b.ideaNo ?? 999) || b.createdAt - a.createdAt), [masters, f]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <div>
      <PageHead eyebrow="Plan" area="plan" title="Content Library"
        lede="Master ideas hold the argument, audience and proof once. Each platform version is its own record, linked back — no copy-pasting between pages."
        actions={<><button className="btn" onClick={() => setNewPost(true)}><Plus />New post</button><button className="btn primary" onClick={() => setNewIdea(true)}><Plus />New idea</button></>} />
      <Tabs value={(tab ?? 'ideas') as 'ideas' | 'posts'} onChange={(t) => setTab(t === 'ideas' ? null : t)}
        tabs={[{ id: 'ideas', label: 'Master ideas', count: masters?.length }, { id: 'posts', label: 'All platform posts', count: posts?.length }]} />

      {(tab ?? 'ideas') === 'ideas' ? (
        <>
          <div className="filters">
            <input className="input" placeholder="Search ideas" value={f.q} onChange={set('q')} aria-label="Search ideas" />
            <select className="select" value={f.audience} onChange={set('audience')} aria-label="Audience"><option value="">All audiences</option>{AUDIENCES.map((a) => <option key={a}>{a}</option>)}</select>
            <select className="select" value={f.pillar} onChange={set('pillar')} aria-label="Pillar / topic"><option value="">All pillars</option>{PILLARS.map((a) => <option key={a}>{a}</option>)}</select>
            <select className="select" value={f.format} onChange={set('format')} aria-label="Format"><option value="">All formats</option>{(Object.keys(FORMAT_LABEL) as Format[]).map((a) => <option key={a} value={a}>{FORMAT_LABEL[a]}</option>)}</select>
            <select className="select" value={f.funnel} onChange={set('funnel')} aria-label="Objective"><option value="">Reach / trust / conversion</option>{['Reach', 'Trust', 'Conversion'].map((a) => <option key={a}>{a}</option>)}</select>
            <select className="select" value={f.effort} onChange={set('effort')} aria-label="Complexity"><option value="">Any complexity</option>{['Low', 'Medium', 'High'].map((a) => <option key={a}>{a}</option>)}</select>
            <select className="select" value={f.campaign} onChange={set('campaign')} aria-label="Campaign"><option value="">All campaigns</option>{campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <select className="select" value={f.status} onChange={set('status')} aria-label="Workflow status"><option value="">Any status (excl. archived)</option>{STATUSES.map((a) => <option key={a}>{a}</option>)}</select>
          </div>
          {ideas.length === 0 ? <Empty title="No ideas match" action={<button className="btn" onClick={() => setF({ q: '', audience: '', pillar: '', format: '', funnel: '', effort: '', campaign: '', status: '' })}>Clear filters</button>} /> : (
            <div className="table-wrap">
              <table className="t">
                <thead><tr><th>#</th><th>Idea</th><th>Audience</th><th>Purpose</th><th>Effort</th><th>Formats</th><th>Versions</th><th>Next action</th><th>Status</th></tr></thead>
                <tbody>
                  {ideas.map((m) => (
                    <tr key={m.id} className="click" onClick={() => nav('/idea/' + m.id)}>
                      <td className="muted">{m.ideaNo ?? '—'}</td>
                      <td style={{ minWidth: 240 }}><div className="list-title">{m.title}</div><div className="list-meta">{m.pillar}</div></td>
                      <td className="small" style={{ minWidth: 150 }}>{m.audience}</td>
                      <td><span className={`tag ${m.funnel === 'Conversion' ? 'gold' : m.funnel === 'Trust' ? 'ok' : ''}`}>{m.funnel ?? '—'}</span></td>
                      <td className="small">{m.effort}</td>
                      <td className="small muted" style={{ minWidth: 160 }}>{(m.formats ?? []).map((x) => FORMAT_LABEL[x].replace(/^(Instagram|LinkedIn|Facebook|YouTube) /, (s) => s[0] + ' ')).join(', ')}</td>
                      <td>{counts[m.id] ?? 0}</td>
                      <td className="small" style={{ minWidth: 200 }}>{m.nextAction}</td>
                      <td><div className="row" style={{ gap: 4 }}><StatusTag status={m.status} />{m.sample && <SampleTag />}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="small muted" style={{ marginTop: 10 }}>Required assets are tracked on each platform version and in the Asset Library. Open an idea to adapt it to platforms in one click.</p>
        </>
      ) : (
        <>
          <PostFilterBar f={pf} set={setPf} campaigns={campaigns} />
          <PostTable posts={filteredPosts} empty={<Empty title="No posts match" />} />
        </>
      )}
      {newIdea && <NewIdeaModal onClose={() => setNewIdea(false)} />}
      {newPost && <CreatePostModal onClose={() => setNewPost(false)} />}
    </div>
  );
}
