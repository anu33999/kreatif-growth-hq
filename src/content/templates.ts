export interface MsgTemplate { id: string; channel: string; situation: string; text: string; note?: string }

export const MESSAGE_TEMPLATES: MsgTemplate[] = [
  // Instagram / general DMs
  { id: 'dm-pricing', channel: 'DM / any', situation: 'A prospect asks about pricing',
    text: 'Thanks for asking, [Name]. Our pricing depends on scope — a focused landing page and a full multi-page site with content are very different projects, and I’d rather not quote a number that doesn’t fit.\n\nTwo quick questions so I can give you a realistic range:\n1) What do you want the website (or campaign) to do for the business in the next 3–6 months?\n2) Do you have a timeline or budget range in mind?\n\nIf it’s easier, I can do a free 30-minute call and look at your current site with you.',
    note: 'Never quote in the first message without scope. If they insist, give a range only once you know the deliverable.' },
  { id: 'dm-examples', channel: 'DM / any', situation: 'A business owner requests examples',
    text: 'Of course. So I send the most relevant work: what kind of business is it, and is the priority a new website, content, or ads?\n\nIn the meantime, here’s how we approach projects: [link to “How we work” post or page]. Some of our public pieces are concept redesigns (clearly labelled), and I can share client work privately where the client has agreed.',
    note: 'Only share client work that the client has cleared. Label concepts as concepts.' },
  { id: 'dm-meta-ads', channel: 'DM / any', situation: 'Someone asks about Meta Ads',
    text: 'Happy to help with Meta Ads. Before talking campaigns, I usually check three things: what happens after the click (landing page or form), whether conversions are tracked properly (Pixel / Conversions API), and what a customer is worth to you.\n\nWhat are you selling, and have you run ads before? If you share your website, I’ll tell you what I’d check first.' },
  { id: 'dm-website-enquiry', channel: 'Email / website form', situation: 'Inbound website enquiry',
    text: 'Hi [Name],\n\nThanks for getting in touch about [their request]. I’ve had a quick look at [their website] — [one specific, genuine observation].\n\nTo make our call useful, could you share:\n- the main goal for the project (e.g. more bookings, more qualified enquiries, a relaunch)\n- your ideal timeline\n- anything you’ve tried before that didn’t work\n\nHere’s a link to book 30 minutes: [calendar link]. If none of the times suit, reply with two that do.\n\nBest,\n[Your name]\nKreatif Atelier · kreatifatelier.com' },
  { id: 'dm-not-ready', channel: 'DM / any', situation: 'Interested but not ready to buy',
    text: 'Completely understand — timing matters. Would it help if I sent you our short website checklist? It covers the five things we check first, so you can fix the quick ones yourselves.\n\nI’ll check in around [month] unless you’d rather I didn’t. No pressure either way.',
    note: 'Ask permission before following up. Add a follow-up date in the lead tracker.' },
  { id: 'dm-ngo', channel: 'DM / email', situation: 'An NGO exploring support',
    text: 'Thank you for reaching out, and for the work you do. Through Asraya, our social-impact division, we support NGOs with communication, websites and campaigns.\n\nTo understand where we could genuinely help: what is the most important thing you need people to do — donate, volunteer, attend, or access a service? And what does your team manage today (website, social, newsletters)?\n\nWe’re happy to start with a free review of your current website and donation or volunteer journey.',
    note: 'Never imply a partnership publicly until agreed in writing.' },
  { id: 'dm-ghost', channel: 'DM / email', situation: 'A lead who stopped responding',
    text: 'Hi [Name] — just closing the loop on [project/topic]. If priorities have changed, no problem at all; a one-word reply (“later” or “no”) helps me not to chase you.\n\nIf it’s still relevant, I’m happy to pick up where we left off.',
    note: 'Maximum two follow-ups after silence. Then mark as Nurture.' },
  { id: 'dm-keyword', channel: 'Instagram DM', situation: 'Someone DMs a keyword (e.g. AUDIT) after a Reel',
    text: 'Thanks for messaging! Here’s the checklist: [link]\n\nIf you’d like, send me your website and I’ll reply with the first thing I’d fix — personally, not a bot. What kind of business is it?',
    note: 'If you automate the first reply (e.g. Meta Business Suite instant replies or a tool like Manychat), make the follow-up personal. Never auto-send repeated messages.' },

  // LinkedIn
  { id: 'li-comment', channel: 'LinkedIn', situation: 'A useful comment on a business owner’s post',
    text: '[Specific point from their post] is the part most people skip. On the sites we review, the version of this we see most is [concrete observation]. One thing that tends to help: [practical idea]. Curious whether you’ve seen [related question]?',
    note: 'Add substance. Never pitch in a comment.' },
  { id: 'li-advice', channel: 'LinkedIn', situation: 'Reply to someone asking for marketing advice',
    text: 'Good question. It depends on [key variable], but if I had to pick one place to start: [specific advice with reason]. If you share [what you’d need], I can be more specific.' },
  { id: 'li-connect', channel: 'LinkedIn', situation: 'Polite connection note (only when there is real context)',
    text: 'Hi [Name] — enjoyed your post on [topic], especially [specific point]. I work on websites and marketing for [their industry] businesses and would be glad to stay connected.',
    note: 'Under 300 characters. Only send when you have engaged with their content. No pitch.' },
  { id: 'li-inbound', channel: 'LinkedIn', situation: 'Professional response to an inbound enquiry',
    text: 'Thanks for reaching out, [Name]. Happy to help. So I come prepared: what’s prompting this now, and what would a good result look like in six months? If it helps, here’s a link to book 30 minutes: [link].' },
  { id: 'li-share-work', channel: 'LinkedIn', situation: 'Sharing relevant work after a conversation',
    text: 'Great talking today, [Name]. As promised, here’s [specific piece of work / case material] — the part most relevant to you is [section], where we [what was done and why]. Next step from my side: [action] by [date].' },
  { id: 'li-follow', channel: 'LinkedIn', situation: 'Respectful follow-up',
    text: 'Hi [Name], following up on [topic] from [date]. I noticed [relevant new thing — their post, a change on their site]. Is this still a priority this quarter?' },
  { id: 'li-proposal', channel: 'Email / LinkedIn', situation: 'Proposal introduction',
    text: 'Hi [Name],\n\nAttached is the proposal for [project]. In short: [one-sentence outcome]. It covers what we’ll do, how we’ll measure it, timeline and investment.\n\nThe main decision for you is [choice between options]. I’d suggest a 20-minute call to walk through it — would [two time options] work?' },

  // Facebook
  { id: 'fb-messenger', channel: 'Facebook Messenger', situation: 'First reply to a Page message',
    text: 'Hi [Name], thanks for messaging Kreatif Atelier. I’m [Your name]. What can I help with — your website, social content, or ads? If you send your website link, I’ll take a look and reply with specific suggestions.' },
  { id: 'fb-group', channel: 'Facebook group', situation: 'Answering a genuine question in a business group',
    text: '[Direct answer in 2–4 sentences with one specific step they can take today.] If it helps, the quickest check is [simple test].',
    note: 'Read group rules first. Don’t add a link unless the rules and the person allow it.' },
];

