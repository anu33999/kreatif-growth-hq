import { db } from './db';
import { FORMAT_LABEL, PLATFORM_LABEL } from './types';
import { ALL_LESSONS } from '../content/learning';
import { ALL_TOOLS } from '../content/tools';
import { HELP_TOPICS } from '../content/help';
import { MESSAGE_TEMPLATES } from '../content/templates';
import { PHOTO_BRIEFS } from '../content/photo';
import { PLATFORMS } from '../content/platforms';

export type ResultType = 'Post' | 'Idea' | 'Asset' | 'Lead' | 'Campaign' | 'Research' | 'NGO fact' | 'NGO org' | 'Lesson' | 'Tool' | 'Help' | 'Template' | 'Photo brief' | 'Prompt' | 'Platform';

export interface SearchDoc { type: ResultType; id: string; title: string; text: string; url: string; meta?: string }

const s = (...parts: unknown[]) => parts.map((p) => (p == null ? '' : typeof p === 'string' ? p : JSON.stringify(p))).join(' \n ');

export async function buildIndex(): Promise<SearchDoc[]> {
  const [posts, masters, assets, leads, campaigns, research, facts, cands] = await Promise.all([
    db.posts.toArray(), db.masters.toArray(), db.assets.toArray(), db.leads.toArray(), db.campaigns.toArray(),
    db.research.toArray(), db.ngoFacts.toArray(), db.ngoCandidates.toArray(),
  ]);
  const docs: SearchDoc[] = [];
  for (const p of posts) {
    const base = p.workspace === 'ngo' ? '/ngo/post/' : '/post/';
    docs.push({ type: 'Post', id: p.id, title: p.title, url: base + p.id, meta: `${PLATFORM_LABEL[p.platform]} · ${FORMAT_LABEL[p.format]} · ${p.status}${p.date ? ' · ' + p.date : ''}`,
      text: s(p.title, p.hook, p.hooks, p.body, p.caption, p.cta, p.scenes, p.shots, p.slides, p.voiceover, p.notes, p.tags, p.concept, p.observations, p.audience, p.pillar, p.publishing) });
    for (const a of p.aiShots ?? []) docs.push({ type: 'Prompt', id: `${p.id}:${a.ref}`, title: `${a.ref} — ${p.title}`, url: `${base}${p.id}?tab=ai`, meta: `${a.tool} · ${a.mode}`, text: s(a.prompt, a.negative, a.startFrame) });
  }
  for (const m of masters) docs.push({ type: 'Idea', id: m.id, title: m.ideaNo ? `#${m.ideaNo} ${m.title}` : m.title, url: (m.workspace === 'ngo' ? '/ngo/idea/' : '/idea/') + m.id, meta: `${m.pillar ?? ''} · ${m.audience ?? ''}`, text: s(m.title, m.idea, m.problem, m.argument, m.nextAction, m.tags, m.audience, m.approvedClaims) });
  for (const a of assets) docs.push({ type: 'Asset', id: a.id, title: a.name, url: `/assets?open=${a.id}`, meta: `${a.type} · ${a.source} · ${a.status}`, text: s(a.name, a.brief, a.prompt, a.method, a.template, a.notes, a.location) });
  for (const l of leads) docs.push({ type: 'Lead', id: l.id, title: l.business, url: `/leads?open=${l.id}`, meta: `${l.kind} · ${l.status} · ${l.country ?? ''}`, text: s(l.business, l.website, l.industry, l.notes, l.howFound, l.nextAction, l.serviceInterest) });
  for (const c of campaigns) docs.push({ type: 'Campaign', id: c.id, title: c.name, url: `/leads?tab=campaigns&open=${c.id}`, meta: c.status, text: s(c) });
  for (const r of research) docs.push({ type: 'Research', id: r.id, title: r.title, url: `/strategy?open=${r.id}`, meta: `${r.area}${r.verification ? ' · ' + r.verification : ''}`, text: s(r.title, r.body, r.sourceTitle, r.sourceUrl) });
  for (const f of facts) docs.push({ type: 'NGO fact', id: f.id, title: f.fact.slice(0, 90), url: `/ngo?tab=facts&open=${f.id}`, meta: `${f.category} · ${f.status}`, text: s(f.fact, f.sourceTitle, f.sourceUrl, f.notes) });
  for (const c of cands) docs.push({ type: 'NGO org', id: c.id, title: c.name, url: `/ngo?tab=identity`, meta: c.location ?? '', text: s(c) });
  for (const l of ALL_LESSONS) {
    docs.push({ type: 'Lesson', id: l.id, title: `M${l.module.n} · ${l.title}`, url: `/learn?lesson=${l.id}`, meta: l.module.title, text: s(l.objective, l.steps, l.example, l.terms, l.mistakes) });
    for (const p of l.prompts) docs.push({ type: 'Prompt', id: `${l.id}:${p.label}`, title: p.label, url: `/learn?lesson=${l.id}`, meta: `Lesson: ${l.title}`, text: p.text });
  }
  for (const t of ALL_TOOLS) docs.push({ type: 'Tool', id: t.name, title: t.name, url: `/learn?tab=tools`, meta: `${t.kind} · confidence ${t.confidence}`, text: s(t.access, t.india, t.bestFor, t.watchOut) });
  for (const h of HELP_TOPICS) docs.push({ type: 'Help', id: h.id, title: `${h.n}. ${h.title}`, url: `/help?topic=${h.id}`, meta: h.where, text: h.body });
  for (const m of MESSAGE_TEMPLATES) docs.push({ type: 'Template', id: m.id, title: m.situation, url: `/leads?tab=templates`, meta: m.channel, text: m.text });
  for (const p of PHOTO_BRIEFS) docs.push({ type: 'Photo brief', id: p.id, title: p.name, url: `/creative?tab=photo`, meta: p.use, text: s(p) });
  for (const p of Object.values(PLATFORMS)) for (const pr of p.profile) docs.push({ type: 'Platform', id: `${p.id}:${pr.label}`, title: `${p.name} — ${pr.label}`, url: `/studio/${p.id}?tab=profile`, meta: 'Profile copy', text: pr.text });
  return docs;
}

export function searchDocs(docs: SearchDoc[], q: string, limit = 60): (SearchDoc & { score: number; snippet: string })[] {
  const terms = q.toLowerCase().split(/\s+/).filter((x) => x.length > 1);
  if (!terms.length) return [];
  const out: (SearchDoc & { score: number; snippet: string })[] = [];
  for (const d of docs) {
    const title = d.title.toLowerCase();
    const text = d.text.toLowerCase();
    let score = 0;
    let ok = true;
    for (const t of terms) {
      const inTitle = title.includes(t);
      const inText = text.includes(t);
      if (!inTitle && !inText && !(d.meta ?? '').toLowerCase().includes(t)) { ok = false; break; }
      score += inTitle ? 10 : 0;
      score += inText ? 2 : 1;
    }
    if (!ok) continue;
    const idx = text.indexOf(terms[0]);
    const raw = d.text.replace(/[{}"[\]\\]/g, ' ').replace(/\s+/g, ' ');
    const at = Math.max(0, raw.toLowerCase().indexOf(terms[0]) - 50);
    const snippet = idx >= 0 ? (at > 0 ? '…' : '') + raw.slice(at, at + 150) + '…' : (d.meta ?? '');
    out.push({ ...d, score, snippet });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function highlight(text: string, q: string) {
  const terms = q.split(/\s+/).filter((x) => x.length > 1).map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!terms.length) return [text];
  const re = new RegExp(`(${terms.join('|')})`, 'ig');
  return text.split(re);
}
