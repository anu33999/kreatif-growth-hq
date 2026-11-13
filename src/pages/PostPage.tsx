import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Archive, ArrowLeft, Copy, Lightbulb, ListPlus, Plus, Sparkles, Trash2 } from 'lucide-react';
import { db, deletePostCascade, duplicatePost, now, today, uid, daysFromNow } from '../lib/db';
import type { AIShot, Asset, Objective, Post, Scene, Shot, Slide, Status, ThumbConcept } from '../lib/types';
import { AUDIENCES, FORMAT_LABEL, PILLARS, PLATFORM_LABEL, SLIDE_FORMATS, STATUSES, VIDEO_FORMATS } from '../lib/types';
import {
  OBJECTIVE_ADVICE, blankAIShot, blankScene2, blankShot, blankSlide, checklistFor, defaultEditGuide, newPostFrom, productionChecks,
  productionReady, progressOf, publishReady, shotsFromScenes, PUBLISH_CHECKS,
} from '../lib/workflow';
import { metricsFor } from '../lib/metrics';
import { AI_VIDEO_TOOLS, NO_AI_ALTERNATIVES } from '../content/tools';
import { useParam } from '../components/common';
import GuideMode from '../components/GuideMode';
import { AI_VIDEO_WORKFLOW, ToolTable } from '../components/ToolTable';
import { CopyBlock, EditableTable, Empty, Field, PageHead, PlatformTag, Progress, SampleTag, StatusTag, Tabs, useToast, type Col } from '../components/ui';
import { SAFEGUARDING } from '../seed/ngo';

type TabId = 'brief' | 'concept' | 'script' | 'slides' | 'shots' | 'assets' | 'ai' | 'voice' | 'edit' | 'publish' | 'checklist' | 'guide' | 'results';

const SCENE_COLS: Col<Scene>[] = [
  { key: 'n', label: '#', width: 40 }, { key: 'time', label: 'Time', width: 70 }, { key: 'duration', label: 'Dur.', width: 60 },
  { key: 'visual', label: 'Viewer sees', multiline: true, width: 200 }, { key: 'voice', label: 'Spoken words / VO', multiline: true, width: 220 },
  { key: 'onScreen', label: 'On-screen text', multiline: true }, { key: 'camera', label: 'Camera / source', multiline: true },
  { key: 'transition', label: 'Transition' }, { key: 'sound', label: 'Sound' }, { key: 'assets', label: 'Assets' },
];
const SHOT_COLS: Col<Shot>[] = [
  { key: 'n', label: '#', width: 40 }, { key: 'film', label: 'What to film', multiline: true, width: 200 }, { key: 'visible', label: 'What is visible', multiline: true },
  { key: 'angle', label: 'Camera angle', multiline: true }, { key: 'method', label: 'Method' }, { key: 'background', label: 'Background & light', multiline: true },
  { key: 'length', label: 'Length' }, { key: 'onCamera', label: 'You on camera?' }, { key: 'narration', label: 'Narration?' }, { key: 'purpose', label: 'Role in story', multiline: true },
];
const SLIDE_COLS: Col<Slide>[] = [
  { key: 'n', label: '#', width: 40 }, { key: 'text', label: 'Exact text', multiline: true, width: 300 }, { key: 'layout', label: 'Layout', multiline: true, width: 220 }, { key: 'visual', label: 'Visual / sticker', multiline: true, width: 200 },
];

