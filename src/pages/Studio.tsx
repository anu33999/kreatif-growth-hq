import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link, useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { db } from '../lib/db';
import type { Format, Platform } from '../lib/types';
import { FORMAT_LABEL, FORMAT_PLATFORM } from '../lib/types';
import { PLATFORMS } from '../content/platforms';
import { MESSAGE_TEMPLATES, PAID_OPTIONS } from '../content/templates';
import { CreatePostModal, PostFilterBar, PostTable, emptyFilters, usePostFilter, useParam } from '../components/common';
import GuideMode from '../components/GuideMode';
import { CopyBlock, Empty, Ext, PageHead, Prose, Tabs } from '../components/ui';

type P = 'instagram' | 'linkedin' | 'facebook' | 'youtube';

const REEL_STEPS = [
  ['Choose the objective', 'Concept tab → pick one objective; the recommended format and reason appear.'],
  ['Develop the concept', 'Three hooks, recommended hook, audience problem, desired response, why it holds attention, distinctiveness, risks.'],
  ['Write the exact script', 'Script & scenes tab: every scene with timestamp, duration, visuals, exact words, on-screen text, camera, transition, sound, assets. Optional alternative version.'],
  ['Create the shot list', 'Shot list tab: build from scenes, then specify angle, method, background, length, on-camera and narration.'],
  ['Create all visual assets', 'Assets tab: link or create each asset with its creation method; Creative & Image Studio for prompts and photo briefs.'],
  ['AI-video workflow', 'AI video tab: per-shot prompts, negative prompts, settings, continuity, evaluation; 16-step workflow; tool table; no-AI alternatives.'],
  ['Voiceover and narration', 'Voiceover tab: full narration, pace, phone recording, noise, AI voice options, timing, pronunciation, subtitles, licensed music.'],
  ['Edit the Reel', 'Edit tab: numbered steps in Instagram Edits (CapCut is blocked in India), cover and export.'],
  ['Final publishing package', 'Publish tab: cover headline, caption, CTA, keywords, hashtags, alt text, time, Story sequence, next idea, metrics.'],
  ['Production completion', 'Checklist tab: status can’t reach Ready to Publish until required items are ticked.'],
];

