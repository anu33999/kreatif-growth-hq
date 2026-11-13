// Tool research. Checked 2026-10-28 by web search. Third-party pricing pages disagreed in places,
// so every row carries a confidence level and an official link to confirm before paying.

export const CHECKED = '2026-10-28';

export interface ToolRow {
  name: string;
  url: string;
  kind: 'AI video' | 'AI image' | 'Editor' | 'Voice' | 'Design' | 'Scheduler' | 'Analytics' | 'Recording';
  access: string;         // pricing tier summary
  india: string;          // availability for an India-based user
  t2v?: string; i2v?: string; refs?: string; camera?: string; aspect?: string;
  bestFor: string;
  watchOut: string;
  confidence: 'High' | 'Medium' | 'Low';
  sources: { title: string; url: string }[];
}

export const AI_VIDEO_TOOLS: ToolRow[] = [
  {
    name: 'Google Veo (Gemini app & Flow)', url: 'https://labs.google/flow', kind: 'AI video',
    access: 'Paid: requires a Google AI Pro or Ultra subscription. India launch coverage (July 2025) quoted ₹1,950/month for AI Pro with daily generation limits and a one-month trial offer. Re-check current plan and quota on Google’s plan page.',
    india: 'Available in India through Gemini (AI Pro) since July 2025 per Indian tech press. Flow availability by country: confirm on labs.google/flow.',
    t2v: 'Yes', i2v: 'Yes (start frame / “frames to video” in Flow)', refs: 'Flow supports ingredients/reference images (check current model)', camera: 'Prompt-described; Flow offers camera controls on some models', aspect: '16:9 standard; check 9:16 option in your interface',
    bestFor: 'Short (≈8 s) photoreal shots with native sound; good motion quality.',
    watchOut: 'Daily quotas on Pro; generated text on screens is unreliable; keep each shot simple.',
    confidence: 'Medium',
    sources: [
      { title: 'Business Today — Veo 3 expands to India via AI Pro (Jul 2025)', url: 'https://www.businesstoday.in/technology/news/story/google-expands-veo-3-ai-video-tool-to-india-now-available-via-gemini-ai-pro-plan-482912-2025-07-03' },
      { title: 'Google One AI plans (official)', url: 'https://one.google.com/about/google-ai-plans/' },
    ],
  },
  {
    name: 'Runway', url: 'https://runwayml.com/pricing', kind: 'AI video',
    access: 'Free plan with a one-time credit grant (reported as 125 credits, no refresh). Paid tiers reported at roughly $12–15 (Standard), $28 (Pro) and $76 (Max) per user per month. Credit cost per second varies by model.',
    india: 'Web app; no India restriction found. Billed in USD on an international card.',
    t2v: 'Yes', i2v: 'Yes', refs: 'Yes — reference images for consistent subjects (Gen-4 family)', camera: 'Yes — prompt plus camera controls on supported models', aspect: '16:9, 9:16, 1:1 and others',
    bestFor: 'Image-to-video from a designed keyframe; consistent product/object shots using references.',
    watchOut: 'Free credits run out after a few seconds of video; which models the free plan includes is disputed — check before planning around it.',
    confidence: 'Medium',
    sources: [
      { title: 'Runway pricing (official)', url: 'https://runwayml.com/pricing' },
      { title: 'eesel.ai — Runway pricing 2026 (third-party)', url: 'https://eesel.ai/blog/runway-ai-pricing' },
    ],
  },
  {
    name: 'Kling AI', url: 'https://klingai.com', kind: 'AI video',
    access: 'Free tier with daily credits (widely reported as ~66/day, watermarked, restricted commercial use). Paid plans reported from about $7–10/month; figures conflict between sources.',
    india: 'Web app accessible; no India-specific block found. Confirm commercial-use terms for your plan.',
    t2v: 'Yes', i2v: 'Yes, including start and end frames', refs: 'Element/reference features on newer models', camera: 'Camera movement presets on some models', aspect: '16:9, 9:16, 1:1',
    bestFor: 'Cheapest way to practise image-to-video daily; start/end frame transitions.',
    watchOut: 'Free output is watermarked and not cleared for commercial use — use paid credits for published client-facing work.',
    confidence: 'Medium',
    sources: [
      { title: 'Kling (official)', url: 'https://klingai.com' },
      { title: 'eesel.ai — Kling pricing 2026 (third-party)', url: 'https://eesel.ai/blog/kling-ai-pricing' },
    ],
  },
  {
    name: 'Canva (AI video clip + video editor)', url: 'https://www.canva.com/pricing/', kind: 'AI video',
    access: 'Canva Free covers design and basic video editing. AI video-clip generation has been offered on paid plans with monthly limits. Confirm the current allowance in your Canva account.',
    india: 'Available in India with INR pricing.',
    t2v: 'Limited (short clips, paid)', i2v: 'Limited', refs: 'No', camera: 'No', aspect: 'Any canvas size',
    bestFor: 'Beginners: carousels, LinkedIn documents, thumbnails, kinetic text and simple video assembly in one place.',
    watchOut: 'AI clip length and quota are small; treat as a convenience, not a production engine.',
    confidence: 'Low',
    sources: [{ title: 'Canva pricing (official)', url: 'https://www.canva.com/pricing/' }],
  },
  {
    name: 'Adobe Firefly (video)', url: 'https://firefly.adobe.com', kind: 'AI video',
    access: 'Generative credits; video generation on paid Firefly/Creative Cloud plans. Check credit cost per clip.',
    india: 'Available in India.',
    t2v: 'Yes', i2v: 'Yes', refs: 'Limited', camera: 'Camera angle/motion presets', aspect: '16:9, 9:16',
    bestFor: 'Commercially-safe positioning (Adobe states training on licensed content); B-roll and abstract motion.',
    watchOut: 'Credits are consumed quickly on video.',
    confidence: 'Low',
    sources: [{ title: 'Adobe Firefly (official)', url: 'https://firefly.adobe.com' }],
  },
  {
    name: 'OpenAI Sora', url: 'https://openai.com/sora', kind: 'AI video',
    access: 'Not usable: multiple reports say OpenAI shut the Sora app and web experience on 26 April 2026 and scheduled the API to switch off later in 2026. It was never officially available in India.',
    india: 'Not available.',
    bestFor: '—', watchOut: 'Do not plan production around Sora. Confirm on openai.com if this changes.',
    confidence: 'Medium',
    sources: [
      { title: 'Free Press Journal — Sora Android launch excluded India', url: 'https://www.freepressjournal.in/tech/openai-launches-sora-ai-video-generation-app-on-android-is-it-up-for-download-in-india' },
      { title: 'aiclips — Sora alternatives for Indian creators (reports shutdown)', url: 'https://blog.aiclips.net/?p=4623' },
    ],
  },
];