export default function PostPage() {
  const { id } = useParams();
  const loc = useLocation();
  const nav = useNavigate();
  const toast = useToast();
  const isNgoRoute = loc.pathname.startsWith('/ngo');
  const stored = useLiveQuery(() => db.posts.get(id!), [id]);
  const [p, setP] = useState<Post | null>(null);
  const [saved, setSaved] = useState(true);
  const [tab, setTab] = useParam('tab');
  const timer = useRef<number | undefined>(undefined);
  const lastId = useRef<string | undefined>(undefined);

  // Load into local draft; keep in sync with external updates (guide progress, checklist) when not mid-edit.
  useEffect(() => {
    if (!stored) return;
    if (lastId.current !== stored.id || saved) { setP(stored); lastId.current = stored.id; }
  }, [stored]); // eslint-disable-line react-hooks/exhaustive-deps

  const latest = useRef<Post | null>(null);
  const update = (patch: Partial<Post> | ((cur: Post) => Partial<Post>)) => {
    setP((cur) => {
      if (!cur) return cur;
      const next = { ...cur, ...(typeof patch === 'function' ? patch(cur) : patch), updatedAt: now() };
      latest.current = next;
      setSaved(false);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(async () => {
        await db.posts.put(next);
        // Only mark saved if no newer edit arrived while writing; otherwise a stale DB read could overwrite it.
        if (latest.current === next) setSaved(true);
      }, 500);
      return next;
    });
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (stored === undefined) return <div className="muted">Loading…</div>;
  if (!stored || !p) return <Empty title="Post not found" action={<Link to="/calendar">Back to calendar</Link>}>It may have been deleted.</Empty>;

  const isVideo = VIDEO_FORMATS.includes(p.format);
  const isSlides = SLIDE_FORMATS.includes(p.format);
  const hasBody = !isVideo && !isSlides || p.format === 'li-document' || p.format === 'fb-multi-image' || p.format === 'yt-long';
  const tabs: { id: TabId; label: string }[] = [
    { id: 'brief', label: 'Brief & links' }, { id: 'concept', label: 'Objective & concept' },
    ...(isVideo || hasBody ? [{ id: 'script' as TabId, label: isVideo ? 'Script & scenes' : 'Copy' }] : []),
    ...(isSlides ? [{ id: 'slides' as TabId, label: p.format.endsWith('story') ? 'Story frames' : 'Slides / pages' }] : []),
    ...(isVideo ? [{ id: 'shots' as TabId, label: 'Shot list' }] : []),
    { id: 'assets', label: 'Assets' },
    ...(isVideo || (p.aiShots?.length ?? 0) > 0 ? [{ id: 'ai' as TabId, label: 'AI video' }] : []),
    ...(isVideo ? [{ id: 'voice' as TabId, label: 'Voiceover' }, { id: 'edit' as TabId, label: 'Edit' }] : []),
    { id: 'publish', label: 'Publish' }, { id: 'checklist', label: 'Checklist' }, { id: 'guide', label: '★ Guide me step by step' }, { id: 'results', label: 'Results' },
  ];
  const current = (tabs.find((t) => t.id === tab)?.id ?? 'brief') as TabId;
  const isNgo = p.workspace === 'ngo' || isNgoRoute;
  const base = isNgo ? '/ngo/post/' : '/post/';

  const setStatus = async (s: Status) => {
    const late: Status[] = ['Ready to Publish', 'Published', 'Analysed'];
    if (late.includes(s)) {
      const r = productionReady(p);
      if (!r.ok) { toast(`Production not complete: ${r.missing.map((m) => m.label).slice(0, 2).join('; ')}${r.missing.length > 2 ? '…' : ''}`, 'error'); setTab('checklist'); return; }
    }
    if (s === 'Published' || s === 'Analysed') {
      const r = publishReady(p);
      if (!r.ok) { toast(`Publishing checklist incomplete: ${r.missing[0].label}`, 'error'); setTab('checklist'); return; }
    }
    if (s === 'Published' && p.status !== 'Published') {
      const due = daysFromNow(7);
      await db.tasks.put({ id: `task_rev_${p.id}`, title: `Record results: ${p.title}`, due, done: false, kind: 'Review', postId: p.id, createdAt: now() });
      toast('Published — results review task added for 7 days from now');
    }
    update({ status: s });
  };

  const archive = () => setStatus(p.status === 'Archived' ? 'Planned' : 'Archived');
  const dup = async () => { const nid = await duplicatePost(p.id); toast('Duplicated'); nav(base + nid); };
  const del = async () => { if (!confirm(`Delete “${p.title}”? This cannot be undone (back up first if unsure).`)) return; await deletePostCascade(p.id); nav(isNgo ? '/ngo?tab=content' : '/calendar'); };
  const storyFromPost = async () => {
    const s = newPostFrom('ig-story', undefined, {
      workspace: p.workspace, masterId: p.masterId, campaignId: p.campaignId, title: `Story: promote “${p.title}”`, audience: p.audience, objective: 'Enquiries',
      slides: [
        { n: 1, text: `New: ${p.hook ?? p.title}`, layout: 'Share the post to Story (paper-plane → Add to story)', visual: 'Link sticker to the post' },
        { n: 2, text: 'Quick question for you…', layout: 'Charcoal text card', visual: 'Poll sticker related to the topic' },
        { n: 3, text: p.cta ?? 'DM me if you want me to look at yours.', layout: 'Cream card', visual: 'Question sticker' },
      ],
    });
    await db.posts.add(s); toast('Story sequence created from this post'); nav(base + s.id);
  };
  const followUp = async () => {
    const id2 = uid('idea');
    await db.masters.add({ id: id2, workspace: p.workspace, title: `Follow-up: ${p.title}`, idea: `Follow-up to a post that performed well. What resonated: ${p.observations || '[write what the results showed]'}`,
      audience: p.audience, pillar: p.pillar, campaignId: p.campaignId, status: 'Idea', tags: [`followup:${p.id}`], nextAction: 'Choose formats in the adaptation engine', createdAt: now(), updatedAt: now() });
    toast('Follow-up idea created'); nav((isNgo ? '/ngo/idea/' : '/idea/') + id2);
  };

  return (
    <div>
      <Link to={isNgo ? '/ngo?tab=content' : `/studio/${p.platform}`} className="small row" style={{ gap: 4, marginBottom: 10 }}><ArrowLeft size={14} />{isNgo ? 'NGO content studio' : `${PLATFORM_LABEL[p.platform]} Studio`}</Link>
      <PageHead eyebrow={`${FORMAT_LABEL[p.format]}${p.account ? ' · ' + p.account : ''}`} area={isNgo ? 'ngo' : 'prod'} title={p.title}
        lede={<span className="row"><PlatformTag platform={p.platform} /><StatusTag status={p.status} />{p.sample && <SampleTag />}<span className="small muted">{saved ? 'All changes saved' : 'Saving…'}</span></span>}
        actions={<>
          <select className="select" style={{ width: 'auto' }} value={p.status} onChange={(e) => setStatus(e.target.value as Status)} aria-label="Status">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          <button className="btn" onClick={dup}><Copy />Duplicate</button>
          <button className="btn" onClick={archive}><Archive />{p.status === 'Archived' ? 'Restore' : 'Archive'}</button>
          <button className="btn danger" onClick={del} aria-label="Delete post"><Trash2 /></button>
        </>} />
      <div className="row section" style={{ marginTop: -8 }}>
        <div style={{ width: 240 }}><Progress value={progressOf(p)} /></div>
        <span className="small muted">{Math.round(progressOf(p))}% of checklist</span>
      </div>
      {isNgo && <div className="notice ngo section"><strong>NGO content.</strong> {SAFEGUARDING[0]} Do not publish on agency channels without written permission.</div>}

      <Tabs tabs={tabs} value={current} onChange={(t) => setTab(t === 'brief' ? null : t)} />

      {current === 'brief' && <BriefTab p={p} update={update} onStory={storyFromPost} onFollow={followUp} />}
      {current === 'concept' && <ConceptTab p={p} update={update} />}
      {current === 'script' && (
        <div className="stack">
          {isVideo && p.format !== 'yt-long' && <>
            <h3>Scene-by-scene script</h3>
            <EditableTable rows={p.scenes ?? []} cols={SCENE_COLS} onChange={(scenes) => update({ scenes })} blank={() => blankScene2((p.scenes?.length ?? 0) + 1)} />
          </>}
          {(hasBody || p.format === 'yt-long') && <Field label={p.format === 'yt-long' ? 'Full script (opening, segments, transitions, CTA)' : 'Full text'}><textarea className="textarea" style={{ minHeight: 420, fontSize: 14 }} value={p.body ?? ''} onChange={(e) => update({ body: e.target.value })} /></Field>}
          {p.format === 'yt-long' && <><h3>Storyboard (sections, timing, visuals)</h3><EditableTable rows={p.scenes ?? []} cols={SCENE_COLS} onChange={(scenes) => update({ scenes })} blank={() => blankScene2((p.scenes?.length ?? 0) + 1)} /></>}
          {isVideo && <Field label="Complete alternative version"><textarea className="textarea" value={p.altVersion ?? ''} onChange={(e) => update({ altVersion: e.target.value })} placeholder="Optional: a different creative approach (e.g. talking-head instead of screen-led)." /></Field>}
          <div className="small muted">Words in voiceover: {(p.scenes ?? []).map((s) => s.voice).join(' ').split(/\s+/).filter(Boolean).length} · ≈ {Math.round((p.scenes ?? []).map((s) => s.voice).join(' ').split(/\s+/).filter(Boolean).length / 2.6)} s at a natural pace</div>
        </div>
      )}
      {current === 'slides' && (
        <div className="stack">
          <EditableTable rows={p.slides ?? []} cols={SLIDE_COLS} onChange={(slides) => update({ slides })} blank={() => blankSlide((p.slides?.length ?? 0) + 1)} />
          <details className="disc"><summary>How to build this in Canva (exact steps)</summary><div className="disc-body prose"><ol>
            <li>Open canva.com → <strong>Create a design</strong> → <strong>Custom size</strong> → {p.format === 'li-document' ? '1080 × 1350 px' : p.format.endsWith('story') ? '1080 × 1920 px' : p.format === 'fb-multi-image' ? '1080 × 1350 px' : '1080 × 1440 px'}.</li>
            <li><strong>Brand</strong> (left panel) → add colours #111210, #F3F0E9, #CDB98A and fonts Cormorant Garamond + Inter (Brand Kit is a Pro feature; on Free, type the hex codes in the colour picker).</li>
            <li>Design slide 1 from the table above. Set margins by dragging guides (File → View settings → Show rulers and guides) at 80–90 px.</li>
            <li>Click <strong>Duplicate page</strong> under slide 1 for each following slide, then replace text. This keeps every margin identical.</li>
            <li>Body text ≥ 32 px, headlines 64–90 px. Max ~40 words per slide.</li>
            <li>Add visuals: Uploads → your screenshots/photos; Elements → simple icons (outline style). Avoid stock photos of fake “clients”.</li>
            <li>Check on your phone: Share → View only link → open on phone.</li>
            <li>Export: Share → Download → {p.format === 'li-document' ? 'PDF Standard' : 'PNG, all pages'}.</li>
            <li>{p.format.endsWith('story') ? 'Post frames one by one in Instagram; add stickers there.' : p.format === 'li-document' ? 'LinkedIn → Start a post → Add a document → upload → give it a title → paste post copy.' : 'Upload all images in order in one post.'}</li>
          </ol></div></details>
        </div>
      )}
      {current === 'shots' && (
        <div className="stack">
          <div className="row"><button className="btn" onClick={() => { if (!p.shots?.length || confirm('Replace the current shot list with one built from scenes?')) update({ shots: shotsFromScenes(p.scenes ?? []) }); }}><ListPlus />Build shot list from scenes</button>
            <span className="small muted">Methods: Phone · Screen recording · AI-generated · Animation · Design</span></div>
          <EditableTable rows={p.shots ?? []} cols={SHOT_COLS} onChange={(shots) => update({ shots })} blank={() => blankShot((p.shots?.length ?? 0) + 1)} />
          <details className="disc"><summary>Production terms in plain language</summary><div className="disc-body prose"><ul>
            <li><strong>Shot</strong>: one continuous clip from one viewpoint.</li><li><strong>B-roll</strong>: supporting footage shown while you speak.</li>
            <li><strong>Screen recording</strong>: capturing your screen as video (iPhone: Control Centre → Screen Recording; Mac: Cmd+Shift+5).</li>
            <li><strong>Eye level / high / top-down</strong>: camera at your eye height / above looking down / directly overhead.</li>
            <li><strong>Lock exposure</strong>: tap and hold on the subject in the camera app so brightness doesn’t change mid-shot.</li>
            <li><strong>Safe area</strong>: the middle of the frame where app buttons and captions won’t cover your text.</li>
          </ul></div></details>
        </div>
      )}
      {current === 'assets' && <AssetsTab p={p} update={update} />}
      {current === 'ai' && (
        <div className="stack" style={{ gap: 20 }}>
          <div className="notice info">Growth HQ does not generate video. It gives you the prompts, settings and steps to use an external tool, and records what you made.</div>
          <h3>AI shots for this post</h3>
          {(p.aiShots ?? []).length === 0 && <Empty title="No AI shots planned">That’s fine — most shots should be recorded or designed. Add one only where filming is impractical.</Empty>}
          {(p.aiShots ?? []).map((a, i) => <AIShotCard key={i} a={a} onChange={(na) => update({ aiShots: (p.aiShots ?? []).map((x, j) => (j === i ? na : x)) })} onDelete={() => update({ aiShots: (p.aiShots ?? []).filter((_, j) => j !== i) })} />)}
          <div><button className="btn" onClick={() => update({ aiShots: [...(p.aiShots ?? []), blankAIShot()] })}><Plus />Add AI shot</button></div>
          <details className="disc"><summary>The complete AI-video workflow (16 steps)</summary><div className="disc-body"><ol className="prose">{AI_VIDEO_WORKFLOW.map((s) => <li key={s.step}><strong>{s.step}.</strong> {s.detail}</li>)}</ol></div></details>
          <details className="disc"><summary>Tool comparison (access, India availability, capabilities)</summary><div className="disc-body" style={{ paddingLeft: 18 }}><ToolTable rows={AI_VIDEO_TOOLS} video /></div></details>
          <details className="disc"><summary>No-AI alternatives (phone, screen recording, animation)</summary><div className="disc-body"><ul className="prose">{NO_AI_ALTERNATIVES.map((x) => <li key={x.need}><strong>{x.need}:</strong> {x.alt}</li>)}</ul></div></details>
        </div>
      )}
      {current === 'voice' && (
        <div className="grid-form">
          {([['script', 'Full narration script', 8], ['pace', 'Speaking pace', 2], ['recording', 'Recording with a phone', 3], ['aiVoice', 'AI voice options (optional)', 3], ['timing', 'Adjusting timing', 2], ['pronunciation', 'Pronunciation', 2], ['subtitles', 'Subtitle text / notes', 3], ['music', 'Music & licensing', 3]] as const).map(([k, label, rows]) => (
            <Field key={k} label={label} wide={rows > 2}><textarea className="textarea" style={{ minHeight: rows * 24 + 16 }} value={p.voiceover?.[k] ?? (k === 'script' ? (p.scenes ?? []).map((s) => s.voice).filter(Boolean).join('\n') : '')} onChange={(e) => update({ voiceover: { ...p.voiceover, [k]: e.target.value } })} /></Field>
          ))}
          <div className="notice" style={{ gridColumn: '1/-1' }}>Background noise: record in a small room with soft furnishings, switch off fans/AC, phone 15–20 cm away, record 10 s of silence first (useful for noise reduction). Licensed audio: use the Instagram/Edits library for Instagram, YouTube Audio Library for YouTube, or tracks you have a licence for — trending sounds on one platform are not licensed for others.</div>
        </div>
      )}
      {current === 'edit' && (
        <div className="stack">
          <Field label="Editing application"><input className="input" value={p.editApp ?? ''} onChange={(e) => update({ editApp: e.target.value })} /></Field>
          <div className="notice">CapCut is blocked in India; this plan uses Instagram Edits (free, phone) for vertical video and DaVinci Resolve (free, Mac) for long-form. Interfaces change — look for the named feature if a button moves.</div>
          <div className="steps">
            {(p.editGuide ?? []).map((s, i) => (
              <div className="step" key={i}><div className="step-n">{i + 1}</div><div className="step-b">
                <textarea className="cell-input" style={{ width: '100%' }} rows={2} value={s} aria-label={`Edit step ${i + 1}`} onChange={(e) => update({ editGuide: (p.editGuide ?? []).map((x, j) => (j === i ? e.target.value : x)) })} />
              </div></div>
            ))}
          </div>
          <div className="row">
            <button className="btn" onClick={() => update({ editGuide: [...(p.editGuide ?? []), ''] })}><Plus />Add step</button>
            {!(p.editGuide?.length) && <button className="btn" onClick={() => update({ editGuide: defaultEditGuide(p.format) })}>Insert default steps</button>}
          </div>
          <details className="disc"><summary>Making the opening strong and designing the cover</summary><div className="disc-body prose"><ul>
            <li>Cut the first clip so motion starts in frame 1 (no fade-in from black).</li><li>On-screen hook appears by 0.3 s and stays at least 1.5 s.</li>
            <li>Cover: 1080×1920 with the title inside the centre 1080×1440 so the 3:4 grid crop keeps it. Same template every time (Asset Library → Instagram Reel cover).</li>
            <li>Export settings: 1080p, 30 fps, highest quality, H.264/MP4.</li>
          </ul></div></details>
        </div>
      )}
      {current === 'publish' && <PublishTab p={p} update={update} />}
      {current === 'checklist' && <ChecklistTab p={p} update={update} setStatus={setStatus} />}
      {current === 'guide' && <GuideMode post={stored} />}
      {current === 'results' && <ResultsTab p={p} update={update} onFollow={followUp} />}
    </div>
  );
}

type TabProps = { p: Post; update: (x: Partial<Post> | ((cur: Post) => Partial<Post>)) => void };

function BriefTab({ p, update, onStory, onFollow }: TabProps & { onStory: () => void; onFollow: () => void }) {
  const master = useLiveQuery(() => (p.masterId ? db.masters.get(p.masterId) : undefined), [p.masterId]);
  const siblings = useLiveQuery(() => (p.masterId ? db.posts.where('masterId').equals(p.masterId).toArray() : []), [p.masterId]) ?? [];
  const campaigns = useLiveQuery(() => db.campaigns.toArray()) ?? [];
  const leads = useLiveQuery(() => db.leads.filter((l) => l.sourcePostId === p.id).toArray(), [p.id]) ?? [];
  const masters = useLiveQuery(() => db.masters.where('workspace').equals(p.workspace).toArray(), [p.workspace]) ?? [];
  const nav = useNavigate();
  return (
    <div className="cols-main">
      <div className="panel panel-pad">
        <div className="grid-form">
          <Field label="Title" wide><input className="input" value={p.title} onChange={(e) => update({ title: e.target.value })} /></Field>
          <Field label="Publication date"><input className="input" type="date" value={p.date ?? ''} onChange={(e) => update({ date: e.target.value || undefined })} /></Field>
          <Field label="Time"><input className="input" type="time" value={p.time ?? ''} onChange={(e) => update({ time: e.target.value })} /></Field>
          <Field label="Account / Page"><input className="input" value={p.account ?? ''} onChange={(e) => update({ account: e.target.value })} placeholder="e.g. Founder (personal) or Company Page" /></Field>
          <Field label="Content pillar"><select className="select" value={p.pillar ?? ''} onChange={(e) => update({ pillar: e.target.value })}><option value="">—</option>{PILLARS.map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Target audience"><select className="select" value={p.audience ?? ''} onChange={(e) => update({ audience: e.target.value })}><option value="">—</option>{[...AUDIENCES, 'Supporters, volunteers and donors of the NGO'].map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Owner / assigned to"><input className="input" value={p.owner ?? ''} onChange={(e) => update({ owner: e.target.value })} /></Field>
          <Field label="Campaign"><select className="select" value={p.campaignId ?? ''} onChange={(e) => update({ campaignId: e.target.value || undefined })}><option value="">—</option>{campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
          <Field label="Master idea"><select className="select" value={p.masterId ?? ''} onChange={(e) => update({ masterId: e.target.value || undefined })}><option value="">—</option>{masters.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}</select></Field>
          <Field label="Hook (selected)" wide><input className="input" value={p.hook ?? ''} onChange={(e) => update({ hook: e.target.value })} /></Field>
          <Field label="Visual direction" wide><textarea className="textarea" value={p.visualDirection ?? ''} onChange={(e) => update({ visualDirection: e.target.value })} /></Field>
          <Field label="Required assets" wide><textarea className="textarea" value={p.requiredAssets ?? ''} onChange={(e) => update({ requiredAssets: e.target.value })} /></Field>
          <Field label="Tags (comma separated)" wide><input className="input" value={(p.tags ?? []).join(', ')} onChange={(e) => update({ tags: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} /></Field>
          <Field label="Notes" wide><textarea className="textarea" value={p.notes ?? ''} onChange={(e) => update({ notes: e.target.value })} /></Field>
        </div>
      </div>
      <div className="stack" style={{ gap: 18 }}>
        <div className="panel">
          <div className="panel-head"><h3>Related</h3></div>
          <div className="list">
            {master ? <div className="list-item click" onClick={() => nav((p.workspace === 'ngo' ? '/ngo/idea/' : '/idea/') + master.id)}><div><div className="list-meta">Master idea</div><div className="list-title">{master.title}</div></div></div> : <div className="list-item small muted">Not linked to a master idea.</div>}
            {siblings.filter((s) => s.id !== p.id).map((s) => (
              <div key={s.id} className="list-item click" onClick={() => nav((s.workspace === 'ngo' ? '/ngo/post/' : '/post/') + s.id)}>
                <span className={`dot pdot p-${s.platform}`} style={{ marginTop: 7 }} /><div><div className="small">{s.title}</div><div className="list-meta">{FORMAT_LABEL[s.format]} · {s.status}</div></div>
              </div>
            ))}
            {p.campaignId && <div className="list-item click" onClick={() => nav('/leads?tab=campaigns&open=' + p.campaignId)}><div><div className="list-meta">Campaign</div><div className="small">{campaigns.find((c) => c.id === p.campaignId)?.name}</div></div></div>}
            <div className="list-item small muted">{leads.length ? `${leads.length} lead(s) attributed to this post` : 'No leads attributed to this post yet.'}</div>
          </div>
        </div>
        <div className="panel panel-pad stack">
          <h4>One-click</h4>
          <button className="btn" onClick={onStory}><Sparkles />Story sequence from this post</button>
          <button className="btn" onClick={onFollow}><Lightbulb />Follow-up idea from this post</button>
          <Link className="btn" to={`?tab=guide`}>Guide me step by step</Link>
        </div>
      </div>
    </div>
  );
}

function ConceptTab({ p, update }: TabProps) {
  const adv = p.objective ? OBJECTIVE_ADVICE[p.objective] : undefined;
  const hooks = p.hooks ?? [];
  const c = p.concept ?? {};
  return (
    <div className="cols-main">
      <div className="stack">
        <div className="panel panel-pad">
          <h3 style={{ marginBottom: 12 }}>Step 1 — Objective</h3>
          <div className="row" style={{ gap: 6 }}>
            {(Object.keys(OBJECTIVE_ADVICE) as Objective[]).map((o) => (
              <button key={o} className={`btn sm ${p.objective === o ? 'primary' : ''}`} onClick={() => update({ objective: o })}>{o}</button>
            ))}
          </div>
          {adv && <div className="notice ok" style={{ marginTop: 12 }}><strong>Recommended format:</strong> {adv.format}. {adv.why}</div>}
          <Field label="Why this format fits (your note)"><textarea className="textarea" value={c.formatReason ?? ''} onChange={(e) => update({ concept: { ...c, formatReason: e.target.value } })} /></Field>
        </div>
        <div className="panel panel-pad">
          <h3 style={{ marginBottom: 12 }}>Step 2 — Concept</h3>
          <div className="stack">
            <h4>Hook options</h4>
            {hooks.map((h, i) => (
              <div key={i} className="row" style={{ flexWrap: 'nowrap' }}>
                <input type="radio" name="hook" aria-label={`Use hook ${i + 1}`} checked={p.hook === h} onChange={() => update({ hook: h })} />
                <input className="input" value={h} onChange={(e) => { const nh = hooks.map((x, j) => (j === i ? e.target.value : x)); update({ hooks: nh, hook: p.hook === h ? e.target.value : p.hook }); }} />
                <button className="btn ghost icon-btn" aria-label="Remove hook" onClick={() => update({ hooks: hooks.filter((_, j) => j !== i) })}><Trash2 size={14} /></button>
              </div>
            ))}
            <div><button className="btn sm" onClick={() => update({ hooks: [...hooks, ''] })}><Plus />Add hook</button></div>
            <p className="small muted">Good hooks are specific, honest, ≤9 words and can be shown on screen in the first second. See Learning Centre → Module 1, Lesson 1.</p>
            <div className="grid-form">
              {([['problem', 'Audience problem'], ['desiredResponse', 'Desired response'], ['whyHold', 'Why it might hold attention'], ['distinctive', 'What could make it more distinctive'], ['risks', 'Potential weaknesses and risks']] as const).map(([k, l]) => (
                <Field key={k} label={l} wide><textarea className="textarea" value={c[k] ?? ''} onChange={(e) => update({ concept: { ...c, [k]: e.target.value } })} /></Field>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="eyebrow">Preview</div>
        <div className={`preview-frame ${p.format === 'yt-long' ? 'wide' : SLIDE_FORMATS.includes(p.format) && !p.format.endsWith('story') ? 'sq' : ''}`}>
          <span className="tag gold" style={{ alignSelf: 'flex-start' }}>{FORMAT_LABEL[p.format]}</span>
          <div className="pf-hook">{p.hook || p.slides?.[0]?.text || p.title}</div>
          <div className="small muted">{p.cta}</div>
        </div>
        <p className="small muted" style={{ marginTop: 8 }}>Text-only preview of the opening frame for checking length and tone.</p>
      </div>
    </div>
  );
}

function AIShotCard({ a, onChange, onDelete }: { a: AIShot; onChange: (a: AIShot) => void; onDelete: () => void }) {
  const f = (k: keyof AIShot, label: string, rows = 1) => (
    <Field label={label} wide={rows > 1}><textarea className="textarea" style={{ minHeight: rows * 24 + 16 }} value={a[k] as string} onChange={(e) => onChange({ ...a, [k]: e.target.value })} /></Field>
  );
  return (
    <div className="panel">
      <div className="panel-head"><h3>{a.ref}</h3><div className="row"><span className="tag">{a.mode}</span><span className="tag gold">{a.tool}</span><button className="btn ghost icon-btn" aria-label="Delete AI shot" onClick={onDelete}><Trash2 size={14} /></button></div></div>
      <div className="panel-pad stack">
        <div className="cols-2">
          <CopyBlock label="Exact prompt" text={a.prompt || '(write the prompt)'} />
          <CopyBlock label="Negative prompt (where supported)" text={a.negative || '—'} />
        </div>
        <div className="table-wrap"><table className="t"><tbody>
          {([['Why AI', a.why], ['Start frame / reference', a.startFrame], ['Camera & composition', a.camera], ['Lighting', a.lighting], ['Visual style', a.style], ['Subject movement', a.subjectMotion], ['Camera movement', a.cameraMotion], ['Duration', a.duration], ['Aspect ratio', a.aspect], ['Continuity', a.continuity], ['Exclude', a.exclude], ['How to evaluate', a.evaluate]] as const).map(([k, v]) => <tr key={k}><td className="muted" style={{ width: 200 }}>{k}</td><td>{v || '—'}</td></tr>)}
        </tbody></table></div>
        <details className="disc"><summary>Edit this shot</summary><div className="disc-body"><div className="grid-form">
          {f('ref', 'Shot reference')}{f('tool', 'Tool')}
          <Field label="Mode"><select className="select" value={a.mode} onChange={(e) => onChange({ ...a, mode: e.target.value as AIShot['mode'] })}><option>Image-to-video</option><option>Text-to-video</option></select></Field>
          {f('why', 'Why AI', 2)}{f('startFrame', 'Start frame / reference requirements', 2)}{f('prompt', 'Prompt', 4)}{f('negative', 'Negative prompt', 2)}
          {f('camera', 'Camera & composition')}{f('lighting', 'Lighting')}{f('style', 'Style')}{f('subjectMotion', 'Subject motion')}{f('cameraMotion', 'Camera motion')}
          {f('duration', 'Duration')}{f('aspect', 'Aspect ratio')}{f('continuity', 'Continuity', 2)}{f('exclude', 'Exclude', 2)}{f('evaluate', 'Evaluate', 2)}
        </div></div></details>
      </div>
    </div>
  );
}

function AssetsTab({ p, update }: TabProps) {
  const linked = useLiveQuery(() => db.assets.filter((a) => !!a.postIds?.includes(p.id)).toArray(), [p.id]) ?? [];
  const all = useLiveQuery(() => db.assets.toArray()) ?? [];
  const [pick, setPick] = useState('');
  const toast = useToast();
  const link = async (id: string) => { const a = await db.assets.get(id); if (!a) return; await db.assets.update(id, { postIds: [...new Set([...(a.postIds ?? []), p.id])], updatedAt: now() }); setPick(''); toast('Asset linked'); };
  const unlink = async (a: Asset) => db.assets.update(a.id, { postIds: (a.postIds ?? []).filter((x) => x !== p.id), updatedAt: now() });
  const add = async () => {
    const name = prompt('Asset name (e.g. “B3 — concept homepage recording”)');
    if (!name) return;
    await db.assets.add({ id: uid('as'), name, type: 'Image', source: 'Original', status: 'Needed', postIds: [p.id], createdAt: now(), updatedAt: now() });
  };
  return (
    <div className="stack">
      <Field label="Required assets (summary)"><textarea className="textarea" value={p.requiredAssets ?? ''} onChange={(e) => update({ requiredAssets: e.target.value })} /></Field>
      <div className="row">
        <button className="btn" onClick={add}><Plus />New asset for this post</button>
        <select className="select" style={{ width: 'auto', minWidth: 260 }} value={pick} onChange={(e) => { setPick(e.target.value); if (e.target.value) link(e.target.value); }} aria-label="Link existing asset">
          <option value="">Link an existing asset or template…</option>
          {all.filter((a) => !a.postIds?.includes(p.id)).map((a) => <option key={a.id} value={a.id}>{a.isTemplate ? '[Template] ' : ''}{a.name}</option>)}
        </select>
        <Link to="/assets" className="small">Open Asset Library</Link>
      </div>
      {linked.length === 0 ? <Empty title="No assets linked">Link screenshots, recordings, AI clips, covers and templates so the post and its files stay connected.</Empty> : (
        <div className="table-wrap"><table className="t">
          <thead><tr><th>Asset</th><th>Type</th><th>Source</th><th>Status</th><th>How to create</th><th /></tr></thead>
          <tbody>{linked.map((a) => (
            <tr key={a.id}><td><Link to={`/assets?open=${a.id}`}>{a.name}</Link>{a.isTemplate && <span className="tag" style={{ marginLeft: 6 }}>template</span>}</td><td className="small">{a.type}</td><td className="small">{a.source}</td>
              <td><select className="select" value={a.status} onChange={(e) => db.assets.update(a.id, { status: e.target.value as Asset['status'], updatedAt: now() })} aria-label="Asset status">{['Needed', 'Briefed', 'In progress', 'Ready', 'Used'].map((s) => <option key={s}>{s}</option>)}</select></td>
              <td className="wrap small">{a.method}{a.prompt ? `\nPrompt: ${a.prompt}` : ''}</td>
              <td><button className="btn ghost sm" onClick={() => unlink(a)}>Unlink</button></td></tr>
          ))}</tbody>
        </table></div>
      )}
    </div>
  );
}

function PublishTab({ p, update }: TabProps) {
  const pub = p.publishing ?? {};
  const setPub = (k: string, v: string) => update({ publishing: { ...pub, [k]: v } });
  const isYT = p.platform === 'youtube';
  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="cols-2">
        <Field label={isYT ? 'Description' : p.platform === 'linkedin' || p.platform === 'facebook' ? 'Caption / post text (if not in Copy tab)' : 'Caption'}><textarea className="textarea" style={{ minHeight: 220 }} value={p.caption ?? ''} onChange={(e) => update({ caption: e.target.value })} /></Field>
        <div className="stack">
          <Field label="CTA"><textarea className="textarea" value={p.cta ?? ''} onChange={(e) => update({ cta: e.target.value })} /></Field>
          {(isYT || p.format === 'li-document' || p.format === 'li-article') && <Field label="Title"><input className="input" value={pub.title ?? ''} onChange={(e) => setPub('title', e.target.value)} /></Field>}
          <Field label="Cover headline"><input className="input" value={pub.cover ?? ''} onChange={(e) => setPub('cover', e.target.value)} /></Field>
          <div className="small muted">Caption length: {(p.caption ?? '').length} characters{p.platform === 'instagram' ? ' (Instagram limit 2,200)' : ''}.</div>
        </div>
      </div>
      <div className="grid-form">
        {([['keywords', 'Keywords (search terms)'], ['hashtags', 'Hashtags (optional, few and specific)'], ['alt', 'Accessibility / alt text'], ['bestTime', 'Suggested publishing time'], ['storySequence', 'Story sequence to promote'], ['nextIdea', 'Next related post idea'], ['metrics', 'Metrics to review'], ...(isYT ? [['chapters', 'Chapters'], ['pinnedComment', 'Pinned comment'], ['playlist', 'Playlist'], ['endScreen', 'End screen / related']] : [])] as [string, string][]).map(([k, l]) => (
          <Field key={k} label={l} wide={['storySequence', 'chapters', 'alt'].includes(k)}><textarea className="textarea" style={{ minHeight: k === 'chapters' ? 180 : 70 }} value={(pub as Record<string, string>)[k] ?? ''} onChange={(e) => setPub(k, e.target.value)} /></Field>
        ))}
        <Field label="Published URL" wide><input className="input" value={p.publishedUrl ?? ''} onChange={(e) => update({ publishedUrl: e.target.value })} placeholder="Paste the live link after publishing" /></Field>
      </div>
      {p.format === 'yt-long' && <Thumbs p={p} update={update} />}
      <div className="cols-2">
        {p.caption && <CopyBlock label="Copy caption" text={p.caption} />}
        {p.body && <CopyBlock label="Copy post text" text={p.body} />}
      </div>
    </div>
  );
}

function Thumbs({ p, update }: TabProps) {
  const th = p.thumbnails ?? [];
  const blank: ThumbConcept = { name: `Concept ${String.fromCharCode(65 + th.length)}`, viewer: '', subject: '', emotion: '', composition: '', background: '', lighting: '', contrast: '', text: '', focal: '', mobile: '', titlePair: '', honesty: '', prompt: '', canva: '' };
  return (
    <div className="stack">
      <h3>Thumbnail & title studio</h3>
      <p className="small muted">Three genuinely different packaging concepts. Test & Compare (long-form only, if your channel is eligible): YouTube Studio on desktop → video → Thumbnail → Test & Compare. Otherwise: change the thumbnail after 7 days only if CTR is clearly below your channel median, and note the change in Results.</p>
      <div className="cols-3">
        {th.map((t, i) => (
          <div key={i} className="panel panel-pad stack small">
            <input className="input" value={t.name} onChange={(e) => update({ thumbnails: th.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) })} aria-label="Concept name" />
            {(['viewer', 'subject', 'emotion', 'composition', 'background', 'lighting', 'contrast', 'text', 'focal', 'mobile', 'titlePair', 'honesty'] as (keyof ThumbConcept)[]).map((k) => (
              <div key={k}><span className="muted">{k.replace(/([A-Z])/g, ' $1')}: </span><input className="cell-input" style={{ width: '100%' }} value={t[k]} aria-label={k} onChange={(e) => update({ thumbnails: th.map((x, j) => (j === i ? { ...x, [k]: e.target.value } : x)) })} /></div>
            ))}
            <CopyBlock label="Image prompt / photo brief" text={t.prompt || '—'} />
            <CopyBlock label="Recreate in Canva" text={t.canva || '—'} />
          </div>
        ))}
      </div>
      {th.length < 3 && <div><button className="btn" onClick={() => update({ thumbnails: [...th, blank] })}><Plus />Add packaging concept</button></div>}
    </div>
  );
}

function ChecklistTab({ p, update, setStatus }: TabProps & { setStatus: (s: Status) => void }) {
  const cl = p.checklist ?? {};
  const toggle = (id: string) => update((cur) => ({ checklist: { ...cur.checklist, [id]: !cur.checklist?.[id] } }));
  const prod = productionReady(p);
  const pubR = publishReady(p);
  const group = (title: string, items: ReturnType<typeof checklistFor>) => (
    <div className="panel panel-pad">
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      {items.map((c) => (
        <label key={c.id} className={`check ${cl[c.id] ? 'done' : ''}`}>
          <input type="checkbox" checked={!!cl[c.id]} onChange={() => toggle(c.id)} />
          <span>{c.label}{c.required && <span className="tag" style={{ marginLeft: 6, fontSize: 10.5 }}>required</span>}</span>
        </label>
      ))}
    </div>
  );
  return (
    <div className="stack">
      <div className={`notice ${prod.ok ? 'ok' : ''}`}>
        {prod.ok ? <><strong>Production complete.</strong> Required assets, script, edit, cover, caption and final review are done.</> : <><strong>Production not complete.</strong> Still needed: {prod.missing.map((m) => m.label).join(' · ')}. Status can’t move to Ready to Publish until these are ticked.</>}
      </div>
      <div className="cols-2">
        {group('Production', productionChecks(p.format))}
        {group('Publishing & review', PUBLISH_CHECKS)}
      </div>
      {p.workspace === 'ngo' && <div className="panel panel-pad"><h3 style={{ marginBottom: 8 }}>Safeguarding</h3><ul className="prose">{SAFEGUARDING.map((s) => <li key={s}>{s}</li>)}</ul></div>}
      <div className="row">
        <button className="btn" disabled={!prod.ok} onClick={() => setStatus('Ready to Publish')}>Mark Ready to Publish</button>
        <button className="btn primary" disabled={!prod.ok || !pubR.ok} onClick={() => setStatus('Published')}>Mark Published</button>
        {!pubR.ok && prod.ok && <span className="small muted">Publishing needs: {pubR.missing.map((m) => m.label).join(' · ')}</span>}
      </div>
    </div>
  );
}

function ResultsTab({ p, update, onFollow }: TabProps & { onFollow: () => void }) {
  const defs = metricsFor(p.platform, p.format);
  const [vals, setVals] = useState<Record<string, string>>({});
  const [date, setDate] = useState(today());
  const add = () => {
    const metrics: Record<string, number> = {};
    for (const d of defs) if (vals[d.key] !== undefined && vals[d.key] !== '' && !isNaN(Number(vals[d.key]))) metrics[d.key] = Number(vals[d.key]);
    if (!Object.keys(metrics).length) return;
    update({ results: [...(p.results ?? []), { id: uid('res'), date, source: 'manual', metrics }], status: p.status === 'Published' ? 'Analysed' : p.status });
    setVals({});
  };
  const results = p.results ?? [];
  return (
    <div className="stack" style={{ gap: 20 }}>
      {!['Published', 'Analysed'].includes(p.status) && <div className="notice">This post isn’t published yet. Record results only after it goes live — never estimates.</div>}
      <div className="panel panel-pad">
        <h3 style={{ marginBottom: 10 }}>Add results from {PLATFORM_LABEL[p.platform]} analytics</h3>
        <div className="grid-form">
          <Field label="Date checked"><input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
          {defs.map((d) => <Field key={d.key} label={d.label}><input className="input" inputMode="decimal" value={vals[d.key] ?? ''} placeholder={d.hint ?? ''} onChange={(e) => setVals({ ...vals, [d.key]: e.target.value })} /></Field>)}
        </div>
        <div style={{ marginTop: 12 }}><button className="btn primary" onClick={add}>Save results</button> <span className="small muted">Leave unknown fields blank.</span></div>
      </div>
      {results.length === 0 ? <Empty title="No results recorded">Seven days after publishing, open the platform’s insights and enter the numbers here.</Empty> : (
        <div className="table-wrap"><table className="t">
          <thead><tr><th>Date</th>{defs.map((d) => <th key={d.key}>{d.label}</th>)}<th /></tr></thead>
          <tbody>{results.map((r) => <tr key={r.id}><td>{r.date}<div className="small muted">{r.source}</div></td>{defs.map((d) => <td key={d.key}>{r.metrics[d.key] ?? '—'}</td>)}<td><button className="btn ghost sm" onClick={() => update({ results: results.filter((x) => x.id !== r.id) })}>Remove</button></td></tr>)}</tbody>
        </table></div>
      )}
      <Field label="Observations and lessons (what happened, likely why, what to try next)"><textarea className="textarea" value={p.observations ?? ''} onChange={(e) => update({ observations: e.target.value })} /></Field>
      <div><button className="btn" onClick={onFollow}><Lightbulb />Create follow-up content from this post</button></div>
    </div>
  );
}

export type { Slide };