export const FUNNEL_STAGES = [
  { stage: 'Discover a Reel / post', weak: 'Content attracts peers (designers) instead of buyers.', content: 'Industry-specific teardowns and before/after concepts with a business consequence in the hook.' },
  { stage: 'Visit the profile', weak: 'Bio doesn’t say who it’s for; grid looks random.', content: 'Clear bio, 3 pinned posts (proof, method, how to enquire), consistent covers.' },
  { stage: 'Understand what the agency does', weak: 'Services hidden or too broad (206 services is overwhelming).', content: '“What we do for [industry]” carousel; START HERE highlight; 3 core offers.' },
  { stage: 'Examine the portfolio', weak: 'Few named case studies; outcomes “to be supplied”.', content: 'Labelled concept work, process breakdowns, cleared client work (Marlsboro multilingual site), and published outcomes only when measured.' },
  { stage: 'Click the website', weak: 'Link goes to a generic homepage; no tracking.', content: 'UTM-tagged link to /contact or a dedicated audit page.' },
  { stage: 'Start a conversation', weak: 'No reason to message now.', content: 'Free 30-minute audit offer; DM keyword; Messenger button.' },
  { stage: 'Become a qualified lead', weak: 'No qualification questions; wasted calls.', content: 'Two questions: goal and timeline/budget. Qualification criteria in each campaign.' },
  { stage: 'Become a client', weak: 'Slow proposals; no follow-up.', content: 'Proposal within 3 working days; follow-up template; share relevant work.' },
];

