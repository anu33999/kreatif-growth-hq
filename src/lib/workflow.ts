import type { AIShot, Format, Master, Post, Scene, Shot, Slide } from './types';
import { FORMAT_LABEL, FORMAT_PLATFORM, VIDEO_FORMATS } from './types';
import { uid, now } from './db';

// ---------- Checklists ----------

export interface CheckItem { id: string; label: string; required?: boolean; group: 'Production' | 'Publishing' }

const PROD_VIDEO: CheckItem[] = [
  { id: 'objective', label: 'Objective chosen and format reason noted', group: 'Production', required: true },
  { id: 'script', label: 'Script written and read aloud to time', group: 'Production', required: true },
  { id: 'shots', label: 'Shot list complete', group: 'Production' },
  { id: 'assets', label: 'All required assets created or sourced', group: 'Production', required: true },
  { id: 'ai', label: 'AI clips generated and QC’d (or replaced with alternatives)', group: 'Production' },
  { id: 'vo', label: 'Voiceover recorded and timed', group: 'Production' },
  { id: 'edit', label: 'Edit assembled (captions, music, transitions)', group: 'Production', required: true },
  { id: 'cover', label: 'Cover designed and approved', group: 'Production', required: true },
  { id: 'caption', label: 'Caption and CTA written', group: 'Production', required: true },
  { id: 'review', label: 'Final review done (QC pass, watched in full on phone)', group: 'Production', required: true },
];
const PROD_STATIC: CheckItem[] = [
  { id: 'objective', label: 'Objective and audience confirmed', group: 'Production', required: true },
  { id: 'copy', label: 'All slide/page/post copy written', group: 'Production', required: true },
  { id: 'assets', label: 'Images/screenshots/diagrams ready', group: 'Production', required: true },
  { id: 'design', label: 'Designed in Canva at the right size', group: 'Production', required: true },
  { id: 'cover', label: 'Cover / first image approved', group: 'Production', required: true },
  { id: 'caption', label: 'Caption and CTA written', group: 'Production', required: true },
  { id: 'review', label: 'Proofread on a phone', group: 'Production', required: true },
];
const PROD_TEXT: CheckItem[] = [
  { id: 'objective', label: 'Target reader and problem defined', group: 'Production', required: true },
  { id: 'copy', label: 'Full post written', group: 'Production', required: true },
  { id: 'evidence', label: 'Evidence/example included and checked', group: 'Production', required: true },
  { id: 'visual', label: 'Optional visual ready (or deliberately none)', group: 'Production' },
  { id: 'caption', label: 'CTA / closing question decided', group: 'Production', required: true },
  { id: 'review', label: 'Read aloud; removed filler and formulaic lines', group: 'Production', required: true },
];

export const PUBLISH_CHECKS: CheckItem[] = [
  { id: 'p_script', label: 'Script/copy approved', group: 'Publishing', required: true },
  { id: 'p_assets', label: 'All assets available', group: 'Publishing', required: true },
  { id: 'p_rights', label: 'Copyright and permissions checked (music, images, people, client work)', group: 'Publishing', required: true },
  { id: 'p_facts', label: 'Facts and claims verified (no invented results)', group: 'Publishing', required: true },
  { id: 'p_captions', label: 'Captions and subtitles reviewed', group: 'Publishing', required: true },
  { id: 'p_cover', label: 'Cover / thumbnail approved', group: 'Publishing' },
  { id: 'p_cta', label: 'CTA reviewed', group: 'Publishing', required: true },
  { id: 'p_links', label: 'Links tested (with UTM tags)', group: 'Publishing' },
  { id: 'p_watch', label: 'Final video watched in full / document paged through', group: 'Publishing', required: true },
  { id: 'p_export', label: 'Export settings checked', group: 'Publishing' },
  { id: 'p_published', label: 'Content published', group: 'Publishing' },
  { id: 'p_url', label: 'Published URL recorded', group: 'Publishing' },
  { id: 'p_review', label: 'Performance review scheduled', group: 'Publishing' },
];

export function productionChecks(format: Format): CheckItem[] {
  if (VIDEO_FORMATS.includes(format)) return PROD_VIDEO;
  if (['li-text', 'li-article', 'fb-post', 'newsletter'].includes(format)) return PROD_TEXT;
  return PROD_STATIC;
}

