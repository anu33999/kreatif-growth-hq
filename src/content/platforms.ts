import type { Format, Platform } from '../lib/types';

export interface Spec { item: string; value: string; confidence: 'High' | 'Medium' | 'Low'; source: string }
export interface PlatformGuide {
  id: Platform;
  name: string;
  role: string;
  official: { title: string; url: string }[];
  formats: { format: Format; when: string; cadence: string }[];
  audience: string;
  suits: string[];
  avoid: string[];
  adjacent: string;
  opportunities: string[];
  reachLimits: string;
  featureInfluence: string[];
  metrics: { metric: string; why: string }[];
  editorialRules: string[];
  specs: Spec[];
  profile: { label: string; text: string }[];
  leadPath: string[];
  accounts?: { name: string; use: string }[];
}

export const PLATFORMS: Record<'instagram' | 'linkedin' | 'facebook' | 'youtube', PlatformGuide> = {
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    role: 'Visual discovery and proof of craft. Reels earn reach from non-followers; carousels earn saves and depth; Stories and DMs turn interest into conversations.',
    official: [
      { title: 'Instagram for Creators', url: 'https://creators.instagram.com/' },
      { title: 'Instagram Help Centre', url: 'https://help.instagram.com/' },
    ],
    formats: [
      { format: 'ig-reel', when: 'Fast visual transformations, teardowns, process reveals. Main source of new-viewer reach.', cadence: '2 per week' },
      { format: 'ig-carousel', when: 'Frameworks, checklists and before/after breakdowns people save and send.', cadence: '1 per week' },
      { format: 'ig-story', when: 'Behind-the-scenes, polls, question boxes, promoting the week’s Reel, DM keyword prompts.', cadence: '3–5 frames on 4 days' },
      { format: 'ig-static', when: 'Single strong statement or one clean before/after. Use sparingly.', cadence: 'Optional, 2 per month' },
    ],
    audience: 'Primary: founders and owners of small/medium businesses in the US and UK who judge an agency by the look and clarity of its work (restaurants, cafés, D2C brands, boutique professional services). Secondary: marketing managers looking for creative partners. Peer creators and designers will also follow — welcome, but they are not buyers.',
    suits: ['Website teardowns with a clear verdict', 'Before/after redesign concepts (clearly labelled as concepts)', 'Short process reveals: brief → wireframe → final', 'One-idea explainers about conversion and trust', 'Founder point of view on camera, 20–40 seconds'],
    avoid: ['Generic motivational quotes', 'Trend audio with no business point', 'Design-for-designers content (kerning debates) that attracts peers instead of buyers', 'Fake “client results”'],
    adjacent: 'Study design/marketing education accounts and agency accounts that show work in motion. Starting list to verify before studying: The Futur (@thefuturishere), Flux Academy (@flux_academy), Marketing Examples (Harry Dry). Look at their hook in the first second, how they label concepts vs client work, and their CTA. Add your own finds in Strategy & Research → Competitors.',
    opportunities: ['Few agencies show the reasoning behind redesigns in under 30 seconds — the “why” is the differentiator.', 'US/UK restaurant and café sites are often slow, PDF-menu based and hard to book from on mobile: highly visual, easy to demonstrate.', 'Interactive theme switchers and motion UI look striking in Reels and are genuinely part of the studio’s web work.'],
    reachLimits: 'Organic reach is not guaranteed. New accounts typically see small and uneven reach; Instagram recommends Reels to non-followers based on predicted interest, and it states that original content is favoured over reposts. Plan for 8–12 weeks of consistent publishing before judging the strategy, and judge by profile visits, follows from the right audience, DMs and website clicks — not views alone.',
    featureInfluence: ['Reels over 3 minutes are not recommended to non-followers: keep discovery Reels under 90 seconds, mostly 15–40 seconds.', 'The profile grid previews posts in a 3:4 crop: design covers and carousels for 1080×1440 so nothing important is cut.', 'Carousels can hold up to 20 items in the app; the first slide sets the aspect ratio for all slides.', 'Trial Reels (shown to non-followers first) are useful for testing hooks without affecting your grid — check availability on your account.', 'Keyword-rich captions and on-screen text help Instagram search; hashtags are optional and should be few and specific.'],
    metrics: [
      { metric: 'Reach from non-followers', why: 'Shows the Reel was distributed beyond current followers.' },
      { metric: 'Shares (sends) and saves', why: 'Strongest signals of usefulness; carousels should be judged mainly on saves.' },
      { metric: 'Profile visits and follows from the post', why: 'Shows the content made people curious about the studio.' },
      { metric: 'Link taps / website clicks (UTM)', why: 'Moves interest towards an enquiry.' },
      { metric: 'Qualified DMs', why: 'The business outcome. Log each one as a lead with its source post.' },
    ],
    editorialRules: ['Every Reel opens with the result or the problem in the first second — no logo intro.', 'Label redesign concepts: “Concept redesign — not commissioned by [brand]”. Never imply a brand is a client.', 'On-screen text max 7 words per card; keep it inside the safe area.', 'One idea per post. One CTA per post.', 'Captions: lead with the takeaway, then context, then CTA. Write like a person, not an ad.'],
    specs: [
      { item: 'Reel canvas', value: '1080×1920 px, 9:16', confidence: 'High', source: 'https://help.instagram.com/' },
      { item: 'Reel length for discovery', value: '≤ 3 min recommended to non-followers (longer Reels shown to followers only)', confidence: 'Medium', source: 'https://growthscribe.com/instagram-reel-aspect-ratio/' },
      { item: 'Reel safe area', value: 'Keep text out of the top ~220 px and bottom ~380 px (UI overlays); centre 1080×1320 is safe', confidence: 'Medium', source: 'Common practice; check by previewing before posting' },
      { item: 'Carousel / feed', value: '1080×1440 (3:4) or 1080×1350 (4:5); up to 20 items in the app', confidence: 'Medium', source: 'https://growthscribe.com/instagram-ratio-size/' },
      { item: 'Story', value: '1080×1920, keep stickers 250 px from top and bottom', confidence: 'Medium', source: 'https://help.instagram.com/' },
      { item: 'Grid preview', value: '3:4 crop on profile grid', confidence: 'Medium', source: 'https://flowgent.ai/blog/instagram-post-size' },
    ],
    profile: [
      { label: 'Name field (searchable)', text: 'Kreatif Atelier | Web Design & Growth' },
      { label: 'Username', text: '@kreatifatelier (confirm the handle is held by the studio)' },
      { label: 'Category', text: 'Advertising/Marketing (or Web Designer)' },
      { label: 'Bio (≤150 characters)', text: 'Websites & content that turn attention into enquiries.\nStrategy · Design · Build · Growth\nHyderabad · Vancouver · Dubai\n↓ Free 30-min brand audit' },
      { label: 'Link', text: 'https://www.kreatifatelier.com/contact/?utm_source=instagram&utm_medium=social&utm_campaign=bio' },
      { label: 'Highlights', text: 'START HERE (who we help, what we do, how to enquire) · TEARDOWNS · PROCESS · CONCEPTS (labelled spec work) · FAQ (pricing approach, timelines, locations) · IMPACT (Asraya NGO work, only with permission)' },
      { label: 'Pinned posts (3)', text: '1) The “What we fix first on a restaurant website” Reel. 2) The “Website conversion checklist” carousel. 3) A “How we work + how to enquire” carousel.' },
    ],
    leadPath: ['Reel reaches a business owner', 'They visit the profile: bio says who it is for', 'Pinned posts prove method, Highlights answer FAQs', 'They tap the link or DM a keyword (AUDIT)', 'You reply personally within a working day, ask 2 qualifying questions', 'Offer a 30-minute audit call or a short recorded audit', 'Log the lead with its source post'],
  },

  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    role: 'Professional credibility and B2B conversations. The personal profile carries reach and relationships; the company Page carries legitimacy, services and the archive of proof.',
    official: [
      { title: 'Posting and sharing content overview', url: 'https://www.linkedin.com/help/linkedin/answer/a518996/posting-and-sharing-content-overview' },
      { title: 'Publishing articles on LinkedIn', url: 'https://www.linkedin.com/help/linkedin/answer/a522427/publishing-articles-on-linkedin' },
    ],
    formats: [
      { format: 'li-text', when: 'Arguments, lessons, short case explanations. The workhorse for the personal profile.', cadence: '2 per week (personal)' },
      { format: 'li-document', when: 'Frameworks and checklists as a PDF people page through and save.', cadence: '2 per month (company Page + reshare)' },
      { format: 'li-image', when: 'One diagram or redesign comparison with a professional explanation.', cadence: '2 per month' },
      { format: 'li-video', when: 'Narrated website audit clips, 60–120 seconds.', cadence: '1–2 per month' },
      { format: 'li-article', when: 'Long-form thinking; optional newsletter only when capacity allows.', cadence: 'Optional, monthly' },
    ],
    audience: 'Primary: founders/owners and marketing leads at US and UK small–mid businesses (10–200 staff) in hospitality, D2C/e-commerce, professional services and B2B manufacturing/export. Secondary: Indian export-facing manufacturers (an existing proof area: multilingual B2B site work).',
    suits: ['Business reasoning behind design decisions', 'Plain-English explanations of measurement, CRO and lead qualification', 'Narrated audits of public websites (respectful, specific)', 'Process transparency: how a project is scoped and why', 'Honest lessons from running a studio'],
    avoid: ['Motivational one-liners and “agree?” bait', 'Artificial one-sentence-per-line formatting on every post', 'Humble-brag announcements without substance', 'Engagement pods, automated connection requests'],
    adjacent: 'Benchmark founder-led agency and B2B marketing voices; starting list to verify: Harry Dry (Marketing Examples), Chris Walker (Refine Labs/Passetto), Peep Laja (Wynter/CXL). Note how they open, how they use evidence, and how often they sell (rarely).',
    opportunities: ['US/UK buyers worry about offshore quality and communication: show process, clarity and time-zone coverage (Vancouver/Dubai/Hyderabad).', 'Document posts on conversion are under-supplied in hospitality and manufacturing niches.', 'The company Page can host Showcase-style service pages and a services listing.'],
    reachLimits: 'Company Pages typically reach far fewer people than personal profiles. Expect the founder profile to do most of the distribution, with the Page reposting and archiving. Reach depends on early relevant engagement; external links in posts may reduce distribution (widely reported, not officially confirmed) — test link-in-comment vs link-in-post rather than assuming.',
    featureInfluence: ['Document (PDF) posts display as swipeable pages — design 1080×1350 pages with one idea each.', 'Native scheduling exists in the composer: schedule, but be present for the first hour to reply.', 'Newsletters notify subscribers — only start one if you can publish monthly for 6 months.', 'Featured section on the profile can hold a portfolio PDF, the website and the best post.'],
    metrics: [
      { metric: 'Impressions & members reached', why: 'Distribution; compare to your own median, not to others.' },
      { metric: 'Comments from target-role people', why: 'Quality of conversation matters more than count.' },
      { metric: 'Profile views & connection requests from ICP', why: 'Shows the post attracted buyers.' },
      { metric: 'Document page-through / reposts', why: 'Usefulness of the document.' },
      { metric: 'Conversations → calls', why: 'The business outcome; log in Lead Generation.' },
    ],
    editorialRules: ['Open with a specific claim, observation or number you can stand behind.', 'Write in normal paragraphs (2–3 lines each). Use lists only where the content is genuinely a list.', 'One idea, one example, one conclusion.', 'No fabricated metrics. Where the result is unknown, say so.', 'Personal profile = first person (“I”). Company Page = “we”, more reference-like.'],
    specs: [
      { item: 'Document post', value: 'PDF up to 100 MB / 300 pages (API documentation); design 1080×1350 or 1080×1080 pages, 8–12 pages', confidence: 'Medium', source: 'https://opentweet.io/answers/can-you-post-a-linkedin-pdf-carousel-via-api' },
      { item: 'Image', value: '1200×627 (landscape) or 1080×1350 (portrait)', confidence: 'Medium', source: 'https://www.linkedin.com/help/linkedin/' },
      { item: 'Video', value: 'MP4, vertical 9:16 or 1:1 or 16:9; keep 60–120 s; add burned-in captions or SRT', confidence: 'Medium', source: 'https://www.linkedin.com/help/linkedin/' },
      { item: 'Article cover', value: '1920×1080 recommended', confidence: 'Low', source: 'https://www.linkedin.com/help/linkedin/answer/a522427/publishing-articles-on-linkedin' },
      { item: 'Page logo / cover', value: '400×400 logo; 1128×191 cover', confidence: 'Medium', source: 'https://www.linkedin.com/help/linkedin/' },
      { item: 'Personal banner', value: '1584×396', confidence: 'Medium', source: 'https://www.linkedin.com/help/linkedin/' },
    ],
    profile: [
      { label: 'Personal headline', text: '[Your role] at Kreatif Atelier · I help US & UK businesses turn websites and content into qualified enquiries · Strategy · Web · Performance' },
      { label: 'Personal About (opening)', text: 'Most websites I review do not have a design problem. They have a clarity problem: a visitor cannot tell in five seconds who the business helps, what to do next, or why to trust it.\n\nAt Kreatif Atelier we fix that with strategy first, then design, build and measurement. Our team works across Hyderabad, Vancouver and Dubai, so US and UK clients get overlap with their working day.\n\nWhat I post here: website teardowns, conversion lessons, and how we make decisions on real projects.\n\nIf you want a second opinion on your website, message me with the URL — I’ll tell you the first thing I’d fix.' },
      { label: 'Featured (3)', text: '1) kreatifatelier.com (Start a Project). 2) “Website conversion checklist” PDF document post. 3) Best-performing teardown post (update monthly).' },
      { label: 'Company Page tagline', text: 'Strategy, websites and content that move the business.' },
      { label: 'Company Page About', text: 'Kreatif Atelier is a creative and digital studio. We plan, design, build and grow brands — from positioning and identity to websites, content and performance marketing. 206 defined services across 11 practices let us scope precisely what a business needs, and nothing it does not. Hyderabad · Vancouver · Dubai. Free 30-minute brand audit: kreatifatelier.com/contact' },
      { label: 'Company Page banner', text: 'Charcoal background, cream serif line “Creative should move the business.”, small gold rule, website URL bottom-right. Keep text in the centre 60% (mobile crops edges).' },
    ],
    leadPath: ['Post reaches an owner or marketing lead', 'They read the profile headline + Featured', 'They comment or view the document', 'You reply thoughtfully; connect with a contextual note if appropriate', 'Conversation by message once they ask or engage twice', 'Offer audit call; send relevant work afterwards', 'Log lead with source post and attribution confidence'],
    accounts: [
      { name: 'Founder personal profile', use: 'Opinions, lessons, audits, relationships. Most reach. 2 posts/week.' },
      { name: 'Kreatif Atelier company Page', use: 'Documents, service explainers, concept work archive, hiring/legitimacy. Reposts founder posts with added context. 1–2 posts/week.' },
    ],
  },

  facebook: {
    id: 'facebook',
    name: 'Facebook',
    role: 'Business-owner discovery through Reels and useful Page posts, community participation where allowed, and Messenger enquiries. Facebook is not a copy of Instagram: audiences skew older and more owner-operator.',
    official: [
      { title: 'Facebook for Business Help', url: 'https://www.facebook.com/business/help' },
      { title: 'Facebook Creators', url: 'https://creators.facebook.com/' },
    ],
    formats: [
      { format: 'fb-reel', when: 'Practical before/after demonstrations aimed at owner-operators; can share a Reel from Instagram but adapt the caption.', cadence: '1–2 per week' },
      { format: 'fb-post', when: 'Useful tip with one image, clear and plain; Page legitimacy.', cadence: '1 per week' },
      { format: 'fb-multi-image', when: 'Step-by-step redesign or comparison as 3–5 images; viewed in a grid first, so the first image must stand alone.', cadence: '2 per month' },
      { format: 'fb-story', when: 'Optional: cross-post Instagram Stories when relevant.', cadence: 'Optional' },
    ],
    audience: 'Owner-operators of restaurants, cafés, salons, trades and local service firms (US/UK first), plus NGO and non-profit leaders. They use Facebook groups for peer advice and Messenger for quick questions.',
    suits: ['Plain-English demonstrations (“3 changes to get more bookings”)', 'Short narrated website reviews (with permission, or of your own concepts)', 'Q&A posts answering real questions', 'NGO storytelling done with consent (Asraya division)'],
    avoid: ['Engagement bait (“comment YES”)', 'Posting promotions into groups that forbid them', 'Identical captions copied from Instagram'],
    adjacent: 'Look at how local marketing consultants use Facebook Pages + groups: helpful answers first, offers rarely. Verify group rules before posting.',
    opportunities: ['Many owner-operators still run their business on Facebook and Messenger — reply speed and helpfulness are visible differentiators.', 'Facebook Reels can extend the reach of the same footage with a different, more practical framing.'],
    reachLimits: 'New Pages start with very low organic reach. Facebook prioritises content from friends, groups and Reels recommendations. Do not judge Facebook on views; judge it on messages, link clicks and group conversations. Paid ads are a separate, optional decision (see Lead Generation → Paid options).',
    featureInfluence: ['Meta has moved Facebook video towards the Reels format — publish vertical 9:16 video.', 'Multi-image posts show a collage; image 1 must make sense alone.', 'Messenger auto-replies (instant reply / FAQs) can be set in Meta Business Suite — keep them human and short.', 'Schedule via Meta Business Suite together with Instagram, but write a separate caption.'],
    metrics: [
      { metric: 'Reels plays & 3-second views', why: 'Distribution of video.' },
      { metric: 'Link clicks (UTM)', why: 'Traffic to the website.' },
      { metric: 'Messenger conversations started', why: 'Primary business signal on Facebook.' },
      { metric: 'Comments with real questions', why: 'Shows relevance to owners.' },
      { metric: 'Page follows', why: 'Secondary.' },
    ],
    editorialRules: ['Be practical and concrete: name the problem the owner recognises.', 'One clear link or Messenger CTA per post.', 'In groups: read rules, answer questions fully in the comment, never drop a pitch link unasked.', 'Respond to every message within one working day.'],
    specs: [
      { item: 'Reel', value: '1080×1920, 9:16', confidence: 'Medium', source: 'https://www.facebook.com/business/help' },
      { item: 'Feed image', value: '1080×1350 (4:5) or 1080×1080', confidence: 'Medium', source: 'https://www.facebook.com/business/help' },
      { item: 'Page cover', value: 'Upload ~1640×624; desktop shows ~820×312 and mobile crops sides — keep text central', confidence: 'Low', source: 'https://www.facebook.com/business/help' },
      { item: 'Profile picture', value: '≥ 320×320, displays as a circle', confidence: 'Medium', source: 'https://www.facebook.com/business/help' },
    ],
    profile: [
      { label: 'Page name', text: 'Kreatif Atelier' },
      { label: 'Category', text: 'Marketing Agency · Website Designer' },
      { label: 'Intro (bio)', text: 'Websites, content and marketing that bring in enquiries — for restaurants, local businesses, brands and NGOs. Free 30-minute website audit.' },
      { label: 'About / description', text: 'Kreatif Atelier is a creative and digital studio working with clients in the US, UK, UAE and India. We plan, design and build websites, create content and run marketing that is measured by enquiries, not likes. Our Asraya division supports NGOs and social-impact organisations. Message us your website and we’ll tell you the first thing we’d fix.' },
      { label: 'Action button', text: 'Send Message (Messenger) — or “Contact us” linking to kreatifatelier.com/contact with UTM' },
      { label: 'Cover', text: 'Split image: left, a real photo of a laptop showing a studio concept website; right, cream panel with “Websites that bring in enquiries.” Keep text in the centre.' },
      { label: 'Featured / pinned', text: 'Pin a post: “Send us your website — what we’ll check in a free audit” with the 5 checks listed.' },
    ],
    leadPath: ['Reel or useful post reaches an owner', 'They message the Page or comment a question', 'You reply helpfully within a day', 'Ask about their goal and timeline', 'Offer the free audit', 'Log lead with source'],
  },

  youtube: {
    id: 'youtube',
    name: 'YouTube',
    role: 'Searchable, long-lived education. Shorts for discovery; long-form audits and tutorials for authority and search traffic that compounds.',
    official: [
      { title: 'YouTube Creators', url: 'https://www.youtube.com/creators/' },
      { title: 'YouTube Studio analytics', url: 'https://support.google.com/youtube/answer/9002587' },
      { title: 'Thumbnails & titles', url: 'https://support.google.com/youtube/answer/12340300' },
      { title: 'YouTube Shorts', url: 'https://support.google.com/youtube/answer/10059070' },
      { title: 'Test & compare thumbnails', url: 'https://support.google.com/youtube/answer/13861714' },
    ],
    formats: [
      { format: 'yt-short', when: 'One specific fix or transformation in 20–50 seconds.', cadence: '2 per week (reuse Reels footage, re-edited)' },
      { format: 'yt-long', when: 'Full audits and tutorials that answer a searchable question (8–15 min).', cadence: '2 per month to start' },
    ],
    audience: 'Business owners and marketers searching for answers (“why is my restaurant website not getting bookings”, “Shopify homepage conversion”), plus people who discover via Shorts. The long-form viewer is often further along in evaluating help.',
    suits: ['Full website audits with a scorecard', 'Redesign walkthroughs: research → wireframe → build', 'Practical tutorials (landing-page structure, GA4 conversion tracking basics)', 'Comparisons (“Squarespace vs custom site for a restaurant”)'],
    avoid: ['Long intros before the value', 'Misleading thumbnails/titles', 'Stretching a 3-minute idea to 12 minutes'],
    adjacent: 'Benchmark: Flux Academy (web design business), The Futur (agency business), CXL-style CRO explainers. Verify which are currently active and what their top-performing topics are using YouTube search filters.',
    opportunities: ['Search demand exists for niche “website for [industry]” questions; few studios answer with real audits.', 'Long-form provides footage for 4–6 Shorts and all other platforms.'],
    reachLimits: 'New channels grow slowly; long-form may take months to be found in search. Shorts views do not reliably convert to long-form viewers. Judge long-form on CTR + average view duration vs your own baseline, and on enquiries over months.',
    featureInfluence: ['Shorts can be up to 3 minutes (vertical/square) for uploads since 15 Oct 2024.', 'Test & Compare thumbnails is for long-form only — not available for Shorts.', 'Chapters need a 0:00 first timestamp and at least 3 timestamps of ≥10 s.', 'End screens are for long-form videos; Shorts can link a related video.', 'Custom thumbnails require a verified channel / feature eligibility.'],
    metrics: [
      { metric: 'Impressions CTR (long-form)', why: 'Packaging relevance (title + thumbnail).' },
      { metric: 'Average view duration & retention (long-form)', why: 'Whether the video delivers on the promise.' },
      { metric: 'Shorts: viewed vs swiped away, views', why: 'Hook strength for Shorts (metric naming may vary).' },
      { metric: 'Traffic sources (search vs browse vs suggested)', why: 'Tells you whether search strategy is working.' },
      { metric: 'Returning viewers & subscribers gained', why: 'Audience building.' },
      { metric: 'Website clicks & enquiries citing YouTube', why: 'Business outcome; ask leads how they found you.' },
    ],
    editorialRules: ['Open with the outcome or the problem in the first 10 seconds.', 'Title and thumbnail must describe exactly what the video delivers.', 'Show, don’t tell: screen recordings over talking heads for audits.', 'Every long-form video yields Shorts, a LinkedIn post, a Facebook post and an Instagram carousel or Reel.'],
    specs: [
      { item: 'Shorts', value: 'Vertical or square, up to 3 minutes; 1080×1920', confidence: 'Medium', source: 'https://support.google.com/youtube/answer/10059070' },
      { item: 'Long-form', value: '1920×1080 (16:9), 24–30 fps, H.264 MP4', confidence: 'High', source: 'https://support.google.com/youtube/' },
      { item: 'Thumbnail', value: '1280×720, ≤ 2 MB, JPG/PNG', confidence: 'High', source: 'https://support.google.com/youtube/answer/12340300' },
      { item: 'Channel banner', value: '2048×1152; safe area for text/logo 1235×338 (centre)', confidence: 'High', source: 'https://support.google.com/youtube/' },
      { item: 'Profile picture', value: '800×800, renders as a circle at 98×98', confidence: 'High', source: 'https://support.google.com/youtube/' },
      { item: 'Test & Compare', value: 'Long-form only; not for Shorts; requires eligibility (check Studio → Settings → Channel → Feature eligibility)', confidence: 'High', source: 'https://support.google.com/youtube/answer/13861714' },
    ],
    profile: [
      { label: 'Channel name', text: 'Kreatif Atelier' },
      { label: 'Handle', text: '@kreatifatelier (check availability)' },
      { label: 'Channel description', text: 'Website audits, redesign walkthroughs and practical marketing for business owners.\n\nWe’re Kreatif Atelier, a creative and digital studio (Hyderabad · Vancouver · Dubai). On this channel we take real-world website problems — slow restaurant sites, confusing service pages, leaky checkouts — and show exactly how we’d fix them, step by step.\n\nNew videos every other week. Shorts twice a week.\n\nWant a second opinion on your website? Free 30-minute audit: https://www.kreatifatelier.com/contact/?utm_source=youtube&utm_medium=channel&utm_campaign=about' },
      { label: 'Banner', text: '2048×1152 charcoal. Centre safe area: “Website audits & redesigns for business owners” (cream serif), gold rule, “New video every other Thursday”.' },
      { label: 'Profile icon', text: 'Gold “KA” monogram on charcoal circle; no fine text (renders tiny).' },
      { label: 'Playlists', text: 'Website Audits · Redesign Walkthroughs · Restaurant & Hospitality Websites · Conversion Basics · Shorts: Quick Fixes' },
      { label: 'Trailer (optional, 45 s)', text: 'Open on a before/after concept, then: “If you run a business and your website isn’t bringing in enquiries, this channel shows you why — and what to change.”' },
    ],
    leadPath: ['Viewer finds a Short or searches a problem', 'Watches a long-form audit relevant to their industry', 'Clicks the description link / pinned comment to the free audit', 'Enquiry form asks “How did you find us?”', 'Log lead with platform = YouTube and attribution confidence'],
  },
};

