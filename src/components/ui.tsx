import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { Check, Copy, ExternalLink, Plus, Trash2, X } from 'lucide-react';
import type { Platform, Status } from '../lib/types';
import { PLATFORM_LABEL } from '../lib/types';

// ---------- Toast ----------
type ToastFn = (msg: string, kind?: 'ok' | 'error') => void;
const ToastCtx = createContext<ToastFn>(() => {});
export const useToast = () => useContext(ToastCtx);
export function ToastProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState<{ msg: string; kind: string } | null>(null);
  const show = useCallback<ToastFn>((msg, kind = 'ok') => setT({ msg, kind }), []);
  useEffect(() => {
    if (!t) return;
    const h = setTimeout(() => setT(null), 2600);
    return () => clearTimeout(h);
  }, [t]);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {t && <div role="status" className={`toast ${t.kind === 'error' ? 'error' : ''}`}>{t.msg}</div>}
    </ToastCtx.Provider>
  );
}

export function PageHead({ eyebrow, title, lede, actions, area }: {
  eyebrow: string; title: string; lede?: ReactNode; actions?: ReactNode; area?: string;
}) {
  return (
    <div className="page-head" style={area ? ({ ['--area' as string]: `var(--a-${area})` }) : undefined}>
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {actions && <div className="row">{actions}</div>}
    </div>
  );
}

export function CopyBlock({ text, label, mono }: { text: string; label?: string; mono?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch {
      /* clipboard unavailable: text stays selectable */
    }
  };
  return (
    <div>
      {label && <div className="copy-label">{label}</div>}
      <div className="copy">
        {mono ? <pre>{text}</pre> : <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>}
        <button className="btn sm copy-btn" onClick={copy} aria-label={`Copy ${label ?? 'text'}`}>
          {done ? <Check /> : <Copy />}{done ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export function Modal({ title, onClose, children, footer, wide }: {
  title: string; onClose: () => void; children: ReactNode; footer?: ReactNode; wide?: boolean;
}) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="btn ghost icon-btn" onClick={onClose} aria-label="Close"><X /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

export function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className="field" style={wide ? { gridColumn: '1 / -1' } : undefined}><span>{label}</span>{children}</label>;
}

export function Empty({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <h4>{title}</h4>
      {children && <div className="small" style={{ maxWidth: 520, margin: '0 auto 12px' }}>{children}</div>}
      {action}
    </div>
  );
}

const STATUS_TONE: Partial<Record<Status, string>> = {
  'Ready for Review': 'warn', 'Ready to Publish': 'gold', Published: 'ok', Analysed: 'ok', Archived: '', 'Assets Needed': 'danger',
};
export function StatusTag({ status }: { status: string }) {
  return <span className={`tag ${STATUS_TONE[status as Status] ?? ''}`}>{status}</span>;
}
export function PlatformTag({ platform }: { platform: Platform }) {
  return <span className={`tag p-${platform}`}><span className="dot pdot" />{PLATFORM_LABEL[platform]}</span>;
}
export function SampleTag() {
  return <span className="tag sample" title="Illustrative starter content written for this dashboard. Not a result, client or published post.">Starter draft</span>;
}

export function Ext({ href, children }: { href: string; children?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className="row" style={{ display: 'inline-flex', gap: 4 }}>
      {children ?? href.replace(/^https?:\/\/(www\.)?/, '').slice(0, 48)}<ExternalLink size={12} />
    </a>
  );
}

export function Progress({ value }: { value: number }) {
  return <div className="progress" aria-label={`${Math.round(value)}% complete`}><i style={{ width: `${Math.min(100, value)}%` }} /></div>;
}

export function Tabs<T extends string>({ tabs, value, onChange }: {
  tabs: { id: T; label: string; count?: number }[]; value: T; onChange: (t: T) => void;
}) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((t) => (
        <button key={t.id} role="tab" aria-selected={value === t.id} className={`tab ${value === t.id ? 'active' : ''}`} onClick={() => onChange(t.id)}>
          {t.label}{t.count != null && <span className="muted"> · {t.count}</span>}
        </button>
      ))}
    </div>
  );
}

// Editable table for arrays of flat objects (scenes, shots, slides, AI shots).
export interface Col<T> { key: keyof T & string; label: string; width?: number; multiline?: boolean }
export function EditableTable<T extends object>({ rows, cols, onChange, blank, readOnly }: {
  rows: T[]; cols: Col<T>[]; onChange: (rows: T[]) => void; blank: () => T; readOnly?: boolean;
}) {
  const set = (i: number, k: keyof T, v: string) => {
    const next = rows.map((r, j) => (j === i ? { ...r, [k]: typeof r[k] === 'number' ? Number(v) || 0 : v } : r));
    onChange(next);
  };
  return (
    <div className="stack" style={{ gap: 8 }}>
      <div className="table-wrap">
        <table className="t">
          <thead><tr>{cols.map((c) => <th key={c.key}>{c.label}</th>)}{!readOnly && <th />}</tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={cols.length + 1} className="muted">No rows yet.</td></tr>}
            {rows.map((r, i) => (
              <tr key={i}>
                {cols.map((c) => (
                  <td key={c.key} style={{ minWidth: c.width ?? 140 }}>
                    {readOnly ? <div style={{ whiteSpace: 'pre-wrap' }}>{String(r[c.key] ?? '')}</div> : (
                      <textarea className="cell-input" rows={c.multiline ? 3 : 1} value={String(r[c.key] ?? '')}
                        aria-label={`${c.label} row ${i + 1}`} onChange={(e) => set(i, c.key, e.target.value)} />
                    )}
                  </td>
                ))}
                {!readOnly && (
                  <td><button className="btn ghost icon-btn" aria-label={`Delete row ${i + 1}`} onClick={() => onChange(rows.filter((_, j) => j !== i))}><Trash2 size={14} /></button></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!readOnly && <div><button className="btn sm" onClick={() => onChange([...rows, blank()])}><Plus />Add row</button></div>}
    </div>
  );
}

export function Prose({ text }: { text: string }) {
  // Lightweight renderer: paragraphs, "- " bullets, "1. " numbered lists, "### " headings, **bold**.
  const blocks = text.trim().split(/\n{2,}/);
  const inline = (s: string) => s.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        const lines = b.split('\n');
        if (b.startsWith('### ')) return <h4 key={i}>{b.slice(4)}</h4>;
        if (lines.every((l) => /^- /.test(l))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        if (lines.every((l) => /^\d+\. /.test(l))) return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\. /, ''))}</li>)}</ol>;
        return <p key={i} style={{ whiteSpace: 'pre-wrap' }}>{inline(b)}</p>;
      })}
    </div>
  );
}