export const EDITORS: ToolRow[] = [
  {
    name: 'Instagram Edits', url: 'https://www.instagram.com/edits/', kind: 'Editor',
    access: 'Free (launched April 2025 on iOS and Android). Exports without a watermark.',
    india: 'Available in India; Indian-language fonts added. Some newer templates may not reach India.',
    aspect: '9:16 native',
    bestFor: 'Recommended phone editor for Reels, Facebook Reels and YouTube Shorts: timeline, auto-captions, green screen, cut-outs.',
    watchOut: 'Interface changes often — the steps in Growth HQ describe what to look for, not exact pixel positions.',
    confidence: 'Medium',
    sources: [{ title: 'Business Standard — Edits available on iOS & Android', url: 'https://business-standard.com/amp/technology/tech-news/instagram-edits-ai-powered-video-editing-app-available-on-ios-android-125042300730_1.html' }],
  },
  {
    name: 'DaVinci Resolve (free)', url: 'https://www.blackmagicdesign.com/products/davinciresolve', kind: 'Editor',
    access: 'Free version is fully usable for 1080p/4K editing; Studio is a paid one-time licence.',
    india: 'Available (desktop download for Mac/Windows/Linux).',
    aspect: 'Any — set timeline resolution to 1080×1920 for vertical or 1920×1080 for YouTube',
    bestFor: 'YouTube long-form and LinkedIn explainers on your Mac: multi-track timeline, subtitles, audio cleanup (Fairlight).',
    watchOut: 'Steeper learning curve; needs a reasonably capable computer.',
    confidence: 'High',
    sources: [{ title: 'Blackmagic Design — DaVinci Resolve (official)', url: 'https://www.blackmagicdesign.com/products/davinciresolve' }],
  },
  {
    name: 'Canva video editor', url: 'https://www.canva.com/video-editor/', kind: 'Editor',
    access: 'Free with paid features (background removal, some elements, brand kit).',
    india: 'Available.',
    aspect: 'Any',
    bestFor: 'Kinetic-text Reels, slideshow-style explainers, and quick assembly from templates.',
    watchOut: 'Fine trimming and audio work are limited compared with Edits or Resolve.',
    confidence: 'High',
    sources: [{ title: 'Canva video editor (official)', url: 'https://www.canva.com/video-editor/' }],
  },
  {
    name: 'CapCut', url: 'https://www.capcut.com', kind: 'Editor',
    access: '—',
    india: 'Blocked in India since June 2020 under Section 69A of the IT Act and still blocked in 2026 per multiple reports. Not available on Indian app stores.',
    bestFor: 'Not recommended for an India-based operator.',
    watchOut: 'Using a VPN does not change its legal status. Use Edits, Canva or DaVinci Resolve instead.',
    confidence: 'Medium',
    sources: [{ title: 'fluxnote — CapCut alternative for India 2026', url: 'https://fluxnote.io/guides/capcut-alternative-india' }],
  },
  {
    name: 'Screen Studio (Mac) / QuickTime / OBS', url: 'https://screen.studio', kind: 'Recording',
    access: 'Screen Studio is paid (one-time or subscription — check site). QuickTime (built into macOS) and OBS Studio (obsproject.com) are free.',
    india: 'Available.',
    bestFor: 'Website teardown recordings. Screen Studio adds automatic zoom and smooth cursor; QuickTime/OBS work with manual zooms in the editor.',
    watchOut: 'Record at the largest window size you can; hide bookmarks, tabs and notifications first.',
    confidence: 'Medium',
    sources: [{ title: 'Screen Studio (official)', url: 'https://screen.studio' }, { title: 'OBS Studio (official)', url: 'https://obsproject.com' }],
  },
];

