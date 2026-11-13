import { defaultEditGuide, defaultMetrics } from '../lib/workflow';
import { BEST_TIME_NOTE, W12 } from './posts1';

type Seed = (typeof W12)[number];

export const W34: Seed[] = [
  // ---------------- WEEK 3 ----------------
  {
    id: 'post_w3_ig_reel_donate', masterId: 'idea_05', campaignId: 'c_impact', platform: 'instagram', account: '@kreatifatelier', format: 'ig-reel',
    title: 'Donation flow vs e-commerce checkout', date: '2026-11-16', time: '18:30', pillar: 'Impact & NGO Storytelling', audience: 'NGO & non-profit leaders', objective: 'Authority', effort: 'Medium', status: 'Script Ready',
    hooks: ['No online shop would survive this checkout. Many donation pages look like it.', 'Your donation page has more steps than buying shoes.', 'We compared a donation flow to a checkout. The checkout won.'],
    hook: 'No online shop would survive this checkout. Many donation pages look like it.',
    concept: {
      problem: 'Donation pages often require account creation, long forms and unclear amounts — friction an e-commerce brand would remove immediately.',
      desiredResponse: 'NGO leaders save/share; DM “IMPACT” for the donation-page checklist.',
      whyHold: 'Side-by-side race between two flows with a step counter.',
      distinctive: 'Commercial UX discipline applied to non-profits (Asraya division) — rare in NGO content.',
      risks: 'Never show a real NGO’s page without permission; use generic concept flows. Don’t claim conversion uplift numbers. Don’t present any NGO as a client.',
      formatReason: 'Authority with NGO leaders; visual comparison suits Reels.',
    },
    scenes: [
      { n: 1, time: '0:00', duration: '3s', visual: 'Split screen: left “Shop checkout”, right “Donation page”; both start', voice: 'No online shop would survive this checkout. Many donation pages look like it.', onScreen: 'Checkout vs Donation', camera: 'Screen recordings side by side (concepts)', transition: 'Cut', sound: 'Ticking', assets: 'D1, D2' },
      { n: 2, time: '0:03', duration: '10s', visual: 'Step counters rise: checkout 3 steps done; donation still on “create account”', voice: 'The shop: amount, details, pay. Three steps. The donation page: create an account, verify email, choose a fund, fill eleven fields…', onScreen: 'Shop: 3 · Donation: 7+', camera: 'Screen recordings', transition: 'Cut', sound: '', assets: 'D1, D2' },
      { n: 3, time: '0:13', duration: '9s', visual: 'Redesigned donation flow: preset amounts with what they fund (as defined by the NGO), guest checkout, UPI/card/PayPal options', voice: 'Fix it like a checkout: suggested amounts, guest giving, the payment methods your donors already use, and a clear “what happens next”.', onScreen: 'Amounts · Guest · Familiar payment · Next step', camera: 'Screen recording', transition: 'Wipe', sound: 'Chime', assets: 'D3' },
      { n: 4, time: '0:22', duration: '5s', visual: 'Thank-you page with receipt + impact update sign-up', voice: 'Then thank people properly — and tell them when they’ll hear about the impact.', onScreen: 'Thank you → update', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'D3' },
      { n: 5, time: '0:27', duration: '4s', visual: 'End card', voice: 'Run an NGO? DM “IMPACT” for our donation-page checklist.', onScreen: 'DM IMPACT', camera: 'Title card', transition: 'Fade', sound: '', assets: 'End card' },
    ],
    shots: [
      { n: 1, film: 'Concept shop checkout (Figma prototype) recorded on phone', visible: '3-step checkout', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '12s', onCamera: 'No', narration: 'Yes', purpose: 'Benchmark' },
      { n: 2, film: 'Concept “bad” donation flow', visible: 'Account creation, long form', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '12s', onCamera: 'No', narration: 'Yes', purpose: 'Problem' },
      { n: 3, film: 'Concept redesigned donation flow', visible: 'Presets, guest giving, payment options', angle: 'Screen recording', method: 'Screen recording', background: 'n/a', length: '12s', onCamera: 'No', narration: 'Yes', purpose: 'Fix' },
      { n: 4, film: 'Split-screen composite', visible: 'Both flows + counters', angle: 'Edit composite', method: 'Design', background: 'Charcoal', length: '13s', onCamera: 'No', narration: 'Yes', purpose: 'Race' },
    ],
    voiceover: { script: 'No online shop would survive this checkout. Many donation pages look like it. The shop: amount, details, pay. Three steps. The donation page: create an account, verify email, choose a fund, fill eleven fields… Fix it like a checkout: suggested amounts, guest giving, the payment methods your donors already use, and a clear “what happens next”. Then thank people properly — and tell them when they’ll hear about the impact. Run an NGO? DM “IMPACT” for our donation-page checklist.', pace: 'Measured, ~2.5 words/s. Respectful tone — this is not mocking NGOs.', aiVoice: 'If testing with ElevenLabs, choose a warm conversational voice; final version in your own voice preferred.', subtitles: 'Proofread “UPI”, “PayPal”.' },
    editApp: 'Instagram Edits',
    editGuide: ['Edits → New project → import the three recordings.', 'Create split screen: add shop clip, then Overlay → add donation clip, resize each to half width (Layout/Split if available).', 'Add two text counters (“Shop: 1/2/3”, “Donation: 1…7+”) and update them on each step.', ...defaultEditGuide('ig-reel').slice(2)],
    caption: 'If an online shop made you create an account, verify your email and fill eleven fields before paying, you’d leave. Many donation pages still do exactly that.\n\nWhat we change first on donation flows:\n— suggested amounts (described the way the organisation itself defines them)\n— giving as a guest\n— the payment methods donors already use\n— a thank-you page that says what happens next\n\nConcept flows shown — no real organisation’s page.\n\nRun an NGO? DM “IMPACT” for our donation-page checklist.',
    cta: 'DM IMPACT (keyword)',
    publishing: { cover: 'Donation page vs checkout', keywords: 'donation page design, nonprofit website, NGO website, donation UX', alt: 'Split screen comparing a three-step shop checkout with a long donation form, followed by a simplified donation flow.', bestTime: BEST_TIME_NOTE, metrics: defaultMetrics('ig-reel') + '. Count IMPACT DMs separately.', nextIdea: 'Volunteer sign-up journeys that actually finish (idea #38)' },
    tags: ['keyword:IMPACT', 'asraya'],
  },
  {
    id: 'post_w3_li_text_multilingual', masterId: 'idea_06', platform: 'linkedin', account: 'Founder (personal)', format: 'li-text',
    title: 'What changes when a B2B site goes 7-language', date: '2026-11-17', time: '13:30', pillar: 'Behind the Build', audience: 'B2B manufacturers & exporters', objective: 'Authority', effort: 'Low', status: 'Ready for Review',
    hooks: ['Translating a website is the easy part.', 'We recently built a manufacturer’s website in seven languages. Translation was the smallest job.', 'If your buyers read Spanish, German and Chinese, an English-only website is a sales filter.'],
    hook: 'We built a manufacturer’s website in seven languages. Translation was the smallest job.',
    concept: { problem: 'Exporters assume multilingual = translated copy.', formatReason: 'Authority with B2B manufacturers; first-person build lessons.', risks: 'Confirm with Marlsboro Group that they are happy to be named on LinkedIn (company profile lists them as cleared, but confirm for social). Do NOT add outcome metrics — outcomes are “to be supplied”.' },
    body: `We built a website for a packaging manufacturer in seven languages — English, Hindi, French, Spanish, German, Italian and Simplified Chinese. Translation was the smallest job.

The bigger decisions were structural:

The product catalogue had to be template-driven. With seven languages, every product page that is built by hand becomes seven pages to maintain. We built the catalogue so one product record feeds every language.

Navigation had to survive longer words. German and French labels run much longer than English. A menu that looks tidy in English can break in German, so we designed the mega-menu with room to grow.

Trust signals had to travel. Certifications, sustainability information and manufacturing capability matter more to an overseas buyer who can’t visit the factory. We gave them their own structure instead of burying them in an About page.

And language switching had to be obvious without being loud.

If you sell to buyers in other countries, it’s worth asking: is your website doing the first sales conversation in their language, or asking them to do the work?

(Project: Marlsboro Group — corporate website, multi-language build, product and industry visuals.)`,
    cta: 'Invite exporters to message about multilingual sites (only in replies, not the post).',
    publishing: { metrics: defaultMetrics('li-text') },
    checklist: {},
    notes: 'BEFORE PUBLISHING: get written OK from the client contact for naming them on social. If not cleared, replace the last line with “(A B2B packaging manufacturer.)”.',
  },
  {
    id: 'post_w3_li_text_ngo_case', masterId: 'idea_05', campaignId: 'c_impact', platform: 'linkedin', account: 'Kreatif Atelier Page', format: 'li-text',
    title: 'NGO impact case post: donor funnel vs checkout', date: '2026-11-18', time: '13:30', pillar: 'Impact & NGO Storytelling', audience: 'NGO & non-profit leaders', objective: 'Authority', effort: 'Low', status: 'Planned',
    hooks: ['E-commerce teams obsess over checkout friction. Most NGOs can’t afford to — so we compared the two.', 'A donation is a purchase with a different reward.', 'What NGOs can borrow from e-commerce checkout design.'],
    hook: 'A donation is a purchase with a different reward. The page should respect that.',
    body: `A donation is a purchase with a different reward. The page should respect that.

E-commerce teams spend enormous effort removing friction from checkout. Donation pages rarely get the same attention — usually because the team is small and the website was set up once and left alone.

When our social-impact division, Asraya, reviews a donation journey, we compare it step by step with a good online checkout:

Checkout: choose product → details → pay → confirmation.
Typical donation flow: find the donate button → choose a fund → create an account → verify email → long form → pay → generic thank-you.

The changes that matter most are usually simple:
1. Suggested amounts, described in the organisation’s own verified terms
2. Guest giving — no account required
3. Payment methods donors already use in that country
4. A thank-you page that explains what happens next and when they’ll hear about impact

What’s different from e-commerce is trust. A buyer gets a parcel; a donor gets a promise. That makes honest, verifiable impact reporting part of the conversion journey, not an afterthought.

If you work at an NGO and want a second opinion on your donation page, we’re happy to review it.`,
    cta: 'Offer a review in the final line',
    concept: { formatReason: 'Cross-platform case study framed as a comparison, not a client claim.', risks: 'No real NGO named; no invented impact.' },
    publishing: { metrics: defaultMetrics('li-text') },
    tags: ['asraya'],
  },
  {
    id: 'post_w3_fb_multi_donate', masterId: 'idea_05', campaignId: 'c_impact', platform: 'facebook', account: 'Kreatif Atelier Page', format: 'fb-multi-image',
    title: 'Donation page: 4 fixes (multi-image)', date: '2026-11-18', time: '19:30', pillar: 'Impact & NGO Storytelling', audience: 'NGO & non-profit leaders', objective: 'Conversation', effort: 'Medium', status: 'Planned',
    slides: [
      { n: 1, text: 'Is your donation page harder than online shopping?', layout: 'Image 1 must stand alone in the collage: before/after phones + headline', visual: 'Two phones (concept flows)' },
      { n: 2, text: 'Fix 1 — Suggested amounts', layout: 'Phone screenshot + caption bar', visual: 'Preset buttons' },
      { n: 3, text: 'Fix 2 — Give as a guest', layout: 'Same', visual: '' },
      { n: 4, text: 'Fix 3 — Familiar payment methods', layout: 'Same', visual: 'UPI / card / PayPal icons (as relevant to the country)' },
      { n: 5, text: 'Fix 4 — A thank-you that says what happens next', layout: 'Same', visual: '' },
    ],
    body: 'Is your donation page harder to use than an online shop?\n\nFour fixes we look at first:\n1. Suggested amounts\n2. Give as a guest (no account)\n3. Payment methods your donors already use\n4. A thank-you page that says what happens next\n\nThese are concept screens, not any real organisation’s page. If you’d like us to look at your donation journey, send the Page a message.',
    caption: '',
    cta: 'Send Message',
    concept: { formatReason: 'Facebook multi-image shows a collage first; image 1 carries the message. Unlike an Instagram carousel, people may tap any image — so each must be self-explanatory.' },
    publishing: { alt: 'Five images showing a simplified donation page: suggested amounts, guest giving, payment options and a thank-you page.', metrics: defaultMetrics('fb-post') },
  },
  {
    id: 'post_w3_ig_car_multilingual', masterId: 'idea_06', platform: 'instagram', account: '@kreatifatelier', format: 'ig-carousel',
    title: '7 languages, 1 website: what changes (carousel)', date: '2026-11-19', time: '18:30', pillar: 'Behind the Build', audience: 'B2B manufacturers & exporters', objective: 'Portfolio', effort: 'Medium', status: 'Planned',
    slides: [
      { n: 1, text: '7 languages. 1 website.\nWhat actually changes.', layout: 'Cover: seven language names stacked in serif, fading', visual: 'Typography only' },
      { n: 2, text: 'Translation is the smallest job.', layout: 'Statement', visual: '' },
      { n: 3, text: 'Catalogue → templates\nOne product record feeds every language.', layout: 'Diagram: 1 box → 7 boxes', visual: 'Diagram' },
      { n: 4, text: 'Navigation → room to grow\nGerman labels run long. Design for the longest word.', layout: 'Menu comparison EN vs DE', visual: 'Screenshot (cleared) or mock' },
      { n: 5, text: 'Trust → structured\nCertifications and capability, easy to find for buyers who can’t visit.', layout: 'Card', visual: '' },
      { n: 6, text: 'Switcher → obvious, not loud', layout: 'Close-up of language switcher', visual: '' },
      { n: 7, text: 'Selling abroad? Your website is the first sales conversation — make it in their language.\nkreatifatelier.com', layout: 'CTA', visual: '' },
    ],
    caption: 'We built a manufacturer’s website in seven languages. Translation was the smallest job — structure was the real work.\n\nIf you export, is your website speaking your buyers’ language?\n\n(Project for a B2B packaging manufacturer; shown with permission.)',
    cta: 'DM to discuss multilingual sites',
    notes: 'Confirm client permission before using screenshots. Otherwise use diagrams only.',
    publishing: { metrics: defaultMetrics('ig-carousel'), alt: 'Seven-slide explanation of building a multilingual manufacturer website: templates, navigation, trust content and language switching.' },
  },
  {
    id: 'post_w3_li_article_issue1', masterId: 'idea_04', campaignId: 'c_audit', platform: 'linkedin', account: 'Founder (personal)', format: 'li-article',
    title: 'Newsletter (optional) — Issue 1: “Redesign or repair?”', date: '2026-11-20', time: '13:30', pillar: 'Agency Point of View', audience: 'US/UK small business owners', objective: 'Authority', effort: 'High', status: 'Idea',
    hooks: ['Redesign or repair? How to tell before you spend.', 'Most websites need repair, not redesign.', 'The question to ask before any website project.'],
    hook: 'Redesign or repair? How to tell before you spend.',
    concept: { formatReason: 'Optional. Only start the newsletter if you can publish monthly for six months. Otherwise publish this as a standalone article.', problem: 'Owners commission full redesigns when repairs would do.' },
    body: `# Redesign or repair? How to tell before you spend.

**SEO title:** Website redesign or repair: a decision guide for business owners
**Description:** How to decide whether your website needs a full redesign or a few targeted fixes — with a simple checklist.

Every few years a business looks at its website and decides it’s “time for a new one”. Sometimes that’s right. Often it isn’t. A redesign is expensive, slow and risky; a repair can be done in weeks and measured.

## Signs you need a repair
- The structure is fine but key pages are unclear (fails the 5-second test)
- The main action is hard to find on mobile
- Forms are too long
- Tracking is missing, so nobody knows what works

## Signs you need a redesign
- The business has changed (new services, new audience, new market)
- The platform can’t do what you need (e.g. multiple languages, bookings, e-commerce)
- Content is so outdated that fixing it page by page costs more than rebuilding
- The brand has been repositioned

## A simple way to decide
1. Write down the one action the website must drive.
2. Try it on a phone; count taps.
3. Check whether that action is tracked.
4. List the three biggest blockers.
5. Ask: can these be fixed on the current platform?

If yes, repair first and measure for a month. If no, you have a much clearer brief for a redesign.

## What we do at Kreatif Atelier
We start every engagement with an audit for exactly this reason — so we can say “you don’t need a new website yet” when that’s true.

*Next issue: what to track on a small-business website (and what to ignore).*`,
    caption: 'Promotional post: “Most website projects start with the wrong question. Not ‘how should it look?’ but ‘redesign or repair?’ I wrote a short guide on how to decide — link below.”',
    cta: 'Subscribe (if newsletter) / book audit',
    visualDirection: 'Cover 1920×1080: charcoal, “Redesign or repair?” in cream serif, gold rule.',
    publishing: { metrics: 'Article views, subscribers (if newsletter), comments, profile views' },
    notes: 'Newsletter name options: “The Second Look”, “Fix First”, “Clarity Notes”. Six issue ideas: 1) Redesign or repair 2) What to track 3) The 5-second test in depth 4) Forms that convert 5) Working across time zones 6) Donation pages vs checkouts. Repurpose each article into 2–3 LinkedIn posts and 1 carousel.',
  },
  {
    id: 'post_w3_yt_short_donate', masterId: 'idea_05', campaignId: 'c_impact', platform: 'youtube', account: 'Kreatif Atelier channel', format: 'yt-short',
    title: 'Donation pages have too many steps (Short)', date: '2026-11-21', time: '20:00', pillar: 'Impact & NGO Storytelling', audience: 'NGO & non-profit leaders', objective: 'Reach', effort: 'Low', status: 'Planned',
    hooks: ['Count the steps on this donation page.', 'Donation page vs checkout', 'NGOs: remove these steps'],
    hook: 'Count the steps on this donation page.',
    scenes: [
      { n: 1, time: '0:00', duration: '12s', visual: 'Split race (reuse from Reel)', voice: 'Count the steps. Shop: three. Donation page: seven and counting.', onScreen: '3 vs 7+', camera: 'Composite', transition: 'Cut', sound: '', assets: 'D1, D2' },
      { n: 2, time: '0:12', duration: '10s', visual: 'Redesigned flow', voice: 'Suggested amounts, guest giving, familiar payment, clear next step.', onScreen: '4 fixes', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'D3' },
    ],
    editApp: 'Instagram Edits', editGuide: ['Re-cut the IG Reel to 22 s; replace CTA with “More in the description”.'],
    caption: 'Concept donation flow redesign. Checklist for NGOs: [link]',
    publishing: { title: 'Donation page vs online checkout (NGO website tip)', metrics: defaultMetrics('yt-short') },
  },

  // ---------------- WEEK 4 ----------------
  {
    id: 'post_w4_ig_reel_forms', masterId: 'idea_07', campaignId: 'c_audit', platform: 'instagram', account: '@kreatifatelier', format: 'ig-reel',
    title: 'Contact forms that lose leads', date: '2026-11-23', time: '18:30', pillar: 'Website Teardowns', audience: 'Professional services firms', objective: 'Reach', effort: 'Low', status: 'Planned',
    hooks: ['This contact form asks 11 questions before saying hello.', 'Your contact form is an interview.', 'Delete these fields from your contact form.'],
    hook: 'This contact form asks 11 questions before saying hello.',
    concept: { problem: 'Long forms (budget, company size, how did you hear, etc.) before any conversation.', desiredResponse: 'Owners shorten their forms; send to web person.', whyHold: 'Fields being deleted one by one is satisfying to watch.', formatReason: 'Reach → satisfying visual subtraction.', risks: 'Some fields are useful for qualification — explain moving them to the follow-up.' },
    scenes: [
      { n: 1, time: '0:00', duration: '3s', visual: 'Long form scrolling (concept)', voice: 'This contact form asks eleven questions before saying hello.', onScreen: '11 fields', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'F1' },
      { n: 2, time: '0:03', duration: '12s', visual: 'Fields disappear one by one with a soft pop; counter drops 11 → 4', voice: 'Company size? Ask later. Budget? Ask on the call. How did you hear about us? One optional field. Fax number? Really?', onScreen: '11 → 4', camera: 'Screen recording of prototype with fields removed (or animated in Canva)', transition: 'Cut', sound: 'Pop SFX per field', assets: 'F2' },
      { n: 3, time: '0:15', duration: '7s', visual: 'Final 4-field form: name, email, website, “what do you need help with?”', voice: 'Name, email, website, and what you need help with. Qualify in the reply, not the form.', onScreen: 'Qualify in the reply', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'F3' },
      { n: 4, time: '0:22', duration: '4s', visual: 'End card', voice: 'Follow for more fixes like this.', onScreen: 'More fixes → follow', camera: 'Title card', transition: 'Fade', sound: '', assets: '' },
    ],
    voiceover: { script: 'This contact form asks eleven questions before saying hello. Company size? Ask later. Budget? Ask on the call. How did you hear about us? One optional field. Fax number? Really? Name, email, website, and what you need help with. Qualify in the reply, not the form. Follow for more fixes like this.', pace: 'Playful but calm; quick beat between deleted fields.' },
    editApp: 'Instagram Edits', editGuide: defaultEditGuide('ig-reel'),
    caption: 'Long contact forms feel like a job application.\n\nKeep the form to what you need to reply well: name, email, website and what they need help with. Ask budget and timeline in your reply — you’ll get better answers in a conversation anyway.\n\n(Concept form.)',
    cta: 'Follow',
    publishing: { cover: 'Your contact form is an interview', keywords: 'contact form, website leads, lead generation website', alt: 'A long website contact form loses fields one by one until four remain.', bestTime: BEST_TIME_NOTE, metrics: defaultMetrics('ig-reel') },
  },
  {
    id: 'post_w4_li_text_qualify', masterId: 'idea_07', campaignId: 'c_audit', platform: 'linkedin', account: 'Founder (personal)', format: 'li-text',
    title: 'Qualify in the reply, not the form', date: '2026-11-24', time: '13:30', pillar: 'Marketing Explained', audience: 'Professional services firms', objective: 'Conversation', effort: 'Low', status: 'Planned',
    hooks: ['Your contact form is doing your sales team’s job — badly.', 'Long forms don’t qualify leads. They remove them.', 'Two questions that qualify a lead better than an 11-field form.'],
    hook: 'Long forms don’t qualify leads. They remove them — including good ones.',
    body: `Long forms don’t qualify leads. They remove them — including good ones.

I understand why forms grow. Someone gets three unqualified enquiries in a week, so a “budget” dropdown appears. Then “company size”. Then “timeline”. A year later the form has eleven fields and the team wonders why enquiries dropped.

A form can’t tell the difference between a serious buyer who is in a hurry and a time-waster. Both are put off by length; the serious buyer often has the least patience.

What works better for most service businesses:

Keep the form short: name, email, website, and “what do you need help with?”

Then qualify in the first reply with two questions:
1. What would a good result look like in the next three to six months?
2. Is there a timeline or budget range you’re working within?

People answer these honestly in an email or call, where they can explain context, in a way they won’t in a dropdown.

The trade-off is that someone has to reply quickly and thoughtfully. Which is a good thing to be measured on anyway.`,
    cta: 'Question in comments optional: “What’s the longest form you’ve filled in?” — only if it feels natural.',
    publishing: { metrics: defaultMetrics('li-text') },
  },
  {
    id: 'post_w4_fb_reel_forms', masterId: 'idea_07', campaignId: 'c_audit', platform: 'facebook', account: 'Kreatif Atelier Page', format: 'fb-reel',
    title: 'Contact forms (Facebook version)', date: '2026-11-25', time: '19:00', pillar: 'Website Teardowns', audience: 'US/UK small business owners', objective: 'Enquiries', effort: 'Low', status: 'Planned',
    hooks: ['Business owners: how many questions does your contact form ask?', 'Shorter form, more enquiries? Here’s the reasoning.', 'Cut your contact form to 4 fields.'],
    hook: 'Business owners: how many questions does your contact form ask?',
    scenes: [
      { n: 1, time: '0:00', duration: '3s', visual: 'Long form', voice: 'Business owners — how many questions does your contact form ask?', onScreen: 'How many fields?', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'F1' },
      { n: 2, time: '0:03', duration: '14s', visual: 'Fields removed', voice: 'Every extra question is a reason for someone to give up. Keep name, email, website, and what they need. Ask about budget and timing when you reply.', onScreen: '11 → 4', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'F2, F3' },
      { n: 3, time: '0:17', duration: '5s', visual: 'End card with Messenger', voice: 'Want us to look at your form? Send us a message.', onScreen: 'Message us', camera: 'Title card', transition: 'Fade', sound: '', assets: '' },
    ],
    editApp: 'Instagram Edits', editGuide: ['Duplicate IG project, replace narration and end card, export, upload via Meta Business Suite to Facebook only with this caption.'],
    caption: 'How many questions does your website contact form ask?\n\nIf it’s more than 4–5, you may be losing enquiries from people who would have been great customers. Keep it short and ask the rest when you reply.\n\nSend us a message if you’d like us to look at yours.',
    cta: 'Send Message', publishing: { metrics: defaultMetrics('fb-reel') },
  },
  {
    id: 'post_w4_yt_short_product', masterId: 'idea_08', platform: 'youtube', account: 'Kreatif Atelier channel', format: 'yt-short',
    title: 'Product page: shipping info is hiding (Short)', date: '2026-11-25', time: '20:00', pillar: 'Website Teardowns', audience: 'E-commerce / D2C founders', objective: 'Search discovery', effort: 'Low', status: 'Planned',
    hooks: ['Where’s the shipping info?', 'This product page hides the one thing buyers check.', 'Product page fix: shipping & returns'],
    hook: 'This product page hides the one thing buyers check.',
    scenes: [
      { n: 1, time: '0:00', duration: '4s', visual: 'Concept product page, scrolling for shipping', voice: 'This product page hides the one thing buyers check.', onScreen: 'Shipping? Returns?', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'P1' },
      { n: 2, time: '0:04', duration: '12s', visual: 'After: delivery estimate + returns line under the price', voice: 'Put delivery time and returns right under the price, next to the button. Not in the footer.', onScreen: 'Under the price', camera: 'Screen recording', transition: 'Wipe', sound: '', assets: 'P2' },
    ],
    editApp: 'Instagram Edits', editGuide: ['Re-cut from the Product page Reel (Thursday).'],
    caption: 'Concept product page fix for D2C brands.', publishing: { title: 'Product page fix: show shipping & returns under the price', metrics: defaultMetrics('yt-short') },
  },
  {
    id: 'post_w4_ig_reel_product', masterId: 'idea_08', platform: 'instagram', account: '@kreatifatelier', format: 'ig-reel',
    title: 'Product page teardown (REDESIGN)', date: '2026-11-26', time: '18:30', pillar: 'Website Teardowns', audience: 'E-commerce / D2C founders', objective: 'Reach', effort: 'Medium', status: 'Planned',
    hooks: ['3 things this product page makes buyers hunt for.', 'Your product page is hiding the reasons to buy.', 'Product page teardown in 25 seconds.'],
    hook: 'Your product page is hiding the reasons to buy.',
    concept: { problem: 'Shipping, returns, sizing and reviews hidden in tabs/footer.', desiredResponse: 'DM “REDESIGN” for the product-page checklist.', formatReason: 'Reach; teardown series format.', risks: 'Concept brand only (fictional “Linen & Loam”).' },
    scenes: [
      { n: 1, time: '0:00', duration: '3s', visual: 'Concept product page, thumb searching', voice: 'Your product page is hiding the reasons to buy.', onScreen: 'Hiding the reasons to buy', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'P1' },
      { n: 2, time: '0:03', duration: '5s', visual: 'Delivery & returns in footer', voice: 'Delivery and returns — in the footer.', onScreen: '1 · Delivery & returns', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'P1' },
      { n: 3, time: '0:08', duration: '5s', visual: 'Size guide behind a tiny link', voice: 'Size guide — behind a tiny link.', onScreen: '2 · Size guide', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'P1' },
      { n: 4, time: '0:13', duration: '5s', visual: 'Reviews at the very bottom', voice: 'Reviews — after the newsletter sign-up.', onScreen: '3 · Reviews', camera: 'Screen recording', transition: 'Wipe', sound: '', assets: 'P1' },
      { n: 5, time: '0:18', duration: '6s', visual: 'After: all three beside the Add to Cart button', voice: 'Move all three next to the button. That’s where the decision happens.', onScreen: 'Next to the button', camera: 'Screen recording', transition: 'Cut', sound: '', assets: 'P2' },
      { n: 6, time: '0:24', duration: '4s', visual: 'AI-generated product beauty shot (linen shirt on oak hanger) as end card background', voice: 'DM “REDESIGN” for our product page checklist.', onScreen: 'DM REDESIGN', camera: 'AI image-to-video', transition: 'Fade', sound: '', assets: 'P3' },
    ],
    aiShots: [
      { ref: 'Shot 6 — end card background', why: 'A premium product still with gentle motion for the fictional brand, without a product shoot.', tool: 'Kling or Runway', mode: 'Image-to-video', startFrame: 'Generate: “A natural linen shirt on a light oak hanger against a warm cream wall, soft window light from the left, minimal, premium, vertical 9:16, empty space in top third.”', prompt: 'The linen shirt sways very gently as if in a soft breeze. Camera static. Light stays constant. Nothing else moves.', negative: 'text, logo, people, hands, warping fabric, extra sleeves, flicker', camera: 'Static', lighting: 'Window light left', style: 'Kreatif style bible', subjectMotion: 'Gentle sway', cameraMotion: 'None', duration: '5 s, use 4 s', aspect: '9:16', continuity: 'Matches “Linen & Loam” concept colours', exclude: 'Any brand marks', evaluate: 'Fabric moves naturally; collar and sleeves keep their shape.' },
    ],
    voiceover: { script: 'Your product page is hiding the reasons to buy. Delivery and returns — in the footer. Size guide — behind a tiny link. Reviews — after the newsletter sign-up. Move all three next to the button. That’s where the decision happens. DM “REDESIGN” for our product page checklist.', pace: 'Brisk, 2.7 words/s.' },
    editApp: 'Instagram Edits', editGuide: defaultEditGuide('ig-reel'),
    caption: 'On most product pages, the three things that answer “should I buy this?” are hidden: delivery & returns, the size guide, and reviews.\n\nPut them next to the Add to Cart button — that’s where the decision happens.\n\n(Concept brand.) DM “REDESIGN” for our product page checklist.',
    cta: 'DM REDESIGN (keyword)',
    publishing: { cover: 'Your product page is hiding the reasons to buy', keywords: 'product page design, shopify product page, ecommerce conversion', alt: 'Screen recording of a product page where delivery, size guide and reviews are hard to find, then a version where they sit beside the add to cart button.', bestTime: BEST_TIME_NOTE, metrics: defaultMetrics('ig-reel') },
    tags: ['keyword:REDESIGN'],
  },
  {
    id: 'post_w4_li_image_product', masterId: 'idea_08', platform: 'linkedin', account: 'Kreatif Atelier Page', format: 'li-image',
    title: 'Product page before/after (LinkedIn image)', date: '2026-11-27', time: '13:30', pillar: 'Redesign Transformations', audience: 'E-commerce / D2C founders', objective: 'Authority', effort: 'Medium', status: 'Planned',
    body: 'Where should delivery, returns and reviews go on a product page?\n\nNext to the Add to Cart button. That’s where a shopper decides, and it’s where their questions are.\n\nIn this concept redesign (fictional brand), we moved three pieces of information that were hidden in tabs and the footer:\n— estimated delivery date and returns policy, directly under the price\n— size guide as a visible link beside the size selector\n— review summary (stars + count) beside the product title\n\nNothing new was written. It was a layout decision.\n\nIf you’re running ads to product pages, this is worth checking before increasing spend.',
    visualDirection: 'Image 1200×1500 (4:5): two phone screenshots side by side, labelled BEFORE / AFTER in small caps, three gold numbered markers on the AFTER screen matching the list. Caption strip at the bottom: “Concept redesign — fictional brand”.',
    cta: 'None — authority post',
    publishing: { alt: 'Before and after product page screenshots; in the after version delivery information, size guide and reviews are positioned beside the add to cart button.', metrics: defaultMetrics('li-image') },
  },
  {
    id: 'post_w4_yt_long_howaudit', masterId: 'idea_04', campaignId: 'c_audit', platform: 'youtube', account: 'Kreatif Atelier channel', format: 'yt-long',
    title: 'How we audit a small-business website in 20 minutes', date: '2026-11-27', time: '20:30', pillar: 'Useful Assets', audience: 'US/UK small business owners', objective: 'Search discovery', effort: 'High', status: 'Idea',
    hooks: ['Here’s exactly how we audit a website in 20 minutes — you can do it yourself.', 'The website audit checklist we use, step by step.', 'Do this before paying for a new website.'],
    hook: 'Here’s exactly how we audit a website in 20 minutes — you can do it yourself.',
    concept: { problem: 'Owners don’t know how to evaluate their site.', formatReason: 'Tutorial with search intent (“how to audit my website”).', desiredResponse: 'Do the audit; book a free audit if stuck.', risks: 'Use a concept site; tools shown must be free (PageSpeed Insights, phone, GA4 Realtime).' },
    body: '## Outline\n0:00 Cold open — show the finished scorecard\n0:40 What you need (phone, laptop, 20 minutes)\n1:30 Check 1: 5-second test\n3:00 Check 2: Phone path, count taps\n5:00 Check 3: Proof near the button\n6:30 Check 4: Speed with PageSpeed Insights (pagespeed.web.dev)\n8:30 Check 5: Forms\n10:00 Check 6: Is the main action tracked? (GA4 Realtime test)\n12:00 Check 7: Follow-up — send yourself an enquiry\n13:30 Scoring and choosing three fixes\n14:30 Free audit CTA\n\n[Write full narration using the restaurant audit script as the model. Keep each check to: why it matters → how to test → what good looks like → common fix.]',
    editApp: 'DaVinci Resolve (free, Mac)', editGuide: defaultEditGuide('yt-long'),
    thumbnails: [
      { name: 'A — Scorecard', viewer: 'Owner unsure whether to redesign', subject: 'Printed checklist with handwritten ticks', emotion: 'Control/competence', composition: 'Checklist left, “20 MIN” right', background: 'Oak desk (ph7)', lighting: 'Soft window', contrast: 'Charcoal text on cream paper', text: '20 MIN AUDIT', focal: 'Checklist', mobile: '3 words', titlePair: 'Title: how-to; thumbnail: the tool', honesty: 'Video teaches exactly this.', prompt: 'Photograph ph7 (printed audit on desk).', canva: '1280×720, photo left, text right in Inter Black cream on charcoal panel.' },
      { name: 'B — Phone + timer', viewer: 'Busy owner', subject: 'Phone with site + stopwatch', emotion: 'Urgency without hype', composition: 'Phone centre, stopwatch overlay', background: 'Charcoal', lighting: 'Screen glow', contrast: 'Gold timer', text: '—', focal: 'Timer', mobile: 'No text needed', titlePair: 'Title carries words', honesty: 'Timed checks are in the video.', prompt: 'Photograph ph3 + Canva stopwatch element.', canva: 'Upload ph3, add stopwatch icon gold, no text.' },
      { name: 'C — Before you redesign', viewer: 'Owner about to spend', subject: 'Hand hovering over “New website” invoice (generic)', emotion: 'Caution', composition: 'Close-up', background: 'Desk', lighting: 'Moody', contrast: 'Red-free — gold accent', text: 'WAIT.', focal: 'Hand', mobile: 'One word', titlePair: 'Title: “before paying for a new website”', honesty: 'Video explains repair vs redesign.', prompt: 'Photograph your hand over a blank printed page titled “Website proposal”.', canva: 'Text “WAIT.” Cormorant 280px cream.' },
    ],
    caption: 'Description draft: How to audit your small-business website in 20 minutes using free tools. [chapters] Free 30-minute audit with Kreatif Atelier: [UTM link]',
    publishing: { title: 'How to Audit Your Website in 20 Minutes (Free Tools, Step by Step)', playlist: 'Website Audits; Conversion Basics', metrics: defaultMetrics('yt-long') },
  },
  {
    id: 'post_w4_fb_post_pinned', masterId: 'idea_04', campaignId: 'c_audit', platform: 'facebook', account: 'Kreatif Atelier Page', format: 'fb-post',
    title: 'Pinned post: send us your website', date: '2026-11-28', time: '19:00', pillar: 'Useful Assets', audience: 'US/UK small business owners', objective: 'Enquiries', effort: 'Low', status: 'Planned',
    body: 'Send us your website — we’ll tell you the first thing we’d fix.\n\nIn a free 30-minute audit we check:\n✔ Can visitors tell what you do in 5 seconds?\n✔ Can they book, buy or enquire easily on a phone?\n✔ Is there proof near the button?\n✔ Is the site fast enough on mobile?\n✔ Are your forms short and working?\n✔ Do you know where enquiries come from?\n\nNo obligation. You’ll leave with three specific changes, whether or not you work with us.\n\nTap “Send Message” or book at kreatifatelier.com/contact',
    visualDirection: 'Image 1080×1350: desk hero photo (ph1) with cream panel: “Free website audit — 30 minutes, 3 fixes.”',
    cta: 'Send Message / contact page (UTM utm_source=facebook&utm_medium=social&utm_campaign=pinned_audit)',
    publishing: { alt: 'Laptop on a desk with text offering a free 30-minute website audit.', metrics: 'Messages, link clicks' },
    notes: 'Pin to the top of the Page.',
  },
];
