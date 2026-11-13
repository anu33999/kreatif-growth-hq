import type { Asset } from '../lib/types';

const PALETTE = 'Charcoal #111210 · Cream #F3F0E9 · Gold #CDB98A (accent only, ≤10% of area)';
const TYPE = 'Headlines: Cormorant Garamond SemiBold · Body/UI: Inter Regular/SemiBold';
const LOGO = 'Wordmark “KREATIF ATELIER” in cream on charcoal or charcoal on cream; min width 160 px; never on busy photos without a panel';

type T = [name: string, platform: Asset['platform'], dims: string, purpose: string, elements: string, safe: string, exp: string, prompt?: string];
const TEMPLATES: T[] = [
  ['Instagram Reel cover', 'instagram', '1080×1920', 'Readable title on the Reel and in the 3:4 grid crop', 'Full-bleed frame or photo, charcoal panel, serif title 2 lines', 'Title within centre 1080×1440; avoid bottom 380 px', 'PNG/JPG 1080×1920'],
  ['Instagram carousel (cover + inner)', 'instagram', '1080×1440', 'Saveable educational sequences', 'Cover: photo + headline; inner: numeral, headline, 2–3 lines; gold rule; page dots', '80–90 px margins', 'PNG per slide, upload in order'],
  ['Instagram/Facebook Story frame', 'multi', '1080×1920', 'Polls, questions, links, teasers', 'Text block top third; sticker space middle', '250 px top and bottom clear', 'PNG; add stickers in-app'],
  ['LinkedIn document page', 'linkedin', '1080×1350', 'Professional frameworks/checklists', 'Numeral + headline + body + “How to check” box; footer with page number', '90 px margins', 'PDF (Canva → PDF Standard)'],
  ['LinkedIn post image', 'linkedin', '1200×627 or 1080×1350', 'Diagrams, before/after, process', 'Cream background, charcoal diagram, small caps labels', 'Text ≥ 32 px', 'PNG'],
  ['LinkedIn personal banner', 'linkedin', '1584×396', 'Profile positioning', 'Charcoal, cream serif line, gold rule; right side clear of profile photo overlap on left', 'Keep text right of 568 px from left (photo overlap) and centred vertically', 'PNG'],
  ['LinkedIn Page cover', 'linkedin', '1128×191', 'Company legitimacy', '“Creative should move the business.”', 'Centre 60%', 'PNG'],
  ['Facebook image post', 'facebook', '1080×1350', 'Practical tips, offers', 'Plain, high contrast, one message', 'Avoid text near edges', 'JPG'],
  ['Facebook Page cover', 'facebook', '≈1640×624', 'Page first impression', 'Photo left, cream panel right with one line', 'Text in centre 820×312', 'JPG'],
  ['Facebook Reel cover', 'facebook', '1080×1920', 'Reel thumbnail', 'Same as IG Reel cover, practical title', 'Centre area', 'JPG'],
  ['YouTube thumbnail', 'youtube', '1280×720', 'Packaging for long-form', 'One subject, ≤3 words, strong contrast', 'Avoid bottom-right (timestamp)', 'JPG < 2 MB'],
  ['YouTube channel banner', 'youtube', '2048×1152', 'Channel identity', 'Charcoal, one line + schedule', 'All text inside centre 1235×338', 'PNG/JPG < 6 MB'],
  ['YouTube profile icon', 'youtube', '800×800', 'Recognisable at 98 px', 'Gold “KA” monogram on charcoal', 'Circle crop', 'PNG'],
  ['Video title card', 'multi', '1080×1920 / 1920×1080', 'Section titles and end cards', 'Cream card, serif title, gold rule, URL', 'Centre', 'PNG or Canva animation MP4'],
  ['Educational diagram', 'multi', '1080×1350', 'Explain flows (funnel, booking path)', 'Boxes + arrows, max 6 nodes, labels in Inter', 'Margins 80 px', 'PNG/SVG'],
  ['Website transformation comparison', 'multi', '1080×1440 / 1920×1080', 'Before/after', 'Two device frames, labels BEFORE/AFTER, “Concept redesign” tag', 'Labels inside safe area', 'PNG; video wipe in editor'],
  ['Case-study layout', 'multi', '1080×1350', 'Cleared client work only', 'Client, scope, approach, outcome (only measured)', '—', 'PDF/PNG'],
  ['Campaign landing-page visual', 'website', '1440×900 hero', 'Audit landing page', 'Headline, 3 bullets, form, proof', '—', 'Figma/Canva → dev'],
  ['Brand photography set', 'multi', 'Various', 'Original, reusable imagery', 'See Photography Studio briefs ph1–ph12', '—', 'JPG full res + web 2048 px'],
];

