// Core record types. Every record carries a stable `id` so renaming never breaks links.

export type Platform = 'instagram' | 'linkedin' | 'facebook' | 'youtube' | 'website' | 'email';

export type Format =
  | 'ig-reel' | 'ig-carousel' | 'ig-static' | 'ig-story'
  | 'li-text' | 'li-document' | 'li-image' | 'li-video' | 'li-article'
  | 'fb-post' | 'fb-reel' | 'fb-multi-image' | 'fb-story'
  | 'yt-short' | 'yt-long'
  | 'web-page' | 'newsletter';

export const STATUSES = [
  'Idea', 'Planned', 'Script Ready', 'Assets Needed', 'In Production', 'Editing',
  'Ready for Review', 'Ready to Publish', 'Published', 'Analysed', 'Archived',
] as const;
export type Status = (typeof STATUSES)[number];

export type Objective =
  | 'Reach' | 'Shares' | 'Saves' | 'Profile visits' | 'Authority' | 'Website visits'
  | 'Enquiries' | 'Portfolio' | 'NGO awareness' | 'Conversation' | 'Search discovery';

export type Workspace = 'agency' | 'ngo';

export interface Scene {
  n: number; time: string; duration: string; visual: string; voice: string;
  onScreen: string; camera: string; transition: string; sound: string; assets: string;
}

export interface Shot {
  n: number; film: string; visible: string; angle: string;
  method: 'Phone' | 'Screen recording' | 'AI-generated' | 'Animation' | 'Design' | string;
  background: string; length: string; onCamera: string; narration: string; purpose: string;
}

export interface AIShot {
  ref: string; why: string; tool: string; mode: 'Text-to-video' | 'Image-to-video';
  startFrame: string; prompt: string; negative: string; camera: string; lighting: string;
  style: string; subjectMotion: string; cameraMotion: string; duration: string; aspect: string;
  continuity: string; exclude: string; evaluate: string;
}

export interface Slide { n: number; text: string; layout: string; visual: string }

export interface ThumbConcept {
  name: string; viewer: string; subject: string; emotion: string; composition: string;
  background: string; lighting: string; contrast: string; text: string; focal: string;
  mobile: string; titlePair: string; honesty: string; prompt: string; canva: string;
}

export interface Publishing {
  cover?: string; title?: string; description?: string; keywords?: string; hashtags?: string;
  alt?: string; bestTime?: string; storySequence?: string; nextIdea?: string; metrics?: string;
  chapters?: string; pinnedComment?: string; playlist?: string; endScreen?: string;
}

export interface Concept {
  problem?: string; desiredResponse?: string; whyHold?: string; distinctive?: string;
  risks?: string; formatReason?: string;
}

export interface Voiceover {
  script?: string; pace?: string; recording?: string; aiVoice?: string; timing?: string;
  pronunciation?: string; subtitles?: string; music?: string;
}

export interface ResultEntry {
  id: string; date: string; source: 'manual' | 'csv'; metrics: Record<string, number>; note?: string;
}

