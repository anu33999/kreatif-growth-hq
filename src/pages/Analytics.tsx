import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { Download, Plus, Upload } from 'lucide-react';
import { daysFromNow, db, downloadBlob, now, parseCSV, toCSV, today, uid } from '../lib/db';
import type { Post, Review } from '../lib/types';
import { FORMAT_LABEL, PILLARS, PLATFORM_LABEL } from '../lib/types';
import { METRICS, metricsFor } from '../lib/metrics';
import { useParam } from '../components/common';
import { Empty, Field, Modal, PageHead, Tabs, useToast } from '../components/ui';

const QUESTIONS: Record<Review['period'], string[]> = {
  Weekly: ['What attracted relevant new viewers?', 'What prompted people to save or share?', 'What generated substantive professional conversations?', 'What helped viewers understand the agency’s expertise?', 'Which posts attracted the wrong audience?', 'What produced qualified traffic or enquiries?', 'Which creative patterns should be tested again?', 'What should be stopped or improved?', 'Next experiment to run'],
  Monthly: ['What performed well (per platform)?', 'Which audience responded?', 'Which creative formats showed promise?', 'What business outcomes resulted?', 'Repeat', 'Modify', 'Discontinue', 'Next experiments'],
  '30-day': ['What performed well (per platform)?', 'Which audience responded?', 'Which formats showed promise?', 'Business outcomes (enquiries, calls, proposals, clients)', 'Repeat', 'Modify', 'Discontinue', 'Hypotheses confirmed / rejected', 'Next experiments'],
  '60-day': ['What performed well?', 'Which audience responded?', 'Formats with promise', 'Business outcomes', 'Repeat', 'Modify', 'Discontinue', 'Next experiments'],
  '90-day': ['What performed well?', 'Which audience responded?', 'Formats with promise', 'Business outcomes and revenue (known)', 'Which platform produced qualified leads?', 'Repeat', 'Modify', 'Discontinue', 'Strategy changes for next quarter'],
};

