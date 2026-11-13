import type { Master, NgoCandidate, NgoFact } from '../lib/types';
import { CHECKED } from '../content/tools';

// Identity is unresolved: several organisations use “Asha”. Only candidate-level, sourced
// information is stored. No facts are attached to a confirmed organisation yet.

export const NGO_CANDIDATES: NgoCandidate[] = [
  { id: 'ngo_asha_education', name: 'Asha for Education', website: 'https://ashanet.org', location: 'US-founded network with chapters in the US and India (a Hyderabad chapter has been referenced historically)', focus: 'Basic education for underprivileged children in India', distinguishing: 'Volunteer-run chapters; “ashanet.org” domain. Chapter sites such as hyderabad.ashanet.org were referenced in older sources — verify they still exist.', sourceUrl: 'https://uiuc.ashanet.org/about/' },
  { id: 'ngo_asha_foundation_delhi', name: 'The Asha Foundation / Asha Community Health & Development Society (Delhi)', website: '', location: 'Delhi slums', focus: 'Community health and development in slum areas', distinguishing: 'Founder reported as Dr Kiran Martin (third-party description). Official site not confirmed in this pass.', sourceUrl: 'https://www.trinity.unimelb.edu.au/whats-happening/news/trinity-students-bring-asha-hope-to-slums-in-delhi' },
  { id: 'ngo_asha_uk', name: 'The Asha Foundation (UK registered charity 1058320)', website: '', location: 'United Kingdom', focus: 'See Charity Commission record', distinguishing: 'UK Charity Commission register entry 1058320.', sourceUrl: 'https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/1058320/what-who-how-where' },
  { id: 'ngo_asha_kuteer', name: 'Asha Kuteer Foundation', website: '', location: 'Hyderabad (per listing)', focus: 'Care for visually impaired elderly, orphans and marginalised youth (per third-party listing)', distinguishing: 'Listed on give.do / GreatNonProfits; official website not found in this pass.', sourceUrl: 'https://discover.give.do/FX/asha-kuteer-foundation' },
  { id: 'ngo_asha_kiran_girls', name: 'Asha Kiran for Girls', website: '', location: 'Lalapet, Secunderabad', focus: 'Child care / shelter (CCI)', distinguishing: 'Appears in the Hyderabad District NGO/CCI directory already in your kreatif-ngo-vercel project data (accessed Aug 2026).', sourceUrl: '' },
  { id: 'ngo_aasha_guwahati', name: 'Aasha (A Hope) Foundation & Social Welfare Society', website: '', location: 'Guwahati, Assam', focus: 'See NGO Darpan listing', distinguishing: 'Name translates to “A Hope” — closest literal match to “Asha Hope Foundation” mentioned in your CMO brief.', sourceUrl: 'https://ngodarpan.gov.in/index.php/home/sectorwise_ngo/4225/4/20' },
  { id: 'ngo_asha_ek_hope', name: 'Asha Ek Hope Foundation', website: '', location: 'Mumbai', focus: 'Support for people living with motor neurone disease (MND) and families', distinguishing: '“Hope” in name; health focus.', sourceUrl: 'https://ngobase.org/profile/22844' },
  { id: 'ngo_asha_speranza', name: 'Fondazione “ASHA” “Speranza”', website: '', location: 'Switzerland', focus: 'Help for disadvantaged children in India', distinguishing: 'Name means “Asha Hope” in Italian.', sourceUrl: 'https://www.fundraiso.ch/en/organisations/fondazione-asha-speranza' },
];

const f = (x: Omit<NgoFact, 'createdAt' | 'updatedAt'>, t: number): NgoFact => ({ ...x, createdAt: t, updatedAt: t });