export function checklistFor(post: Post): CheckItem[] {
  return [...productionChecks(post.format), ...PUBLISH_CHECKS];
}

export function productionReady(post: Post) {
  const items = productionChecks(post.format).filter((c) => c.required);
  const missing = items.filter((c) => !post.checklist?.[c.id]);
  return { ok: missing.length === 0, missing };
}
export function publishReady(post: Post) {
  const items = PUBLISH_CHECKS.filter((c) => c.required);
  const missing = items.filter((c) => !post.checklist?.[c.id]);
  return { ok: missing.length === 0, missing };
}

export function progressOf(post: Post): number {
  const all = checklistFor(post);
  const done = all.filter((c) => post.checklist?.[c.id]).length;
  return all.length ? (done / all.length) * 100 : 0;
}

// ---------- Objective → format recommendation ----------

export const OBJECTIVE_ADVICE: Record<string, { format: string; why: string }> = {
  Reach: { format: 'Instagram Reel / YouTube Short, 15–30 s, visual transformation', why: 'Short vertical video is the format these platforms recommend to non-followers. A visible before/after gives a reason to keep watching.' },
  Shares: { format: 'Reel or carousel with a relatable problem', why: 'People send content that names a problem a friend or colleague has (“this is your website”).' },
  Saves: { format: 'Carousel / LinkedIn document checklist', why: 'Reference material people want to come back to gets saved.' },
  'Profile visits': { format: 'Reel series with a recognisable format', why: 'A series creates curiosity about “what else this account does”.' },
  Authority: { format: 'LinkedIn text post or YouTube long-form audit', why: 'Depth and reasoning demonstrate expertise better than speed.' },
  'Website visits': { format: 'Carousel or post with a specific resource on the site', why: 'A clear reason to click (a checklist, an audit page).' },
  Enquiries: { format: 'Reel + Story sequence with the free audit offer', why: 'A low-risk offer and a direct DM path convert interest into conversations.' },
  Portfolio: { format: 'Process Reel or case carousel (cleared work or labelled concept)', why: 'Shows how the studio works, not just the final pixels.' },
  'NGO awareness': { format: 'Consent-based explainer carousel or Reel in the NGO workspace', why: 'Accurate programme explanation builds understanding without exploiting beneficiaries.' },
  Conversation: { format: 'LinkedIn text post with a genuine question', why: 'Professional audiences respond to a specific, debatable point.' },
  'Search discovery': { format: 'YouTube long-form answering a searchable question', why: 'Search traffic compounds over months.' },
};

// ---------- Scaffolding new adaptations ----------

const blankScene = (n: number, time: string, duration: string, visual: string, voice: string, onScreen: string, camera: string): Scene =>
  ({ n, time, duration, visual, voice, onScreen, camera, transition: 'Cut', sound: 'Voice + low music', assets: '' });

