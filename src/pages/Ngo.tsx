import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Plus } from 'lucide-react';
import { db, getSetting, now, setSetting, today, uid } from '../lib/db';
import type { NgoCandidate, NgoFact, Verification } from '../lib/types';
import { NGO_AUDIT_AREAS, NGO_PROFILE_SECTIONS, NGO_RESEARCH_CHECKLIST, SAFEGUARDING } from '../seed/ngo';
import { CreatePostModal, NewIdeaModal, PostTable, useParam } from '../components/common';
import { Empty, Ext, Field, Modal, PageHead, Tabs, useToast } from '../components/ui';
import { useNavigate } from 'react-router-dom';

const STATUSES: Verification[] = ['Verified (primary)', 'Organisation claim', 'Third-party', 'Estimate', 'Unresolved', 'Unknown'];
const tone = (s: string) => (s === 'Verified (primary)' ? 'ok' : s === 'Organisation claim' ? 'gold' : s === 'Unresolved' || s === 'Unknown' ? 'warn' : '');

export default function Ngo() {
  const [tab, setTab] = useParam('tab');
  const cands = useLiveQuery(() => db.ngoCandidates.toArray()) ?? [];
  const facts = useLiveQuery(() => db.ngoFacts.toArray()) ?? [];
  const selected = cands.find((c) => c.selected);
  const cur = tab ?? 'identity';
  return (
    <div style={{ ['--area' as string]: 'var(--a-ngo)' }}>
      <PageHead eyebrow="Research" area="ngo" title="Asha NGO — Research & Content Workspace"
        lede="A separate workspace for researching and planning work related to the correct “Asha” organisation. Nothing here is presented as a Kreatif Atelier client, partner or endorsement." />
      <div className={`notice ${selected ? 'ngo' : ''} section`}>
        <strong>Identity: {selected ? `${selected.name} — selected, not yet verified` : 'Unconfirmed'}.</strong>{' '}
        {selected ? 'Add primary sources (official website, registration record) to facts linked to this organisation before using any of it in content.' : 'Several organisations share the name. Select the correct one in Identity once you have an official website, registration number or social handle from your contact. Information from different candidates is never merged.'}
      </div>
      <Tabs value={cur as 'identity'} onChange={(x) => setTab(x === 'identity' ? null : x)} tabs={[
        { id: 'identity', label: 'Identity verification' }, { id: 'profile' as 'identity', label: 'Organisation profile' }, { id: 'facts' as 'identity', label: 'Facts & sources', count: facts.length },
        { id: 'missing' as 'identity', label: 'Missing information' }, { id: 'audit' as 'identity', label: 'Digital audit' }, { id: 'content' as 'identity', label: 'Content studio' },
        { id: 'safeguards' as 'identity', label: 'Ethical safeguards' }, { id: 'notes' as 'identity', label: 'Notes & documents' },
      ]} />
      {cur === 'identity' && <Identity cands={cands} />}
      {cur === 'profile' && <Profile facts={facts} selected={selected} />}
      {cur === 'facts' && <Facts facts={facts} cands={cands} />}
      {cur === 'missing' && <Missing facts={facts} selected={selected} />}
      {cur === 'audit' && (
        <div className="stack">
          <div className="notice">The audit can only be completed once the organisation’s website and channels are confirmed. For each area, record observations as facts (category “Website and social audit”) with the URL you looked at.</div>
          <div className="table-wrap"><table className="t"><thead><tr><th>Area</th><th>How to check</th><th>Does it make sense for this NGO?</th><th>Priority (fill in)</th></tr></thead>
            <tbody>{NGO_AUDIT_AREAS.map((a) => <tr key={a.area}><td className="list-title">{a.area}</td><td className="wrap small">{a.how}</td><td className="wrap small">{a.relevance}</td><td className="small muted">Mission relevance · value · complexity · cost · risk</td></tr>)}</tbody></table></div>
        </div>
      )}
      {cur === 'content' && <Content />}
      {cur === 'safeguards' && (
        <div className="cols-2">
          <div className="panel panel-pad"><h3 style={{ marginBottom: 10 }}>Do not</h3><ul className="prose">{SAFEGUARDING.map((s) => <li key={s}>{s}</li>)}</ul></div>
          <div className="panel panel-pad"><h3 style={{ marginBottom: 10 }}>Do</h3><ul className="prose"><li>Dignity-centred storytelling: people as agents, not victims.</li><li>Written, informed consent for every identifiable person; guardian consent and NGO safeguarding sign-off for minors.</li><li>Quote impact numbers exactly as published, with source and date.</li><li>Label illustrative or AI imagery clearly.</li><li>Keep NGO content separate from agency marketing; get written permission before mentioning the NGO on agency channels, and make clear it isn’t the NGO’s official communication.</li><li>Transparent fundraising: say where money goes using the NGO’s own published information.</li></ul></div>
        </div>
      )}
      {cur === 'notes' && <Notes />}
    </div>
  );
}