export function buildNgoFacts(t: number): NgoFact[] {
  return [
    f({ id: 'nf_identity', category: 'Identity verification', fact: 'The correct “Asha” organisation has not been identified. Your CMO brief names “Asha Hope Foundation”; no organisation with exactly that name was found in a web search on 2026-10-28. Eight similarly named organisations are listed as candidates.', sourceTitle: 'Web search “Asha Hope Foundation” NGO', checked: CHECKED, confidence: 'High', status: 'Unresolved', notes: 'Action: ask the contact who referred Asha for the official website, registration number or social handle.' }, t),
    f({ id: 'nf_relationship', category: 'Relationship to Kreatif Atelier', fact: 'No confirmed engagement, partnership or permission exists in the project files. Do not present Asha as a client, partner or endorsement.', checked: CHECKED, confidence: 'High', status: 'Unknown' }, t),
    f({ id: 'nf_c1', candidateId: 'ngo_asha_education', category: 'Organisation overview', fact: 'Asha for Education is described as an international non-profit focused on basic education in India, organised in volunteer chapters.', sourceTitle: 'Asha UIUC chapter — About', sourceUrl: 'https://uiuc.ashanet.org/about/', checked: CHECKED, confidence: 'Medium', status: 'Organisation claim', notes: 'Candidate only. Do not use until identity is confirmed.' }, t),
    f({ id: 'nf_c2', candidateId: 'ngo_asha_uk', category: 'Registration', fact: 'A charity named “The Asha Foundation” is registered with the Charity Commission for England and Wales, number 1058320.', sourceTitle: 'Charity Commission register', sourceUrl: 'https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/1058320/what-who-how-where', checked: CHECKED, confidence: 'Medium', status: 'Third-party', notes: 'Register is a primary source for registration but its activities were not read in this pass.' }, t),
    f({ id: 'nf_c3', candidateId: 'ngo_aasha_guwahati', category: 'Registration', fact: '“Aasha (A Hope) Foundation & Social Welfare Society” appears on India’s NGO Darpan portal (sector-wise listing).', sourceTitle: 'NGO Darpan', sourceUrl: 'https://ngodarpan.gov.in/index.php/home/sectorwise_ngo/4225/4/20', checked: CHECKED, confidence: 'Low', status: 'Third-party', notes: 'Listing page only; registration details not extracted.' }, t),
  ];
}

export const NGO_PROFILE_SECTIONS = [
  'Organisation overview', 'Mission and values', 'History and leadership', 'Programmes', 'Locations and communities served',
  'Impact and evidence', 'Volunteer opportunities', 'Donation and fundraising', 'News and events', 'Website and social audit',
  'Registration', 'Partnerships', 'Annual reports and financial transparency', 'Contact details', 'Visual identity', 'Comparable organisations',
];

export const NGO_RESEARCH_CHECKLIST = [
  'Full official name', 'Alternative names and abbreviations', 'Official website', 'Official social profiles', 'Headquarters and operating locations',
  'Registration details (e.g. NGO Darpan ID, 12A/80G, FCRA, or UK charity number)', 'Founding year and history', 'Founders and leadership', 'Mission, vision, values',
  'Communities served', 'Main programmes', 'Beneficiary eligibility and services', 'Volunteer opportunities', 'Donation methods', 'Partnerships',
  'Publicly reported impact metrics', 'Annual/impact reports', 'Financial disclosures', 'Fundraising campaigns', 'Upcoming events (verified)',
  'Public contact details', 'Website structure and user journey', 'Existing content and social strategy', 'Visual identity', 'Opportunities (awareness, fundraising, volunteering, retention, access)',
  'Digital improvements with specific observations', 'Comparable organisations',
];

export const SAFEGUARDING = [
  'No identifiable photographs of children without documented guardian consent and the NGO’s safeguarding approval.',
  'No private information about beneficiaries (names, locations, health details).',
  'No invented personal stories or outcomes; every story is consented and verified with the NGO.',
  'No AI-generated people presented as real beneficiaries. If AI imagery is used, label it as illustrative.',
  'No exaggerated impact figures; quote the NGO’s published numbers with source and date, labelled “reported by [NGO]”.',
  'No imagery that exploits distress or poverty to drive donations. Dignity-centred framing only.',
  'No confidential or sensitive NGO information.',
  'Content about the NGO on the agency account needs written permission and must not look like the NGO’s official communication.',
];