export default function Analytics() {
  const [tab, setTab] = useParam('tab');
  const [newReview, setNewReview] = useParam('new');
  const posts = useLiveQuery(() => db.posts.where('workspace').equals('agency').toArray());
  const research = useLiveQuery(() => db.research.where('area').equals('Hypothesis').toArray()) ?? [];
  const cur = tab ?? 'platforms';
  const withResults = (posts ?? []).filter((p) => p.results?.length);

  return (
    <div style={{ ['--area' as string]: 'var(--a-measure)' }}>
      <PageHead eyebrow="Measure" area="measure" title="Analytics & Experiments"
        lede="Platforms are shown separately — a Reel view, a LinkedIn impression and a YouTube view measure different behaviour. Numbers come only from what you record or import." />
      <Tabs value={cur as 'platforms'} onChange={(x) => setTab(x === 'platforms' ? null : x)} tabs={[
        { id: 'platforms', label: 'By platform' }, { id: 'compare' as 'platforms', label: 'Compare' }, { id: 'import' as 'platforms', label: 'Import / export' },
        { id: 'experiments' as 'platforms', label: 'Experiments' }, { id: 'reviews' as 'platforms', label: 'Reviews' }, { id: 'setup' as 'platforms', label: 'Integrations' },
      ]} />

      {cur === 'platforms' && (withResults.length === 0 ? (
        <Empty title="No performance data recorded yet">Nothing is shown until real results exist. After publishing, enter numbers on the post’s Results tab, or import a CSV here. No account is connected, so nothing is fetched automatically.</Empty>
      ) : (
        <div className="stack" style={{ gap: 24 }}>
          {(['instagram', 'linkedin', 'facebook', 'yt-long', 'yt-short'] as const).map((k) => {
            const list = withResults.filter((p) => (k === 'yt-long' ? p.format === 'yt-long' : k === 'yt-short' ? p.format === 'yt-short' : p.platform === k));
            const defs = METRICS[k];
            return (
              <section key={k}>
                <h3 style={{ marginBottom: 10 }}>{k === 'yt-long' ? 'YouTube — long-form' : k === 'yt-short' ? 'YouTube — Shorts' : PLATFORM_LABEL[k]}</h3>
                {list.length === 0 ? <div className="small muted">No results recorded.</div> : (
                  <div className="table-wrap"><table className="t">
                    <thead><tr><th>Post</th><th>Format</th>{defs.map((d) => <th key={d.key}>{d.label}</th>)}</tr></thead>
                    <tbody>{list.map((p) => { const m = p.results![p.results!.length - 1].metrics; return (
                      <tr key={p.id}><td><Link to={`/post/${p.id}?tab=results`}>{p.title}</Link><div className="list-meta">{p.date}</div></td><td className="small">{FORMAT_LABEL[p.format]}</td>{defs.map((d) => <td key={d.key}>{m[d.key] ?? '—'}</td>)}</tr>
                    ); })}</tbody>
                  </table></div>
                )}
              </section>
            );
          })}
        </div>
      ))}

      {cur === 'compare' && <Compare posts={withResults} />}
      {cur === 'import' && <ImportExport posts={posts ?? []} />}
      {cur === 'experiments' && (
        <div className="stack">
          <p className="lede" style={{ marginTop: 0 }}>Hypotheses live in Strategy & Research so they’re searchable and editable. Decide each one at a review using your own data.</p>
          <div className="table-wrap"><table className="t"><thead><tr><th>Hypothesis</th><th>Test & decision rule</th></tr></thead>
            <tbody>{research.map((r) => <tr key={r.id}><td className="list-title" style={{ minWidth: 240 }}><Link to={`/strategy?open=${r.id}`}>{r.title}</Link></td><td className="wrap small">{r.body}</td></tr>)}</tbody></table></div>
          <div className="panel panel-pad small"><h4>Diagnostic hypotheses (not automatic conclusions)</h4><ul className="prose">
            <li>Impressions but weak clicks (YouTube) → check whether title and thumbnail match what the viewer wanted.</li>
            <li>Clicks but early exits → compare the first 30 seconds with the promise in the title.</li>
            <li>Relevant viewers but few enquiries → review the CTA and the path to the contact page.</li>
            <li>A topic attracts qualified owners → consider a series.</li>
            <li>High views but followers are designers → the hook may be peer-oriented; reframe around a business consequence.</li>
          </ul><p className="muted">Compare with your own previous posts of the same format and objective — not with other accounts.</p></div>
        </div>
      )}
      {cur === 'reviews' && <Reviews openNew={newReview as Review['period'] | null} clearNew={() => setNewReview(null)} />}
      {cur === 'setup' && (
        <div className="stack">
          <div className="notice"><strong>Not connected.</strong> Growth HQ does not fetch analytics automatically. Use manual entry or CSV import.</div>
          <div className="table-wrap"><table className="t"><thead><tr><th>Platform</th><th>Official API</th><th>What it would take</th><th>Privacy</th></tr></thead><tbody>
            <tr><td>Instagram / Facebook</td><td>Instagram Graph API / Meta Graph API</td><td className="wrap small">Meta developer app, Business verification, app review for insights permissions, a server to store tokens securely.</td><td className="wrap small">Tokens grant access to account data; never put them in this front-end.</td></tr>
            <tr><td>LinkedIn</td><td>Community Management API</td><td className="wrap small">Vetted access approval from LinkedIn for organisation analytics; personal post analytics are limited.</td><td className="wrap small">Same — server-side only.</td></tr>
            <tr><td>YouTube</td><td>YouTube Analytics API</td><td className="wrap small">Google Cloud project, OAuth consent screen, server or secure backend for refresh tokens.</td><td className="wrap small">Read-only scopes; store refresh tokens encrypted.</td></tr>
          </tbody></table></div>
          <p className="small muted">Practical path: export CSVs from Meta Business Suite, LinkedIn and YouTube Studio monthly and import them here (Import / export tab).</p>
        </div>
      )}
    </div>
  );
}