export function scaffold(format: Format, m?: Partial<Master>): Partial<Post> {
  const idea = m?.title ?? 'New idea';
  const base: Partial<Post> = {
    format, platform: FORMAT_PLATFORM[format], title: `${idea} — ${FORMAT_LABEL[format]}`,
    audience: m?.audience, objective: m?.objective, pillar: m?.pillar, campaignId: m?.campaignId, masterId: m?.id,
    hooks: ['[Result-first hook]', '[Problem-first hook]', '[Specific curiosity hook]'],
    concept: { problem: m?.problem ?? '', desiredResponse: '', whyHold: '', distinctive: '', risks: '' },
    checklist: {}, guideProgress: {}, guideStep: 0, status: 'Planned',
  };
  switch (format) {
    case 'ig-reel': case 'fb-reel': case 'yt-short': case 'li-video':
      return {
        ...base,
        editApp: 'Instagram Edits (phone) — CapCut is blocked in India',
        scenes: [
          blankScene(1, '0:00', '2s', 'The problem or result, visible immediately', '[Hook line]', '[≤7 words]', 'Screen recording / phone'),
          blankScene(2, '0:02', '4s', 'Context', '[Why it matters to the business]', '', 'Phone'),
          blankScene(3, '0:06', '12s', 'The fix, step by step', '[Steps]', '[Step labels]', 'Screen recording'),
          blankScene(4, '0:18', '6s', 'Payoff — the after', '[Payoff line]', '', 'Design / screen'),
          blankScene(5, '0:24', '4s', 'CTA', '[CTA]', 'kreatifatelier.com', 'Title card'),
        ],
        editGuide: defaultEditGuide(format),
        publishing: { metrics: defaultMetrics(format) },
      };
    case 'yt-long':
      return {
        ...base,
        editApp: 'DaVinci Resolve (free, Mac)',
        body: '## Cold open (0:00–0:30)\n[Show the problem or the after first]\n\n## Why this matters (0:30–1:30)\n\n## Part 1\n\n## Part 2\n\n## Part 3\n\n## Summary & next step\n[CTA]',
        scenes: [blankScene(1, '0:00', '30s', 'Cold open: the result or problem', '', '', 'Screen recording')],
        editGuide: defaultEditGuide(format),
        publishing: { metrics: defaultMetrics(format), chapters: '0:00 Intro' },
      };
    case 'ig-carousel': case 'li-document': case 'fb-multi-image':
      return {
        ...base,
        slides: [
          { n: 1, text: '[Cover hook]', layout: 'Large serif headline, 2 lines max, gold rule', visual: 'Optional image' },
          { n: 2, text: '[The problem]', layout: 'Headline + 2 lines', visual: '' },
          { n: 3, text: '[Point 1]', layout: 'Number + headline + 2 lines', visual: 'Screenshot/diagram' },
          { n: 4, text: '[Point 2]', layout: 'Same as 3', visual: '' },
          { n: 5, text: '[Point 3]', layout: 'Same as 3', visual: '' },
          { n: 6, text: '[Summary]', layout: 'Checklist', visual: '' },
          { n: 7, text: '[CTA]', layout: 'Centred, URL', visual: 'Logo' },
        ],
        publishing: { metrics: defaultMetrics(format) },
      };
    case 'ig-story': case 'fb-story':
      return {
        ...base,
        slides: [
          { n: 1, text: '[Teaser]', layout: 'Full-bleed footage', visual: 'Poll sticker' },
          { n: 2, text: '[Point]', layout: 'Text on charcoal', visual: '' },
          { n: 3, text: '[CTA]', layout: 'Link sticker', visual: '' },
        ],
        publishing: { metrics: 'Replies, sticker taps, link taps, exits' },
      };
    default:
      return { ...base, body: '[Opening line]\n\n[Insight]\n\n[Example]\n\n[Conclusion]\n\n[CTA or question]', publishing: { metrics: defaultMetrics(format) } };
  }
}

export function defaultMetrics(format: Format): string {
  switch (FORMAT_PLATFORM[format]) {
    case 'instagram': return format === 'ig-carousel' ? 'Saves, shares, reach (non-followers), profile visits, follows, DMs' : 'Reach (non-followers), average watch time, shares, saves, profile visits, follows, link taps, DMs';
    case 'linkedin': return 'Impressions, members reached, comments from ICP roles, reposts, profile views, conversations started';
    case 'facebook': return 'Reels plays / reach, link clicks, Messenger conversations, comments with questions';
    case 'youtube': return format === 'yt-long' ? 'Impressions CTR, views, average view duration, retention dips, traffic sources, subscribers, website clicks' : 'Views, viewed vs swiped away, subscribers, related-video clicks';
    default: return 'Visits, enquiries';
  }
}