export const NGO_AUDIT_AREAS = [
  { area: 'Website usability & accessibility', how: 'Phone test, 5-second test, WCAG contrast check, keyboard navigation.', relevance: 'Always relevant — supporters and service users arrive on phones.' },
  { area: 'Volunteer / service-enquiry journeys', how: 'Complete the volunteer form; count fields; check confirmation and follow-up.', relevance: 'High if the NGO relies on volunteers.' },
  { area: 'Donation journey', how: 'Count steps; check payment methods; tax receipt (e.g. 80G in India) clarity; thank-you page.', relevance: 'Only if online donations are accepted and permitted (check FCRA for foreign donations in India).' },
  { area: 'Newsletter subscription', how: 'Find sign-up; check confirmation email.', relevance: 'Only if they can sustain a newsletter.' },
  { area: 'Local & technical SEO', how: 'Google Business Profile, page titles, PageSpeed.', relevance: 'High for service-delivery NGOs people search for locally.' },
  { area: 'Analytics & conversion tracking', how: 'Ask whether GA4 or similar exists; check donation/volunteer events.', relevance: 'Needed to measure any change.' },
  { area: 'Social content', how: 'Review last 30 posts: formats, consent, consistency.', relevance: 'Depends on audience; don’t recommend every platform.' },
  { area: 'Fundraising communications & donor retention', how: 'Receipt and update cadence.', relevance: 'High for recurring donors.' },
  { area: 'AI-powered enquiry handling', how: 'Volume of repetitive enquiries?', relevance: 'Only if volume justifies it and safeguarding allows; often unnecessary for small NGOs.' },
  { area: 'Campaign reporting', how: 'Do campaigns report results publicly?', relevance: 'Builds trust; must be accurate.' },
];

export function buildNgoIdeas(t: number): Master[] {
  const m = (id: string, title: string, idea: string, formats: Master['formats']): Master => ({
    id, workspace: 'ngo', title, idea, formats, status: 'Idea', pillar: 'Impact & NGO Storytelling', audience: 'Supporters, volunteers and donors of the NGO',
    objective: 'NGO awareness', effort: 'Medium', funnel: 'Trust', nextAction: 'Blocked until identity is confirmed and the NGO grants permission', sample: true, createdAt: t, updatedAt: t,
    approvedClaims: 'None yet — identity unconfirmed.',
  });
  return [
    m('ngo_idea_1', 'Programme explainer (once programmes are verified)', 'A carousel that explains one verified programme: who it serves, how to access it, how to help. Uses the NGO’s own approved photos with consent.', ['ig-carousel', 'fb-multi-image']),
    m('ngo_idea_2', 'Volunteer recruitment journey', 'Reel + Story showing what a volunteer shift actually involves (filmed with consenting volunteers, no beneficiaries identifiable).', ['ig-reel', 'ig-story']),
    m('ngo_idea_3', 'Donor education: where a donation goes', 'LinkedIn/Facebook post explaining the NGO’s published fund allocation, quoting the annual report with page reference.', ['li-text', 'fb-post']),
    m('ngo_idea_4', 'Impact report summary', 'Document post summarising the latest published report, every number cited.', ['li-document']),
    m('ngo_idea_5', 'Event promotion (verified events only)', 'Story sequence + Facebook event post.', ['ig-story', 'fb-post']),
    m('ngo_idea_6', 'Campaign landing page brief', 'Single-purpose page for one fundraising or volunteer campaign with clear CTA and tracking.', ['web-page']),
    m('ngo_idea_7', 'Monthly email newsletter', 'Programme update, one story told with consent, one call to action.', ['newsletter']),
  ];
}