export const VOICE_TOOLS: ToolRow[] = [
  {
    name: 'Your own voice (phone + Voice Memos)', url: 'https://support.apple.com/guide/iphone/make-a-recording-iph4d2a39a3b/ios', kind: 'Voice',
    access: 'Free', india: 'Available',
    bestFor: 'Default choice. A real founder voice builds more trust with US/UK buyers than a synthetic one.',
    watchOut: 'Record in a small soft-furnished room, 15–20 cm from the phone, away from fans.',
    confidence: 'High', sources: [],
  },
  {
    name: 'ElevenLabs', url: 'https://elevenlabs.io/pricing', kind: 'Voice',
    access: 'Free tier with monthly character limit; commercial use generally requires a paid plan. Confirm licence terms on the pricing page.',
    india: 'Available.',
    bestFor: 'Draft narration to test timing; multilingual versions.',
    watchOut: 'Disclose AI voice where appropriate; avoid cloning anyone’s voice without written consent.',
    confidence: 'Medium', sources: [{ title: 'ElevenLabs pricing (official)', url: 'https://elevenlabs.io/pricing' }],
  },
];

export const SCHEDULERS: ToolRow[] = [
  {
    name: 'Meta Business Suite', url: 'https://business.facebook.com', kind: 'Scheduler',
    access: 'Free', india: 'Available',
    bestFor: 'Schedule Instagram and Facebook posts, Reels and Stories; unified inbox for DMs and Messenger; Insights for both.',
    watchOut: 'Requires an Instagram professional account connected to a Facebook Page. Some Reels features (music, certain stickers) are only available when posting from the app.',
    confidence: 'Medium', sources: [{ title: 'Meta Business Suite help (official)', url: 'https://www.facebook.com/business/help' }],
  },
  {
    name: 'LinkedIn native scheduling', url: 'https://www.linkedin.com/help/linkedin/answer/a518996/posting-and-sharing-content-overview', kind: 'Scheduler',
    access: 'Free', india: 'Available',
    bestFor: 'Schedule posts from your personal profile or the company page directly in LinkedIn (clock icon in the post composer).',
    watchOut: 'Be online for the first hour after a post goes live so you can reply to comments.',
    confidence: 'Medium', sources: [{ title: 'LinkedIn posting overview (official)', url: 'https://www.linkedin.com/help/linkedin/answer/a518996/posting-and-sharing-content-overview' }],
  },
  {
    name: 'YouTube Studio', url: 'https://studio.youtube.com', kind: 'Scheduler',
    access: 'Free', india: 'Available',
    bestFor: 'Upload, schedule, add chapters, end screens, playlists; full analytics.',
    watchOut: 'Custom thumbnails and some features require a verified channel / feature eligibility.',
    confidence: 'High', sources: [{ title: 'YouTube Studio analytics help', url: 'https://support.google.com/youtube/answer/9002587' }],
  },
  {
    name: 'Buffer', url: 'https://buffer.com/pricing', kind: 'Scheduler',
    access: 'Free plan widely reported as 3 channels and 10 queued posts per channel; paid per channel.',
    india: 'Available',
    bestFor: 'One queue across LinkedIn, Instagram, Facebook and YouTube if you outgrow native tools.',
    watchOut: 'Free-plan analytics are limited; confirm on the pricing page.',
    confidence: 'Medium', sources: [{ title: 'Buffer pricing (official)', url: 'https://buffer.com/pricing' }],
  },
  {
    name: 'Metricool', url: 'https://metricool.com/pricing/', kind: 'Scheduler',
    access: 'Free plan exists; reported limits conflict (post caps and which networks are included). Paid plans add more brands and history.',
    india: 'Available',
    bestFor: 'Scheduling plus cross-platform analytics export.',
    watchOut: 'Check whether LinkedIn is included in the free tier before relying on it.',
    confidence: 'Low', sources: [{ title: 'Metricool pricing (official)', url: 'https://metricool.com/pricing/' }],
  },
];