function Identity({ cands }: { cands: NgoCandidate[] }) {
  const toast = useToast();
  const [adding, setAdding] = useState(false);
  const [c, setC] = useState<NgoCandidate>({ id: '', name: '', website: '', location: '', focus: '', distinguishing: '', sourceUrl: '' });
  const select = async (id: string | null) => {
    await db.transaction('rw', db.ngoCandidates, async () => { for (const x of cands) await db.ngoCandidates.update(x.id, { selected: x.id === id }); });
    toast(id ? 'Selected as the working candidate (still unverified)' : 'Selection cleared');
  };
  return (
    <div className="stack">
      <p className="lede" style={{ marginTop: 0 }}>Plausible organisations found by web search on 2026-10-28. The CMO brief mentioned “Asha Hope Foundation”, but no organisation with exactly that name was found. Ask your contact for the official website or registration number, then select the match.</p>
      <div className="table-wrap"><table className="t">
        <thead><tr><th>Organisation</th><th>Location</th><th>Focus</th><th>Distinguishing information</th><th>Source</th><th /></tr></thead>
        <tbody>{cands.map((x) => (
          <tr key={x.id} style={x.selected ? { background: 'var(--surface-2)' } : undefined}>
            <td style={{ minWidth: 200 }}><div className="list-title">{x.name}</div>{x.website ? <Ext href={x.website}>Website</Ext> : <span className="small muted">Official website not confirmed</span>}</td>
            <td className="small wrap">{x.location}</td><td className="small wrap">{x.focus}</td><td className="small wrap">{x.distinguishing}</td>
            <td className="small">{x.sourceUrl ? <Ext href={x.sourceUrl}>Listing</Ext> : 'Project data'}</td>
            <td>{x.selected ? <button className="btn sm" onClick={() => select(null)}>Clear</button> : <button className="btn sm" onClick={() => select(x.id)}>This is the one</button>}</td>
          </tr>
        ))}</tbody>
      </table></div>
      <div><button className="btn" onClick={() => setAdding(true)}><Plus />Add the correct organisation (if not listed)</button></div>
      {adding && (
        <Modal title="Add organisation candidate" onClose={() => setAdding(false)} footer={<button className="btn primary" disabled={!c.name} onClick={async () => { await db.ngoCandidates.add({ ...c, id: uid('ngo') }); setAdding(false); toast('Candidate added'); }}>Add</button>}>
          <div className="grid-form">{(['name', 'website', 'location', 'focus', 'distinguishing', 'sourceUrl'] as const).map((k) => <Field key={k} label={k} wide={k === 'distinguishing'}><input className="input" value={c[k] ?? ''} onChange={(e) => setC({ ...c, [k]: e.target.value })} /></Field>)}</div>
        </Modal>
      )}
    </div>
  );
}