export function defaultEditGuide(format: Format): string[] {
  if (format === 'yt-long') {
    return [
      'Open DaVinci Resolve → New Project → name it with the post title.',
      'Gear icon (Project Settings) → Timeline resolution 1920×1080, frame rate 30 → Save.',
      'Media page: drag in the project folder (narration, screen recordings, B-roll, music).',
      'Edit page: put narration on audio track A1; place screen recordings on V1 under the matching narration.',
      'Blade (B) to cut pauses and mistakes; ripple-delete gaps (Shift+Delete).',
      'Add zooms on details: Inspector → Transform → Zoom/Position with keyframes.',
      'Add section titles (Effects → Titles → Text+), brand fonts and colours.',
      'Timeline → Create Subtitles from Audio (if available) → proofread every line.',
      'Fairlight: voice around −14 LUFS integrated; music −25 to −30 dB under voice.',
      'Add markers at each section start → write chapters (first at 0:00).',
      'Deliver → YouTube 1080p preset → Render. Watch the whole export once.',
    ];
  }
  return [
    'Open Instagram Edits → New project → select clips in shot order → Add (9:16 project).',
    'Tap each clip and drag its edges to the durations in the Scenes table.',
    'Add voiceover: Audio → record or import narration; start at 0:00.',
    'Cut each clip where its sentence ends (Split at playhead, delete remainder).',
    'Text: add each on-screen line from the Scenes table; keep within the safe centre area.',
    'Captions → Auto captions → proofread every word (especially brand names).',
    'Music: in-app library or licensed track at ~10–20% under voice.',
    'Use straight cuts; add one wipe at the before/after moment.',
    'Choose cover: upload the designed cover or pick a frame.',
    'Export at 1080p, 30 fps → save → watch on the phone with sound off and on.',
  ];
}

export function shotsFromScenes(scenes: Scene[]): Shot[] {
  return scenes.map((s) => {
    const cam = `${s.camera} ${s.visual}`.toLowerCase();
    const method = cam.includes('screen') ? 'Screen recording' : cam.includes('ai') ? 'AI-generated' : cam.includes('design') || cam.includes('card') || cam.includes('canva') ? 'Design' : 'Phone';
    return {
      n: s.n, film: s.visual, visible: s.onScreen ? `On-screen text: ${s.onScreen}` : s.visual, angle: s.camera,
      method, background: 'Plain cream or charcoal; tidy desk', length: s.duration,
      onCamera: cam.includes('face') || cam.includes('talking') ? 'Yes' : 'No', narration: s.voice ? 'Yes' : 'No', purpose: `Scene ${s.n} of the story`,
    };
  });
}

export function blankAIShot(): AIShot {
  return {
    ref: 'Shot ?', why: '', tool: 'Kling (practice) / Veo (paid)', mode: 'Image-to-video', startFrame: '', prompt: '', negative: 'text, letters, watermark, logo, distorted objects, extra fingers, flicker, morphing',
    camera: '', lighting: 'Soft window light from left', style: 'Kreatif style bible', subjectMotion: '', cameraMotion: 'Slow push-in', duration: '5 s (use 2–3 s)',
    aspect: '9:16', continuity: 'Same desk, palette, light direction as other shots', exclude: 'People, readable text, logos', evaluate: 'No warping in the seconds you will use; matches neighbouring shots',
  };
}
export const blankSlide = (n: number): Slide => ({ n, text: '', layout: '', visual: '' });
export const blankScene2 = (n: number): Scene => ({ n, time: '', duration: '', visual: '', voice: '', onScreen: '', camera: '', transition: 'Cut', sound: '', assets: '' });
export const blankShot = (n: number): Shot => ({ n, film: '', visible: '', angle: '', method: 'Phone', background: '', length: '', onCamera: 'No', narration: 'No', purpose: '' });

export function newPostFrom(format: Format, master?: Master, extra: Partial<Post> = {}): Post {
  const s = scaffold(format, master);
  return {
    id: uid('post'), workspace: master?.workspace ?? 'agency', status: 'Planned', createdAt: now(), updatedAt: now(),
    ...s, ...extra,
  } as Post;
}

// ---------- Guide Me step-by-step ----------

export interface GuideStep {
  id: string; title: string; explain: string; material?: string; copy?: { label: string; text: string }[];
  link?: { label: string; url: string }; settings?: string; evaluate?: string; troubleshoot?: string;
}

const join = (arr?: string[]) => (arr ?? []).filter(Boolean).join('\n');

