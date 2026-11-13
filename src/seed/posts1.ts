import type { Post } from '../lib/types';
import { defaultEditGuide, defaultMetrics } from '../lib/workflow';

// Launch plan weeks 1–2. All copy is starter material written for Kreatif Atelier.
// Restaurants shown are fictional concepts ("Olive & Ember") so no real business is implied as a client.

export const BEST_TIME_NOTE = 'Starting hypothesis: 18:30–19:30 IST (08:00–09:00 US Eastern, 13:00–14:00 UK). Replace with the hours Insights shows your followers are most active after 4 weeks.';

type Seed = Omit<Post, 'createdAt' | 'updatedAt' | 'workspace' | 'status'> & Partial<Pick<Post, 'workspace' | 'status'>>;

export const W12: Seed[] = [
  // ---------------- WEEK 1 ----------------
  {
    id: 'post_w1_ig_reel_book', masterId: 'idea_01', campaignId: 'c_restaurant', platform: 'instagram', account: '@kreatifatelier', format: 'ig-reel',
    title: 'Your website is hiding the Book button', date: '2026-11-02', time: '18:30', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Reach', effort: 'Medium', status: 'Script Ready',
    hooks: ['3 seconds on this site and I still can’t book a table.', 'Your website is hiding the Book button.', 'What I fix first on every restaurant website.'],
    hook: '3 seconds on this site and I still can’t book a table.',
    concept: {
      problem: 'On mobile, many restaurant homepages open with a full-screen photo or video, so the booking link sits below the fold or inside a menu. Hungry visitors leave or book elsewhere.',
      desiredResponse: 'Owner thinks “is mine like that?”, checks their site, saves or sends the Reel, visits the profile.',
      whyHold: 'Viewers watch a familiar frustration (scrolling for a button) resolve into a clean after-state within 15 seconds. The payoff is visual.',
      distinctive: 'A fictional but realistic concept restaurant with a consistent identity across the series; the “thumb” POV of a real phone; a 3-change formula people can copy.',
      risks: 'Could feel like mocking real restaurants — avoid by using a fictional concept. “Above the fold” jargon — explain it as “without scrolling”. Don’t claim a booking uplift percentage.',
      formatReason: 'Reach objective → short vertical Reel with a visible before/after; Instagram recommends Reels to non-followers.',
    },
    scenes: [
      { n: 1, time: '0:00', duration: '2.5s', visual: 'Phone screen recording: concept site “Olive & Ember” loads to a full-screen food video. Thumb scrolls, scrolls.', voice: 'Three seconds on this site and I still can’t book a table.', onScreen: 'Where’s the Book button?', camera: 'Screen recording (phone mirrored) with real thumb overlay', transition: 'Hard cut on thumb lift', sound: 'Scroll tick SFX, music starts low', assets: 'A1 Before-site mobile recording' },
      { n: 2, time: '0:02.5', duration: '3s', visual: 'Booking link found at the bottom inside a menu → highlighted with a gold circle.', voice: 'It’s here. Inside the menu. Under the footer.', onScreen: 'Found it: 4 scrolls + 1 menu', camera: 'Screen recording + gold circle annotation', transition: 'Cut', sound: 'Soft “pop” on circle', assets: 'A1, A5 gold circle element' },
      { n: 3, time: '0:05.5', duration: '3s', visual: 'Gold light sweep across folded paper (branded transition).', voice: 'Here’s what I change first.', onScreen: '3 changes', camera: 'AI-generated or phone macro', transition: 'Wipe right', sound: 'Whoosh, low', assets: 'A3 gold sweep clip' },
      { n: 4, time: '0:08.5', duration: '4s', visual: 'After-site: sticky “Book a table” bar at the bottom of the screen, visible immediately.', voice: 'One: a booking button that stays on screen — no scrolling needed.', onScreen: '1 · Book button always visible', camera: 'Screen recording of after-site', transition: 'Cut', sound: '', assets: 'A2 After-site mobile recording' },
      { n: 5, time: '0:12.5', duration: '4s', visual: 'Hero changes from video to a still photo with opening hours and address in the first screen.', voice: 'Two: hours and location in the first screen, not a ten-megabyte video.', onScreen: '2 · Hours + location up top', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'A2' },
      { n: 6, time: '0:16.5', duration: '4s', visual: 'Tap “Book” → booking form opens with date already focused, 3 fields only.', voice: 'Three: the booking form opens with the date ready. Three fields. Done.', onScreen: '3 · Fewer taps', camera: 'Screen recording', transition: 'Wipe (before/after split)', sound: 'Tap SFX', assets: 'A2' },
      { n: 7, time: '0:20.5', duration: '4s', visual: 'Split screen: before (left, cluttered) vs after (right, button visible). Label “Concept redesign — fictional restaurant”.', voice: 'Same restaurant. Same food. Easier to say yes.', onScreen: 'Before / After', camera: 'Design (Canva split)', transition: 'Cut', sound: 'Music rises', assets: 'A4 split-screen still' },
      { n: 8, time: '0:24.5', duration: '3.5s', visual: 'Cream title card with gold rule.', voice: 'Want me to check yours? Comment AUDIT and I’ll send the checklist.', onScreen: 'Comment AUDIT for the checklist', camera: 'Title card', transition: 'Fade', sound: 'Music out', assets: 'A6 end card' },
    ],
    altVersion: 'Alternative (talking-head) version: open on you holding a phone to camera: “I timed it. Eleven seconds to find the booking link on this restaurant site.” Then the same screen recordings as B-roll with your voice. Use this if you’re comfortable on camera; it often builds more trust with owners.',
    shots: [
      { n: 1, film: 'Scroll the BEFORE concept site on your phone from load to footer', visible: 'Full-screen food video, long sections, tiny menu icon', angle: 'Screen recording (iPhone Control Centre → Screen Recording)', method: 'Screen recording', background: 'n/a', length: '6s (use 2.5s)', onCamera: 'No', narration: 'Yes', purpose: 'Shows the frustration' },
      { n: 2, film: 'Open the menu and tap the tiny “Reservations” link', visible: 'Menu overlay, link at the bottom', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '4s', onCamera: 'No', narration: 'Yes', purpose: 'Proves the problem' },
      { n: 3, film: 'Gold light sweep over cream paper', visible: 'Line of light moving across texture', angle: 'Top-down macro', method: 'AI-generated', background: 'Cream paper on charcoal', length: '8s (use 3s)', onCamera: 'No', narration: 'Yes', purpose: 'Branded transition into the fix' },
      { n: 4, film: 'AFTER site: load homepage, sticky booking bar visible', visible: 'Bar with “Book a table” in gold', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '5s', onCamera: 'No', narration: 'Yes', purpose: 'Fix 1' },
      { n: 5, film: 'AFTER site: hero with hours + address', visible: 'Clean still photo, text block', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '5s', onCamera: 'No', narration: 'Yes', purpose: 'Fix 2' },
      { n: 6, film: 'AFTER site: tap Book, form with 3 fields', visible: 'Date picker focused', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '5s', onCamera: 'No', narration: 'Yes', purpose: 'Fix 3' },
      { n: 7, film: 'Before/after split still', visible: 'Two phone screens side by side + concept label', angle: 'Flat design', method: 'Design', background: 'Charcoal', length: '4s', onCamera: 'No', narration: 'Yes', purpose: 'Payoff' },
      { n: 8, film: 'End card', visible: '“Comment AUDIT for the checklist” + kreatifatelier.com', angle: 'Flat design', method: 'Design', background: 'Cream', length: '3.5s', onCamera: 'No', narration: 'Yes', purpose: 'CTA' },
    ],
    aiShots: [
      {
        ref: 'Shot 3 — gold sweep transition', why: 'A branded, abstract transition is hard to film precisely; AI (or a phone macro) gives a premium texture without needing any real business.',
        tool: 'Kling (practice, free) → Veo or Kling paid for the final', mode: 'Image-to-video',
        startFrame: 'Generate with the “Abstract studio texture (9:16)” prompt in Learning Centre Module 2, or photograph cream paper on black card (photo brief ph9).',
        prompt: 'A thin line of warm golden light slowly sweeps from left to right across folded cream paper. Camera static, very slight push-in. Soft shadows, matte paper texture, shallow depth of field. Calm, premium, editorial.',
        negative: 'text, letters, watermark, logo, hands, people, fast motion, flicker, colour shift, objects appearing',
        camera: 'Static top-down, slight push-in', lighting: 'Single hard light line, rest in soft shadow', style: 'Kreatif style bible (charcoal/cream/gold)',
        subjectMotion: 'Only the light moves', cameraMotion: 'Push-in ≈5% over clip', duration: '5–8 s generated, 3 s used', aspect: '9:16',
        continuity: 'Reused as the transition in every “What I fix first” episode', exclude: 'Any text, any food, any people', evaluate: 'Light moves smoothly with no paper warping in the 3 seconds you keep.',
      },
    ],
    voiceover: {
      script: 'Three seconds on this site and I still can’t book a table.\nIt’s here. Inside the menu. Under the footer.\nHere’s what I change first.\nOne: a booking button that stays on screen — no scrolling needed.\nTwo: hours and location in the first screen, not a ten-megabyte video.\nThree: the booking form opens with the date ready. Three fields. Done.\nSame restaurant. Same food. Easier to say yes.\nWant me to check yours? Comment AUDIT and I’ll send the checklist.',
      pace: '≈ 2.6 words/second (about 75 words in 28 s). Slight pause after “Here’s what I change first.”',
      recording: 'Phone Voice Memos, 15–20 cm from mouth, in a room with curtains/sofa. Record 3 takes; keep the most natural, not the most “announcer”.',
      aiVoice: 'Optional draft with ElevenLabs to test timing only; publish with your own voice if possible. If you use an AI voice, choose a calm conversational voice and check the plan’s commercial licence.',
      timing: 'In Edits, split the voice clip at each sentence and nudge to line up with the cut; leave 0.2 s breathing room.',
      pronunciation: '“Kreatif” = “kree-ah-TEEF”. “Atelier” = “at-ul-YAY”.',
      subtitles: 'Use auto-captions, then correct: “ten-megabyte”, “AUDIT” in capitals.',
      music: 'Instagram in-app library (licensed for use on Instagram) — calm lo-fi or minimal piano; volume 10–15% under voice. For YouTube/Facebook re-uploads, use music you hold rights for or YouTube Audio Library.',
    },
    editApp: 'Instagram Edits (phone)',
    editGuide: [
      'Create the concept sites first (Before/After) in your usual web tool or Figma prototype; record them on your phone (Control Centre → Screen Recording).',
      'Edits → New project → add clips in this order: S1 before scroll, S2 menu link, S3 gold sweep, S4–S6 after recordings, S7 split still, S8 end card.',
      'Trim to: 2.5s · 3s · 3s · 4s · 4s · 4s · 4s · 3.5s (total ≈28 s).',
      'Add the gold circle on S2: Text/Sticker → shape or upload a transparent PNG circle (asset A5); animate “pop” in.',
      'Import voiceover at 0:00; split at sentence ends; align each sentence with its clip.',
      'Add the on-screen text from the Scenes table using one font (sans, bold) in cream with a charcoal box; keep inside the centre safe area.',
      'Auto-captions → style: small, bottom-centre above the UI area; correct every word.',
      'Transition: one wipe between S6 and S7 (before/after). Everything else straight cuts.',
      'Music from Edits/Instagram library at ~12% volume; fade out over the last 1 s.',
      'Cover: upload the designed cover (asset A7). Export 1080p 30fps. Watch twice on the phone (sound on/off).',
    ],
    caption: 'Most restaurant websites don’t have a design problem. They have a “where do I click” problem.\n\nThe three changes I make first:\n1. A booking button that stays on screen\n2. Hours and location in the first screen\n3. A booking form that opens with the date ready\n\nThis is a concept redesign of a fictional restaurant — the problems are ones we see constantly.\n\nComment AUDIT and I’ll send you the checklist we use. Or send me your link and I’ll tell you the first thing I’d fix.',
    cta: 'Comment AUDIT for the checklist (reply personally; optional Manychat-style automation for the first message only).',
    visualDirection: 'Phone POV, charcoal frames around screen recordings, gold annotation, cream end card. Concept restaurant identity: “Olive & Ember” — terracotta photo tones, serif logo.',
    requiredAssets: 'A1 before-site recording · A2 after-site recording · A3 gold sweep · A4 split still · A5 gold circle PNG · A6 end card · A7 cover',
    publishing: {
      cover: 'Your website is hiding the Book button',
      keywords: 'restaurant website design, restaurant booking, café website, website conversion, mobile website',
      hashtags: '#restaurantwebsite #webdesign #restaurantmarketing (optional, max 3)',
      alt: 'Screen recording of a restaurant website on a phone where the booking link is hard to find, then a redesigned version with a booking button always visible.',
      bestTime: BEST_TIME_NOTE,
      storySequence: 'Day of posting: Story 1 — screenshot of the Reel’s first frame + “New: what I fix first on restaurant sites” + link sticker to Reel. Story 2 — poll “Can customers book from your homepage without scrolling? Yes / Not sure”. Story 3 — “Not sure? DM me AUDIT” + question sticker.',
      nextIdea: 'PDF menus cost bookings (idea #3) — same series format.',
      metrics: defaultMetrics('ig-reel') + '. Count comments with AUDIT and DMs from owners.',
    },
    tags: ['series:what-i-fix-first', 'keyword:AUDIT'],
  },
  {
    id: 'post_w1_li_text_clarity', masterId: 'idea_02', platform: 'linkedin', account: 'Founder (personal)', format: 'li-text',
    title: 'The 5-second clarity test', date: '2026-11-03', time: '18:30', pillar: 'Marketing Explained', audience: 'Professional services firms', objective: 'Authority', effort: 'Low', status: 'Script Ready',
    hooks: ['Most service websites fail a test that takes five seconds.', 'I open every website audit the same way: I look away after five seconds.', 'If a stranger can’t answer three questions in five seconds, the website is costing you enquiries.'],
    hook: 'I open every website audit the same way: I look away after five seconds.',
    concept: { problem: 'Service firms describe themselves (“trusted partner, passionate team”) instead of saying who they help and how to start.', desiredResponse: 'Reader tries the test on their own site and comments with what they found.', formatReason: 'Authority → text post explaining reasoning; LinkedIn readers are decision-makers who value a usable method.', risks: 'Could sound like generic advice; make it concrete with the three questions and an example rewrite.' },
    body: `I open every website audit the same way: I look at the homepage for five seconds, then look away.

Then I try to answer three questions:

1. Who is this business for?
2. What do they do for those people?
3. What should I do next?

If I can’t answer all three, nothing else on the site matters much yet — not the photography, not the animations, not the blog.

Here’s a typical professional-services headline we see:

“Trusted partners delivering excellence since 2004.”

After five seconds I know they have existed for a while. I don’t know if they help me.

A version that passes:

“Accounting for UK restaurants and cafés — payroll, VAT and year-end, handled. Book a 20-minute call.”

It’s less poetic. It also tells the right visitor they’re in the right place, and tells everyone else to leave quickly, which is useful too.

If you try this on your own site, try it on your phone. That’s where most first visits happen, and where the headline often gets pushed below a large image.

What did your homepage tell you in five seconds?`,
    cta: 'Closing question invites people to share their result; reply to every comment with one specific suggestion.',
    caption: '',
    visualDirection: 'Optional: no image (text-only tends to suit this). If testing an image, use a cream card with the three questions in serif type.',
    publishing: { bestTime: 'Weekday 08:00–09:00 UK or 08:00 US Eastern; test both.', metrics: defaultMetrics('li-text') },
    notes: 'Objection to expect: “Our clients know us by referral.” Answer: referrals still check the website before calling; the test is about removing doubt, not attracting strangers.',
    tags: ['fact-check: no statistics used'],
  },
  {
    id: 'post_w1_fb_reel_book', masterId: 'idea_01', campaignId: 'c_restaurant', platform: 'facebook', account: 'Kreatif Atelier Page', format: 'fb-reel',
    title: 'Book button fix (Facebook version)', date: '2026-11-04', time: '19:00', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Enquiries', effort: 'Low', status: 'Planned',
    hooks: ['Restaurant owners: can customers book from your homepage without scrolling?', 'If your booking link is in the menu, you’re losing tables.', 'Three website changes that make it easier to book a table.'],
    hook: 'Restaurant owners: can customers book from your homepage without scrolling?',
    concept: { formatReason: 'Same footage as the Instagram Reel, re-narrated for owner-operators: more explicit, practical, Messenger CTA.', problem: 'Owners on Facebook want a practical fix they can ask their web person for.' },
    scenes: [
      { n: 1, time: '0:00', duration: '3s', visual: 'Text card over before-site recording: “Can customers book without scrolling?”', voice: 'Restaurant owners — can a customer book a table from your homepage without scrolling?', onScreen: 'Can they book without scrolling?', camera: 'Screen recording', transition: 'Cut', sound: 'Voice', assets: 'A1' },
      { n: 2, time: '0:03', duration: '5s', visual: 'Before scroll + menu link', voice: 'On a lot of sites the booking link is hidden in the menu, under a big video.', onScreen: '', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'A1' },
      { n: 3, time: '0:08', duration: '12s', visual: 'After-site fixes 1–3', voice: 'Ask your web person for three things: a booking button that stays on screen, your hours and address at the top, and a short booking form.', onScreen: '1 Button · 2 Hours · 3 Short form', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'A2' },
      { n: 4, time: '0:20', duration: '5s', visual: 'Split before/after, concept label', voice: 'This is a concept design for a fictional restaurant, but these fixes apply to most.', onScreen: 'Concept redesign', camera: 'Design', transition: 'Cut', sound: '', assets: 'A4' },
      { n: 5, time: '0:25', duration: '4s', visual: 'End card with Messenger icon', voice: 'Not sure about yours? Message us your website and we’ll take a look.', onScreen: 'Message us your website', camera: 'Title card', transition: 'Fade', sound: '', assets: 'A6b FB end card' },
    ],
    editApp: 'Instagram Edits (duplicate the IG project, replace voice and end card)',
    editGuide: ['Duplicate the Instagram Reel project in Edits.', 'Delete the IG voiceover; import the Facebook narration.', 'Replace S8 end card with the Messenger version (A6b).', 'Re-time clips to the new narration (≈29 s).', 'Regenerate auto-captions and proofread.', 'Export 1080p and upload through Meta Business Suite → Create Reel (choose Facebook only so you can write a different caption).'],
    caption: 'Can a customer book a table from your homepage without scrolling?\n\nIf not, here are three things to ask your web person for:\n✔ A booking button that stays on screen\n✔ Opening hours and address at the top\n✔ A short booking form (date, time, party size)\n\n(Concept design of a fictional restaurant.)\n\nMessage us your website and we’ll tell you what we’d change first — free.',
    cta: 'Send Message (Messenger)',
    publishing: { bestTime: 'Evening owner downtime — test 19:00 IST (US East morning) and 21:30 IST (UK evening).', metrics: defaultMetrics('fb-reel') },
  },
  {
    id: 'post_w1_yt_short_book', masterId: 'idea_01', campaignId: 'c_restaurant', platform: 'youtube', account: 'Kreatif Atelier channel', format: 'yt-short',
    title: 'Restaurant website fix: the Book button (Short)', date: '2026-11-04', time: '20:00', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Search discovery', effort: 'Low', status: 'Planned',
    hooks: ['Fix #1 on restaurant websites', 'Where’s the Book button?', 'One change for more online bookings'],
    hook: 'Where’s the Book button?',
    concept: { formatReason: 'Shorts give extra discovery and link to the long-form restaurant audit (week 2).', desiredResponse: 'Viewer taps the related video (long-form audit).' },
    scenes: [
      { n: 1, time: '0:00', duration: '2s', visual: 'Before scroll', voice: 'Where’s the Book button?', onScreen: 'Fix #1: the Book button', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'A1' },
      { n: 2, time: '0:02', duration: '14s', visual: 'After fixes', voice: 'Make it stay on screen. Put hours and address up top. Open the form with the date ready.', onScreen: 'Always visible · Hours up top · 3 fields', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'A2' },
      { n: 3, time: '0:16', duration: '4s', visual: 'Split before/after', voice: 'Full restaurant website audit linked below.', onScreen: 'Full audit ↓', camera: 'Design', transition: 'Cut', sound: '', assets: 'A4' },
    ],
    editApp: 'Instagram Edits',
    editGuide: ['Duplicate the IG project; cut to 20 seconds using scenes 1, 4–7.', 'Replace end card with “Full audit ↓”.', 'Export 1080×1920; upload in YouTube app or Studio.', 'In Studio, set “Related video” to the long-form restaurant audit once it’s published (edit the Short later).'],
    caption: 'Fix #1 on most restaurant websites: make booking possible without scrolling. Concept redesign of a fictional restaurant.\n\nFull restaurant website audit: [link after 13 Nov]\nFree website audit: https://www.kreatifatelier.com/contact/?utm_source=youtube&utm_medium=shorts&utm_campaign=restaurant',
    publishing: { title: 'Restaurant website fix #1: the Book button', keywords: 'restaurant website, online booking, restaurant website design', metrics: defaultMetrics('yt-short') },
    cta: 'Watch the full audit (related video)',
  },
  {
    id: 'post_w1_ig_reel_clarity', masterId: 'idea_02', platform: 'instagram', account: '@kreatifatelier', format: 'ig-reel',
    title: 'The 5-second test (Reel)', date: '2026-11-05', time: '18:30', pillar: 'Marketing Explained', audience: 'Professional services firms', objective: 'Shares', effort: 'Low', status: 'Script Ready',
    hooks: ['Try this on your website. Five seconds.', 'Your homepage has five seconds to answer three questions.', 'Most websites fail this in five seconds.'],
    hook: 'Your homepage has five seconds to answer three questions.',
    concept: { problem: 'Generic headlines.', desiredResponse: 'Sharing with a colleague or business partner (“do ours”).', whyHold: 'Countdown timer creates a natural reason to keep watching.', distinctive: 'Live 5-second countdown overlay on a real-looking (concept) homepage, then a rewrite.', risks: 'Don’t use a real firm’s site without permission.', formatReason: 'Shares objective → relatable test people can send.' },
    scenes: [
      { n: 1, time: '0:00', duration: '2s', visual: 'You on camera, phone in hand, or just text over a homepage', voice: 'Your homepage has five seconds to answer three questions.', onScreen: '5-second test', camera: 'Talking head (phone on tripod) or screen', transition: 'Cut', sound: 'Ticking', assets: 'B1' },
      { n: 2, time: '0:02', duration: '4s', visual: 'Three questions appear one by one', voice: 'Who is it for? What do you do for them? What should I do next?', onScreen: 'Who? · What? · Next?', camera: 'Design', transition: 'Cut', sound: '', assets: 'B2' },
      { n: 3, time: '0:06', duration: '6s', visual: 'Concept law-firm homepage “Trusted partners delivering excellence” with 5-s countdown', voice: 'This one says “trusted partners delivering excellence”. Five seconds… I don’t know if they help me.', onScreen: '5 4 3 2 1', camera: 'Screen recording + timer overlay', transition: 'Cut', sound: 'Buzzer at 0', assets: 'B3' },
      { n: 4, time: '0:12', duration: '8s', visual: 'Rewrite appears on the same layout', voice: 'Same firm: “Employment law for UK hospitality businesses. Book a 20-minute call.” Now I know.', onScreen: 'Who ✓ What ✓ Next ✓', camera: 'Screen recording', transition: 'Wipe', sound: 'Chime', assets: 'B4' },
      { n: 5, time: '0:20', duration: '4s', visual: 'End card', voice: 'Try it on yours — on your phone. Send this to whoever owns your website.', onScreen: 'Try it on yours', camera: 'Title card', transition: 'Fade', sound: '', assets: 'B5' },
    ],
    shots: [
      { n: 1, film: 'You saying line 1 to camera (optional)', visible: 'Head and shoulders, phone in hand', angle: 'Eye level, phone on tripod', method: 'Phone', background: 'Cream wall', length: '3s', onCamera: 'Yes', narration: 'Yes', purpose: 'Human hook' },
      { n: 2, film: 'Questions card animation', visible: 'Three lines appearing', angle: 'Flat', method: 'Design', background: 'Charcoal', length: '4s', onCamera: 'No', narration: 'Yes', purpose: 'Set the test' },
      { n: 3, film: 'Concept homepage BEFORE', visible: 'Generic headline, stock image', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '6s', onCamera: 'No', narration: 'Yes', purpose: 'Fail' },
      { n: 4, film: 'Concept homepage AFTER', visible: 'Specific headline + CTA', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '8s', onCamera: 'No', narration: 'Yes', purpose: 'Pass' },
      { n: 5, film: 'End card', visible: 'Text', angle: 'Flat', method: 'Design', background: 'Cream', length: '4s', onCamera: 'No', narration: 'Yes', purpose: 'CTA' },
    ],
    voiceover: { script: 'Your homepage has five seconds to answer three questions. Who is it for? What do you do for them? What should I do next? This one says “trusted partners delivering excellence”. Five seconds… I don’t know if they help me. Same firm: “Employment law for UK hospitality businesses. Book a 20-minute call.” Now I know. Try it on yours — on your phone. Send this to whoever owns your website.', pace: 'Conversational, ~2.5 words/s; let the countdown breathe.', recording: 'As Reel 1.', subtitles: 'Auto-captions; check “UK”.' },
    editApp: 'Instagram Edits',
    editGuide: defaultEditGuide('ig-reel'),
    caption: 'The 5-second test I start every audit with:\n\nWho is it for?\nWhat do you do for them?\nWhat should I do next?\n\nTry it on your own homepage — on your phone, where most first visits happen. (Example firm is a concept, not a real business.)\n\nSend this to whoever owns your website.',
    cta: 'Share with a colleague',
    publishing: { cover: 'The 5-second website test', keywords: 'website copy, homepage headline, professional services website', alt: 'A homepage with a vague headline is rewritten to say who it serves and how to book a call.', bestTime: BEST_TIME_NOTE, metrics: defaultMetrics('ig-reel'), nextIdea: 'Why “we are passionate about quality” converts nobody (idea #11)' },
  },
  {
    id: 'post_w1_ig_story_book', masterId: 'idea_01', campaignId: 'c_audit', platform: 'instagram', account: '@kreatifatelier', format: 'ig-story',
    title: 'Story: promote Book-button Reel + AUDIT', date: '2026-11-05', time: '20:00', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Enquiries', effort: 'Low', status: 'Planned',
    slides: [
      { n: 1, text: 'New this week: what I fix first on restaurant websites →', layout: 'Reel cover full-bleed, text top', visual: 'Share the Reel to Story (paper-plane → Add to story)' },
      { n: 2, text: 'Quick one: can customers book from your homepage without scrolling?', layout: 'Charcoal background, cream serif', visual: 'Poll sticker: “Yes” / “Not sure”' },
      { n: 3, text: 'If you said “not sure” — send me your link. I’ll reply with the first thing I’d fix. (A real person, not a bot.)', layout: 'Cream background', visual: 'Question sticker “Your website link”' },
      { n: 4, text: 'Or comment AUDIT on the Reel and I’ll DM you the checklist.', layout: 'Phone photo (ph3) background, dim 40%', visual: 'Link sticker to Reel' },
    ],
    caption: '',
    cta: 'Question sticker + AUDIT keyword',
    publishing: { storySequence: 'Save frames 1–4 to Highlight “TEARDOWNS”.', metrics: 'Poll votes, question replies, link sticker taps, DMs' },
    notes: 'Lead-generation purpose: identify owners who are unsure about their own site; each reply is a warm conversation. Log replies as leads (source: Instagram Story).',
  },
  {
    id: 'post_w1_li_video_book', masterId: 'idea_01', campaignId: 'c_restaurant', platform: 'linkedin', account: 'Kreatif Atelier Page', format: 'li-video',
    title: 'Narrated audit: restaurant booking friction (LinkedIn)', date: '2026-11-06', time: '13:30', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Authority', effort: 'Medium', status: 'Planned',
    hooks: ['A restaurant website has one job on mobile: make booking easy.', 'Hospitality groups: your website’s booking path is probably three taps too long.', 'What we look at first when auditing a restaurant website.'],
    hook: 'A restaurant website has one job on mobile: make booking easy.',
    concept: { formatReason: 'LinkedIn audience (hospitality group owners, marketing leads) responds to the reasoning — a calm narrated screen recording rather than a fast Reel.', problem: 'Booking friction on mobile.' },
    scenes: [
      { n: 1, time: '0:00', duration: '8s', visual: 'Desktop screen recording of the concept site on a mobile emulator', voice: 'A restaurant website has one job on mobile: make it easy to book. Here’s how we check that in an audit.', onScreen: 'Auditing booking friction', camera: 'Screen recording (desktop, Chrome device mode)', transition: 'Cut', sound: 'Voice only', assets: 'A1' },
      { n: 2, time: '0:08', duration: '25s', visual: 'Count taps and scrolls to reach the booking form; on-screen counter', voice: 'First, we count. From landing on the homepage to seeing a booking form, how many scrolls and taps? On this concept site it’s four scrolls and two taps. Every one is a chance to drop off or phone a competitor instead.', onScreen: 'Scrolls: 4 · Taps: 2', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'A1' },
      { n: 3, time: '0:33', duration: '30s', visual: 'After-site walkthrough', voice: 'The fix isn’t a redesign of everything. A sticky booking button, hours and location in the first screen, and a form that opens with the date selected. That’s zero scrolls and one tap.', onScreen: 'Scrolls: 0 · Taps: 1', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'A2' },
      { n: 4, time: '1:03', duration: '20s', visual: 'You on camera or slide: “How to measure it”', voice: 'Then we measure it: track clicks on the booking button and completed bookings, so you can see whether the change actually helped rather than guessing.', onScreen: 'Measure: button clicks → completed bookings', camera: 'Talking head or slide', transition: 'Cut', sound: '', assets: 'Slide' },
      { n: 5, time: '1:23', duration: '7s', visual: 'End card', voice: 'If you run a restaurant group and want a second pair of eyes on your booking path, message us.', onScreen: 'kreatifatelier.com', camera: 'Title card', transition: 'Fade', sound: '', assets: 'End card 16:9 or 1:1' },
    ],
    editApp: 'DaVinci Resolve or Canva video (1:1 or 4:5)',
    editGuide: ['Record desktop (Chrome DevTools device toolbar → iPhone size) with QuickTime → File → New Screen Recording.', 'Record narration separately.', 'Canva: Create → Video (1080×1350) → upload clips → place narration → add tap/scroll counters as text that update with each action.', 'Add captions (Canva: Text → Auto captions if available, else type) — most LinkedIn viewers watch muted.', 'Export MP4 1080p. Upload natively on the company Page; reshare from the founder profile with a personal comment.'],
    caption: 'A restaurant website has one job on mobile: make booking easy.\n\nIn our audits we start by counting scrolls and taps from homepage to booking form. On the concept site in this video: 4 scrolls, 2 taps. After three focused changes: 0 scrolls, 1 tap.\n\nThe changes:\n— a booking button that stays visible\n— hours and location in the first screen\n— a form that opens with the date ready\n\nThen measure button clicks against completed bookings so the change is judged on evidence.\n\n(Concept site for a fictional restaurant.)',
    cta: 'Message the Page / founder',
    publishing: { bestTime: 'Weekday lunchtime UK (13:00–14:00 UK = 18:30–19:30 IST)', metrics: defaultMetrics('li-video') },
  },
  {
    id: 'post_w1_fb_post_clarity', masterId: 'idea_02', platform: 'facebook', account: 'Kreatif Atelier Page', format: 'fb-post',
    title: '5-second test (Facebook post)', date: '2026-11-07', time: '19:00', pillar: 'Marketing Explained', audience: 'Professional services firms', objective: 'Conversation', effort: 'Low', status: 'Planned',
    body: 'Quick test for your website — takes five seconds.\n\nOpen your homepage on your phone. Look for five seconds. Then look away and answer:\n\n1. Who is this business for?\n2. What does it do for them?\n3. What should I do next?\n\nIf you can’t answer all three, your visitors can’t either — and they won’t stick around to find out.\n\nTry it and tell us what you found in the comments. If you’re not sure, post your link and we’ll answer the three questions for you.',
    caption: '',
    cta: 'Comment with your result or link',
    visualDirection: 'Image 1080×1350: charcoal background, cream serif “The 5-second website test”, three questions in sans, small gold timer icon.',
    publishing: { alt: 'Graphic listing three questions: Who is this business for? What does it do for them? What should I do next?', metrics: defaultMetrics('fb-post') },
  },

  // ---------------- WEEK 2 ----------------
  {
    id: 'post_w2_ig_car_pdf', masterId: 'idea_03', campaignId: 'c_restaurant', platform: 'instagram', account: '@kreatifatelier', format: 'ig-carousel',
    title: 'PDF menus cost bookings (carousel)', date: '2026-11-09', time: '18:30', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Saves', effort: 'Low', status: 'Script Ready',
    hooks: ['Your menu is a PDF. Here’s what that costs you.', 'Stop uploading your menu as a PDF.', 'The menu page, done right.'],
    hook: 'Your menu is a PDF. Here’s what that costs you.',
    concept: { problem: 'PDF menus are slow to load on mobile, need pinch-zooming, are hard to update, and are poorly indexed for searches like “vegan brunch near me”.', desiredResponse: 'Save the carousel; send it to the person who updates the site.', formatReason: 'Saves → checklist-style carousel people return to.', risks: 'Don’t overstate SEO impact; say “harder for search engines and Google to read” not “invisible”.' },
    slides: [
      { n: 1, text: 'Your menu is a PDF.\nHere’s what that costs you.', layout: 'Cover: phone mockup showing a pinched, zoomed PDF menu; headline top, 2 lines, serif 88px; gold rule', visual: 'Photo ph3 + screenshot of a sample PDF menu you made' },
      { n: 2, text: 'On a phone, a PDF menu means: wait for download → pinch → zoom → scroll sideways.\n\nMost guests check your menu on their phone.', layout: 'Headline + body, left-aligned', visual: 'Four small icons in a row (download, pinch, zoom, arrows)' },
      { n: 3, text: '1. It’s slow\nLarge PDFs take seconds to open on mobile data — long enough to go back to Google.', layout: 'Big numeral “1” in gold, headline, 2 lines', visual: 'Loading spinner illustration' },
      { n: 4, text: '2. It’s hard to read\nText sized for A4 paper is tiny on a 6-inch screen.', layout: 'Same as 3', visual: 'Crop of tiny PDF text' },
      { n: 5, text: '3. It’s hard for search engines to understand\nDishes in an HTML page can be read, linked and shown in results more easily than text inside a PDF.', layout: 'Same as 3', visual: 'Search bar with “vegan brunch near me”' },
      { n: 6, text: '4. It’s a pain to update\nOne price change = redesign, re-export, re-upload.', layout: 'Same as 3', visual: 'Pencil + file icon' },
      { n: 7, text: 'The fix: a menu page.\n✔ Real text, large enough to read\n✔ Sections you can jump to\n✔ Dietary labels\n✔ “Book a table” at the bottom of every section', layout: 'Checklist on cream', visual: 'Mockup of HTML menu page (your concept)' },
      { n: 8, text: 'Keep the PDF as a “Download for print” link if you like. Just don’t make it the only option.', layout: 'Single statement, centred', visual: '' },
      { n: 9, text: 'Want us to check your menu page and booking path?\nComment MENU or DM “AUDIT”.\n\nkreatifatelier.com', layout: 'CTA card, charcoal, gold button shape', visual: 'Logo' },
    ],
    caption: 'If your menu is a PDF, guests on phones have to download, pinch and zoom before they can decide to book.\n\nA proper menu page is faster, readable, easier for search engines to understand, and easier for you to update.\n\nSave this for your next website update — or send it to whoever runs your site.\n\nComment MENU and I’ll send a quick menu-page checklist.',
    cta: 'Save + comment MENU',
    visualDirection: 'Canva 1080×1440. Cover: charcoal with phone photo; inner slides cream with charcoal text; gold numerals. Fonts: Cormorant Garamond (headlines), Inter (body).',
    requiredAssets: 'Sample PDF menu (fictional) · phone photo ph3 · menu-page mockup (concept) · 4 icons from Canva elements',
    publishing: { cover: 'Your menu is a PDF. Here’s what that costs you.', keywords: 'restaurant menu website, PDF menu, restaurant website', alt: 'Nine-slide guide explaining why PDF menus are hard to use on phones and how to replace them with a menu web page.', bestTime: BEST_TIME_NOTE, metrics: defaultMetrics('ig-carousel'), nextIdea: 'Google Business Profile + website: the handshake (idea #10)' },
  },
  {
    id: 'post_w2_li_text_phone', masterId: 'idea_04', campaignId: 'c_audit', platform: 'linkedin', account: 'Founder (personal)', format: 'li-text',
    title: 'Why I start every audit on a phone', date: '2026-11-10', time: '13:30', pillar: 'Marketing Explained', audience: 'US/UK small business owners', objective: 'Authority', effort: 'Low', status: 'Script Ready',
    hooks: ['I don’t open a client’s website on my laptop first.', 'Most website reviews happen on the wrong device.', 'Your website was approved on a 27-inch monitor. Your customers see it on a phone.'],
    hook: 'Your website was approved on a 27-inch monitor. Your customers see it on a phone.',
    body: `Your website was approved on a 27-inch monitor. Your customers see it on a phone.

That gap explains a lot of the problems we find in audits. Design reviews happen in meeting rooms on big screens, where the headline is visible, the button is right there, and the photography looks great.

On a phone, the same page can look like this:
— a large hero image takes the whole first screen
— the headline wraps into six lines
— the call to action is three scrolls down
— the cookie banner covers what’s left

So the first thing I do in any audit is open the site on my own phone, on mobile data, and try to complete the one action the business cares about: book, buy, or enquire. I time it and count the taps.

It’s not sophisticated. It is the closest thing to what a new customer actually experiences.

If you approve website changes, try this before the next sign-off: review the page on a phone first, then on desktop.

Next week I’ll share the full checklist we use after that first phone test.`,
    cta: 'Soft: tease the checklist document (posted Wednesday on the company Page).',
    concept: { formatReason: 'Authority; tees up the lead-magnet document.', risks: 'Avoid quoting mobile-traffic percentages unless sourced from the client’s own analytics.' },
    publishing: { metrics: defaultMetrics('li-text') },
  },
  {
    id: 'post_w2_li_doc_checklist', masterId: 'idea_04', campaignId: 'c_audit', platform: 'linkedin', account: 'Kreatif Atelier Page', format: 'li-document',
    title: 'Website conversion checklist (LinkedIn document)', date: '2026-11-11', time: '13:30', pillar: 'Useful Assets', audience: 'US/UK small business owners', objective: 'Saves', effort: 'Medium', status: 'Script Ready',
    hooks: ['The 10 checks we run before redesigning any website.', 'Before you redesign, check these 10 things.', 'A website conversion checklist for business owners.'],
    hook: 'Before you redesign, check these 10 things.',
    concept: { formatReason: 'Documents show as swipeable pages; a checklist is saved and forwarded internally. This doubles as the AUDIT lead magnet.', problem: 'Owners redesign whole sites when a few fixes would do.' },
    slides: [
      { n: 1, text: 'Before you redesign, check these 10 things.\nA website conversion checklist — Kreatif Atelier', layout: 'Cover 1080×1350: charcoal, cream serif headline 96px, gold rule, small logo bottom', visual: 'Desk hero photo ph1 on right half (optional)' },
      { n: 2, text: 'Why check first?\nMany websites don’t need a redesign. They need the right three fixes. These checks tell you which.', layout: 'Headline + 3-line body', visual: '' },
      { n: 3, text: '1 · The 5-second test\nCan a stranger say who you help, what you do, and what to do next?', layout: 'Numeral + headline + body + “How to check” box', visual: 'Three icons' },
      { n: 4, text: '2 · Phone first\nComplete your main action on a phone, on mobile data. Count taps.', layout: 'Same', visual: 'Phone outline' },
      { n: 5, text: '3 · One primary action per page\nIf everything is a button, nothing is.', layout: 'Same', visual: '' },
      { n: 6, text: '4 · Proof near the ask\nReviews, credentials or examples next to the button — not on a separate page.', layout: 'Same', visual: '' },
      { n: 7, text: '5 · Forms ask only what you need\nEvery extra field is a reason to stop.', layout: 'Same', visual: 'Short vs long form sketch' },
      { n: 8, text: '6 · Speed\nRun PageSpeed Insights on mobile. Fix the biggest images first.', layout: 'Same + URL pagespeed.web.dev', visual: '' },
      { n: 9, text: '7 · Readable text\nBody text large enough, enough contrast, short paragraphs.', layout: 'Same', visual: '' },
      { n: 10, text: '8 · Tracking\nAre enquiries, bookings or purchases tracked as conversions? If not, you can’t judge any change.', layout: 'Same', visual: '' },
      { n: 11, text: '9 · Follow-up speed\nWho replies to a new enquiry, and how fast?', layout: 'Same', visual: '' },
      { n: 12, text: '10 · Next step clarity\nAfter submitting, does the visitor know what happens next?', layout: 'Same', visual: '' },
      { n: 13, text: 'Want us to run these checks on your site?\nFree 30-minute audit → kreatifatelier.com/contact', layout: 'CTA page, cream, gold button shape', visual: 'Logo' },
    ],
    body: 'Before you redesign your website, check these 10 things.\n\nIn our audits, the answer is often not “new website” but “three specific fixes” — and the checklist below is how we find them.\n\nThe ones that matter most for small businesses: the 5-second test, completing your main action on a phone, and whether enquiries are tracked at all. Without tracking you can’t tell if any change worked.\n\nSave it for your next website review. If you’d like us to run it on your site, the link to book a free 30-minute audit is in the last page.',
    caption: '',
    cta: 'Free 30-minute audit',
    editGuide: ['Canva → Create a design → Custom size 1080×1350 → name it “KA Checklist”.', 'Brand Kit: charcoal #111210, cream #F3F0E9, gold #CDB98A; fonts Cormorant Garamond + Inter.', 'Page 1: cover as specified. Duplicate page 3 as the template for pages 4–12 so numerals and margins align.', 'Body text 34–38 px; headlines 64 px; margins 90 px.', 'Share → Download → PDF Standard → name “Kreatif-Atelier-Website-Checklist.pdf”.', 'LinkedIn Page → Start a post → “+” / More → Add a document → upload PDF → add a document title “Website conversion checklist” → paste post text → Post (or schedule via the clock icon).'],
    publishing: { title: 'Website conversion checklist', bestTime: 'Wednesday 13:00–14:00 UK', metrics: defaultMetrics('li-document') + ', document reposts and saves' },
  },
  {
    id: 'post_w2_fb_post_pdf', masterId: 'idea_03', campaignId: 'c_restaurant', platform: 'facebook', account: 'Kreatif Atelier Page', format: 'fb-post',
    title: 'PDF menus (Facebook post)', date: '2026-11-11', time: '19:00', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Conversation', effort: 'Low', status: 'Planned',
    body: 'Restaurant and café owners: is your menu online as a PDF?\n\nOn a phone, PDFs take a while to open and need pinching and zooming to read. A simple menu page — real text, clear sections, dietary labels and a “Book a table” button — is easier for guests and easier for you to update.\n\nYou can keep the PDF as a “download for print” link. Just don’t make it the only way to see the menu.\n\nWant a second opinion on your menu page? Send us a message with your website link.',
    cta: 'Send Message',
    visualDirection: 'Image 1080×1350: two phones side by side — left a pinched PDF menu, right a clean menu page (concept). Small label “Concept design”.',
    publishing: { alt: 'Two phones: one showing a hard-to-read PDF menu, the other a clear menu web page.', metrics: defaultMetrics('fb-post') },
  },
  {
    id: 'post_w2_ig_car_audit', masterId: 'idea_04', campaignId: 'c_audit', platform: 'instagram', account: '@kreatifatelier', format: 'ig-carousel',
    title: 'What a website audit actually checks (carousel)', date: '2026-11-12', time: '18:30', pillar: 'Useful Assets', audience: 'US/UK small business owners', objective: 'Enquiries', effort: 'Medium', status: 'Script Ready',
    hooks: ['What a website audit actually checks.', 'Before you pay for a new website, read this.', '7 things we check in a free website audit.'],
    hook: 'What a website audit actually checks.',
    slides: [
      { n: 1, text: 'What a website audit actually checks', layout: 'Cover: desk hero ph1, headline in top third', visual: 'ph1' },
      { n: 2, text: 'An audit isn’t a list of opinions about colours. It’s a check of whether the site does its job.', layout: 'Statement slide', visual: '' },
      { n: 3, text: '1 · Clarity — who it’s for, what you do, what to do next', layout: 'Numbered card', visual: '' },
      { n: 4, text: '2 · Mobile path — taps to book, buy or enquire', layout: 'Numbered card', visual: 'Phone' },
      { n: 5, text: '3 · Trust — proof near the button', layout: 'Numbered card', visual: '' },
      { n: 6, text: '4 · Speed — PageSpeed on mobile', layout: 'Numbered card', visual: '' },
      { n: 7, text: '5 · Forms — fields, errors, confirmation', layout: 'Numbered card', visual: '' },
      { n: 8, text: '6 · Tracking — are enquiries measured?', layout: 'Numbered card', visual: '' },
      { n: 9, text: '7 · Follow-up — what happens after someone asks', layout: 'Numbered card', visual: '' },
      { n: 10, text: 'Our free 30-minute audit covers all seven. You leave with the three fixes we’d make first.\nDM “AUDIT” or tap the link in bio.', layout: 'CTA', visual: '' },
    ],
    caption: 'An audit should tell you what to fix first — not just that your colours feel “dated”.\n\nThe seven checks we run in our free 30-minute audit are in the slides. You leave with the three changes we’d make first, whether or not you work with us.\n\nDM “AUDIT” or tap the link in bio to book.',
    cta: 'DM AUDIT / link in bio',
    publishing: { cover: 'What a website audit actually checks', alt: 'Ten-slide guide listing seven website audit checks: clarity, mobile path, trust, speed, forms, tracking and follow-up.', bestTime: BEST_TIME_NOTE, metrics: defaultMetrics('ig-carousel'), nextIdea: 'Ask Kreatif: answering your website questions (idea #50)' },
    notes: 'Pin this to the profile grid (pinned post 2).',
  },
  {
    id: 'post_w2_ig_story_audit', masterId: 'idea_04', campaignId: 'c_audit', platform: 'instagram', account: '@kreatifatelier', format: 'ig-story',
    title: 'Story: AUDIT offer sequence', date: '2026-11-12', time: '20:30', pillar: 'Useful Assets', audience: 'US/UK small business owners', objective: 'Enquiries', effort: 'Low', status: 'Planned',
    slides: [
      { n: 1, text: 'Thinking about a new website in 2027?', layout: 'Video of you scrolling a site (ph3 clip)', visual: 'Poll: “Yes / Maybe / No”' },
      { n: 2, text: 'Before you spend on a redesign, find out what actually needs fixing.', layout: 'Charcoal text card', visual: '' },
      { n: 3, text: 'Free 30-minute website audit. 7 checks. 3 fixes you can act on.', layout: 'Carousel slide 10 as background', visual: 'Link sticker → contact page with UTM' },
      { n: 4, text: 'Spots are limited because I do them myself. DM “AUDIT”.', layout: 'Your face to camera (optional)', visual: 'Question sticker' },
    ],
    caption: '',
    cta: 'Link sticker + DM AUDIT',
    publishing: { storySequence: 'Save to Highlight “START HERE”.', metrics: 'Link taps, DMs, poll results' },
    notes: 'Only say “spots are limited” if you are actually capping audits per week (e.g. 3). Otherwise remove the line.',
  },
  {
    id: 'post_w2_yt_long_restaurant', masterId: 'idea_01', campaignId: 'c_restaurant', platform: 'youtube', account: 'Kreatif Atelier channel', format: 'yt-long',
    title: 'Restaurant website audit: why it isn’t getting bookings (and what to fix first)', date: '2026-11-13', time: '20:30', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Search discovery', effort: 'High', status: 'Planned',
    hooks: ['This restaurant website looks beautiful. It also makes booking a table surprisingly hard.', 'I audited a restaurant website the way a hungry customer would.', 'Here are the five reasons this restaurant website isn’t getting bookings.'],
    hook: 'This restaurant website looks beautiful. It also makes booking a table surprisingly hard.',
    concept: {
      problem: 'Restaurant owners search for why their site isn’t bringing bookings; most answers are generic SEO lists.',
      desiredResponse: 'Watch to the end, apply 1–2 fixes, click to book an audit.',
      whyHold: 'A structured audit with a visible scorecard and a before/after at the end.',
      distinctive: 'A complete concept redesign built for the video, showing reasoning and trade-offs, not just “best practices”.',
      risks: 'Must use the fictional concept site or a site whose owner has given written permission. Avoid ranking promises. Don’t cite statistics without a source on screen.',
      formatReason: 'Search discovery → long-form answering “restaurant website not getting bookings”.',
    },
    body: `## Cold open (0:00–0:35)
[Screen: the BEFORE concept site on a phone, thumb scrolling]
This restaurant website looks beautiful. It also makes booking a table surprisingly hard. In the next ten minutes I’m going to audit it the way a hungry customer would — on a phone, in a hurry — and show you the five fixes I’d make first. At the end you’ll see the redesigned version side by side.
Quick note: this is a fictional restaurant we designed for this video, so we can be honest about the problems without picking on anyone.

## What we’re checking (0:35–1:30)
[Screen: scorecard graphic with five rows]
A restaurant website has three jobs: convince me the food is worth it, tell me when and where, and let me book in under a minute. I’ll score five areas out of three: first impression, booking path, menu, practical info, and trust.

## 1 — First impression (1:30–3:00)
[Screen recording: homepage load on mobile, hero video]
The homepage opens with a full-screen video. It looks great on a laptop. On my phone, on mobile data, it takes a few seconds to start, and while I wait there’s no headline, no hours, nothing to do. [Demonstrate scroll.] The first time I see text is the second screen.
Fix: replace the auto-playing video with one strong still photo and a short line — cuisine, neighbourhood, and a Book button.
[Score: 1/3]

## 2 — Booking path (3:00–5:00)
[Screen: count taps and scrolls with on-screen counter]
Let’s try to book. Four scrolls, then the menu icon, then “Reservations” at the bottom of the menu, then a third-party page that asks me to pick the restaurant again. That’s a lot of effort for someone deciding between you and the place next door.
Fix: a booking button that stays visible on every page, and a booking form that opens with the date already in focus. If you use a booking platform, embed it or deep-link straight to your restaurant’s availability.
[Score: 0/3]

## 3 — Menu (5:00–6:30)
[Screen: PDF menu pinch-zoom]
The menu is a PDF. On a phone I have to download, pinch and zoom. It’s also harder for search engines to read than a normal web page.
Fix: a real menu page with sections, dietary labels and prices, and the PDF kept as an optional print download.
[Score: 1/3]

## 4 — Practical info (6:30–7:30)
[Screen: footer]
Hours and address are only in the footer. People check these constantly — make them visible near the top and link the address to maps.
[Score: 1/3]

## 5 — Trust (7:30–8:30)
[Screen: reviews section]
There are no reviews or press mentions near the booking button. Pull two or three genuine recent reviews from your Google Business Profile — with their names as displayed publicly — and place them right above the booking form. Never write your own reviews.
[Score: 1/3]

## The redesign (8:30–10:00)
[Split screen: before vs after, walk through each fix]
Here’s the concept redesign. Same photography, same brand. Booking is now zero scrolls and one tap… [walk through].
How would you know it worked? Track clicks on the Book button and completed bookings before and after the change. Compare like-for-like weeks.

## Summary + CTA (10:00–10:40)
[Screen: checklist]
If you only do one thing this week: open your site on your phone and try to book a table. Count the taps. If you’d like us to do it for you, there’s a link to a free 30-minute audit in the description. And if you want the menu page checklist, it’s in the pinned comment.`,
    scenes: [
      { n: 1, time: '0:00', duration: '35s', visual: 'Phone screen recording of BEFORE site; cold open', voice: 'Cold open (see script)', onScreen: 'Restaurant website audit', camera: 'Screen recording + optional face cam bubble', transition: 'Cut to title', sound: 'Voice + light music', assets: 'A1' },
      { n: 2, time: '0:35', duration: '55s', visual: 'Scorecard graphic', voice: 'What we’re checking', onScreen: '5 areas × 3 points', camera: 'Motion graphic (Canva)', transition: 'Cut', sound: '', assets: 'Scorecard graphic' },
      { n: 3, time: '1:30', duration: '90s', visual: 'Homepage first impression', voice: 'Section 1', onScreen: '1 · First impression — 1/3', camera: 'Screen recording', transition: 'Section title card', sound: '', assets: 'A1' },
      { n: 4, time: '3:00', duration: '2m', visual: 'Booking path with tap counter', voice: 'Section 2', onScreen: '2 · Booking — 0/3', camera: 'Screen recording', transition: 'Section title', sound: '', assets: 'A1' },
      { n: 5, time: '5:00', duration: '90s', visual: 'PDF menu', voice: 'Section 3', onScreen: '3 · Menu — 1/3', camera: 'Screen recording', transition: 'Section title', sound: '', assets: 'Sample PDF' },
      { n: 6, time: '6:30', duration: '60s', visual: 'Footer info', voice: 'Section 4', onScreen: '4 · Practical info — 1/3', camera: 'Screen recording', transition: 'Section title', sound: '', assets: 'A1' },
      { n: 7, time: '7:30', duration: '60s', visual: 'Reviews section', voice: 'Section 5', onScreen: '5 · Trust — 1/3', camera: 'Screen recording', transition: 'Section title', sound: '', assets: 'A1' },
      { n: 8, time: '8:30', duration: '90s', visual: 'Split before/after walkthrough', voice: 'The redesign', onScreen: 'After', camera: 'Screen recording side by side', transition: 'Cut', sound: 'Music lifts', assets: 'A2, A4' },
      { n: 9, time: '10:00', duration: '40s', visual: 'Checklist + end screen space (last 20 s)', voice: 'Summary + CTA', onScreen: 'Free audit ↓', camera: 'Graphic', transition: 'End screen', sound: '', assets: 'End screen template' },
    ],
    shots: [
      { n: 1, film: 'Full mobile walkthrough of BEFORE site (record 3 continuous takes)', visible: 'Everything; slow deliberate scrolling', angle: 'Phone screen recording (or Chrome device mode on Mac at 1080×1920 then crop)', method: 'Screen recording', background: 'n/a', length: '4 min raw', onCamera: 'No', narration: 'Yes', purpose: 'Sections 1–5' },
      { n: 2, film: 'AFTER site walkthrough', visible: 'Same path, fixed', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '2 min raw', onCamera: 'No', narration: 'Yes', purpose: 'Redesign section' },
      { n: 3, film: 'Optional face-cam intro and outro', visible: 'You at desk, laptop edge in frame', angle: 'Eye level, 16:9', method: 'Phone', background: 'Cream wall/desk (ph1 setup)', length: '1 min', onCamera: 'Yes', narration: 'Yes', purpose: 'Human trust' },
      { n: 4, film: 'Scorecard + section title cards', visible: 'Graphics', angle: 'Flat', method: 'Design', background: 'Charcoal', length: '6 cards', onCamera: 'No', narration: 'n/a', purpose: 'Structure' },
      { n: 5, film: 'B-roll: hands typing, phone on desk', visible: 'Hands', angle: 'Low side', method: 'Phone', background: 'Desk', length: '30 s', onCamera: 'No', narration: 'n/a', purpose: 'Visual breaks' },
    ],
    aiShots: [
      { ref: 'Intro B-roll — restaurant ambience', why: 'A 3-second establishing mood shot of a restaurant interior without filming a real venue (avoids implying a real client). Do NOT use AI for any screen, menu or review content — factual accuracy matters there.', tool: 'Veo (Flow) or Kling', mode: 'Text-to-video', startFrame: 'None (T2V) — or generate a still first for more control.', prompt: 'Slow cinematic dolly shot through a warm, softly lit modern restaurant interior in the evening, empty tables set with linen and candles, terracotta and cream tones, shallow depth of field, gentle bokeh lights. No people, no text, no logos.', negative: 'people, faces, text, signage, logos, distorted tables, flicker', camera: 'Low dolly forward', lighting: 'Warm candle and pendant light', style: 'Cinematic, premium', subjectMotion: 'Candle flicker only', cameraMotion: 'Slow forward dolly', duration: '5–8 s, use 3 s', aspect: '16:9', continuity: 'Matches “Olive & Ember” terracotta palette', exclude: 'Any readable text', evaluate: 'Tables and chairs keep shape; no warped cutlery in the used portion.' },
    ],
    voiceover: { script: 'See full script in the Script tab.', pace: 'Calm, ~150 words/min. Pause at each section title.', recording: 'Record each section separately (easier retakes). Phone in a quiet room or a USB mic if available.', subtitles: 'Generate in Resolve or YouTube Studio auto-captions → review and correct; upload corrected captions.' },
    editApp: 'DaVinci Resolve (free, Mac)',
    editGuide: defaultEditGuide('yt-long'),
    thumbnails: [
      { name: 'Concept A — The hidden button', viewer: 'Restaurant owner scanning search results', subject: 'Phone showing restaurant site with a gold circle around a tiny “Reservations” link', emotion: 'Recognition (“mine does that”)', composition: 'Phone large on the right 55%, text left', background: 'Charcoal', lighting: 'Phone screen glow', contrast: 'Cream text + gold circle on charcoal', text: '“CAN’T BOOK?” (2 words)', focal: 'Gold circle', mobile: 'Two words, 120px+ letters', titlePair: 'Title explains the audit; thumbnail shows the symptom', honesty: 'The video does show this exact problem and fix.', prompt: 'Photograph (preferred): your phone showing the BEFORE concept site, shot on charcoal card, screen glow; add gold circle and text in Canva.', canva: 'Canva 1280×720 → upload phone photo → place right → text “CAN’T BOOK?” Inter Black 150px cream left → gold circle (Elements → circle outline 12px #CDB98A) → export JPG < 2MB.' },
      { name: 'Concept B — Before / after', viewer: 'Owner considering a redesign', subject: 'Two phones: cluttered vs clean', emotion: 'Aspiration', composition: 'Two phones side by side, arrow between', background: 'Cream', lighting: 'Soft', contrast: 'Charcoal phones on cream', text: '“0 SCROLLS” over the after phone', focal: 'After phone', mobile: 'Large shapes; minimal text', titlePair: 'Title names the outcome', honesty: 'The after state is shown in the video.', prompt: 'Design-only: two phone mockups (Canva “iPhone mockup”) with screenshots of before/after.', canva: 'Canva 1280×720 → Elements → phone mockup ×2 → drop screenshots → arrow → text.' },
      { name: 'Concept C — Scorecard', viewer: 'Analytical marketing lead', subject: 'Score “3/15” in large serif with restaurant photo behind', emotion: 'Curiosity', composition: 'Number left, blurred restaurant right', background: 'AI or photo of restaurant interior (AI shot above, still frame)', lighting: 'Warm', contrast: 'Cream number over dark', text: '“3/15”', focal: 'Number', mobile: 'Single number reads at any size', titlePair: 'Title explains what was scored', honesty: 'Scores are given in the video.', prompt: 'Still from the AI restaurant B-roll, darkened 40%.', canva: 'Upload still → adjust brightness −40 → text “3/15” Cormorant 260px cream → small label “Website audit” gold.' },
    ],
    caption: 'Is your restaurant website losing bookings? I audit a (fictional) restaurant website the way a hungry customer would — on a phone, in a hurry — and show the five fixes I’d make first, with a full before/after redesign.\n\nFree 30-minute website audit: https://www.kreatifatelier.com/contact/?utm_source=youtube&utm_medium=video&utm_campaign=restaurant_audit\n\nChapters\n0:00 The problem\n0:35 What we check\n1:30 First impression\n3:00 Booking path\n5:00 Menu\n6:30 Practical info\n7:30 Trust\n8:30 The redesign\n10:00 What to do this week\n\nThe restaurant in this video is a concept created for demonstration. Kreatif Atelier is a creative and digital studio (Hyderabad · Vancouver · Dubai).',
    cta: 'Free audit link + pinned comment',
    publishing: {
      title: 'Restaurant Website Audit: Why It’s Not Getting Bookings (5 Fixes)',
      keywords: 'restaurant website audit, restaurant website design, online booking restaurant, restaurant website not getting bookings',
      chapters: '0:00 The problem\n0:35 What we check\n1:30 First impression\n3:00 Booking path\n5:00 Menu\n6:30 Practical info\n7:30 Trust\n8:30 The redesign\n10:00 What to do this week',
      pinnedComment: 'Menu-page checklist: [link]. What’s the hardest part of your booking process? I’ll answer in the comments.',
      playlist: 'Restaurant & Hospitality Websites; Website Audits',
      endScreen: 'Last 20 s: subscribe element + “Best for viewer” video + playlist “Website Audits”.',
      bestTime: 'Thursday/Friday evening IST = US morning; YouTube is less time-sensitive — consistency matters more.',
      metrics: defaultMetrics('yt-long'),
    },
    notes: 'Repurposing: Shorts — (1) Book button fix (already planned), (2) PDF menu, (3) “Reviews near the button”. LinkedIn: booking-path video (done). Facebook: PDF menu post (done). Instagram: “Restaurant scorecard” carousel.',
  },
  {
    id: 'post_w2_yt_short_pdf', masterId: 'idea_03', campaignId: 'c_restaurant', platform: 'youtube', account: 'Kreatif Atelier channel', format: 'yt-short',
    title: 'Stop using PDF menus (Short)', date: '2026-11-14', time: '20:00', pillar: 'Website Teardowns', audience: 'Restaurant & café owners', objective: 'Search discovery', effort: 'Low', status: 'Planned',
    hooks: ['Your PDF menu, on a phone:', 'Why PDF menus lose customers', 'Restaurant fix #2: the menu'],
    hook: 'Your PDF menu, on a phone:',
    scenes: [
      { n: 1, time: '0:00', duration: '4s', visual: 'Pinch-zoom on PDF', voice: 'Your PDF menu, on a phone.', onScreen: 'Fix #2: the menu', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'Sample PDF' },
      { n: 2, time: '0:04', duration: '10s', visual: 'HTML menu page scroll with section tabs', voice: 'Put it on a real page instead: readable text, sections, dietary labels, and a Book button under each section.', onScreen: 'Real text · Sections · Labels · Book', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'Menu concept' },
      { n: 3, time: '0:14', duration: '4s', visual: 'Split', voice: 'Full restaurant audit linked below.', onScreen: 'Full audit ↓', camera: 'Design', transition: 'Cut', sound: '', assets: '' },
    ],
    editApp: 'Instagram Edits',
    editGuide: ['Build from carousel assets + screen recordings.', 'Export 1080×1920, upload, set related video to the restaurant audit.'],
    caption: 'Restaurant website fix #2: replace the PDF menu with a real menu page. Full audit: [link]',
    publishing: { title: 'Restaurant website fix #2: stop using PDF menus', metrics: defaultMetrics('yt-short') },
    cta: 'Related video',
  },
];