function Profile({ facts, selected }: { facts: NgoFact[]; selected?: NgoCandidate }) {
  const scoped = facts.filter((f) => !f.candidateId || f.candidateId === selected?.id);
  return (
    <div className="stack">
      {!selected && <div className="notice">No organisation selected, so the profile shows only workspace-level notes. Candidate-specific facts appear here once you select a candidate — and only that candidate’s facts.</div>}
      <div className="cols-2">
        {NGO_PROFILE_SECTIONS.map((s) => {
          const fs = scoped.filter((f) => f.category === s);
          return (
            <div key={s} className="panel panel-pad">
              <h4>{s}</h4>
              {fs.length === 0 ? <div className="small muted">Unknown — not yet researched or not publicly available.</div> : fs.map((f) => (
                <div key={f.id} className="small" style={{ marginTop: 6 }}>{f.fact} <span className={`tag ${tone(f.status)}`}>{f.status}</span>{f.sourceUrl && <> <Ext href={f.sourceUrl}>source</Ext></>}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Facts({ facts, cands }: { facts: NgoFact[]; cands: NgoCandidate[] }) {
  const [edit, setEdit] = useState<NgoFact | null>(null);
  const [open] = useParam('open');
  const toast = useToast();
  const blank = (): NgoFact => ({ id: uid('nf'), category: NGO_PROFILE_SECTIONS[0], fact: '', checked: today(), confidence: 'Medium', status: 'Unresolved', candidateId: cands.find((c) => c.selected)?.id, createdAt: now(), updatedAt: now() });
  return (
    <div className="stack">
      <div className="row"><button className="btn primary" onClick={() => setEdit(blank())}><Plus />Add fact with source</button><span className="small muted">“Organisation claim” = published by the NGO itself, not independently confirmed. Numbers on unverified or template-like sites are not confirmed impact.</span></div>
      {facts.length === 0 ? <Empty title="No facts yet" /> : (
        <div className="table-wrap"><table className="t">
          <thead><tr><th>Fact</th><th>Organisation</th><th>Category</th><th>Source</th><th>Published</th><th>Checked</th><th>Confidence</th><th>Status</th><th>Notes</th></tr></thead>
          <tbody>{facts.map((f) => (
            <tr key={f.id} className="click" onClick={() => setEdit(f)} style={open === f.id ? { background: 'var(--surface-2)' } : undefined}>
              <td className="wrap" style={{ minWidth: 260 }}>{f.fact}</td>
              <td className="small">{cands.find((c) => c.id === f.candidateId)?.name ?? 'Workspace'}</td>
              <td className="small">{f.category}</td>
              <td className="small">{f.sourceUrl ? <Ext href={f.sourceUrl}>{f.sourceTitle ?? 'link'}</Ext> : f.sourceTitle ?? '—'}</td>
              <td className="small">{f.published ?? '—'}</td><td className="small">{f.checked ?? '—'}</td>
              <td className="small">{f.confidence}</td><td><span className={`tag ${tone(f.status)}`}>{f.status}</span></td>
              <td className="wrap small">{f.notes}</td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
      {edit && (
        <Modal wide title="NGO fact" onClose={() => setEdit(null)} footer={<>
          <button className="btn danger" onClick={async () => { await db.ngoFacts.delete(edit.id); setEdit(null); }}>Delete</button><div className="grow" />
          <button className="btn primary" disabled={!edit.fact.trim()} onClick={async () => { await db.ngoFacts.put({ ...edit, updatedAt: now() }); toast('Fact saved'); setEdit(null); }}>Save</button></>}>
          <div className="grid-form">
            <Field label="Fact" wide><textarea className="textarea" value={edit.fact} onChange={(e) => setEdit({ ...edit, fact: e.target.value })} /></Field>
            <Field label="Organisation"><select className="select" value={edit.candidateId ?? ''} onChange={(e) => setEdit({ ...edit, candidateId: e.target.value || undefined })}><option value="">Workspace-level</option>{cands.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
            <Field label="Category"><select className="select" value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })}>{[...NGO_PROFILE_SECTIONS, 'Identity verification', 'Relationship to Kreatif Atelier'].map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Source title"><input className="input" value={edit.sourceTitle ?? ''} onChange={(e) => setEdit({ ...edit, sourceTitle: e.target.value })} /></Field>
            <Field label="Source URL"><input className="input" value={edit.sourceUrl ?? ''} onChange={(e) => setEdit({ ...edit, sourceUrl: e.target.value })} /></Field>
            <Field label="Publication date"><input className="input" value={edit.published ?? ''} onChange={(e) => setEdit({ ...edit, published: e.target.value })} /></Field>
            <Field label="Date checked"><input type="date" className="input" value={edit.checked ?? ''} onChange={(e) => setEdit({ ...edit, checked: e.target.value })} /></Field>
            <Field label="Confidence"><select className="select" value={edit.confidence} onChange={(e) => setEdit({ ...edit, confidence: e.target.value as NgoFact['confidence'] })}><option>High</option><option>Medium</option><option>Low</option></select></Field>
            <Field label="Verification status"><select className="select" value={edit.status} onChange={(e) => setEdit({ ...edit, status: e.target.value as Verification })}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Notes or inconsistencies" wide><textarea className="textarea" value={edit.notes ?? ''} onChange={(e) => setEdit({ ...edit, notes: e.target.value })} /></Field>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Missing({ facts, selected }: { facts: NgoFact[]; selected?: NgoCandidate }) {
  const scoped = facts.filter((f) => f.candidateId && f.candidateId === selected?.id);
  const covered = (item: string) => scoped.some((f) => (f.category + ' ' + f.fact).toLowerCase().includes(item.split(' ')[0].toLowerCase()));
  return (
    <div className="stack">
      <p className="small muted">The 28 items to research for the confirmed organisation. Marked covered when a fact for the selected organisation mentions it — review manually.</p>
      <div className="table-wrap"><table className="t"><tbody>{NGO_RESEARCH_CHECKLIST.map((x, i) => <tr key={x}><td className="muted" style={{ width: 40 }}>{i + 1}</td><td>{x}</td><td>{selected && covered(x) ? <span className="tag ok">has a fact</span> : <span className="tag warn">needs confirmation</span>}</td></tr>)}</tbody></table></div>
    </div>
  );
}

function Content() {
  const masters = useLiveQuery(() => db.masters.where('workspace').equals('ngo').toArray()) ?? [];
  const posts = useLiveQuery(() => db.posts.where('workspace').equals('ngo').toArray()) ?? [];
  const nav = useNavigate();
  const [newIdea, setNewIdea] = useState(false);
  const [newPost, setNewPost] = useState(false);
  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="notice ngo">Editorial direction for when the organisation is confirmed: storytelling themes, awareness campaigns, volunteer recruitment, donor education, programme explainers, events, impact reports, consented stories, fundraising, Reels, carousels, Stories, website updates, landing pages and newsletters — each built from verified facts only.</div>
      <div className="row"><button className="btn" onClick={() => setNewIdea(true)}><Plus />NGO idea</button><button className="btn" onClick={() => setNewPost(true)}><Plus />NGO post</button></div>
      <div className="table-wrap"><table className="t"><thead><tr><th>Idea</th><th>Brief</th><th>Formats</th><th>Next action</th></tr></thead>
        <tbody>{masters.map((m) => <tr key={m.id} className="click" onClick={() => nav('/ngo/idea/' + m.id)}><td className="list-title">{m.title}</td><td className="wrap small">{m.idea}</td><td className="small">{(m.formats ?? []).join(', ')}</td><td className="small">{m.nextAction}</td></tr>)}</tbody></table></div>
      <h3>NGO posts</h3>
      <PostTable posts={posts} empty={<div className="small muted">No NGO posts yet. They stay out of agency calendars unless “Show NGO items” is ticked.</div>} />
      {newIdea && <NewIdeaModal workspace="ngo" seed={{ pillar: 'Impact & NGO Storytelling', audience: 'NGO & non-profit leaders' }} onClose={() => setNewIdea(false)} />}
      {newPost && <CreatePostModal workspace="ngo" onClose={() => setNewPost(false)} />}
    </div>
  );
}

function Notes() {
  const toast = useToast();
  const val = useLiveQuery(() => getSetting<string>('ngoNotes', ''));
  const [d, setD] = useState<string | null>(null);
  const text = d ?? val ?? '';
  return (
    <div className="stack">
      <Field label="Working notes, meeting notes, information supplied by the NGO (record who supplied it and when)">
        <textarea className="textarea" style={{ minHeight: 260 }} value={text} onChange={(e) => setD(e.target.value)} />
      </Field>
      <div className="row"><button className="btn primary" onClick={async () => { await setSetting('ngoNotes', text); toast('Notes saved'); }}>Save notes</button>
        <span className="small muted">For documents supplied by the NGO, add them in the Asset Library (source: Client-supplied) and record permissions.</span></div>
    </div>
  );
}
