import { useLiveQuery } from 'dexie-react-hooks';
import { Check } from 'lucide-react';
import { getSetting, setSetting } from '../lib/db';
import { MODULES } from '../content/learning';
import { AI_VIDEO_TOOLS, EDITORS, IMAGE_TOOLS, NO_AI_ALTERNATIVES, VOICE_TOOLS } from '../content/tools';
import { useParam } from '../components/common';
import { AI_VIDEO_WORKFLOW, ToolTable } from '../components/ToolTable';
import { CopyBlock, PageHead, Progress, Tabs } from '../components/ui';

export default function Learn() {
  const [tab, setTab] = useParam('tab');
  const [lessonId, setLesson] = useParam('lesson');
  const done = useLiveQuery(() => getSetting<Record<string, boolean>>('lessonsDone', {})) ?? {};
  const all = MODULES.flatMap((m) => m.lessons);
  const lesson = all.find((l) => l.id === lessonId);
  const mod = MODULES.find((m) => m.lessons.some((l) => l.id === lessonId));
  const count = all.filter((l) => done[l.id]).length;
  const toggle = (id: string) => setSetting('lessonsDone', { ...done, [id]: !done[id] });
  const cur = tab ?? 'path';

  return (
    <div style={{ ['--area' as string]: 'var(--a-learn)' }}>
      <PageHead eyebrow="Learn" area="learn" title="AI Video Learning Centre"
        lede="A beginner-to-advanced path for making good videos — not just collecting prompts. Free and low-cost methods come first; paid tools are flagged where they are genuinely worth it." />
      <Tabs value={cur as 'path'} onChange={(t) => { setTab(t === 'path' ? null : t); setLesson(null); }}
        tabs={[{ id: 'path', label: 'Learning path' }, { id: 'tools' as 'path', label: 'Tool comparison' }, { id: 'workflow' as 'path', label: '16-step AI video workflow' }]} />

      {cur === 'path' && !lesson && (
        <div className="stack" style={{ gap: 18 }}>
          <div className="row"><div style={{ width: 260 }}><Progress value={(count / all.length) * 100} /></div><span className="small muted">{count} of {all.length} lessons completed</span></div>
          {MODULES.map((m) => (
            <div key={m.id} className="panel">
              <div className="panel-head"><div><div className="eyebrow">Module {m.n}</div><h3>{m.title}</h3><div className="small muted">{m.summary}</div></div></div>
              <div className="list">
                {m.lessons.map((l) => (
                  <div key={l.id} className="list-item click" onClick={() => setLesson(l.id)}>
                    <span style={{ color: done[l.id] ? 'var(--ok)' : 'var(--text-3)', width: 18 }}>{done[l.id] ? <Check size={16} /> : '○'}</span>
                    <div className="grow"><div className="list-title">{l.title}</div><div className="list-meta">{l.objective}</div></div>
                    <span className={`tag ${l.cost === 'Free' ? 'ok' : l.cost === 'Paid optional' ? 'warn' : ''}`}>{l.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {cur === 'path' && lesson && mod && (
        <div className="stack" style={{ gap: 18 }}>
          <button className="btn ghost sm" style={{ alignSelf: 'flex-start' }} onClick={() => setLesson(null)}>← All modules</button>
          <div><div className="eyebrow">Module {mod.n} · {mod.title}</div><h2>{lesson.title}</h2></div>
          <div className="cols-main">
            <div className="stack" style={{ gap: 16 }}>
              <div className="panel panel-pad"><h4>Objective</h4><p className="prose">{lesson.objective}</p><h4>Tools</h4><p className="prose">{lesson.tools}</p><h4>Prepare</h4><p className="prose">{lesson.prepare}</p></div>
              {lesson.terms && <div className="panel panel-pad"><h4>New terms</h4><table className="t"><tbody>{lesson.terms.map((t) => <tr key={t.term}><td className="list-title" style={{ width: 160 }}>{t.term}</td><td className="small">{t.meaning}</td></tr>)}</tbody></table></div>}
              <div className="panel"><div className="panel-head"><h3>Exact steps</h3></div>
                <div className="steps" style={{ border: 0 }}>{lesson.steps.map((s, i) => <div className="step" key={i}><div className="step-n">{i + 1}</div><div className="step-b">{s}</div></div>)}</div>
              </div>
              <div className="panel panel-pad"><h4>Worked example</h4><p className="prose" style={{ whiteSpace: 'pre-wrap' }}>{lesson.example}</p></div>
              {lesson.prompts.map((p) => <CopyBlock key={p.label} label={p.label} text={p.text} />)}
            </div>
            <div className="stack" style={{ gap: 16 }}>
              <div className="panel panel-pad"><h4>Common mistakes</h4><ul className="prose">{lesson.mistakes.map((m) => <li key={m}>{m}</li>)}</ul></div>
              <div className="panel panel-pad"><h4>Completed-result checklist</h4><ul className="prose">{lesson.checklist.map((m) => <li key={m}>{m}</li>)}</ul></div>
              <div className="panel panel-pad" style={{ borderColor: 'var(--a-learn)' }}><h4>Try it</h4><p className="prose">{lesson.exercise}</p></div>
              <button className={`btn ${done[lesson.id] ? '' : 'primary'}`} onClick={() => toggle(lesson.id)}>{done[lesson.id] ? 'Completed ✓ (undo)' : 'Mark lesson complete'}</button>
            </div>
          </div>
        </div>
      )}

      {cur === 'tools' && (
        <div className="stack" style={{ gap: 24 }}>
          <section><h3 style={{ marginBottom: 10 }}>AI video generators</h3><ToolTable rows={AI_VIDEO_TOOLS} video /></section>
          <section><h3 style={{ marginBottom: 10 }}>Editors & screen recording</h3><ToolTable rows={EDITORS} /></section>
          <section><h3 style={{ marginBottom: 10 }}>Image generation & design</h3><ToolTable rows={IMAGE_TOOLS} /></section>
          <section><h3 style={{ marginBottom: 10 }}>Voice</h3><ToolTable rows={VOICE_TOOLS} /></section>
          <section><h3 style={{ marginBottom: 10 }}>When AI is too costly or unreliable</h3>
            <div className="table-wrap"><table className="t"><thead><tr><th>Need</th><th>Practical alternative</th></tr></thead><tbody>{NO_AI_ALTERNATIVES.map((x) => <tr key={x.need}><td className="list-title">{x.need}</td><td className="wrap">{x.alt}</td></tr>)}</tbody></table></div>
          </section>
          <div className="notice"><strong>When paid tools are worth it:</strong> once you publish 2+ videos a week and a specific shot type (e.g. premium product motion, environments) recurs. Until then, Kling’s free credits for practice plus filming and screen recording cover almost everything this plan needs.</div>
        </div>
      )}

      {cur === 'workflow' && (
        <div className="steps">
          {AI_VIDEO_WORKFLOW.map((s, i) => <div className="step" key={s.step}><div className="step-n">{i + 1}</div><div className="step-b"><h4>{s.step}</h4><div className="small muted">{s.detail}</div></div></div>)}
        </div>
      )}
    </div>
  );
}