export function buildAssets(t: number): Asset[] {
  const templates: Asset[] = TEMPLATES.map((x, i) => ({
    id: `tpl_${String(i + 1).padStart(2, '0')}`, name: x[0], type: 'Template', platform: x[1], source: 'Original', status: 'Needed', isTemplate: true, dims: x[2],
    method: 'Canva (create once, duplicate per post)', location: 'Canva → Folder “KA Templates” (add link)',
    template: { purpose: x[3], elements: x[4], palette: PALETTE, typography: TYPE, safeAreas: x[5], logo: LOGO, export: x[6] },
    permissions: 'Owned by Kreatif Atelier. Fonts are Google Fonts (OFL).', postIds: [], createdAt: t + i, updatedAt: t + i,
  }));

  const a = (id: string, name: string, type: string, source: Asset['source'], postIds: string[], method: string, brief: string, prompt?: string, status: Asset['status'] = 'Needed'): Asset =>
    ({ id, name, type, source, postIds, method, brief, prompt, status, platform: 'multi', permissions: source === 'AI-generated' ? 'Check the generator plan permits commercial use; no real people/brands depicted.' : 'Original — owned.', createdAt: t, updatedAt: t });

  const reel = ['post_w1_ig_reel_book', 'post_w1_fb_reel_book', 'post_w1_yt_short_book', 'post_w1_li_video_book', 'post_w2_yt_long_restaurant'];
  const production: Asset[] = [
    a('as_A1', 'A1 — BEFORE concept restaurant site, mobile recording', 'Screen recording', 'Screen recording', reel, 'Build a deliberately flawed one-page concept for “Olive & Ember” (fictional): full-screen video hero, menu icon hiding Reservations, hours in footer. Record on iPhone: Control Centre → Screen Recording; scroll slowly from top to footer, then open menu → Reservations.', 'Record 3 takes, portrait, 6–10 s each. Do Not Disturb on.'),
    a('as_A2', 'A2 — AFTER concept restaurant site, mobile recording', 'Screen recording', 'Screen recording', reel, 'Same concept with sticky “Book a table” bar, still hero photo with hours + address, 3-field booking form.', 'Record load → hero → tap Book → form.'),
    a('as_A3', 'A3 — Gold light sweep transition', 'Video clip', 'AI-generated', ['post_w1_ig_reel_book'], 'Kling/Veo image-to-video from paper keyframe, or phone macro (photo brief ph9).', 'See AI Video tab of the Reel.', 'A thin line of warm golden light slowly sweeps from left to right across folded cream paper. Camera static, very slight push-in. Soft shadows, matte paper texture, shallow depth of field.'),
    a('as_A4', 'A4 — Before/after split still', 'Graphic', 'Original', reel, 'Canva 1080×1920: two phone mockups side by side; label “Concept redesign — fictional restaurant”.', 'Use screenshots from A1/A2.'),
    a('as_A5', 'A5 — Gold annotation circle (transparent PNG)', 'Graphic', 'Original', ['post_w1_ig_reel_book'], 'Canva: Elements → circle outline, stroke #CDB98A 10 px → download PNG transparent (Pro) or draw in Figma/Keynote.', ''),
    a('as_A6', 'A6 — End card “Comment AUDIT”', 'Graphic', 'Original', ['post_w1_ig_reel_book'], 'Canva 1080×1920 cream, serif text, gold rule, URL.', ''),
    a('as_A7', 'A7 — Reel cover “Your website is hiding the Book button”', 'Cover', 'Original', ['post_w1_ig_reel_book'], 'Template: Instagram Reel cover. Photo ph3 + title.', ''),
    a('as_ph1', 'Desk hero photo (ph1)', 'Photograph', 'Original', ['post_w2_ig_car_audit', 'post_w4_fb_post_pinned', 'post_w2_li_doc_checklist'], 'Photography Studio brief ph1.', 'Shoot in batch session 1.'),
    a('as_D_set', 'D1–D3 — Concept checkout & donation flows', 'Screen recording', 'Screen recording', ['post_w3_ig_reel_donate', 'post_w3_fb_multi_donate', 'post_w3_yt_short_donate'], 'Figma prototypes: shop checkout (3 steps), bad donation (7+), redesigned donation.', 'Generic, no real NGO branding.'),
  ];
  return [...templates, ...production];
}
