import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { db, today } from '../lib/db';
import type { Post } from '../lib/types';
import { FORMAT_LABEL } from '../lib/types';
import { CreatePostModal, PostFilterBar, PostTable, emptyFilters, usePostFilter, useParam } from '../components/common';
import { Empty, PageHead } from '../components/ui';

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function Calendar() {
  const nav = useNavigate();
  const [view, setView] = useParam('view');
  const [month, setMonth] = useParam('m');
  const [showNgo, setShowNgo] = useState(false);
  const [f, setF] = useState(emptyFilters());
  const [createDate, setCreateDate] = useState<string | null>(null);
  const posts = useLiveQuery(() => db.posts.toArray());
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const campaigns = useLiveQuery(() => db.campaigns.toArray()) ?? [];
  const scoped = useMemo(() => (posts ?? []).filter((p) => showNgo || p.workspace === 'agency'), [posts, showNgo]);
  const filtered = usePostFilter(scoped, f);

  const firstDated = (posts ?? []).map((p) => p.date).filter(Boolean).sort()[0];
  const base = month ? new Date(month + '-01T00:00:00') : new Date((firstDated && firstDated > today() ? firstDated : today()) + 'T00:00:00');
  const y = base.getFullYear(); const m = base.getMonth();
  const start = new Date(y, m, 1);
  const offset = (start.getDay() + 6) % 7; // Monday first
  const days = Array.from({ length: 42 }, (_, i) => new Date(y, m, 1 - offset + i));
  const byDate = useMemo(() => {
    const map: Record<string, Post[]> = {};
    for (const p of filtered) if (p.date) (map[p.date] ??= []).push(p);
    return map;
  }, [filtered]);
  const tasksByDate = useMemo(() => {
    const map: Record<string, { id: string; title: string }[]> = {};
    for (const x of tasks ?? []) if (x.due && !x.done && x.kind === 'Review') (map[x.due] ??= []).push(x);
    return map;
  }, [tasks]);
  const shift = (n: number) => { const d = new Date(y, m + n, 1); setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`); };
  const undated = filtered.filter((p) => !p.date);
  const t = today();

  return (
    <div>
      <PageHead eyebrow="Plan" area="plan" title="Unified Calendar"
        lede="Every platform version links back to its master idea. Filter by platform to see one channel; open any item to see everything needed to produce it."
        actions={<>
          <div className="seg" role="group" aria-label="View">
            <button className={view !== 'list' ? 'on' : ''} onClick={() => setView(null)}>Calendar</button>
            <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>List</button>
          </div>
          <button className="btn primary" onClick={() => setCreateDate('')}><Plus />New post</button>
        </>} />
      <PostFilterBar f={f} set={setF} campaigns={campaigns} />
      <label className="row small muted" style={{ marginTop: -6, marginBottom: 14, gap: 6 }}><input type="checkbox" checked={showNgo} onChange={(e) => setShowNgo(e.target.checked)} />Show NGO workspace items</label>

      {view === 'list' ? (
        <PostTable posts={filtered} empty={<Empty title="No posts match these filters">Clear a filter or create a post.</Empty>} />
      ) : (
        <>
          <div className="row between" style={{ marginBottom: 10 }}>
            <h2>{start.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
            <div className="row">
              <button className="btn icon-btn" onClick={() => shift(-1)} aria-label="Previous month"><ChevronLeft /></button>
              <button className="btn sm" onClick={() => setMonth(t.slice(0, 7))}>Today</button>
              <button className="btn icon-btn" onClick={() => shift(1)} aria-label="Next month"><ChevronRight /></button>
            </div>
          </div>
          <div className="cal">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <div key={d} className="cal-h">{d}</div>)}
            {days.map((d) => {
              const k = iso(d);
              const items = byDate[k] ?? [];
              const rv = tasksByDate[k] ?? [];
              return (
                <div key={k} className={`cal-d ${d.getMonth() !== m ? 'out' : ''} ${k === t ? 'today' : ''} ${items.length + rv.length === 0 ? 'emptyday' : ''}`}
                  onDoubleClick={() => setCreateDate(k)} title="Double-click to add a post on this day">
                  <div className="row between"><span className="cal-n">{d.getDate()}</span><span className="small muted" style={{ display: 'none' }}>{k}</span></div>
                  {items.map((p) => (
                    <button key={p.id} className={`chip p-${p.platform}`} onClick={() => nav((p.workspace === 'ngo' ? '/ngo/post/' : '/post/') + p.id)}
                      title={`${p.title} — ${FORMAT_LABEL[p.format]} — ${p.status}`}>
                      {p.time && <span className="muted">{p.time} </span>}{FORMAT_LABEL[p.format].replace(/^(Instagram|LinkedIn|Facebook|YouTube) /, '')}: {p.title}
                    </button>
                  ))}
                  {rv.map((x) => <div key={x.id} className="chip" style={{ ['--pc' as string]: 'var(--a-measure)', cursor: 'default' }}>{x.title}</div>)}
                </div>
              );
            })}
          </div>
          <p className="small muted" style={{ marginTop: 10 }}>Colours: <span className="pdot p-instagram">● Instagram</span> · <span className="pdot p-linkedin">● LinkedIn</span> · <span className="pdot p-facebook">● Facebook</span> · <span className="pdot p-youtube">● YouTube</span> · <span style={{ color: 'var(--a-measure)' }}>● Reviews</span>. Times are in your local time zone (starter plan uses IST). Double-click a day to add a post.</p>
          {undated.length > 0 && (
            <div className="section" style={{ marginTop: 20 }}>
              <h3 style={{ marginBottom: 10 }}>Unscheduled ({undated.length})</h3>
              <PostTable posts={undated} />
            </div>
          )}
        </>
      )}
      {createDate !== null && <CreatePostModal date={createDate || undefined} onClose={() => setCreateDate(null)} />}
    </div>
  );
}
