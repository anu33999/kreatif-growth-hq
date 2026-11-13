import { db, getSetting, setSetting } from '../lib/db';
import type { Post, Task } from '../lib/types';
import { buildIdeas } from './ideas';
import { W12 } from './posts1';
import { W34 } from './posts2';
import { buildCampaigns, buildResearch } from './strategy';
import { NGO_CANDIDATES, buildNgoFacts, buildNgoIdeas } from './ngo';
import { buildAssets } from './assets';

export const SEED_VERSION = 1;

export const DEFAULT_GOALS = {
  d30: [
    { id: 'g1', label: 'Publish the 30-day launch plan', metric: 'publishedCount', target: 31 },
    { id: 'g2', label: 'Complete all four platform profiles', metric: 'manual', target: 4, current: 0 },
    { id: 'g3', label: 'Book free website audits', metric: 'meetings', target: 4 },
    { id: 'g4', label: 'Run 4 weekly reviews', metric: 'reviews', target: 4 },
  ],
  d90: [
    { id: 'g5', label: 'Qualified leads (US/UK)', metric: 'qualified', target: 12 },
    { id: 'g6', label: 'Proposals sent', metric: 'proposals', target: 5 },
    { id: 'g7', label: 'Clients won from content', metric: 'won', target: 2 },
    { id: 'g8', label: 'YouTube long-form videos published', metric: 'ytLong', target: 6 },
  ],
};

export async function seedIfEmpty(): Promise<boolean> {
  const v = await getSetting<number>('seedVersion', 0);
  if (v >= SEED_VERSION) return false;
  await seedAll();
  return true;
}

export async function seedAll() {
  const t = Date.now();
  const posts: Post[] = [...W12, ...W34].map((p, i) => ({
    workspace: 'agency', status: 'Planned', checklist: {}, guideProgress: {}, guideStep: 0, results: [], sample: true,
    ...p, createdAt: t + i, updatedAt: t + i,
  }) as Post);
  const masters = [...buildIdeas(t), ...buildNgoIdeas(t)];
  // Link master records to their adaptations and enrich launch masters.
  const enrich: Record<string, Partial<(typeof masters)[number]>> = {
    idea_01: { argument: 'Booking friction, not design quality, is the most common reason restaurant sites underperform on mobile.', approvedClaims: 'Concept site is fictional. No uplift numbers.', proof: 'Before/after concept recordings; tap/scroll counts.', leadOffer: 'Free 30-minute audit; checklist via AUDIT keyword', visualConcept: '“Olive & Ember” concept identity; phone POV; gold annotations.', sources: 'Your own recordings of the concept sites.' },
    idea_04: { argument: 'Most sites need three fixes, not a redesign; the audit finds which.', leadOffer: 'Free 30-minute audit', approvedClaims: 'Describe the audit honestly: 30 minutes, 7 checks, 3 fixes.' },
    idea_05: { argument: 'Donation journeys should be held to checkout standards; trust (verified impact reporting) is the extra ingredient.', approvedClaims: 'Concept flows only; no NGO named; no uplift numbers.', leadOffer: 'Donation page review (IMPACT)' },
    idea_06: { approvedClaims: 'Marlsboro Group: 7-language corporate website, product/industry visuals, company profile, LinkedIn management (per company profile). No outcome metrics. Confirm naming permission for social.', sources: 'Kreatif Atelier Company Profile PDF, Selected Work.' },
  };
  for (const m of masters) Object.assign(m, enrich[m.id] ?? {});

  const tasks: Task[] = [
    { id: 'task_profiles', title: 'Set up / update Instagram, LinkedIn, Facebook, YouTube profiles using Studio → Profile copy', due: '2026-10-31', done: false, kind: 'Admin', createdAt: t },
    { id: 'task_photo', title: 'Batch photography session (Creative Studio → Photography)', due: '2026-10-31', done: false, kind: 'Production', createdAt: t },
    { id: 'task_concepts', title: 'Build Olive & Ember before/after concept pages and record A1/A2', due: '2026-11-01', done: false, kind: 'Production', postId: 'post_w1_ig_reel_book', createdAt: t },
    { id: 'task_ngo_id', title: 'Ask the Asha contact for official website / registration number', due: '2026-11-03', done: false, kind: 'Admin', createdAt: t },
    { id: 'task_marls', title: 'Confirm Marlsboro Group is happy to be named on LinkedIn/Instagram', due: '2026-11-10', done: false, kind: 'Admin', postId: 'post_w3_li_text_multilingual', createdAt: t },
    ...['2026-11-08', '2026-11-15', '2026-11-22', '2026-11-29'].map((d, i) => ({ id: `task_review_w${i + 1}`, title: `Weekly review — week ${i + 1}`, due: d, done: false, kind: 'Review' as const, createdAt: t })),
    { id: 'task_review_30', title: '30-day review', due: '2026-12-01', done: false, kind: 'Review', createdAt: t },
    { id: 'task_backup', title: 'Download a backup (Help → Backup)', due: '2026-11-07', done: false, kind: 'Admin', createdAt: t },
  ];

  await db.transaction('rw', [db.masters, db.posts, db.research, db.campaigns, db.assets, db.ngoCandidates, db.ngoFacts, db.tasks, db.settings], async () => {
    await db.masters.bulkPut(masters);
    await db.posts.bulkPut(posts);
    await db.research.bulkPut(buildResearch(t));
    await db.campaigns.bulkPut(buildCampaigns(t));
    await db.assets.bulkPut(buildAssets(t));
    await db.ngoCandidates.bulkPut(NGO_CANDIDATES);
    await db.ngoFacts.bulkPut(buildNgoFacts(t));
    await db.tasks.bulkPut(tasks);
    await setSetting('goals', DEFAULT_GOALS);
    await setSetting('seedVersion', SEED_VERSION);
    await setSetting('seededAt', new Date(t).toISOString());
  });
}

export async function resetToStarter() {
  await db.transaction('rw', db.tables, async () => {
    for (const tb of db.tables) await tb.clear();
  });
  await seedAll();
}