export interface Post {
  id: string;
  workspace: Workspace;
  masterId?: string;
  campaignId?: string;
  platform: Platform;
  account?: string;
  format: Format;
  title: string;
  date?: string;
  time?: string;
  pillar?: string;
  audience?: string;
  objective?: Objective;
  hooks?: string[];
  hook?: string;
  concept?: Concept;
  script?: string;
  altVersion?: string;
  scenes?: Scene[];
  shots?: Shot[];
  aiShots?: AIShot[];
  slides?: Slide[];
  body?: string;
  caption?: string;
  cta?: string;
  visualDirection?: string;
  requiredAssets?: string;
  assetIds?: string[];
  voiceover?: Voiceover;
  editGuide?: string[];
  editApp?: string;
  publishing?: Publishing;
  thumbnails?: ThumbConcept[];
  checklist?: Record<string, boolean>;
  guideProgress?: Record<string, boolean>;
  guideStep?: number;
  owner?: string;
  status: Status;
  publishedUrl?: string;
  results?: ResultEntry[];
  observations?: string;
  effort?: 'Low' | 'Medium' | 'High';
  tags?: string[];
  notes?: string;
  sample?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Master {
  id: string;
  workspace: Workspace;
  title: string;
  idea: string;
  audience?: string;
  problem?: string;
  campaignId?: string;
  objective?: Objective;
  pillar?: string;
  topic?: string;
  argument?: string;
  sources?: string;
  approvedClaims?: string;
  proof?: string;
  sourceMaterial?: string;
  visualConcept?: string;
  assetIds?: string[];
  leadOffer?: string;
  lessons?: string;
  formats?: Format[];
  effort?: 'Low' | 'Medium' | 'High';
  funnel?: 'Reach' | 'Trust' | 'Conversion';
  nextAction?: string;
  status: Status;
  tags?: string[];
  ideaNo?: number;
  sample?: boolean;
  createdAt: number;
  updatedAt: number;
}

export type AssetSource = 'Original' | 'AI-generated' | 'Licensed' | 'Client-supplied' | 'Screen recording';

export interface Asset {
  id: string;
  name: string;
  type: string;
  platform?: Platform | 'multi';
  source: AssetSource;
  status: 'Needed' | 'Briefed' | 'In progress' | 'Ready' | 'Used';
  method?: string;
  brief?: string;
  prompt?: string;
  location?: string;
  permissions?: string;
  dims?: string;
  postIds?: string[];
  fileId?: string;
  isTemplate?: boolean;
  template?: {
    purpose?: string; elements?: string; palette?: string; typography?: string;
    safeAreas?: string; logo?: string; export?: string;
  };
  tags?: string[];
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface StoredFile { id: string; name: string; mime: string; blob: Blob; createdAt: number }

export const LEAD_STATUSES = [
  'New', 'Researching', 'Contacted', 'In conversation', 'Qualified', 'Meeting booked',
  'Proposal sent', 'Won', 'Lost', 'Not a fit', 'Nurture',
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface Lead {
  id: string;
  kind: 'Prospect' | 'Inbound lead';
  business: string;
  website?: string;
  country?: string;
  industry?: string;
  decisionMaker?: string;
  contactSource?: string;
  platform?: Platform | 'unknown';
  accountPage?: string;
  contentUrl?: string;
  sourcePostId?: string;
  campaignId?: string;
  serviceInterest?: string;
  discovered?: string;
  lastContact?: string;
  status: LeadStatus;
  nextAction?: string;
  nextFollowUp?: string;
  meeting?: string;
  proposal?: string;
  outcome?: string;
  revenue?: number;
  attribution?: 'Confirmed by lead' | 'Likely' | 'Unknown';
  howFound?: string;
  notes?: string;
  archived?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Campaign {
  id: string;
  workspace: Workspace;
  name: string;
  prospect?: string;
  problem?: string;
  concept?: string;
  offer?: string;
  cta?: string;
  landing?: string;
  followUp?: string;
  qualification?: string;
  metrics?: string;
  platforms?: Platform[];
  status: 'Planned' | 'Active' | 'Paused' | 'Done';
  createdAt: number;
  updatedAt: number;
}

export type Verification = 'Verified (primary)' | 'Organisation claim' | 'Third-party' | 'Estimate' | 'Unresolved' | 'Unknown';

export interface ResearchItem {
  id: string;
  area: 'Audience' | 'Persona' | 'Positioning' | 'Pillar' | 'Competitor' | 'Platform' | 'Tool' | 'Hypothesis' | 'Decision' | 'Objective' | 'Fact';
  platform?: Platform | 'all';
  title: string;
  body: string;
  sourceTitle?: string;
  sourceUrl?: string;
  checked?: string;
  confidence?: 'High' | 'Medium' | 'Low';
  verification?: Verification | 'Recommendation' | 'Assumption';
  tags?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface NgoCandidate {
  id: string; name: string; website?: string; location?: string; focus?: string;
  distinguishing?: string; sourceUrl?: string; selected?: boolean; notes?: string;
}

export interface NgoFact {
  id: string;
  candidateId?: string;
  category: string;
  fact: string;
  sourceTitle?: string;
  sourceUrl?: string;
  published?: string;
  checked?: string;
  confidence: 'High' | 'Medium' | 'Low';
  status: Verification;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Review {
  id: string;
  period: 'Weekly' | 'Monthly' | '30-day' | '60-day' | '90-day';
  start: string;
  end: string;
  answers: Record<string, string>;
  createdAt: number;
  updatedAt: number;
}

export interface Task {
  id: string; title: string; due?: string; done: boolean; postId?: string; leadId?: string;
  kind?: 'Production' | 'Follow-up' | 'Review' | 'Admin'; createdAt: number;
}

export interface Setting { key: string; value: unknown }

export const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: 'Instagram', linkedin: 'LinkedIn', facebook: 'Facebook', youtube: 'YouTube', website: 'Website', email: 'Email',
};

export const FORMAT_LABEL: Record<Format, string> = {
  'ig-reel': 'Instagram Reel', 'ig-carousel': 'Instagram Carousel', 'ig-static': 'Instagram Static Post', 'ig-story': 'Instagram Story Sequence',
  'li-text': 'LinkedIn Text Post', 'li-document': 'LinkedIn Document Post', 'li-image': 'LinkedIn Image Post', 'li-video': 'LinkedIn Video', 'li-article': 'LinkedIn Article / Newsletter',
  'fb-post': 'Facebook Page Post', 'fb-reel': 'Facebook Reel', 'fb-multi-image': 'Facebook Multi-image Post', 'fb-story': 'Facebook Story',
  'yt-short': 'YouTube Short', 'yt-long': 'YouTube Long-form', 'web-page': 'Website Page', 'newsletter': 'Email Newsletter',
};

export const FORMAT_PLATFORM: Record<Format, Platform> = {
  'ig-reel': 'instagram', 'ig-carousel': 'instagram', 'ig-static': 'instagram', 'ig-story': 'instagram',
  'li-text': 'linkedin', 'li-document': 'linkedin', 'li-image': 'linkedin', 'li-video': 'linkedin', 'li-article': 'linkedin',
  'fb-post': 'facebook', 'fb-reel': 'facebook', 'fb-multi-image': 'facebook', 'fb-story': 'facebook',
  'yt-short': 'youtube', 'yt-long': 'youtube', 'web-page': 'website', 'newsletter': 'email',
};

export const VIDEO_FORMATS: Format[] = ['ig-reel', 'li-video', 'fb-reel', 'yt-short', 'yt-long'];
export const SLIDE_FORMATS: Format[] = ['ig-carousel', 'li-document', 'fb-multi-image', 'ig-story', 'fb-story'];

export const PILLARS = [
  'Website Teardowns', 'Redesign Transformations', 'Marketing Explained', 'Behind the Build',
  'Useful Assets', 'Impact & NGO Storytelling', 'Agency Point of View',
];

export const AUDIENCES = [
  'US/UK small business owners', 'Restaurant & café owners', 'E-commerce / D2C founders',
  'Professional services firms', 'B2B manufacturers & exporters', 'Marketing managers', 'NGO & non-profit leaders', 'Creators & marketers (peer audience)',
];
