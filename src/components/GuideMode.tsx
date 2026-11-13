import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Post } from '../lib/types';
import { db, now } from '../lib/db';
import { buildGuide } from '../lib/workflow';
import { CopyBlock, Ext, Progress } from './ui';

export default function GuideMode({ post }: { post: Post }) {
  const steps = buildGuide(post);
  const done = post.guideProgress ?? {};
  const idx = Math.min(post.guideStep ?? 0, steps.length - 1);
  const step = steps[idx];
  const count = steps.filter((s) => done[s.id]).length;

  const go = (i: number) => db.posts.update(post.id, { guideStep: i, updatedAt: now() });
  const toggle = async () => {
    const next = { ...done, [step.id]: !done[step.id] };
    await db.posts.update(post.id, { guideProgress: next, updatedAt: now() });
  };

  return (
    <div className="stack">
      <div className="row between">
        <div className="small muted">Step {idx + 1} of {steps.length} · {count} completed · progress is saved automatically</div>
        <div style={{ width: 200 }}><Progress value={(count / steps.length) * 100} /></div>
      </div>
      <div className="guide">
        <nav className="guide-nav" aria-label="Guide steps">
          {steps.map((s, i) => (
            <button key={s.id} className={`${i === idx ? 'on' : ''} ${done[s.id] ? 'done' : ''}`} onClick={() => go(i)}>
              <span className="gn">{done[s.id] ? <Check size={14} /> : i + 1}</span><span>{s.title}</span>
            </button>
          ))}
        </nav>
        <div className="guide-body">
          <div className="eyebrow">Guide me step by step</div>
          <h2 style={{ marginBottom: 14 }}>{step.title}</h2>
          <div className="guide-block"><h4>What to do</h4><p style={{ whiteSpace: 'pre-wrap' }}>{step.explain}</p></div>
          {step.material && <div className="guide-block"><h4>Material you need</h4><pre className="copy" style={{ paddingRight: 14 }}>{step.material}</pre></div>}
          {step.copy?.map((c, i) => <div className="guide-block" key={i}><CopyBlock label={c.label} text={c.text} /></div>)}
          {step.link && <div className="guide-block"><h4>Tool</h4><Ext href={step.link.url}>{step.link.label}</Ext></div>}
          {step.settings && <div className="guide-block"><h4>Settings</h4><p>{step.settings}</p></div>}
          {step.evaluate && <div className="guide-block"><h4>How to judge the result</h4><p>{step.evaluate}</p></div>}
          {step.troubleshoot && <div className="guide-block"><h4>If something goes wrong</h4><p>{step.troubleshoot}</p></div>}
          <hr className="rule" />
          <div className="row between">
            <button className="btn" disabled={idx === 0} onClick={() => go(idx - 1)}><ChevronLeft />Previous</button>
            <label className="check"><input type="checkbox" checked={!!done[step.id]} onChange={toggle} /><span style={{ textDecoration: 'none' }}>Mark this step complete</span></label>
            <button className="btn primary" disabled={idx === steps.length - 1} onClick={() => go(idx + 1)}>I’m ready — next<ChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