function Compare({ posts }: { posts: Post[] }) {
  const [by, setBy] = useState<'pillar' | 'format' | 'audience' | 'campaignId' | 'effort' | 'objective'>('pillar');
  const [platform, setPlatform] = useState<'instagram' | 'linkedin' | 'facebook' | 'youtube'>('instagram');
  const list = posts.filter((p) => p.platform === platform);
  const defs = platform === 'youtube' ? METRICS['yt-long'] : METRICS[platform];
  const groups = useMemo(() => {
    const g: Record<string, Post[]> = {};
    for (const p of list) (g[(p[by] as string) ?? '—'] ??= []).push(p);
    return g;
  }, [list, by]);
  if (!posts.length) return <Empty title="Nothing to compare yet">Comparisons appear when at least one post has recorded results.</Empty>;
  return (
    <div className="stack">
      <div className="filters">
        <select className="select" value={platform} onChange={(e) => setPlatform(e.target.value as typeof platform)} aria-label="Platform">{(['instagram', 'linkedin', 'facebook', 'youtube'] as const).map((p) => <option key={p} value={p}>{PLATFORM_LABEL[p]}</option>)}</select>
        <select className="select" value={by} onChange={(e) => setBy(e.target.value as typeof by)} aria-label="Group by"><option value="pillar">Content pillar</option><option value="format">Format</option><option value="audience">Audience</option><option value="campaignId">Campaign</option><option value="effort">Production effort</option><option value="objective">Objective</option></select>
      </div>
      <p className="small muted">Averages of the latest recorded result per post, within one platform only. Small samples are noisy — treat differences as hints until you have 5+ posts per group.</p>
      <div className="table-wrap"><table className="t">
        <thead><tr><th>{by}</th><th>Posts</th>{defs.map((d) => <th key={d.key}>Avg {d.label}</th>)}</tr></thead>
        <tbody>{Object.entries(groups).map(([k, ps]) => (
          <tr key={k}><td className="list-title">{by === 'format' ? FORMAT_LABEL[k as Post['format']] ?? k : k}</td><td>{ps.length}</td>
            {defs.map((d) => { const vals = ps.map((p) => p.results![p.results!.length - 1].metrics[d.key]).filter((v) => v != null); return <td key={d.key}>{vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : '—'}</td>; })}</tr>
        ))}</tbody>
      </table></div>
    </div>
  );
}

function ImportExport({ posts }: { posts: Post[] }) {
  const toast = useToast();
  const [preview, setPreview] = useState<{ rows: Record<string, string>[]; matched: number } | null>(null);
  const allKeys = [...new Set(Object.values(METRICS).flat().map((d) => d.key))];
  const template = () => {
    const rows = posts.filter((p) => ['Published', 'Analysed'].includes(p.status) || p.publishedUrl).map((p) => ({ post_id: p.id, title: p.title, platform: p.platform, format: p.format, date_checked: today() }));
    const cols = ['post_id', 'title', 'platform', 'format', 'date_checked', ...allKeys];
    downloadBlob(new Blob([toCSV(rows.length ? rows : [{ post_id: posts[0]?.id ?? '', title: posts[0]?.title ?? '', platform: posts[0]?.platform ?? '', format: posts[0]?.format ?? '', date_checked: today() }], cols)], { type: 'text/csv' }), 'growth-hq-results-template.csv');
  };
  const exportAll = () => {
    const rows = posts.flatMap((p) => (p.results ?? []).map((r) => ({ post_id: p.id, title: p.title, platform: p.platform, format: p.format, date_checked: r.date, ...r.metrics })));
    downloadBlob(new Blob([toCSV(rows, ['post_id', 'title', 'platform', 'format', 'date_checked', ...allKeys])], { type: 'text/csv' }), `growth-hq-results-${today()}.csv`);
  };
  const read = async (file: File) => {
    const rows = parseCSV(await file.text());
    if (!rows.length || !('post_id' in rows[0])) { toast('CSV needs a post_id column — download the template first.', 'error'); return; }
    const ids = new Set(posts.map((p) => p.id));
    setPreview({ rows, matched: rows.filter((r) => ids.has(r.post_id)).length });
  };
  const apply = async () => {
    if (!preview) return;
    let n = 0;
    for (const r of preview.rows) {
      const p = await db.posts.get(r.post_id);
      if (!p) continue;
      const defs = metricsFor(p.platform, p.format);
      const metrics: Record<string, number> = {};
      for (const d of defs) if (r[d.key] !== undefined && r[d.key] !== '' && !isNaN(Number(r[d.key]))) metrics[d.key] = Number(r[d.key]);
      if (!Object.keys(metrics).length) continue;
      await db.posts.update(p.id, { results: [...(p.results ?? []), { id: uid('res'), date: r.date_checked || today(), source: 'csv', metrics }], updatedAt: now() });
      n++;
    }
    toast(`Imported results for ${n} post(s)`); setPreview(null);
  };
  return (
    <div className="stack">
      <div className="row">
        <button className="btn" onClick={template}><Download />Download results template (CSV)</button>
        <label className="btn primary"><Upload />Import results CSV<input type="file" accept=".csv,text/csv" hidden onChange={(e) => e.target.files?.[0] && read(e.target.files[0])} /></label>
        <button className="btn" onClick={exportAll}><Download />Export all results</button>
      </div>
      <ol className="prose small"><li>Download the template — it lists your published posts with their IDs.</li><li>Fill in the numbers from each platform’s analytics (leave unknown cells blank).</li><li>Import. You’ll see a preview before anything is saved. Only metrics that belong to the post’s platform are stored.</li></ol>
      {preview && (
        <Modal title="Import preview" onClose={() => setPreview(null)} footer={<><button className="btn" onClick={() => setPreview(null)}>Cancel</button><button className="btn primary" disabled={!preview.matched} onClick={apply}>Import {preview.matched} row(s)</button></>}>
          <p>{preview.rows.length} rows read · {preview.matched} match existing posts · {preview.rows.length - preview.matched} will be skipped.</p>
        </Modal>
      )}
    </div>
  );
}