export const ANALYTICS_TOOLS: ToolRow[] = [
  { name: 'Instagram Insights', url: 'https://help.instagram.com/788388387972460', kind: 'Analytics', access: 'Free (professional account)', india: 'Available', bestFor: 'Reach, views, saves, shares, profile visits, link taps, follows per post.', watchOut: 'Metric names change; record what Insights shows on the day you review.', confidence: 'Medium', sources: [] },
  { name: 'LinkedIn analytics (profile & Page)', url: 'https://www.linkedin.com/help/linkedin/answer/a564179', kind: 'Analytics', access: 'Free', india: 'Available', bestFor: 'Impressions, members reached, reactions, comments, reposts, follower demographics (Page).', watchOut: 'Personal and Page analytics are separate.', confidence: 'Low', sources: [] },
  { name: 'Meta Business Suite Insights / Professional dashboard', url: 'https://www.facebook.com/business/help', kind: 'Analytics', access: 'Free', india: 'Available', bestFor: 'Facebook Page reach, Reels plays, link clicks, messages.', watchOut: 'Organic Facebook reach is usually small for new Pages; judge by messages and clicks.', confidence: 'Medium', sources: [] },
  { name: 'YouTube Studio Analytics', url: 'https://support.google.com/youtube/answer/9002587', kind: 'Analytics', access: 'Free', india: 'Available', bestFor: 'Impressions, CTR, views, watch time, average view duration, retention, traffic sources, returning viewers.', watchOut: 'Shorts and long-form have different metric sets — review them separately.', confidence: 'High', sources: [] },
  { name: 'Google Analytics 4 + UTM links', url: 'https://support.google.com/analytics/answer/10917952', kind: 'Analytics', access: 'Free', india: 'Available', bestFor: 'Which platform/post sent website visitors and enquiries. Tag every link with utm_source, utm_medium, utm_campaign.', watchOut: 'Needs GA4 installed on kreatifatelier.com and a consent banner where required (UK/EU visitors).', confidence: 'High', sources: [{ title: 'GA4 UTM help', url: 'https://support.google.com/analytics/answer/10917952' }] },
];

