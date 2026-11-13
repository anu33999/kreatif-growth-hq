import type { Campaign, ResearchItem } from '../lib/types';
import { CHECKED } from '../content/tools';

type R = Omit<ResearchItem, 'id' | 'createdAt' | 'updatedAt'>;

const items: R[] = [
  // ---- Business objectives ----
  { area: 'Objective', title: 'Primary business objective', body: 'Acquire international clients (US and UK first) for Kreatif Atelier through organic content across Instagram, LinkedIn, Facebook and YouTube. Views are a means; qualified conversations and clients are the measure.', verification: 'Recommendation', confidence: 'High' },
  { area: 'Objective', title: 'Note on the original Instagram brief', body: 'The earlier Instagram strategy brief referred to in the request was not available in this working session (it was not in the project folder or the conversation). The strategy, 50 ideas, scripts and calendar here were rebuilt from: your Growth HQ instructions, the CMO multi-platform brief, the Kreatif Atelier Company Profile PDF in Downloads, and kreatifatelier.com. Paste anything from the original brief into this section (New item) and it becomes searchable alongside everything else.', verification: 'Assumption', confidence: 'High', tags: ['important'] },

  // ---- Company facts (verified from your own documents) ----
  { area: 'Fact', title: 'Positioning line (website)', body: 'Website title “Kreatif Atelier — Ideas. People. Impact.”; hero “We make brands impossible to ignore.”; “Creative should move the business.”', sourceTitle: 'kreatifatelier.com homepage', sourceUrl: 'https://www.kreatifatelier.com/', checked: CHECKED, confidence: 'High', verification: 'Verified (primary)' },
  { area: 'Fact', title: 'Locations / time zones', body: 'Website lists Vancouver, Canada (UTC−8), Dubai, UAE (UTC+4) and Hyderabad, India (UTC+5:30): “We work across 3 timezones.” Company profile PDF lists Hyderabad & Secunderabad as HQ. Confirm what each location means (office, team member, partner) before using in ads.', sourceTitle: 'kreatifatelier.com; Company Profile PDF', sourceUrl: 'https://www.kreatifatelier.com/', checked: CHECKED, confidence: 'Medium', verification: 'Organisation claim' },
  { area: 'Fact', title: 'Service architecture', body: '206 defined services across 11 practice areas (Digital Marketing, PR, Promotions, SEO, Branding & Creative Design, Advertising, Analytics & Performance, Lead Generation & Growth, Film/Video/Photography, Technology & Product, Advisory & Transformation). Divisions: Kreatif Atelier (parent), Golden Guardian Productions (production), Zenith Chapter (education), Asraya (social impact). Website also lists Aurelius (marketing & advertising), Valora and Rudra Yugen as ventures — align naming before public use.', sourceTitle: 'Kreatif_Atelier_Company_Profile.pdf; kreatifatelier.com', sourceUrl: 'https://www.kreatifatelier.com/', checked: CHECKED, confidence: 'High', verification: 'Organisation claim' },
  { area: 'Fact', title: 'Work that can be referenced publicly', body: 'Company profile names two engagements “where the client has cleared it”: Marlsboro Group (Marlsboro Industries LLP / Velcon Flexible LLP, Jaipur — corporate website, 7-language build, product visuals, company profile, LinkedIn management) and Shyam Chemical & Polymers — Inkotek (company profile redesign). Outcomes are marked “[to be supplied]” — do not state results. Other work is described by sector only.', sourceTitle: 'Company Profile PDF, “Selected Work”', checked: CHECKED, confidence: 'High', verification: 'Organisation claim', tags: ['claims'] },
  { area: 'Fact', title: 'Pitch/concept work is NOT client work', body: 'Your Downloads folder contains website concepts for Agape India, Helping Hands Humanity, CRWDS and Don Bosco South Asia, and a pitch package for Heart & Bloom. Their READMEs describe them as demo redesigns prepared to pitch. The CMO brief listed some of these (and “Asha Hope Foundation”) as a “social impact track record”. Treat all of them as concept/spec work unless a signed engagement and permission to name exist.', checked: CHECKED, confidence: 'High', verification: 'Verified (primary)', tags: ['claims', 'important'] },
  { area: 'Fact', title: 'No social handles on website', body: 'kreatifatelier.com shows no Instagram, LinkedIn, Facebook or YouTube links (checked 2026-10-28). Add them to the footer once profiles are live — it helps verification and cross-platform discovery.', sourceUrl: 'https://www.kreatifatelier.com/', checked: CHECKED, confidence: 'High', verification: 'Verified (primary)' },

  // ---- Audience ----
  { area: 'Audience', title: 'Primary audience', body: 'Owners/founders and marketing leads of small–mid businesses (roughly 5–200 staff) in the US and UK whose revenue depends on enquiries or bookings: restaurants/cafés/hospitality, D2C e-commerce, professional services. They judge an agency by clarity of thinking and visible craft, and fear offshore quality/communication risk.', verification: 'Recommendation', confidence: 'Medium' },
  { area: 'Audience', title: 'Secondary audiences', body: '1) B2B manufacturers & exporters (India and abroad) — proven fit via Marlsboro multilingual work. 2) NGOs & non-profits — via Asraya, handled carefully and separately. 3) Marketing managers seeking creative/production partners. Peer creators/designers will follow too: welcome, but not the target.', verification: 'Recommendation', confidence: 'Medium' },
  { area: 'Persona', title: 'Persona: “Maya”, owner of two cafés (UK)', body: 'Problems: site built by a friend years ago; PDF menu; bookings via phone; no idea what Instagram brings in. Motivations: fuller weekday tables, less admin. Objections: “agencies are expensive”, “I’ve been burned before”, “offshore = slow”. Evidence needed: before/after on similar businesses, clear process, quick replies, fixed scope. Converting content: restaurant teardowns, PDF menu carousel, booking-path audit video. Typical conversation: “Can you just fix the booking bit?” → small first project.', verification: 'Assumption', confidence: 'Low' },
  { area: 'Persona', title: 'Persona: “Daniel”, D2C founder (US)', body: 'Problems: paid social getting more expensive, product pages leak, tracking unreliable. Motivations: lower acquisition cost, better conversion rate. Objections: wants specialists, worries about time-zone lag. Evidence: understanding of CRO and creative testing, measurement literacy. Content: product page teardowns, Meta creative testing document, “landing page vs homepage”. Conversation: “audit our product page before Q4 spend”.', verification: 'Assumption', confidence: 'Low' },
  { area: 'Persona', title: 'Persona: “Priya”, marketing lead at a UK professional-services firm', body: 'Problems: generic website copy, form leads are poor quality, partners want “a refresh”. Motivations: credibility, better-qualified enquiries, internal buy-in. Objections: procurement, needs references. Evidence: thoughtful LinkedIn content, documents she can forward internally. Content: 5-second test, qualification post, trust signals document.', verification: 'Assumption', confidence: 'Low' },
  { area: 'Persona', title: 'Persona: “Rahul”, export manager at an Indian manufacturer', body: 'Problems: English-only catalogue site, RFQs via email chaos. Motivations: overseas distributors, trade-fair follow-ups. Content: multilingual build lessons, RFQ forms. Proof: the 7-language Marlsboro build (with permission).', verification: 'Assumption', confidence: 'Low' },

  // ---- Positioning ----
  { area: 'Positioning', title: 'Positioning statement', body: 'For US and UK businesses that depend on enquiries and bookings, Kreatif Atelier is the creative and digital studio that fixes what stops people from saying yes — strategy first, then design, build and measurement — with teams across three time zones and the ability to scope precisely from 206 defined services.', verification: 'Recommendation', confidence: 'Medium' },
  { area: 'Positioning', title: 'Differentiation', body: '1) Reasoning shown publicly (teardowns explain why, not just how it looks). 2) Full stack in-house: strategy, design, web build, production (Golden Guardian), performance. 3) Precise scoping (“we’d rather scope you out of what you won’t use”). 4) Social-impact capability (Asraya) applied with commercial UX discipline. 5) Time-zone coverage.', verification: 'Recommendation', confidence: 'Medium' },
  { area: 'Positioning', title: 'Brand visual identity for content', body: 'Deep charcoal #111210, warm cream #F3F0E9, muted antique gold #CDB98A; editorial serif headlines (Cormorant Garamond) + clean sans (Inter). Note: the CMO brief suggested vibrant accents (Electric Violet, Sunset Coral, Neon Cyan, Radiant Amber) and “no charcoal” — those describe theme options in client web builds, not the Kreatif brand. Decision below.', verification: 'Recommendation', confidence: 'High' },

  // ---- Pillars ----
  { area: 'Pillar', title: 'Website Teardowns', body: 'Specific, respectful audits of concept or permitted sites; series “What I fix first”. Goal: reach + relevance to buyers. Mix: ~35%.', verification: 'Recommendation' },
  { area: 'Pillar', title: 'Redesign Transformations', body: 'Before/after concept redesigns, clearly labelled. Goal: craft proof. ~15%.', verification: 'Recommendation' },
  { area: 'Pillar', title: 'Marketing Explained', body: 'Plain-English explanations of conversion, tracking, ads creative and lead qualification. Goal: authority. ~20%.', verification: 'Recommendation' },
  { area: 'Pillar', title: 'Behind the Build', body: 'Process, decisions, tools, multilingual and interactive builds. Goal: trust. ~10%.', verification: 'Recommendation' },
  { area: 'Pillar', title: 'Useful Assets', body: 'Checklists and templates (lead magnets). Goal: saves + enquiries. ~10%.', verification: 'Recommendation' },
  { area: 'Pillar', title: 'Impact & NGO Storytelling', body: 'Donation/volunteer UX lessons; NGO work only with consent. Goal: Asraya credibility. ~5%.', verification: 'Recommendation' },
  { area: 'Pillar', title: 'Agency Point of View', body: 'How we scope, price and work across time zones. Goal: conversion. ~5%.', verification: 'Recommendation' },

  // ---- Competitors ----
  { area: 'Competitor', title: 'Category: design-education creators (Instagram/YouTube)', body: 'E.g. The Futur, Flux Academy (verify current activity). Strength: production quality, teaching. Weakness for buyers: content targets designers. Opportunity: same polish aimed at owners.', verification: 'Third-party', confidence: 'Low' },
  { area: 'Competitor', title: 'Category: CRO / marketing-example voices (LinkedIn)', body: 'E.g. Harry Dry (Marketing Examples), Peep Laja. Strength: crisp examples. Opportunity: industry-specific (restaurants, exporters) and execution capability.', verification: 'Third-party', confidence: 'Low' },
  { area: 'Competitor', title: 'Category: offshore web agencies', body: 'Usually compete on price with portfolio grids and generic ads. Differentiation: reasoning, specificity, honesty about scope, time-zone overlap.', verification: 'Assumption', confidence: 'Medium' },
  { area: 'Competitor', title: 'Research task', body: 'Add 5 real accounts per platform you’d benchmark: note their hook style, posting frequency, how they label concept work, CTA, and what gets comments from business owners. Record date checked.', verification: 'Recommendation' },

  // ---- Platform research facts ----
  { area: 'Platform', platform: 'instagram', title: 'Reels length & discovery', body: 'Reels longer than 3 minutes are reported as not recommended to non-followers (Instagram Help Centre wording quoted by guides). Plan discovery Reels well under that.', sourceTitle: 'Growthscribe summary of Instagram Help Centre', sourceUrl: 'https://growthscribe.com/instagram-reel-aspect-ratio/', checked: CHECKED, confidence: 'Medium', verification: 'Third-party' },
  { area: 'Platform', platform: 'instagram', title: 'Carousel limit and grid crop', body: 'Up to 20 items per carousel in the app (API limit reported as 10). Profile grid previews posts in 3:4. First slide sets the ratio for all.', sourceTitle: 'Growthscribe / Flowgent size guides', sourceUrl: 'https://growthscribe.com/instagram-ratio-size/', checked: CHECKED, confidence: 'Medium', verification: 'Third-party' },
  { area: 'Platform', platform: 'youtube', title: 'Shorts up to 3 minutes', body: 'Vertical/square uploads up to 3 minutes made on or after 15 Oct 2024 are classified as Shorts.', sourceTitle: 'YouTube Shorts help', sourceUrl: 'https://support.google.com/youtube/answer/10059070', checked: CHECKED, confidence: 'Medium', verification: 'Third-party' },
  { area: 'Platform', platform: 'youtube', title: 'Test & Compare not available for Shorts', body: 'Official help: Thumbnail Test & Compare is not available for Shorts.', sourceTitle: 'YouTube Help — Test & compare thumbnails', sourceUrl: 'https://support.google.com/youtube/answer/13861714', checked: CHECKED, confidence: 'High', verification: 'Verified (primary)' },
  { area: 'Platform', platform: 'linkedin', title: 'Document posts on Pages and profiles', body: 'Documents can be uploaded to organic posts from profiles and Pages. Developer docs cite 100 MB / 300 pages. Exact in-app limits not confirmed from LinkedIn Help in this pass.', sourceTitle: 'Social Media Today; opentweet (API notes)', sourceUrl: 'https://www.socialmediatoday.com/news/linkedin-adds-document-upload-options-to-regular-posts-providing-new-shari/551871', checked: CHECKED, confidence: 'Medium', verification: 'Third-party' },
  { area: 'Platform', platform: 'linkedin', title: 'Newsletter eligibility — unresolved', body: 'Could not confirm current eligibility rules for personal-profile and Page newsletters. Check Help Centre: https://www.linkedin.com/help/linkedin/answer/a522427 before planning.', sourceUrl: 'https://www.linkedin.com/help/linkedin/answer/a522427/publishing-articles-on-linkedin', checked: CHECKED, confidence: 'Low', verification: 'Unresolved' },
  { area: 'Platform', platform: 'facebook', title: 'Facebook video → Reels', body: 'Meta has moved Facebook video towards the Reels format; publish vertical video. Verify current upload options in Meta Business Suite.', sourceUrl: 'https://www.facebook.com/business/help', checked: CHECKED, confidence: 'Low', verification: 'Unresolved' },

  // ---- Tools research ----
  { area: 'Tool', title: 'Sora not available', body: 'Reports say OpenAI shut the Sora app/web on 26 April 2026; Sora was never officially available in India. Excluded from workflows.', sourceUrl: 'https://blog.aiclips.net/?p=4623', checked: CHECKED, confidence: 'Medium', verification: 'Third-party' },
  { area: 'Tool', title: 'CapCut blocked in India', body: 'Blocked since June 2020 under Section 69A IT Act; still blocked in 2026 per multiple reports. Default editor set to Instagram Edits (phone) and DaVinci Resolve (Mac).', sourceUrl: 'https://fluxnote.io/guides/capcut-alternative-india', checked: CHECKED, confidence: 'Medium', verification: 'Third-party' },
  { area: 'Tool', title: 'Veo in India', body: 'Veo available in India via Google AI Pro in the Gemini app since July 2025 (₹1,950/month quoted then). Re-check current price/quota.', sourceUrl: 'https://www.businesstoday.in/technology/news/story/google-expands-veo-3-ai-video-tool-to-india-now-available-via-gemini-ai-pro-plan-482912-2025-07-03', checked: CHECKED, confidence: 'Medium', verification: 'Third-party' },

  // ---- Hypotheses ----
  { area: 'Hypothesis', title: 'H1: Industry-specific teardowns attract buyers more than general design content', body: 'Test: compare profile visits + DMs from owners for restaurant teardowns vs general design tips over 4 weeks. Decide in the 30-day review.', verification: 'Assumption' },
  { area: 'Hypothesis', title: 'H2: Problem-first hooks beat result-first hooks for owners', body: 'Test with Trial Reels or alternate weeks; measure 3-second retention/average watch time and shares.', verification: 'Assumption' },
  { area: 'Hypothesis', title: 'H3: LinkedIn personal profile generates more qualified conversations than the Page', body: 'Track conversations by source account for 60 days.', verification: 'Assumption' },
  { area: 'Hypothesis', title: 'H4: A free 30-minute audit is a strong enough offer', body: 'Measure audit requests per 1,000 profile visits; if low, test a recorded 5-minute audit instead.', verification: 'Assumption' },
  { area: 'Hypothesis', title: 'H5: YouTube long-form brings fewer but better-qualified leads', body: 'Ask every lead how they found you; compare qualification rate by platform at 90 days.', verification: 'Assumption' },

  // ---- Decisions ----
  { area: 'Decision', title: 'D1: Use fictional concept businesses for teardowns', body: 'Rationale: avoids implying clients, avoids criticising real businesses publicly, allows honest before/after. Real sites only with written permission.', verification: 'Recommendation', confidence: 'High' },
  { area: 'Decision', title: 'D2: Brand palette stays charcoal/cream/gold', body: 'Rationale: matches your Growth HQ brief and existing identity. Vibrant theme accents from the CMO brief are used only when showcasing client web builds with theme switchers.', verification: 'Recommendation', confidence: 'High' },
  { area: 'Decision', title: 'D3: Sustainable cadence (~9 items/week from 2 master ideas)', body: 'Rationale: one person. Every master yields 4–5 adaptations; batching keeps production to ~10–12 hours/week. Reduce if quality slips — consistency beats volume.', verification: 'Recommendation', confidence: 'Medium' },
  { area: 'Decision', title: 'D4: No invented ROI metrics', body: 'The CMO brief asked for “concrete business ROI metrics” in LinkedIn posts. None are available (outcomes “to be supplied”), so posts use process and reasoning instead. Add real metrics only once measured and cleared.', verification: 'Recommendation', confidence: 'High' },
  { area: 'Decision', title: 'D5: DM automation optional and human-first', body: 'Keyword triggers (AUDIT, IMPACT, REDESIGN, MENU) can be answered manually or with an automation tool (e.g. Manychat — check pricing/terms) for the first reply only; qualification is always personal. No bulk unsolicited messages.', verification: 'Recommendation', confidence: 'High' },
  { area: 'Decision', title: 'D6: Editors chosen for India', body: 'Instagram Edits (phone), Canva (design), DaVinci Resolve (long-form). CapCut excluded (blocked in India).', verification: 'Recommendation', confidence: 'High' },
];

