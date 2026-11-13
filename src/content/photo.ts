export interface PhotoBrief {
  id: string; name: string; use: string; subject: string; composition: string; lighting: string;
  angle: string; background: string; framing: string; textSafe: string; platforms: string;
}

export const PHOTO_BATCH_INTRO = `One 2-hour batch session gives you 30–60 original images to reuse for months.

### Kit
- Phone (rear camera, 1× lens; use the 2× lens for close-ups to avoid distortion)
- A window with soft daylight (morning or late afternoon), no direct sun
- A light oak or neutral desk, a linen cloth, a cream sheet of card (backdrop), a black sheet of card
- Laptop, notebook, pen, coffee cup, printed wireframes/sketches, colour swatches (charcoal, cream, gold)
- Optional: cheap white foam board to bounce light into shadows

### Settings
- Clean the lens. Turn on the grid. Lock focus and exposure (tap and hold), then slide brightness slightly down.
- Shoot each brief vertically (9:16 / 3:4) AND horizontally (16:9) so it works on every platform.
- Take 5–10 frames per brief. Shoot RAW/ProRAW only if you will edit it.

### Rules
- No client confidential material visible on screens or paper.
- Only photograph people who have agreed; keep a note of the consent in the asset record.
- Don’t stage fake “client meetings” presented as real.`;

export const PHOTO_BRIEFS: PhotoBrief[] = [
  { id: 'ph1', name: 'Desk hero — laptop with concept website', use: 'Reel covers, LinkedIn banner, YouTube thumbnail background', subject: 'Open laptop showing a Kreatif concept site; notebook and pen', composition: 'Laptop lower-right third; empty space top-left', lighting: 'Window light from left, white board bouncing from right', angle: 'Seated eye level, 3/4 view', background: 'Plain cream wall', framing: 'Vertical and horizontal versions', textSafe: 'Top 35% empty', platforms: 'All' },
  { id: 'ph2', name: 'Hands sketching a wireframe', use: 'Process Reels, LinkedIn “how we work” posts', subject: 'Your hands drawing boxes of a homepage wireframe on paper', composition: 'Top-down, paper fills 70% of frame', lighting: 'Soft window light, no harsh shadow over the paper', angle: 'Directly overhead (flat lay)', background: 'Oak desk', framing: '3:4 and 9:16', textSafe: 'Bottom 20% empty desk', platforms: 'IG, LinkedIn' },
  { id: 'ph3', name: 'Phone showing a mobile site in hand', use: 'Before/after hooks, Facebook posts', subject: 'Your hand holding a phone with a mobile site (your concept or a mock)', composition: 'Phone centred, slightly tilted', lighting: 'Side window light; avoid screen glare by angling', angle: 'Slightly above', background: 'Blurred cream or charcoal', framing: '9:16', textSafe: 'Top 25%', platforms: 'IG, FB, YT Shorts' },
  { id: 'ph4', name: 'Colour swatches + type specimen', use: 'Brand-identity posts, carousel covers', subject: 'Printed palette cards (#111210, #F3F0E9, #CDB98A) and a serif type sample', composition: 'Diagonal arrangement, negative space on one side', lighting: 'Soft, even', angle: 'Overhead', background: 'Linen', framing: '3:4, 1:1', textSafe: 'Right 40%', platforms: 'IG, LinkedIn' },
  { id: 'ph5', name: 'Screen detail macro', use: 'Transitions, B-roll', subject: 'Close-up of a button or headline on screen (your work)', composition: 'Fill frame, shallow focus', lighting: 'Room dim, screen as light source', angle: 'Slight angle to show depth', background: 'Screen', framing: '9:16, 16:9', textSafe: 'n/a (B-roll)', platforms: 'All' },
  { id: 'ph6', name: 'Founder portrait (consenting team member)', use: 'Profile photos, LinkedIn, YouTube thumbnails', subject: 'Team member looking at camera, relaxed', composition: 'Head and shoulders, eyes on upper third line', lighting: 'Window light 45° to face, bounce card on other side', angle: 'Eye level', background: 'Charcoal or cream wall', framing: '1:1 and 16:9 with space for thumbnail text', textSafe: 'One side 40% empty', platforms: 'All' },
  { id: 'ph7', name: 'Printed audit on desk', use: 'Lead magnet promotion, LinkedIn document cover', subject: 'Printed checklist pages with handwritten notes (your own checklist)', composition: 'Pages fanned, pen on top', lighting: 'Soft', angle: 'Overhead', background: 'Oak', framing: '3:4', textSafe: 'Top 30%', platforms: 'IG, LinkedIn, FB' },
  { id: 'ph8', name: 'Coffee + notebook “working session”', use: 'Stories backgrounds, quote cards', subject: 'Cup, notebook with headline notes, laptop edge', composition: 'Asymmetric, lots of space', lighting: 'Morning window light', angle: '45°', background: 'Linen + oak', framing: '9:16', textSafe: 'Top half', platforms: 'IG/FB Stories' },
  { id: 'ph9', name: 'Gold line light study', use: 'Branded transitions, intro sting', subject: 'Strip of light across cream paper (use blinds or a card with a slit)', composition: 'Light line diagonal', lighting: 'Hard sunlight through a gap', angle: 'Overhead', background: 'Cream paper on black card', framing: '9:16 video (10 s) + stills', textSafe: 'All', platforms: 'All' },
  { id: 'ph10', name: 'Whiteboard / sticky-note strategy wall', use: 'LinkedIn process posts, YouTube B-roll', subject: 'Sticky notes of a customer journey (generic, no client names)', composition: 'Wide, notes in rows', lighting: 'Even room light', angle: 'Straight on', background: 'Wall', framing: '16:9 and 4:5', textSafe: 'Top band', platforms: 'LinkedIn, YouTube' },
  { id: 'ph11', name: 'Device trio flat lay', use: 'Responsive design posts', subject: 'Laptop, tablet, phone showing the same concept site', composition: 'Staggered sizes left to right', lighting: 'Soft, avoid reflections', angle: 'Overhead', background: 'Charcoal card', framing: '16:9, 3:4', textSafe: 'Top 25%', platforms: 'All' },
  { id: 'ph12', name: 'Hands on keyboard (B-roll)', use: 'Any narration', subject: 'Typing hands', composition: 'Low angle along keyboard', lighting: 'Window', angle: 'Low side', background: 'Blurred desk', framing: '9:16 video 10 s', textSafe: 'n/a', platforms: 'All' },
];

