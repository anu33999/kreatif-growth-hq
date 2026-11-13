import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, BookOpen, Clapperboard, GalleryHorizontal, HeartHandshake, Lightbulb, Sparkles, UserPlus, Users, WandSparkles } from 'lucide-react';
import { db, getSetting, setSetting, today, daysFromNow } from '../lib/db';
import type { Master, Post } from '../lib/types';
import { FORMAT_LABEL, PLATFORM_LABEL } from '../lib/types';
import { CreatePostModal, fmtDate } from '../components/common';
import { Empty, PageHead, PlatformTag, Progress, StatusTag, useToast } from '../components/ui';
import { DEFAULT_GOALS } from '../seed';
import { LeadModal } from './Leads';

type Goal = { id: string; label: string; metric: string; target: number; current?: number };

export default function Overview() {
  const nav = useNavigate();
  const toast = useToast();
  const posts = useLiveQuery(() => db.posts.where('workspace').equals('agency').toArray());
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const leads = useLiveQuery(() => db.leads.toArray());
  const campaigns = useLiveQuery(() => db.campaigns.toArray());
  const masters = useLiveQuery(() => db.masters.where('workspace').equals('agency').toArray());
  const facts = useLiveQuery(() => db.ngoFacts.toArray());
  const cands = useLiveQuery(() => db.ngoCandidates.toArray());
  const reviews = useLiveQuery(() => db.reviews.toArray());
  const goals = useLiveQuery(() => getSetting('goals', DEFAULT_GOALS));
  const [create, setCreate] = useState<null | { format: Post['format'] }>(null);
  const [leadKind, setLeadKind] = useState<null | 'Prospect' | 'Inbound lead'>(null);

  const t = today();
  const in14 = daysFromNow(14);
  const live = (posts ?? []).filter((p) => p.status !== 'Archived');
  const by = (pred: (p: Post) => boolean) => live.filter(pred);

  const upcoming = by((p) => !!p.date && p.date >= t && p.date <= in14 && !['Published', 'Analysed'].includes(p.status)).sort((a, b) => a.date!.localeCompare(b.date!));
  const todayPosts = by((p) => p.date === t);
  const toProduce = by((p) => ['Planned', 'Assets Needed', 'In Production', 'Editing'].includes(p.status));
  const scriptsReady = by((p) => p.status === 'Script Ready');
  const aiReady = by((p) => (p.aiShots?.length ?? 0) > 0 && !['Published', 'Analysed'].includes(p.status));
  const review = by((p) => p.status === 'Ready for Review');
  const published = by((p) => ['Published', 'Analysed'].includes(p.status));
  const withResults = published.filter((p) => (p.results?.length ?? 0) > 0);
  const openTasks = (tasks ?? []).filter((x) => !x.done).sort((a, b) => (a.due ?? '9').localeCompare(b.due ?? '9'));
  const dueTasks = openTasks.filter((x) => !x.due || x.due <= t);
  const followUps = (leads ?? []).filter((l) => !l.archived && l.nextFollowUp && l.nextFollowUp <= t && !['Won', 'Lost', 'Not a fit'].includes(l.status));
  const newLeads = (leads ?? []).filter((l) => l.createdAt > Date.now() - 14 * 864e5);

  const top = useMemo(() => {
    // Rank only within each platform using its primary metric; never mix platforms in one ranking.
    const primary: Record<string, string[]> = { instagram: ['shares', 'saves', 'reach'], linkedin: ['comments', 'impressions'], facebook: ['messages', 'linkClicks', 'reach'], youtube: ['watchTimeHours', 'views'] };
    const out: { p: Post; metric: string; value: number }[] = [];
    for (const pl of Object.keys(primary)) {
      const list = withResults.filter((p) => p.platform === pl).map((p) => {
        const last = p.results![p.results!.length - 1].metrics;
        const metric = primary[pl].find((m) => last[m] != null);
        return metric ? { p, metric, value: last[metric] } : null;
      }).filter(Boolean) as { p: Post; metric: string; value: number }[];
      list.sort((a, b) => b.value - a.value);
      if (list[0]) out.push(list[0]);
    }
    return out;
  }, [withResults]);

  const metricValue = (g: Goal): number | null => {
    const L = leads ?? [];
    switch (g.metric) {
      case 'publishedCount': return published.length;
      case 'meetings': return L.filter((l) => ['Meeting booked', 'Proposal sent', 'Won'].includes(l.status) || !!l.meeting).length;
      case 'qualified': return L.filter((l) => ['Qualified', 'Meeting booked', 'Proposal sent', 'Won'].includes(l.status)).length;
      case 'proposals': return L.filter((l) => ['Proposal sent', 'Won', 'Lost'].includes(l.status) && !!l.proposal || l.status === 'Proposal sent').length;
      case 'won': return L.filter((l) => l.status === 'Won').length;
      case 'reviews': return (reviews ?? []).length;
      case 'ytLong': return published.filter((p) => p.format === 'yt-long').length;
      default: return g.current ?? null;
    }
  };

  const generateIdea = async () => {
    const all = masters ?? [];
    const produced = new Set(live.map((p) => p.masterId));
    const lastByPillar: Record<string, string> = {};
    for (const p of live) if (p.pillar && p.date) lastByPillar[p.pillar] = (lastByPillar[p.pillar] ?? '') > p.date ? lastByPillar[p.pillar] : p.date;
    const candidates = all.filter((m) => !produced.has(m.id) && m.status !== 'Archived');
    if (!candidates.length) { toast('Every idea already has content. Add a new idea in the Content Library.'); return; }
    candidates.sort((a, b) => (lastByPillar[a.pillar ?? ''] ?? '').localeCompare(lastByPillar[b.pillar ?? ''] ?? '') || (a.effort === 'Low' ? -1 : 1));
    const pick: Master = candidates[0];
    toast(`Next idea: ${pick.title} (least-recent pillar: ${pick.pillar})`);
    nav('/idea/' + pick.id);
  };

  const editGoal = async (scope: 'd30' | 'd90', id: string) => {
    const g = goals?.[scope].find((x: Goal) => x.id === id);
    if (!g) return;
    const val = prompt(`Target for “${g.label}”`, String(g.target));
    if (val == null || isNaN(Number(val))) return;
    const next = { ...goals!, [scope]: goals![scope].map((x: Goal) => (x.id === id ? { ...x, target: Number(val) } : x)) };
    await setSetting('goals', next);
  };

  const ngoConfirmed = (cands ?? []).some((c) => c.selected);
  const factStatus = (facts ?? []).reduce<Record<string, number>>((acc, f) => ({ ...acc, [f.status]: (acc[f.status] ?? 0) + 1 }), {});

  const QA = [
    { label: 'Create a Reel', icon: Clapperboard, run: () => setCreate({ format: 'ig-reel' }) },
    { label: 'Create a carousel', icon: GalleryHorizontal, run: () => setCreate({ format: 'ig-carousel' }) },
    { label: 'Generate a content idea', icon: Lightbulb, run: generateIdea },
    { label: 'Start an AI-video workflow', icon: WandSparkles, run: () => { const p = aiReady[0]; nav(p ? `/post/${p.id}?tab=ai` : '/learn'); } },
    { label: 'Create a Story sequence', icon: Sparkles, run: () => setCreate({ format: 'ig-story' }) },
    { label: 'Add a prospect', icon: Users, run: () => setLeadKind('Prospect') },
    { label: 'Add a lead', icon: UserPlus, run: () => setLeadKind('Inbound lead') },
    { label: 'Open the Asha NGO workspace', icon: HeartHandshake, run: () => nav('/ngo') },
    { label: 'Review this week’s performance', icon: BarChart3, run: () => nav('/analytics?tab=reviews&new=Weekly') },
    { label: 'How to use Growth HQ', icon: BookOpen, run: () => nav('/help') },
  ];

  if (!posts || !tasks || !leads) return <div className="muted">Loading…</div>;

  return (
    <div style={{ ['--area' as string]: 'var(--a-plan)' }}>
      <PageHead eyebrow="Overview" title="Good to see you." area="plan"
        lede={<>Everything below is calculated from records saved in this browser. Starter drafts are marked; there is no performance data until you record results.</>} />

      <div className="stats section">
        <Stat v={dueTasks.length + todayPosts.length} l="Due today / overdue" />
        <Stat v={upcoming.length} l="Posts in next 14 days" />
        <Stat v={toProduce.length} l="Waiting to be produced" />
        <Stat v={scriptsReady.length} l="Scripts ready to record" />
        <Stat v={aiReady.length} l="Posts with AI prompts ready" />
        <Stat v={review.length} l="Awaiting review" />
        <Stat v={published.length} l="Published" />
        <Stat v={withResults.length} l="With recorded results" />
        <Stat v={newLeads.length} l="New leads (14 days)" />
        <Stat v={followUps.length} l="Follow-ups due" />
      </div>

      <div className="section">
        <h3 style={{ marginBottom: 12 }}>Quick actions</h3>
        <div className="qa">
          {QA.map((q) => <button key={q.label} className="tile" onClick={q.run}><q.icon />{q.label}</button>)}
        </div>
      </div>

      <div className="cols-main">
        <div className="stack" style={{ gap: 22 }}>
          <div className="panel">
            <div className="panel-head"><h3>Today’s tasks</h3><span className="muted small">{fmtDate(t)}</span></div>
            {dueTasks.length + todayPosts.length + followUps.length === 0 ? <div className="panel-pad muted small">Nothing due today. Next: {openTasks[0] ? `${openTasks[0].title} (${fmtDate(openTasks[0].due)})` : 'no open tasks'}.</div> : (
              <div className="list">
                {todayPosts.map((p) => <Row key={p.id} title={`Publish: ${p.title}`} meta={`${PLATFORM_LABEL[p.platform]} · ${p.status}`} onClick={() => nav('/post/' + p.id)} />)}
                {dueTasks.map((x) => (
                  <div key={x.id} className="list-item">
                    <input type="checkbox" aria-label={`Mark ${x.title} done`} checked={x.done} onChange={() => db.tasks.update(x.id, { done: !x.done })} style={{ marginTop: 4, accentColor: 'var(--accent)' }} />
                    <div className="grow"><div className="list-title">{x.title}</div><div className="list-meta">{x.kind} · due {fmtDate(x.due)}{x.due && x.due < t ? ' · overdue' : ''}</div></div>
                    {x.postId && <Link className="small" to={'/post/' + x.postId}>Open post</Link>}
                  </div>
                ))}
                {followUps.map((l) => <Row key={l.id} title={`Follow up: ${l.business}`} meta={`${l.nextAction ?? 'Next action not set'} · due ${fmtDate(l.nextFollowUp)}`} onClick={() => nav('/leads?open=' + l.id)} />)}
              </div>
            )}
          </div>

          <div className="panel">
            <div className="panel-head"><h3>Upcoming posts</h3><Link to="/calendar" className="small">Open calendar</Link></div>
            {upcoming.length === 0 ? <div className="panel-pad"><Empty title="Nothing scheduled in the next 14 days">Open the Content Library and convert an idea into a post with a date.</Empty></div> : (
              <div className="list">
                {upcoming.slice(0, 8).map((p) => (
                  <div key={p.id} className="list-item click" onClick={() => nav('/post/' + p.id)}>
                    <div style={{ width: 92 }} className="small muted">{fmtDate(p.date)}</div>
                    <div className="grow"><div className="list-title">{p.title}</div><div className="list-meta">{FORMAT_LABEL[p.format]}</div></div>
                    <PlatformTag platform={p.platform} /><StatusTag status={p.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cols-2">
            <MiniList title="Scripts ready for recording" posts={scriptsReady} empty="No posts at Script Ready." />
            <MiniList title="AI video prompts ready" posts={aiReady} empty="No AI shots planned." tab="ai" />
            <MiniList title="Waiting to be produced" posts={toProduce} empty="Production queue is empty." />
            <MiniList title="Posts awaiting review" posts={review} empty="Nothing waiting for review." />
          </div>

          <div className="panel">
            <div className="panel-head"><h3>Top-performing content</h3><Link to="/analytics" className="small">Analytics</Link></div>
            {top.length === 0 ? <div className="panel-pad"><Empty title="No performance data yet">Results appear here after you record real numbers on published posts (post → Results, or Analytics → Import CSV). Platforms are ranked separately because their metrics are not comparable.</Empty></div> : (
              <div className="list">{top.map(({ p, metric, value }) => <Row key={p.id} title={p.title} meta={`${PLATFORM_LABEL[p.platform]} · best by ${metric}: ${value.toLocaleString()}`} onClick={() => nav('/post/' + p.id + '?tab=results')} />)}</div>
            )}
          </div>
        </div>

        <div className="stack" style={{ gap: 22 }}>
          {(['d30', 'd90'] as const).map((scope) => (
            <div className="panel" key={scope}>
              <div className="panel-head"><h3>{scope === 'd30' ? '30-day goals' : '90-day goals'}</h3><span className="small muted">click target to edit</span></div>
              <div className="panel-pad stack">
                {(goals?.[scope] ?? []).map((g: Goal) => {
                  const v = metricValue(g);
                  return (
                    <div key={g.id}>
                      <div className="row between small"><span>{g.label}</span><button className="btn ghost sm" onClick={() => editGoal(scope, g.id)}>{v ?? '—'} / {g.target}</button></div>
                      <Progress value={v == null ? 0 : (v / g.target) * 100} />
                    </div>
                  );
                })}
                <div className="small muted">Targets are proposals — edit them. Progress counts come from your saved posts, leads and reviews.</div>
              </div>
            </div>
          ))}

          <div className="panel" style={{ ['--area' as string]: 'var(--a-lead)' }}>
            <div className="panel-head"><h3>Lead generation</h3><Link to="/leads" className="small">Open</Link></div>
            <div className="list">
              {(campaigns ?? []).filter((c) => c.status === 'Active').map((c) => <Row key={c.id} title={c.name} meta={`Offer: ${c.offer ?? '—'}`} onClick={() => nav('/leads?tab=campaigns&open=' + c.id)} />)}
              <div className="list-item small muted">{leads.length === 0 ? 'No leads recorded yet. Add one when a real conversation starts.' : `${leads.length} leads · ${followUps.length} follow-ups due`}</div>
            </div>
          </div>

          <div className="panel" style={{ ['--area' as string]: 'var(--a-ngo)' }}>
            <div className="panel-head"><h3>Asha NGO research</h3><Link to="/ngo" className="small">Open</Link></div>
            <div className="panel-pad stack small">
              <div className="row between"><span>Identity</span><span className={`tag ${ngoConfirmed ? 'ok' : 'warn'}`}>{ngoConfirmed ? 'Selected (verify sources)' : 'Unconfirmed'}</span></div>
              {Object.entries(factStatus).map(([k, v]) => <div key={k} className="row between"><span className="muted">{k}</span><span>{v}</span></div>)}
              <div className="muted">Candidates under review: {cands?.length ?? 0}</div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head"><h3>Upcoming deadlines</h3></div>
            <div className="list">
              {openTasks.filter((x) => x.due && x.due > t).slice(0, 6).map((x) => <div key={x.id} className="list-item"><div className="grow"><div className="list-title small">{x.title}</div><div className="list-meta">{fmtDate(x.due)} · {x.kind}</div></div></div>)}
              {openTasks.length === 0 && <div className="list-item muted small">No deadlines.</div>}
            </div>
          </div>
        </div>
      </div>
      {create && <CreatePostModal format={create.format} onClose={() => setCreate(null)} />}
      {leadKind && <LeadModal kind={leadKind} onClose={() => setLeadKind(null)} />}
    </div>
  );
}

function Stat({ v, l }: { v: number | null; l: string }) {
  return <div className={`stat ${v == null ? 'stat-empty' : ''}`}><div className="stat-value">{v ?? '—'}</div><div className="stat-label">{l}</div></div>;
}
function Row({ title, meta, onClick }: { title: string; meta?: string; onClick?: () => void }) {
  return <div className={`list-item ${onClick ? 'click' : ''}`} onClick={onClick}><div className="grow"><div className="list-title">{title}</div>{meta && <div className="list-meta">{meta}</div>}</div></div>;
}
function MiniList({ title, posts, empty, tab }: { title: string; posts: Post[]; empty: string; tab?: string }) {
  const nav = useNavigate();
  return (
    <div className="panel">
      <div className="panel-head"><h3 style={{ fontSize: 16 }}>{title}</h3><span className="muted small">{posts.length}</span></div>
      <div className="list">
        {posts.length === 0 && <div className="list-item muted small">{empty}</div>}
        {posts.slice(0, 5).map((p) => (
          <div key={p.id} className="list-item click" onClick={() => nav(`/post/${p.id}${tab ? '?tab=' + tab : ''}`)}>
            <span className={`dot p-${p.platform} pdot`} style={{ marginTop: 7 }} />
            <div className="grow"><div className="small">{p.title}</div><div className="list-meta">{fmtDate(p.date)} · {FORMAT_LABEL[p.format]}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