export function buildResearch(t: number): ResearchItem[] {
  return items.map((r, i) => ({ ...r, id: `res_${String(i + 1).padStart(3, '0')}`, platform: r.platform ?? 'all', createdAt: t + i, updatedAt: t + i }));
}

export function buildCampaigns(t: number): Campaign[] {
  const c = (x: Omit<Campaign, 'createdAt' | 'updatedAt'>): Campaign => ({ ...x, createdAt: t, updatedAt: t });
  return [
    c({ id: 'c_restaurant', workspace: 'agency', name: 'Restaurant Bookings Series', status: 'Active', platforms: ['instagram', 'facebook', 'youtube', 'linkedin'],
      prospect: 'Owner or GM of an independent restaurant/café or small group (1–10 sites) in the US/UK.',
      problem: 'Website looks fine but makes booking, menus and practical info hard on mobile.',
      concept: '“What I fix first” teardown series on fictional concept restaurants + a full YouTube audit.',
      offer: 'Free 30-minute website audit; menu-page checklist (MENU keyword).',
      cta: 'Comment AUDIT / MENU, or message the Page.',
      landing: 'kreatifatelier.com/contact with a hospitality-specific intro line and “How did you find us?” field. Ideal: a dedicated /restaurant-websites page with the before/after and audit booking.',
      followUp: 'Reply within 1 working day; ask goal + timeline; book audit; send 3 fixes summary within 48 h; follow up after 7 days.',
      qualification: 'Has a website (or clear plan), 1+ venues, owner/GM involved, US/UK/UAE/India, realistic timeline within 3 months.',
      metrics: 'Profile visits from series posts, AUDIT/MENU DMs, audits booked, proposals, clients.' }),
    c({ id: 'c_audit', workspace: 'agency', name: 'Free Website Audit', status: 'Active', platforms: ['instagram', 'linkedin', 'facebook', 'youtube'],
      prospect: 'Small–mid business owners and marketing leads unsure whether to redesign.',
      problem: 'They don’t know what is wrong with their website, so they either do nothing or overspend on a redesign.',
      concept: 'Checklist content (carousel, LinkedIn document, YouTube tutorial) that demonstrates the audit method.',
      offer: 'Free 30-minute audit → 3 prioritised fixes.',
      cta: 'DM AUDIT, link in bio, Page message, description link.',
      landing: 'Contact page with UTM; form: name, email, website, what do you need help with, how did you find us.',
      followUp: 'Inbound template → audit call → written summary → proposal if relevant → two follow-ups max.',
      qualification: 'Decision-maker present, defined goal, budget range acknowledged, timeline ≤ 6 months.',
      metrics: 'Audit requests, show rate, qualified %, proposals, clients, revenue (when known).' }),
    c({ id: 'c_impact', workspace: 'agency', name: 'Asraya: Donation & Volunteer UX', status: 'Planned', platforms: ['instagram', 'linkedin', 'facebook'],
      prospect: 'Communications or fundraising lead at a small–mid NGO.',
      problem: 'Donation and volunteer journeys lose supporters to friction.',
      concept: 'Donation-flow vs checkout comparison; volunteer journey checklist.',
      offer: 'Free donation-page review (IMPACT keyword).',
      cta: 'DM IMPACT / message.',
      landing: 'Asraya page on kreatifatelier.com with clear note on how NGO engagements work.',
      followUp: 'Respectful, slower cadence; involve decision-makers; written agreement before any public mention.',
      qualification: 'Registered organisation, active programmes, digital owner identified.',
      metrics: 'IMPACT DMs, reviews delivered, engagements.' }),
  ];
}