export const IMAGE_TOOLS: ToolRow[] = [
  { name: 'Gemini / Imagen (Google)', url: 'https://gemini.google.com', kind: 'AI image', access: 'Free tier with limits; more with AI Pro', india: 'Available', bestFor: 'Keyframes and editorial images; editing an existing image with instructions.', watchOut: 'Generated text is often wrong — add all text in Canva.', confidence: 'Medium', sources: [] },
  { name: 'Adobe Firefly (image)', url: 'https://firefly.adobe.com', kind: 'AI image', access: 'Free credits monthly; paid for more', india: 'Available', bestFor: 'Commercially oriented imagery, generative fill to extend backgrounds into 9:16 or 16:9.', watchOut: 'Check credit balance before batch sessions.', confidence: 'Medium', sources: [] },
  { name: 'ChatGPT image generation', url: 'https://chatgpt.com', kind: 'AI image', access: 'Free with limits; more on paid plans', india: 'Available', bestFor: 'Fast concept exploration and style references.', watchOut: 'Do not generate fake screenshots, analytics or testimonials.', confidence: 'Medium', sources: [] },
  { name: 'Canva (Magic Media + design)', url: 'https://www.canva.com', kind: 'Design', access: 'Free; Pro for brand kit, resize, background remover', india: 'Available', bestFor: 'All final layouts: carousels, documents, thumbnails, covers, banners.', watchOut: 'Create a Brand Kit with #111210, #F3F0E9, #CDB98A before templating.', confidence: 'High', sources: [] },
];

export const ALL_TOOLS = [...AI_VIDEO_TOOLS, ...EDITORS, ...VOICE_TOOLS, ...SCHEDULERS, ...ANALYTICS_TOOLS, ...IMAGE_TOOLS];

// Non-AI alternatives, always available.
export const NO_AI_ALTERNATIVES = [
  { need: 'Cinematic website reveal', alt: 'Screen-record the site in a browser at 1080p, then add slow zoom (“Ken Burns”) and a cross-dissolve in Edits or Canva.' },
  { need: 'Laptop showing a design', alt: 'Photograph your own laptop on a wooden desk by a window, screen showing the design. Or use a free device mockup in Canva (search “laptop mockup”).' },
  { need: 'Abstract studio texture', alt: 'Film paper, fabric, light through blinds, or ink in water on your phone in slow motion (0.5×).' },
  { need: 'Before/after transformation', alt: 'Two screenshots stacked in Canva with a “wipe” transition, or a split-screen layout in Edits.' },
  { need: 'Dashboard animation', alt: 'Build a simple chart in Canva using clearly labelled sample numbers and animate it with “Rise” or “Pan”. Label it “Illustrative data”.' },
  { need: 'B-roll of “a business owner”', alt: 'Film your own hands typing, writing on paper, or holding a coffee — no faces needed, no identity issues.' },
];