export const IMAGE_PROMPT_FIELDS = [
  'subject', 'setting', 'composition', 'angle', 'lighting', 'palette', 'materials', 'lens', 'mood', 'negativeSpace', 'exclusions',
] as const;

export const DESTINATIONS = [
  { id: 'ig-reel-cover', label: 'Instagram Reel cover', dims: '1080×1920 (title inside centre 1080×1440)', ratio: '9:16' },
  { id: 'ig-carousel', label: 'Instagram carousel slide', dims: '1080×1440', ratio: '3:4' },
  { id: 'ig-story', label: 'Instagram/Facebook Story', dims: '1080×1920', ratio: '9:16' },
  { id: 'li-doc', label: 'LinkedIn document page', dims: '1080×1350', ratio: '4:5' },
  { id: 'li-image', label: 'LinkedIn image post', dims: '1200×627 or 1080×1350', ratio: '1.91:1 / 4:5' },
  { id: 'li-banner', label: 'LinkedIn personal banner', dims: '1584×396', ratio: '4:1' },
  { id: 'fb-post', label: 'Facebook image post', dims: '1080×1350', ratio: '4:5' },
  { id: 'fb-cover', label: 'Facebook Page cover', dims: '≈1640×624 (keep text central)', ratio: '≈2.6:1' },
  { id: 'yt-thumb', label: 'YouTube thumbnail', dims: '1280×720', ratio: '16:9' },
  { id: 'yt-banner', label: 'YouTube channel banner', dims: '2048×1152 (safe 1235×338)', ratio: '16:9' },
  { id: 'yt-short', label: 'YouTube Short frame', dims: '1080×1920', ratio: '9:16' },
];
