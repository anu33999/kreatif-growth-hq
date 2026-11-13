import Dexie, { type Table } from 'dexie';
import type {
  Asset, Campaign, Lead, Master, NgoCandidate, NgoFact, Post, ResearchItem, Review, Setting, StoredFile, Task,
} from './types';

export class GrowthDB extends Dexie {
  masters!: Table<Master, string>;
  posts!: Table<Post, string>;
  assets!: Table<Asset, string>;
  files!: Table<StoredFile, string>;
  leads!: Table<Lead, string>;
  campaigns!: Table<Campaign, string>;
  research!: Table<ResearchItem, string>;
  ngoCandidates!: Table<NgoCandidate, string>;
  ngoFacts!: Table<NgoFact, string>;
  reviews!: Table<Review, string>;
  tasks!: Table<Task, string>;
  settings!: Table<Setting, string>;

  constructor() {
    super('kreatif-growth-hq');
    this.version(1).stores({
      masters: 'id, workspace, status, campaignId, pillar, updatedAt',
      posts: 'id, workspace, masterId, campaignId, platform, format, status, date, updatedAt',
      assets: 'id, status, source, platform, isTemplate, updatedAt',
      files: 'id',
      leads: 'id, status, platform, campaignId, nextFollowUp, updatedAt',
      campaigns: 'id, workspace, status',
      research: 'id, area, platform, updatedAt',
      ngoCandidates: 'id',
      ngoFacts: 'id, candidateId, category, status',
      reviews: 'id, period, start',
      tasks: 'id, due, done, postId, leadId',
      settings: 'key',
    });
  }
}

export const db = new GrowthDB();

export const TABLES = [
  'masters', 'posts', 'assets', 'leads', 'campaigns', 'research', 'ngoCandidates', 'ngoFacts', 'reviews', 'tasks', 'settings',
] as const;
export type TableName = (typeof TABLES)[number];

export function uid(prefix = 'r'): string {
  const rand = crypto.getRandomValues(new Uint32Array(2));
  return `${prefix}_${Date.now().toString(36)}${rand[0].toString(36)}${rand[1].toString(36).slice(0, 4)}`;
}

export const now = () => Date.now();
// Local calendar date (not UTC) so “today” is correct in India and every other time zone.
export const isoDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const today = () => isoDate(new Date());
export const daysFromNow = (n: number) => isoDate(new Date(Date.now() + n * 864e5));

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await db.settings.get(key);
  return (row?.value as T) ?? fallback;
}
export async function setSetting(key: string, value: unknown) {
  await db.settings.put({ key, value });
}

// ---------- Backup & restore ----------

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

export async function exportBackup(includeFiles = true): Promise<Blob> {
  const data: Record<string, unknown[]> = {};
  for (const t of TABLES) data[t] = await db.table(t).toArray();
  if (includeFiles) {
    const files = await db.files.toArray();
    data.files = await Promise.all(files.map(async (f) => ({ ...f, blob: await blobToDataUrl(f.blob) })));
  }
  const payload = { app: 'kreatif-growth-hq', schema: 1, exportedAt: new Date().toISOString(), data };
  return new Blob([JSON.stringify(payload, null, 1)], { type: 'application/json' });
}

export interface ImportSummary { counts: Record<string, number>; mode: 'replace' | 'merge' }

export async function importBackup(text: string, mode: 'replace' | 'merge'): Promise<ImportSummary> {
  let parsed: { app?: string; data?: Record<string, unknown[]> };
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('This file is not valid JSON. Choose a Growth HQ backup (.json).');
  }
  if (parsed.app !== 'kreatif-growth-hq' || !parsed.data) {
    throw new Error('This JSON file is not a Growth HQ backup.');
  }
  const counts: Record<string, number> = {};
  const all = [...TABLES, 'files'] as string[];
  // Decode file blobs before opening the transaction: awaiting non-IndexedDB work inside it would close it.
  const prepared: Record<string, unknown[]> = {};
  for (const t of all) {
    const rows = parsed.data[t];
    if (!Array.isArray(rows)) continue;
    prepared[t] = t === 'files'
      ? await Promise.all((rows as { blob: string }[]).map(async (f) => ({ ...f, blob: await (await fetch(f.blob)).blob() })))
      : rows;
  }
  await db.transaction('rw', all.map((t) => db.table(t)), async () => {
    for (const t of Object.keys(prepared)) {
      if (mode === 'replace') await db.table(t).clear();
      await db.table(t).bulkPut(prepared[t]);
      counts[t] = prepared[t].length;
    }
  });
  await setSetting('lastImport', new Date().toISOString());
  return { counts, mode };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function toCSV(rows: Record<string, unknown>[], columns: string[]): string {
  const esc = (v: unknown) => {
    const s = v == null ? '' : Array.isArray(v) ? v.join('; ') : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [columns.join(','), ...rows.map((r) => columns.map((c) => esc(r[c])).join(','))].join('\n');
}

export function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some((x) => x.trim()));
  if (!head) return [];
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

// ---------- Duplicate / archive helpers ----------

export async function duplicatePost(id: string): Promise<string> {
  const p = await db.posts.get(id);
  if (!p) throw new Error('Post not found');
  const copy = {
    ...structuredClone(p), id: uid('post'), title: `${p.title} (copy)`, status: 'Planned' as const,
    publishedUrl: undefined, results: [], checklist: {}, guideProgress: {}, guideStep: 0, sample: false,
    createdAt: now(), updatedAt: now(),
  };
  await db.posts.add(copy);
  return copy.id;
}

export async function deletePostCascade(id: string) {
  await db.transaction('rw', db.posts, db.assets, db.leads, db.tasks, async () => {
    await db.posts.delete(id);
    await db.tasks.where('postId').equals(id).delete();
    await db.assets.toCollection().modify((a) => {
      if (a.postIds?.includes(id)) a.postIds = a.postIds.filter((x) => x !== id);
    });
    await db.leads.toCollection().modify((l) => {
      if (l.sourcePostId === id) l.sourcePostId = undefined;
    });
  });
}