export function buildGuide(p: Post): GuideStep[] {
  const steps: GuideStep[] = [];
  const isVideo = VIDEO_FORMATS.includes(p.format);
  steps.push({
    id: 'g-objective', title: 'Confirm the objective and audience',
    explain: `This ${FORMAT_LABEL[p.format]} is for ${p.audience ?? 'your chosen audience'}. Its job is “${p.objective ?? 'choose an objective in the Concept tab'}”. Everything else follows from this.`,
    material: p.concept?.problem ? `Audience problem: ${p.concept.problem}` : undefined,
    evaluate: 'Can you say in one sentence who this is for and what they should do after seeing it?',
    troubleshoot: 'If not, pick a narrower audience (e.g. “UK café owners” instead of “businesses”).',
  });
  if (p.hooks?.length) {
    steps.push({
      id: 'g-hook', title: 'Choose the hook',
      explain: 'The opening line and image decide whether anyone sees the rest. Pick the hook you can show visually in the first second.',
      copy: [{ label: 'Hook options', text: join(p.hooks) }, ...(p.hook ? [{ label: 'Recommended', text: p.hook }] : [])],
      evaluate: 'Read it aloud: is it specific, honest and under 9 words?',
    });
  }
  if (p.scenes?.length) {
    steps.push({
      id: 'g-script', title: 'Read the script aloud and time it',
      explain: 'Read the exact voiceover with a stopwatch. 30 seconds ≈ 75–85 words. Trim anything that doesn’t move the story.',
      copy: [{ label: 'Voiceover', text: p.voiceover?.script || p.scenes.map((s) => s.voice).filter(Boolean).join('\n') }],
      evaluate: 'Total time within ±3 s of the plan.',
    });
  }
  if (p.body && !isVideo) {
    steps.push({
      id: 'g-body', title: p.format === 'li-article' ? 'Finalise the article draft' : 'Finalise the post text',
      explain: 'Read it once for meaning and once aloud for rhythm. Remove generic lines. Check every claim against your sources.',
      copy: [{ label: 'Full text', text: p.body }],
      evaluate: 'Would a busy business owner learn something specific in 30 seconds of reading?',
    });
  }
  if (p.slides?.length) {
    const canvas = p.format === 'li-document' ? '1080×1350 (export as PDF)' : p.format.endsWith('story') ? '1080×1920' : p.format === 'fb-multi-image' ? '1080×1350 (export PNGs)' : '1080×1440 (export PNGs)';
    steps.push({
      id: 'g-canva', title: 'Build it in Canva',
      explain: `Open Canva → Create a design → Custom size ${canvas}. Set the Brand Kit colours (#111210, #F3F0E9, #CDB98A). Build slide 1 first, then duplicate the page for each slide so margins match. Body text at least 32 px; headlines 64–90 px serif.`,
      link: { label: 'Open Canva', url: 'https://www.canva.com/' },
      copy: p.slides.map((s) => ({ label: `Slide ${s.n} — ${s.layout}`, text: s.text + (s.visual ? `\n\n[Visual: ${s.visual}]` : '') })),
      settings: `Size ${canvas}. Margins 80 px. Max 40 words per slide.`,
      evaluate: 'View on your phone: can every slide be read in 3 seconds?',
      troubleshoot: 'Too much text → split into two slides or cut adjectives.',
    });
  }
  if (p.shots?.length) {
    const own = p.shots.filter((s) => s.method !== 'AI-generated');
    steps.push({
      id: 'g-record', title: 'Record your own footage and screens',
      explain: 'Film every shot that is not AI-generated. Phone: vertical, 1080p 30 fps, lock exposure, window light, 3 takes, 2 seconds stillness at each end. Screen recordings on Mac: Cmd+Shift+5, hide bookmarks and turn on Do Not Disturb.',
      material: own.map((s) => `Shot ${s.n} (${s.method}, ${s.length}): ${s.film} — angle: ${s.angle}; background: ${s.background}`).join('\n'),
      evaluate: 'Each clip is sharp, steady and at least 1 second longer than needed.',
      troubleshoot: 'Shaky footage → rest the phone on books; flicker under lights → film by daylight.',
    });
  }
  if (p.aiShots?.length) {
    p.aiShots.forEach((a, i) => steps.push({
      id: `g-ai-${i}`, title: `Generate AI shot: ${a.ref}`,
      explain: `${a.why} Use ${a.tool} in ${a.mode} mode. First create the start frame, then animate.`,
      material: a.startFrame ? `Start frame: ${a.startFrame}` : undefined,
      copy: [{ label: 'Prompt', text: a.prompt }, ...(a.negative ? [{ label: 'Negative prompt', text: a.negative }] : [])],
      settings: `Aspect ${a.aspect} · Duration ${a.duration} · Camera: ${a.cameraMotion} · Subject motion: ${a.subjectMotion}`,
      link: a.tool.toLowerCase().includes('veo') ? { label: 'Open Flow', url: 'https://labs.google/flow' } : a.tool.toLowerCase().includes('runway') ? { label: 'Open Runway', url: 'https://runwayml.com' } : { label: 'Open Kling', url: 'https://klingai.com' },
      evaluate: a.evaluate,
      troubleshoot: 'Warping → shorten and slow the motion; inconsistent look → use image-to-video from the same keyframe; still bad → use the no-AI alternative in the AI Video tab.',
    }));
  }
  if (isVideo) {
    steps.push({
      id: 'g-vo', title: 'Record the voiceover',
      explain: p.voiceover?.recording || 'Record in a small furnished room, phone 15–20 cm from your mouth, Voice Memos app. Speak at a relaxed pace; pause between sentences so cuts are easy.',
      copy: p.voiceover?.script ? [{ label: 'Narration', text: p.voiceover.script }] : undefined,
      settings: p.voiceover?.pace,
      evaluate: 'No room echo, no clipped words, consistent volume.',
      troubleshoot: 'Echo → record inside a wardrobe or under a blanket; noise → turn off fans/AC.',
    });
    steps.push({
      id: 'g-edit', title: `Edit in ${p.editApp ?? 'your editor'}`,
      explain: 'Follow these steps in order. Tick each one mentally; come back here if you get lost.',
      copy: [{ label: 'Edit steps', text: (p.editGuide ?? []).map((s, i) => `${i + 1}. ${s}`).join('\n') }],
      link: p.format === 'yt-long' ? { label: 'DaVinci Resolve', url: 'https://www.blackmagicdesign.com/products/davinciresolve' } : { label: 'Instagram Edits', url: 'https://www.instagram.com/edits/' },
      evaluate: 'Run the QC pass: sound off, sound on, on a phone, full brightness.',
    });
  }
  if (p.thumbnails?.length) {
    steps.push({
      id: 'g-thumb', title: 'Make the thumbnail',
      explain: 'Choose one of the three packaging concepts, generate or photograph the base image, then add text in Canva at 1280×720. Check it at small size.',
      copy: p.thumbnails.map((t) => ({ label: t.name, text: `${t.prompt}\n\nCanva: ${t.canva}` })),
      evaluate: 'Shrink to 25% on screen: can you still read it and see the subject?',
    });
  }
  steps.push({
    id: 'g-publish', title: 'Prepare the publishing package',
    explain: 'Copy the caption/description and CTA. Add keywords naturally. Check links have UTM tags.',
    copy: [
      ...(p.publishing?.title ? [{ label: 'Title', text: p.publishing.title }] : []),
      ...(p.caption ? [{ label: p.platform === 'youtube' ? 'Description' : 'Caption', text: p.caption }] : []),
      ...(p.cta ? [{ label: 'CTA', text: p.cta }] : []),
      ...(p.publishing?.hashtags ? [{ label: 'Hashtags (optional)', text: p.publishing.hashtags }] : []),
      ...(p.publishing?.alt ? [{ label: 'Alt text / accessibility', text: p.publishing.alt }] : []),
    ],
    settings: p.publishing?.bestTime,
    evaluate: 'Caption’s first line works on its own; one CTA only.',
  });
  steps.push({
    id: 'g-check', title: 'Run the publishing checklist and publish',
    explain: 'Go to the Checklist tab. The post can’t be marked Ready to Publish until required items are ticked. Publish natively or schedule (Meta Business Suite / LinkedIn / YouTube Studio), then paste the live URL.',
    link: p.platform === 'youtube' ? { label: 'YouTube Studio', url: 'https://studio.youtube.com' } : p.platform === 'linkedin' ? { label: 'LinkedIn', url: 'https://www.linkedin.com/feed/' } : { label: 'Meta Business Suite', url: 'https://business.facebook.com' },
  });
  steps.push({
    id: 'g-measure', title: 'Review results after 7 days',
    explain: `Open the platform’s analytics and enter the real numbers in the Results tab. Metrics to look at: ${p.publishing?.metrics ?? defaultMetrics(p.format)}.`,
    evaluate: 'Compare with your own previous posts of the same format, not with other accounts.',
  });
  return steps;
}