export const ADAPTATION_RULES: { format: Format; why: string; change: string }[] = [
  { format: 'ig-reel', why: 'Fast visual proof to reach new viewers.', change: 'Show the transformation in second 1. Kinetic text, 15–40 s, one idea.' },
  { format: 'ig-carousel', why: 'Saves and depth; turns one insight into a reusable checklist.', change: 'Cover hook → problem → 5–7 steps → summary → CTA. 1080×1440.' },
  { format: 'ig-story', why: 'Converts Reel viewers into conversations.', change: 'Poll or question sticker, link sticker, keyword prompt for DMs.' },
  { format: 'li-text', why: 'Credibility with decision-makers.', change: 'Lead with the business consequence; explain the reasoning; first person; no slang.' },
  { format: 'li-document', why: 'Framework that buyers save and forward internally.', change: '8–12 PDF pages, one point per page, professional tone.' },
  { format: 'li-video', why: 'Shows how you think, live.', change: '60–120 s narrated screen recording with captions.' },
  { format: 'fb-post', why: 'Practical help for owner-operators.', change: 'Plain language, local relevance, Messenger CTA.' },
  { format: 'fb-reel', why: 'Extra reach for the same footage.', change: 'More explicit narration and a practical caption; no Instagram-only references.' },
  { format: 'yt-short', why: 'Search-adjacent discovery and a path to long-form.', change: 'Title + on-screen promise, link to the related long video.' },
  { format: 'yt-long', why: 'Topic deep enough to answer a searchable question.', change: 'Full audit/tutorial, chapters, 8–15 min, three packaging concepts.' },
];