export default function Studio() {
  const { platform } = useParams();
  const pl = (platform ?? 'instagram') as P;
  const g = PLATFORMS[pl];
  const [tab, setTab] = useParam('tab');
  const [create, setCreate] = useState<Format | null>(null);
  const [f, setF] = useState(emptyFilters(pl));
  const posts = useLiveQuery(() => db.posts.where('platform').equals(pl).filter((p) => p.workspace === 'agency').toArray(), [pl]);
  const campaigns = useLiveQuery(() => db.campaigns.toArray()) ?? [];
  const filtered = usePostFilter(posts, { ...f, platform: pl });
  const [guidePost, setGuidePost] = useParam('post');
  const gp = useLiveQuery(() => (guidePost ? db.posts.get(guidePost) : undefined), [guidePost]);

  if (!g) return <Empty title="Unknown platform" />;
  const formats = (Object.keys(FORMAT_LABEL) as Format[]).filter((x) => FORMAT_PLATFORM[x] === (pl as Platform));
  const tabs = [
    { id: 'content', label: 'Content' }, { id: 'guide', label: '★ Guide me step by step' }, { id: 'workflow', label: 'Formats & workflow' },
    { id: 'strategy', label: 'Strategy & research' }, { id: 'profile', label: 'Profile & setup' }, { id: 'specs', label: 'Specs & sources' },
    { id: 'leads', label: 'Lead pathway' }, ...(pl === 'youtube' ? [{ id: 'thumbs', label: 'Thumbnails & titles' }] : []),
  ];
  const cur = (tabs.find((t) => t.id === tab)?.id ?? 'content');

  return (
    <div>
      <PageHead eyebrow="Produce" area="prod" title={`${g.name} Studio`} lede={g.role}
        actions={<div className="row">{formats.map((x) => <button key={x} className="btn sm" onClick={() => setCreate(x)}><Plus />{FORMAT_LABEL[x].replace(g.name + ' ', '')}</button>)}</div>} />
      <Tabs tabs={tabs} value={cur} onChange={(t) => setTab(t === 'content' ? null : t)} />

      {cur === 'content' && (
        <>
          <PostFilterBar f={{ ...f, platform: pl }} set={setF} campaigns={campaigns} platformFixed />
          <PostTable posts={filtered} showPlatform={false} empty={<Empty title={`No ${g.name} content matches`} action={<button className="btn" onClick={() => setCreate(formats[0])}>Create {FORMAT_LABEL[formats[0]]}</button>}>Adapt a master idea from the Content Library, or create one directly.</Empty>} />
          {g.accounts && <div className="cols-2" style={{ marginTop: 18 }}>{g.accounts.map((a) => <div key={a.name} className="panel panel-pad"><h4>{a.name}</h4><p className="small muted" style={{ margin: 0 }}>{a.use}</p></div>)}</div>}
        </>
      )}

      {cur === 'guide' && (
        <div className="stack">
          <div className="row">
            <select className="select" style={{ maxWidth: 520 }} value={guidePost ?? ''} onChange={(e) => setGuidePost(e.target.value || null)} aria-label="Choose a post to produce">
              <option value="">Choose one {g.name} post to produce…</option>
              {(posts ?? []).filter((p) => !['Published', 'Analysed', 'Archived'].includes(p.status)).sort((a, b) => (a.date ?? '9').localeCompare(b.date ?? '9')).map((p) => <option key={p.id} value={p.id}>{p.date ?? 'undated'} · {FORMAT_LABEL[p.format].replace(g.name + ' ', '')} · {p.title}</option>)}
            </select>
            {gp && <Link to={'/post/' + gp.id} className="small">Open full post workspace</Link>}
          </div>
          {gp ? <GuideMode post={gp} /> : <Empty title="Guide me step by step">Choose a post above. The guide explains each step in plain language, shows the exact text or prompt to copy, links the tool, gives settings and a way to judge the result, and remembers your progress.</Empty>}
        </div>
      )}

      {cur === 'workflow' && (
        <div className="stack" style={{ gap: 18 }}>
          <div className="table-wrap"><table className="t">
            <thead><tr><th>Format</th><th>When to use it</th><th>Cadence (one person)</th></tr></thead>
            <tbody>{g.formats.map((x) => <tr key={x.format}><td className="list-title">{FORMAT_LABEL[x.format]}</td><td className="wrap">{x.when}</td><td>{x.cadence}</td></tr>)}</tbody>
          </table></div>
          {(pl === 'instagram' || pl === 'facebook' || pl === 'youtube' || pl === 'linkedin') && (
            <div className="panel">
              <div className="panel-head"><h3>Video production workflow (every Reel, Short and video post)</h3></div>
              <div className="steps" style={{ border: 0 }}>
                {REEL_STEPS.map(([t, d], i) => <div className="step" key={t}><div className="step-n">{i + 1}</div><div className="step-b"><h4>{t}</h4><div className="small muted">{d}</div></div></div>)}
              </div>
            </div>
          )}
          {pl === 'facebook' && (
            <>
              <details className="disc"><summary>Community participation without spam</summary><div className="disc-body"><Prose text={`- Join 3–5 groups where your buyers ask questions (e.g. restaurant owners, small business owners in a city). Read the rules first.\n- Spend 15 minutes, twice a week, answering questions fully in the comments. No links unless rules and the person allow it.\n- Never paste the same reply in multiple groups.\n- If someone asks for help directly, move to Messenger with permission.\n- Log any resulting conversation as a lead with source “Facebook group: [name]”.`} /></div></details>
              <details className="disc"><summary>{PAID_OPTIONS.title}</summary><div className="disc-body"><Prose text={PAID_OPTIONS.body} /></div></details>
              <details className="disc"><summary>Multi-image posts vs Instagram carousels</summary><div className="disc-body"><Prose text={`Facebook shows multi-image posts as a collage; people may open any image first. So:\n- Image 1 must carry the whole message on its own (headline + before/after).\n- Each later image should be understandable alone (label it “Fix 2 — …”).\n- Use 3–5 images, not 10.\n- On Instagram, slides are swiped in order, so you can build tension and reveal.`} /></div></details>
            </>
          )}
          {pl === 'linkedin' && (
            <details className="disc"><summary>Newsletter decision</summary><div className="disc-body"><Prose text={`Optional. Start only if you can publish monthly for six months. Name options: “The Second Look”, “Fix First”, “Clarity Notes”. Positioning: practical website and marketing decisions for owners and marketing leads. First six issues: Redesign or repair · What to track · The 5-second test in depth · Forms that convert · Working across time zones · Donation pages vs checkouts. Draft of issue 1 is in the calendar (20 Nov). Eligibility rules for newsletters could not be confirmed — check LinkedIn Help before planning.`} /></div></details>
          )}
          {pl === 'youtube' && (
            <details className="disc"><summary>Shorts vs long-form — two programmes</summary><div className="disc-body"><Prose text={`**Shorts** (2/week): one specific fix in 20–50 s, re-edited from Reels footage with a YouTube-specific title, and a related-video link to the long-form audit.\n\n**Long-form** (2/month to start): audits and tutorials that answer a searchable question, 8–15 minutes, chapters, three packaging concepts.\n\nDon’t assume Shorts viewers watch long-form. Measure separately (Analytics separates Shorts and long-form metrics).`} /></div></details>
          )}
        </div>
      )}

      {cur === 'strategy' && (
        <div className="cols-2">
          <div className="stack">
            <div className="panel panel-pad"><h4>Audience</h4><p className="prose">{g.audience}</p></div>
            <div className="panel panel-pad"><h4>Content that suits {g.name}</h4><ul className="prose">{g.suits.map((x) => <li key={x}>{x}</li>)}</ul><h4>Avoid</h4><ul className="prose">{g.avoid.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="panel panel-pad"><h4>Competitors & adjacent creators</h4><p className="prose">{g.adjacent}</p></div>
            <div className="panel panel-pad"><h4>Opportunities for Kreatif Atelier</h4><ul className="prose">{g.opportunities.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
          <div className="stack">
            <div className="panel panel-pad"><h4>Limits of organic reach</h4><p className="prose">{g.reachLimits}</p></div>
            <div className="panel panel-pad"><h4>How platform features shape production</h4><ul className="prose">{g.featureInfluence.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="panel panel-pad"><h4>Editorial rules</h4><ol className="prose">{g.editorialRules.map((x) => <li key={x}>{x}</li>)}</ol></div>
            <div className="panel panel-pad"><h4>Measures of success</h4><table className="t"><tbody>{g.metrics.map((m) => <tr key={m.metric}><td className="list-title">{m.metric}</td><td className="small muted">{m.why}</td></tr>)}</tbody></table></div>
            <div className="notice info">Facts vs recommendations: specs and limits are labelled with confidence in “Specs & sources”. Audience, rules and opportunities are strategic recommendations to test, not guarantees.</div>
          </div>
        </div>
      )}

      {cur === 'profile' && (
        <div className="stack">
          <p className="lede" style={{ marginTop: 0 }}>Copy each field into {g.name}. Social proof uses only verifiable facts (locations from your website, the 206-service architecture, cleared work) — no follower counts or invented results.</p>
          <div className="cols-2">{g.profile.map((x) => <CopyBlock key={x.label} label={x.label} text={x.text} />)}</div>
          {pl === 'linkedin' && (
            <div className="stack" style={{ marginTop: 10 }}>
              <h3>LinkedIn message & comment templates</h3>
              <p className="small muted">Personalise every one. No bulk connection requests or automated messages.</p>
              <div className="cols-2">{MESSAGE_TEMPLATES.filter((m) => m.channel.includes('LinkedIn')).map((m) => <div key={m.id}><CopyBlock label={m.situation} text={m.text} />{m.note && <div className="small muted" style={{ marginTop: 4 }}>{m.note}</div>}</div>)}</div>
            </div>
          )}
          {pl === 'facebook' && <div className="cols-2">{MESSAGE_TEMPLATES.filter((m) => m.channel.includes('Facebook')).map((m) => <CopyBlock key={m.id} label={m.situation} text={m.text} />)}</div>}
        </div>
      )}

      {cur === 'specs' && (
        <div className="stack">
          <div className="table-wrap"><table className="t">
            <thead><tr><th>Item</th><th>Value</th><th>Confidence</th><th>Source</th></tr></thead>
            <tbody>{g.specs.map((s) => <tr key={s.item}><td className="list-title">{s.item}</td><td className="wrap">{s.value}</td><td><span className={`tag ${s.confidence === 'High' ? 'ok' : s.confidence === 'Medium' ? 'warn' : 'danger'}`}>{s.confidence}</span></td><td className="small">{s.source.startsWith('http') ? <Ext href={s.source} /> : s.source}</td></tr>)}</tbody>
          </table></div>
          <div className="small muted">Checked 2026-10-28. Official starting points: {g.official.map((o, i) => <span key={o.url}>{i ? ' · ' : ''}<Ext href={o.url}>{o.title}</Ext></span>)}</div>
        </div>
      )}

      {cur === 'leads' && (
        <div className="cols-2">
          <div className="panel"><div className="panel-head"><h3>From content to conversation</h3></div>
            <div className="steps" style={{ border: 0 }}>{g.leadPath.map((s, i) => <div className="step" key={s}><div className="step-n">{i + 1}</div><div className="step-b">{s}</div></div>)}</div>
          </div>
          <div className="stack">
            <div className="notice">Record every enquiry in the Lead Generation Centre with platform = {g.name}, the source post, and attribution confidence. A high-view post is not proof it produced sales.</div>
            <Link className="btn" to="/leads">Open Lead Generation Centre</Link>
          </div>
        </div>
      )}

      {cur === 'thumbs' && <ThumbStudio />}
      {create && <CreatePostModal format={create} platform={pl} onClose={() => setCreate(null)} />}
    </div>
  );
}

function ThumbStudio() {
  const longs = useLiveQuery(() => db.posts.where('format').equals('yt-long').toArray()) ?? [];
  return (
    <div className="stack">
      <p className="lede" style={{ marginTop: 0 }}>Each long-form video gets three genuinely different packaging concepts (Publish tab of the video). Test & Compare is available for long-form only, on eligible channels; it isn’t available for Shorts.</p>
      {longs.length === 0 && <Empty title="No long-form videos yet" />}
      {longs.map((p) => (
        <div key={p.id} className="panel">
          <div className="panel-head"><h3>{p.publishing?.title ?? p.title}</h3><Link to={`/post/${p.id}?tab=publish`} className="small">Edit packaging</Link></div>
          <div className="panel-pad cols-3">
            {(p.thumbnails ?? []).length === 0 && <div className="muted small">No concepts yet.</div>}
            {(p.thumbnails ?? []).map((t) => (
              <div key={t.name} className="stack small">
                <div className="preview-frame wide"><span className="tag gold" style={{ alignSelf: 'flex-start' }}>{t.name}</span><div className="pf-hook" style={{ fontSize: 26 }}>{t.text && t.text !== '—' ? t.text.replace(/[“”"]/g, '') : t.subject}</div><div className="small muted">{t.composition}</div></div>
                <div><strong>Viewer:</strong> {t.viewer}</div><div><strong>Emotion:</strong> {t.emotion}</div><div><strong>Honesty check:</strong> {t.honesty}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
