import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Download, Plus } from 'lucide-react';
import { db, downloadBlob, now, toCSV, today, uid, daysFromNow } from '../lib/db';
import type { Campaign, Lead, LeadStatus, Platform } from '../lib/types';
import { LEAD_STATUSES, PLATFORM_LABEL } from '../lib/types';
import { BUYER_CONTENT, BUYER_VS_PEER, FUNNEL_STAGES, MESSAGE_TEMPLATES, PAID_OPTIONS } from '../content/templates';
import { PLATFORMS } from '../content/platforms';
import { fmtDate, useParam } from '../components/common';
import { CopyBlock, Empty, Field, Modal, PageHead, Prose, Tabs, useToast } from '../components/ui';

const CLOSED: LeadStatus[] = ['Won', 'Lost', 'Not a fit'];

export default function Leads() {
  const [tab, setTab] = useParam('tab');
  const [open, setOpen] = useParam('open');
  const [adding, setAdding] = useState<null | Lead['kind']>(null);
  const leads = useLiveQuery(() => db.leads.toArray());
  const campaigns = useLiveQuery(() => db.campaigns.toArray()) ?? [];
  const [f, setF] = useState({ q: '', status: '', platform: '', country: '', kind: '', campaign: '', archived: false });
  const cur = tab ?? 'leads';
  const list = useMemo(() => (leads ?? []).filter((l) => (f.archived || !l.archived) && (!f.status || l.status === f.status) && (!f.platform || l.platform === f.platform) &&
    (!f.country || (l.country ?? '').toLowerCase().includes(f.country.toLowerCase())) && (!f.kind || l.kind === f.kind) && (!f.campaign || l.campaignId === f.campaign) &&
    (!f.q || `${l.business} ${l.industry ?? ''} ${l.notes ?? ''} ${l.website ?? ''}`.toLowerCase().includes(f.q.toLowerCase())))
    .sort((a, b) => (a.nextFollowUp ?? '9').localeCompare(b.nextFollowUp ?? '9')), [leads, f]);
  const exportCsv = () => {
    const cols = ['kind', 'business', 'website', 'country', 'industry', 'decisionMaker', 'contactSource', 'platform', 'accountPage', 'contentUrl', 'sourcePostId', 'campaignId', 'serviceInterest', 'discovered', 'lastContact', 'status', 'nextAction', 'nextFollowUp', 'meeting', 'proposal', 'outcome', 'revenue', 'attribution', 'howFound', 'notes'];
    downloadBlob(new Blob([toCSV(list as unknown as Record<string, unknown>[], cols)], { type: 'text/csv' }), `growth-hq-leads-${today()}.csv`);
  };
  const t = today();
  const due = (leads ?? []).filter((l) => !l.archived && l.nextFollowUp && !CLOSED.includes(l.status)).sort((a, b) => a.nextFollowUp!.localeCompare(b.nextFollowUp!));

  return (
    <div style={{ ['--area' as string]: 'var(--a-lead)' }}>
      <PageHead eyebrow="Grow" area="lead" title="Lead Generation Centre"
        lede="The goal is the right followers and real clients — not views. Track every prospect and enquiry with how they found Kreatif Atelier, honestly attributed."
        actions={<><button className="btn" onClick={() => setAdding('Prospect')}><Plus />Add prospect</button><button className="btn primary" onClick={() => setAdding('Inbound lead')}><Plus />Add lead</button></>} />
      <Tabs value={cur as 'leads'} onChange={(x) => setTab(x === 'leads' ? null : x)} tabs={[
        { id: 'leads', label: 'Lead tracker', count: leads?.filter((l) => !l.archived).length },
        { id: 'followups' as 'leads', label: 'Follow-ups', count: due.filter((l) => l.nextFollowUp! <= t).length },
        { id: 'journey' as 'leads', label: 'Audience → client journey' },
        { id: 'content' as 'leads', label: 'Content that attracts buyers' },
        { id: 'campaigns' as 'leads', label: 'Campaigns', count: campaigns.length },
        { id: 'profile' as 'leads', label: 'Profile & portfolio' },
        { id: 'templates' as 'leads', label: 'Message templates' },
        { id: 'report' as 'leads', label: 'Lead report' },
      ]} />

      {cur === 'leads' && (
        <>
          <div className="filters">
            <input className="input" placeholder="Search" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} aria-label="Search leads" />
            <select className="select" value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })} aria-label="Kind"><option value="">Prospects & leads</option><option>Prospect</option><option>Inbound lead</option></select>
            <select className="select" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })} aria-label="Status"><option value="">All statuses</option>{LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
            <select className="select" value={f.platform} onChange={(e) => setF({ ...f, platform: e.target.value })} aria-label="Platform"><option value="">All sources</option>{(['instagram', 'linkedin', 'facebook', 'youtube', 'website', 'email'] as Platform[]).map((p) => <option key={p} value={p}>{PLATFORM_LABEL[p]}</option>)}<option value="unknown">Unknown</option></select>
            <input className="input" placeholder="Country" value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} aria-label="Country" />
            <select className="select" value={f.campaign} onChange={(e) => setF({ ...f, campaign: e.target.value })} aria-label="Campaign"><option value="">All campaigns</option>{campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <label className="row small muted" style={{ gap: 6 }}><input type="checkbox" checked={f.archived} onChange={(e) => setF({ ...f, archived: e.target.checked })} />Archived</label>
            <button className="btn sm" onClick={exportCsv} disabled={!list.length}><Download />Export CSV</button>
          </div>
          {list.length === 0 ? (
            <Empty title={leads?.length ? 'No leads match these filters' : 'No leads yet'} action={<button className="btn" onClick={() => setAdding('Prospect')}>Add your first prospect</button>}>
              {leads?.length ? null : 'Growth HQ starts empty here on purpose — no invented contacts. Add a prospect you have researched from public business information, or an inbound lead when a real conversation starts.'}
            </Empty>
          ) : (
            <div className="table-wrap"><table className="t">
              <thead><tr><th>Business</th><th>Country · Industry</th><th>Source</th><th>Service interest</th><th>Status</th><th>Next action</th><th>Follow-up</th></tr></thead>
              <tbody>{list.map((l) => (
                <tr key={l.id} className="click" onClick={() => setOpen(l.id)}>
                  <td><div className="list-title">{l.business}</div><div className="list-meta">{l.kind}{l.website ? ' · ' + l.website.replace(/^https?:\/\//, '') : ''}</div></td>
                  <td className="small">{[l.country, l.industry].filter(Boolean).join(' · ')}</td>
                  <td className="small">{l.platform && l.platform !== 'unknown' ? PLATFORM_LABEL[l.platform] : 'Unknown'}<div className="list-meta">{l.attribution ?? ''}</div></td>
                  <td className="small">{l.serviceInterest}</td>
                  <td><span className={`tag ${l.status === 'Won' ? 'ok' : l.status === 'Qualified' || l.status === 'Meeting booked' || l.status === 'Proposal sent' ? 'gold' : ''}`}>{l.status}</span></td>
                  <td className="small">{l.nextAction}</td>
                  <td className="small" style={{ color: l.nextFollowUp && l.nextFollowUp < t && !CLOSED.includes(l.status) ? 'var(--danger)' : undefined }}>{fmtDate(l.nextFollowUp)}</td>
                </tr>
              ))}</tbody>
            </table></div>
          )}
          <p className="small muted" style={{ marginTop: 10 }}>Only record decision-makers who are publicly listed in a business role. Never scrape, buy lists, guess emails or send bulk unsolicited messages.</p>
        </>
      )}

      {cur === 'followups' && (due.length === 0 ? <Empty title="No follow-ups scheduled">Give each open lead a next action and a follow-up date.</Empty> : (
        <div className="panel"><div className="list">{due.map((l) => (
          <div key={l.id} className="list-item click" onClick={() => setOpen(l.id)}>
            <div style={{ width: 110 }} className={`small ${l.nextFollowUp! < t ? '' : 'muted'}`}><span style={{ color: l.nextFollowUp! < t ? 'var(--danger)' : undefined }}>{fmtDate(l.nextFollowUp)}{l.nextFollowUp! < t ? ' · overdue' : l.nextFollowUp === t ? ' · today' : ''}</span></div>
            <div className="grow"><div className="list-title">{l.business}</div><div className="list-meta">{l.nextAction ?? 'No next action'} · {l.status}</div></div>
            <button className="btn sm" onClick={(e) => { e.stopPropagation(); db.leads.update(l.id, { lastContact: t, nextFollowUp: daysFromNow(7), updatedAt: now() }); }}>Done · +7 days</button>
          </div>
        ))}</div></div>
      ))}

      {cur === 'journey' && (
        <div className="stack">
          <div className="table-wrap"><table className="t">
            <thead><tr><th>#</th><th>Stage</th><th>Typical weak point</th><th>Content / fix needed</th></tr></thead>
            <tbody>{FUNNEL_STAGES.map((s, i) => <tr key={s.stage}><td className="muted">{i + 1}</td><td className="list-title">{s.stage}</td><td className="wrap small">{s.weak}</td><td className="wrap small">{s.content}</td></tr>)}</tbody>
          </table></div>
          <div className="cols-2">{(['instagram', 'linkedin', 'facebook', 'youtube'] as const).map((p) => (
            <div key={p} className="panel panel-pad"><h4>{PLATFORMS[p].name} pathway</h4><ol className="prose small">{PLATFORMS[p].leadPath.map((x) => <li key={x}>{x}</li>)}</ol></div>
          ))}</div>
        </div>
      )}

      {cur === 'content' && (
        <div className="stack" style={{ gap: 18 }}>
          {BUYER_CONTENT.map((b) => <div key={b.segment} className="panel panel-pad"><h4>{b.segment}</h4><p className="small muted">{b.problems}</p><ul className="prose small">{b.content.map((c) => <li key={c}>{c}</li>)}</ul></div>)}
          <h3>Buyers vs peers</h3>
          <div className="table-wrap"><table className="t"><thead><tr><th>Attracts potential customers</th><th>Attracts marketers & creators</th></tr></thead><tbody>{BUYER_VS_PEER.map((r) => <tr key={r.attractsBuyers}><td className="wrap">{r.attractsBuyers}</td><td className="wrap muted">{r.attractsPeers}</td></tr>)}</tbody></table></div>
        </div>
      )}

      {cur === 'campaigns' && <Campaigns campaigns={campaigns} openId={open} />}

      {cur === 'profile' && (
        <div className="stack">
          <p className="lede" style={{ marginTop: 0 }}>Exact copy for each profile lives in its Studio → Profile & setup. Summary of the enquiry journey:</p>
          <div className="cols-2">{(['instagram', 'linkedin', 'facebook', 'youtube'] as const).map((p) => (
            <div key={p} className="panel panel-pad stack small"><h4>{PLATFORMS[p].name}</h4>{PLATFORMS[p].profile.slice(0, 4).map((x) => <CopyBlock key={x.label} label={x.label} text={x.text} />)}</div>
          ))}</div>
          <div className="panel panel-pad"><h4>Service descriptions (short)</h4><Prose text={`- **Website audit & repair** — find and fix what stops visitors from booking, buying or enquiring.\n- **Website design & build** — strategy-led sites, including multilingual and interactive builds.\n- **Content & social** — Reels, carousels, LinkedIn and YouTube content produced in-house (Golden Guardian Productions for film).\n- **Performance marketing** — Meta, Google and LinkedIn ads with tracking set up first.\n- **NGO communications (Asraya)** — donation, volunteer and awareness journeys.`} /><p className="small muted">Portfolio: show cleared work (Marlsboro Group, Inkotek) and clearly labelled concept work. Add outcomes only once measured and approved.</p></div>
        </div>
      )}

      {cur === 'templates' && (
        <div className="cols-2">{MESSAGE_TEMPLATES.map((m) => <div key={m.id}><CopyBlock label={`${m.channel} — ${m.situation}`} text={m.text} />{m.note && <div className="small muted" style={{ marginTop: 4 }}>{m.note}</div>}</div>)}</div>
      )}

      {cur === 'report' && <Report leads={leads ?? []} />}

      {adding && <LeadModal kind={adding} onClose={() => setAdding(null)} />}
      {open && cur !== 'campaigns' && <LeadModal id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Report({ leads }: { leads: Lead[] }) {
  const posts = useLiveQuery(() => db.posts.toArray()) ?? [];
  const sum = (pl: string, keys: string[]) => posts.filter((p) => p.platform === pl).reduce((acc, p) => {
    const last = p.results?.[p.results.length - 1]?.metrics ?? {};
    return acc + keys.reduce((a, k) => a + (last[k] ?? 0), 0);
  }, 0);
  const has = (pl: string) => posts.some((p) => p.platform === pl && p.results?.length);
  const rows = (['instagram', 'linkedin', 'facebook', 'youtube'] as const).map((pl) => {
    const L = leads.filter((l) => l.platform === pl);
    return {
      pl, data: has(pl),
      reach: sum(pl, ['reach', 'impressions', 'views', 'plays']), engagement: sum(pl, ['shares', 'saves', 'comments', 'reposts']),
      profile: sum(pl, ['profileVisits', 'profileViews', 'follows', 'subscribers']), traffic: sum(pl, ['linkTaps', 'linkClicks', 'clicks', 'websiteClicks']),
      enquiries: L.length, qualified: L.filter((l) => ['Qualified', 'Meeting booked', 'Proposal sent', 'Won'].includes(l.status)).length,
      meetings: L.filter((l) => !!l.meeting || ['Meeting booked', 'Proposal sent', 'Won'].includes(l.status)).length,
      proposals: L.filter((l) => !!l.proposal || l.status === 'Proposal sent').length, clients: L.filter((l) => l.status === 'Won').length,
      revenue: L.reduce((a, l) => a + (l.status === 'Won' ? l.revenue ?? 0 : 0), 0), confirmed: L.filter((l) => l.attribution === 'Confirmed by lead').length,
    };
  });
  const unknown = leads.filter((l) => !l.platform || l.platform === 'unknown');
  return (
    <div className="stack">
      <div className="notice">Each platform is reported separately. Reach and engagement come from results you recorded on posts; enquiries and clients come from the lead tracker. A high-view post is never treated as proof of sales — see attribution confidence.</div>
      <div className="table-wrap"><table className="t">
        <thead><tr><th>Platform</th><th>Reach</th><th>Engagement</th><th>Profile/channel</th><th>Website traffic</th><th>Enquiries</th><th>Qualified</th><th>Meetings</th><th>Proposals</th><th>Clients</th><th>Revenue (known)</th><th>Confirmed by lead</th></tr></thead>
        <tbody>{rows.map((r) => (
          <tr key={r.pl}><td className="list-title">{PLATFORM_LABEL[r.pl]}</td>
            {r.data ? <><td>{r.reach.toLocaleString()}</td><td>{r.engagement.toLocaleString()}</td><td>{r.profile.toLocaleString()}</td><td>{r.traffic.toLocaleString()}</td></> : <td colSpan={4} className="muted small">No results recorded yet</td>}
            <td>{r.enquiries}</td><td>{r.qualified}</td><td>{r.meetings}</td><td>{r.proposals}</td><td>{r.clients}</td><td>{r.revenue ? r.revenue.toLocaleString() : '—'}</td><td>{r.confirmed}</td></tr>
        ))}
          <tr><td className="list-title">Source unknown</td><td colSpan={4} /><td>{unknown.length}</td><td colSpan={6} className="small muted">Ask every lead “How did you find us?” and record it.</td></tr>
        </tbody>
      </table></div>
      <div className="panel panel-pad small"><h4>Which content helps at each stage</h4><Prose text={`- **Reach:** teardown Reels, Shorts, Facebook Reels.\n- **Engagement / trust:** carousels, LinkedIn documents and text posts, YouTube audits.\n- **Profile / channel activity:** series formats and pinned posts.\n- **Traffic:** posts with a specific resource (checklist, audit page) and UTM links.\n- **Enquiries:** Story sequences with a keyword, the pinned audit post, LinkedIn conversations.`} /></div>
    </div>
  );
}

function Campaigns({ campaigns, openId }: { campaigns: Campaign[]; openId: string | null }) {
  const toast = useToast();
  const [edit, setEdit] = useState<Campaign | null>(null);
  useEffect(() => { if (openId) { const c = campaigns.find((x) => x.id === openId); if (c) setEdit(c); } }, [openId, campaigns]);
  const fields: [keyof Campaign, string][] = [['prospect', 'Ideal prospect'], ['problem', 'Business problem'], ['concept', 'Content concept'], ['offer', 'Lead magnet / offer'], ['cta', 'CTA'], ['landing', 'Landing-page requirements'], ['followUp', 'Follow-up process'], ['qualification', 'Qualification criteria'], ['metrics', 'Success metrics']];
  const save = async () => { if (!edit) return; await db.campaigns.put({ ...edit, updatedAt: now() }); toast('Campaign saved'); setEdit(null); };
  const fromProblem = async () => {
    const problem = prompt('Business problem the campaign addresses (e.g. “UK clinics lose enquiries to long forms”)');
    if (!problem) return;
    const c: Campaign = { id: uid('c'), workspace: 'agency', name: problem.slice(0, 60), problem, status: 'Planned', platforms: ['instagram', 'linkedin'], createdAt: now(), updatedAt: now() };
    await db.campaigns.add(c); setEdit(c);
  };
  return (
    <div className="stack">
      <div><button className="btn primary" onClick={fromProblem}><Plus />Lead campaign from a business problem</button></div>
      {campaigns.map((c) => (
        <details key={c.id} className="disc" open={openId === c.id}>
          <summary>{c.name} <span className={`tag ${c.status === 'Active' ? 'ok' : ''}`} style={{ marginLeft: 8 }}>{c.status}</span><span className="grow" /><button className="btn sm" onClick={(e) => { e.preventDefault(); setEdit(c); }}>Edit</button></summary>
          <div className="disc-body"><table className="t"><tbody>{fields.map(([k, l]) => <tr key={k}><td className="muted" style={{ width: 200 }}>{l}</td><td className="wrap">{String(c[k] ?? '—')}</td></tr>)}</tbody></table></div>
        </details>
      ))}
      <details className="disc"><summary>{PAID_OPTIONS.title}</summary><div className="disc-body"><Prose text={PAID_OPTIONS.body} /></div></details>
      {edit && (
        <Modal wide title="Edit campaign" onClose={() => setEdit(null)} footer={<><button className="btn danger" onClick={async () => { if (confirm('Delete campaign?')) { await db.campaigns.delete(edit.id); setEdit(null); } }}>Delete</button><div className="grow" /><button className="btn primary" onClick={save}>Save</button></>}>
          <div className="grid-form">
            <Field label="Name" wide><input className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></Field>
            <Field label="Status"><select className="select" value={edit.status} onChange={(e) => setEdit({ ...edit, status: e.target.value as Campaign['status'] })}>{['Planned', 'Active', 'Paused', 'Done'].map((s) => <option key={s}>{s}</option>)}</select></Field>
            {fields.map(([k, l]) => <Field key={k} label={l} wide><textarea className="textarea" value={String(edit[k] ?? '')} onChange={(e) => setEdit({ ...edit, [k]: e.target.value })} /></Field>)}
          </div>
        </Modal>
      )}
    </div>
  );
}

export function LeadModal({ id, kind, onClose }: { id?: string; kind?: Lead['kind']; onClose: () => void }) {
  const toast = useToast();
  const existing = useLiveQuery(() => (id ? db.leads.get(id) : undefined), [id]);
  const posts = useLiveQuery(() => db.posts.where('status').anyOf('Published', 'Analysed').toArray()) ?? [];
  const allPosts = useLiveQuery(() => db.posts.toArray()) ?? [];
  const campaigns = useLiveQuery(() => db.campaigns.toArray()) ?? [];
  const [d, setD] = useState<Lead | null>(id ? null : {
    id: uid('lead'), kind: kind ?? 'Prospect', business: '', status: kind === 'Inbound lead' ? 'New' : 'Researching', discovered: today(),
    platform: kind === 'Inbound lead' ? 'unknown' : undefined, attribution: 'Unknown', createdAt: now(), updatedAt: now(),
  });
  useEffect(() => { if (existing && !d) setD(existing); }, [existing]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!d) return null;
  const set = (k: keyof Lead, v: unknown) => setD({ ...d, [k]: v });
  const save = async () => {
    if (!d.business.trim()) { toast('Business name is required', 'error'); return; }
    await db.leads.put({ ...d, business: d.business.trim(), revenue: d.revenue ? Number(d.revenue) : undefined, updatedAt: now() });
    toast('Lead saved'); onClose();
  };
  const del = async () => { if (confirm('Delete this lead permanently?')) { await db.leads.delete(d.id); onClose(); } };
  const postOptions = posts.length ? posts : allPosts;
  return (
    <Modal wide title={id ? d.business || 'Lead' : kind === 'Inbound lead' ? 'Add lead' : 'Add prospect'} onClose={onClose} footer={<>
      {id && <><button className="btn danger" onClick={del}>Delete</button><button className="btn" onClick={() => setD({ ...d, archived: !d.archived })}>{d.archived ? 'Unarchive' : 'Archive'}</button></>}
      <div className="grow" /><button className="btn" onClick={onClose}>Cancel</button><button className="btn primary" onClick={save}>Save</button></>}>
      <div className="grid-form">
        <Field label="Business name *" wide><input className="input" autoFocus value={d.business} onChange={(e) => set('business', e.target.value)} /></Field>
        <Field label="Type"><select className="select" value={d.kind} onChange={(e) => set('kind', e.target.value)}><option>Prospect</option><option>Inbound lead</option></select></Field>
        <Field label="Website"><input className="input" value={d.website ?? ''} onChange={(e) => set('website', e.target.value)} /></Field>
        <Field label="Country"><input className="input" value={d.country ?? ''} onChange={(e) => set('country', e.target.value)} /></Field>
        <Field label="Industry"><input className="input" value={d.industry ?? ''} onChange={(e) => set('industry', e.target.value)} /></Field>
        <Field label="Decision-maker (public business role only)"><input className="input" value={d.decisionMaker ?? ''} onChange={(e) => set('decisionMaker', e.target.value)} /></Field>
        <Field label="Contact source"><input className="input" value={d.contactSource ?? ''} onChange={(e) => set('contactSource', e.target.value)} placeholder="e.g. Instagram DM, website form, LinkedIn comment" /></Field>
        <Field label="Platform"><select className="select" value={d.platform ?? ''} onChange={(e) => set('platform', e.target.value || undefined)}><option value="">—</option>{(['instagram', 'linkedin', 'facebook', 'youtube', 'website', 'email'] as Platform[]).map((p) => <option key={p} value={p}>{PLATFORM_LABEL[p]}</option>)}<option value="unknown">Unknown</option></select></Field>
        <Field label="Account / Page"><input className="input" value={d.accountPage ?? ''} onChange={(e) => set('accountPage', e.target.value)} placeholder="Founder profile / Company Page / @kreatifatelier" /></Field>
        <Field label="Source post"><select className="select" value={d.sourcePostId ?? ''} onChange={(e) => set('sourcePostId', e.target.value || undefined)}><option value="">— Unknown / none —</option>{postOptions.map((p) => <option key={p.id} value={p.id}>{PLATFORM_LABEL[p.platform]} · {p.title}</option>)}</select></Field>
        <Field label="Content URL"><input className="input" value={d.contentUrl ?? ''} onChange={(e) => set('contentUrl', e.target.value)} /></Field>
        <Field label="Campaign"><select className="select" value={d.campaignId ?? ''} onChange={(e) => set('campaignId', e.target.value || undefined)}><option value="">—</option>{campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
        <Field label="Attribution confidence"><select className="select" value={d.attribution ?? 'Unknown'} onChange={(e) => set('attribution', e.target.value)}><option>Confirmed by lead</option><option>Likely</option><option>Unknown</option></select></Field>
        <Field label="Service interest"><input className="input" value={d.serviceInterest ?? ''} onChange={(e) => set('serviceInterest', e.target.value)} /></Field>
        <Field label="Date discovered"><input className="input" type="date" value={d.discovered ?? ''} onChange={(e) => set('discovered', e.target.value)} /></Field>
        <Field label="Last contact"><input className="input" type="date" value={d.lastContact ?? ''} onChange={(e) => set('lastContact', e.target.value)} /></Field>
        <Field label="Status"><select className="select" value={d.status} onChange={(e) => set('status', e.target.value)}>{LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <Field label="Next action"><input className="input" value={d.nextAction ?? ''} onChange={(e) => set('nextAction', e.target.value)} /></Field>
        <Field label="Next follow-up"><input className="input" type="date" value={d.nextFollowUp ?? ''} onChange={(e) => set('nextFollowUp', e.target.value)} /></Field>
        <Field label="Meeting"><input className="input" value={d.meeting ?? ''} onChange={(e) => set('meeting', e.target.value)} placeholder="Date / status" /></Field>
        <Field label="Proposal"><input className="input" value={d.proposal ?? ''} onChange={(e) => set('proposal', e.target.value)} placeholder="Sent date / value" /></Field>
        <Field label="Outcome"><input className="input" value={d.outcome ?? ''} onChange={(e) => set('outcome', e.target.value)} /></Field>
        <Field label="Revenue (if won and known)"><input className="input" inputMode="decimal" value={d.revenue ?? ''} onChange={(e) => set('revenue', e.target.value)} /></Field>
        <Field label="How did they discover Kreatif Atelier? (their words)" wide><textarea className="textarea" value={d.howFound ?? ''} onChange={(e) => set('howFound', e.target.value)} /></Field>
        <Field label="Notes (public observations only)" wide><textarea className="textarea" value={d.notes ?? ''} onChange={(e) => set('notes', e.target.value)} /></Field>
      </div>
    </Modal>
  );
}