function Reviews({ openNew, clearNew }: { openNew: Review['period'] | null; clearNew: () => void }) {
  const reviews = useLiveQuery(() => db.reviews.orderBy('start').reverse().toArray()) ?? [];
  const [edit, setEdit] = useState<Review | null>(null);
  const toast = useToast();
  const start = (period: Review['period']) => {
    const days = period === 'Weekly' ? 7 : period === 'Monthly' || period === '30-day' ? 30 : period === '60-day' ? 60 : 90;
    setEdit({ id: uid('rev'), period, start: daysFromNow(-days), end: today(), answers: {}, createdAt: now(), updatedAt: now() });
  };
  useEffect(() => { if (openNew && QUESTIONS[openNew]) { start(openNew); clearNew(); } }, [openNew]); // eslint-disable-line react-hooks/exhaustive-deps
  const posts = useLiveQuery(() => db.posts.toArray()) ?? [];
  const leads = useLiveQuery(() => db.leads.toArray()) ?? [];
  const inRange = (r: Review) => ({
    published: posts.filter((p) => p.date && p.date >= r.start && p.date <= r.end && ['Published', 'Analysed'].includes(p.status)),
    withResults: posts.filter((p) => p.results?.some((x) => x.date >= r.start && x.date <= r.end)),
    leads: leads.filter((l) => (l.discovered ?? '') >= r.start && (l.discovered ?? '') <= r.end),
  });
  return (
    <div className="stack">
      <div className="row">{(Object.keys(QUESTIONS) as Review['period'][]).map((p) => <button key={p} className="btn" onClick={() => start(p)}><Plus />{p} review</button>)}</div>
      {reviews.length === 0 ? <Empty title="No reviews yet">Weekly reviews are scheduled in the calendar every Sunday of the launch plan.</Empty> : (
        <div className="panel"><div className="list">{reviews.map((r) => <div key={r.id} className="list-item click" onClick={() => setEdit(r)}><div className="grow"><div className="list-title">{r.period} review</div><div className="list-meta">{r.start} → {r.end} · {Object.values(r.answers).filter(Boolean).length} answers</div></div></div>)}</div></div>
      )}
      {edit && (() => { const s = inRange(edit); return (
        <Modal wide title={`${edit.period} review`} onClose={() => setEdit(null)} footer={<><button className="btn danger" onClick={async () => { await db.reviews.delete(edit.id); setEdit(null); }}>Delete</button><div className="grow" /><button className="btn primary" onClick={async () => { await db.reviews.put({ ...edit, updatedAt: now() }); toast('Review saved'); setEdit(null); }}>Save review</button></>}>
          <div className="grid-form" style={{ marginBottom: 14 }}>
            <Field label="From"><input type="date" className="input" value={edit.start} onChange={(e) => setEdit({ ...edit, start: e.target.value })} /></Field>
            <Field label="To"><input type="date" className="input" value={edit.end} onChange={(e) => setEdit({ ...edit, end: e.target.value })} /></Field>
          </div>
          <div className="notice info small" style={{ marginBottom: 14 }}>In this period: {s.published.length} published post(s), {s.withResults.length} with results recorded, {s.leads.length} new lead(s). {s.withResults.length === 0 && 'No results recorded — answer from what you observed, and record numbers on posts first if you can.'}</div>
          <div className="stack">{QUESTIONS[edit.period].map((q) => <Field key={q} label={q}><textarea className="textarea" value={edit.answers[q] ?? ''} onChange={(e) => setEdit({ ...edit, answers: { ...edit.answers, [q]: e.target.value } })} /></Field>)}</div>
          <p className="small muted" style={{ marginTop: 10 }}>Pillars for reference: {PILLARS.join(' · ')}</p>
        </Modal>
      ); })()}
    </div>
  );
}