export const BUYER_VS_PEER = [
  { attractsBuyers: '“Your restaurant website hides the Book button” (consequence for the business)', attractsPeers: '“My favourite font pairings for 2026”' },
  { attractsBuyers: 'Before/after with the reason it should bring more enquiries', attractsPeers: 'Speed-design timelapse with no explanation' },
  { attractsBuyers: '“What a $5k vs $25k website actually includes”', attractsPeers: '“How I got my first design client”' },
  { attractsBuyers: 'Teardown of a checkout or booking flow', attractsPeers: 'Figma plugin tips' },
  { attractsBuyers: 'Explaining tracking and enquiries in plain English', attractsPeers: 'Agency life memes' },
];

export const BUYER_CONTENT: { segment: string; problems: string; content: string[] }[] = [
  { segment: 'Restaurant & café owners (US/UK)', problems: 'PDF menus, buried booking buttons, slow mobile sites, no Google Business Profile link-up, weak photos.', content: ['“What I fix first on restaurant websites” series', 'Menu page done right (carousel)', 'Booking flow teardown (Reel + YouTube long-form)', 'Photo checklist for restaurants (carousel)'] },
  { segment: 'E-commerce / D2C brands', problems: 'Low product-page conversion, unclear shipping/returns, weak creative for ads, poor tracking.', content: ['Product page teardown (Reel)', 'Meta Ads creative testing explained (LinkedIn document)', 'Checkout friction checklist (carousel)'] },
  { segment: 'Professional services (law, accounting, consulting, clinics)', problems: 'Generic “we are passionate” copy, no proof, contact forms that ask too much.', content: ['Service page rewrite before/after (LinkedIn image)', '“Why your contact form loses leads” (Reel)', 'Trust signals checklist (LinkedIn document)'] },
  { segment: 'B2B manufacturers & exporters', problems: 'Catalogue-style sites, no RFQ path, single-language sites for multilingual buyers.', content: ['Multilingual B2B site lessons (LinkedIn text — real cleared project)', 'RFQ form design (carousel)', 'Long-form: B2B manufacturer website audit'] },
  { segment: 'NGOs & non-profits (Asraya)', problems: 'Donation journeys with too many steps, unclear impact reporting, weak volunteer journeys.', content: ['Donation flow vs e-commerce checkout comparison (cross-platform)', 'Volunteer journey checklist', 'Only with consent: programme explainers'] },
];

export const PAID_OPTIONS = {
  title: 'Optional paid campaigns (separate from organic)',
  body: `Organic content is the default. Consider paid only after you have (1) a landing page that converts, (2) conversion tracking working (Meta Pixel + Conversions API or form events in GA4), and (3) at least two organic posts that attracted the right audience.

### Option A — Boost a proven Reel to a lookalike of website visitors
- Budget assumption: start small and fixed (e.g. a modest daily amount for 7 days) — set this yourself based on what a client is worth to you.
- Creative: the Reel that produced the most profile visits from business owners.
- Tracking: UTM on link; Meta Pixel on kreatifatelier.com; record leads with attribution “Paid — Meta”.
- Measure: cost per qualified conversation, not cost per view.

### Option B — Facebook/Instagram lead form for the free audit
- Creative: 15-second before/after + “Free 30-minute website audit”.
- Form: name, email, website, one qualifying question (“What do you want the website to achieve?”).
- Follow-up within one working day with the inbound template.
- Measure: % of leads that are qualified; calls booked.

### Option C — LinkedIn Document Ads (higher cost per click)
- Only if average project value justifies it. Use the best-performing organic document.

Do not run paid campaigns without a written budget limit and a stop rule (e.g. “pause if no qualified lead after X spend”).`,
};
