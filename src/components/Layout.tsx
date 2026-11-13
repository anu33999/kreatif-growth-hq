import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3, BookOpen, CalendarDays, Camera, Compass, Facebook, FolderOpen, GraduationCap, HeartHandshake, Instagram,
  LayoutDashboard, Library, LifeBuoy, Linkedin, Menu, Moon, Search, Sun, Target, Youtube,
} from 'lucide-react';
import { buildIndex, highlight, searchDocs, type SearchDoc } from '../lib/search';
import ErrorBoundary from './ErrorBoundary';

const NAV: { group: string; items: { to: string; label: string; icon: typeof Compass; area: string }[] }[] = [
  { group: 'Plan', items: [
    { to: '/', label: 'Overview', icon: LayoutDashboard, area: 'plan' },
    { to: '/calendar', label: 'Unified Calendar', icon: CalendarDays, area: 'plan' },
    { to: '/strategy', label: 'Strategy & Research', icon: Compass, area: 'plan' },
    { to: '/library', label: 'Content Library', icon: Library, area: 'plan' },
  ] },
  { group: 'Produce', items: [
    { to: '/studio/instagram', label: 'Instagram Studio', icon: Instagram, area: 'prod' },
    { to: '/studio/linkedin', label: 'LinkedIn Studio', icon: Linkedin, area: 'prod' },
    { to: '/studio/facebook', label: 'Facebook Studio', icon: Facebook, area: 'prod' },
    { to: '/studio/youtube', label: 'YouTube Studio', icon: Youtube, area: 'prod' },
    { to: '/creative', label: 'Creative & Image Studio', icon: Camera, area: 'prod' },
    { to: '/assets', label: 'Asset Library', icon: FolderOpen, area: 'prod' },
  ] },
  { group: 'Learn', items: [
    { to: '/learn', label: 'AI Video Learning Centre', icon: GraduationCap, area: 'learn' },
    { to: '/help', label: 'Help & Learning Centre', icon: LifeBuoy, area: 'learn' },
  ] },
  { group: 'Grow & measure', items: [
    { to: '/leads', label: 'Lead Generation Centre', icon: Target, area: 'lead' },
    { to: '/analytics', label: 'Analytics & Experiments', icon: BarChart3, area: 'measure' },
  ] },
  { group: 'Research', items: [
    { to: '/ngo', label: 'Asha NGO Workspace', icon: HeartHandshake, area: 'ngo' },
  ] },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? 'dark');
  const loc = useLocation();

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(true); }
      if (e.key === '/' && !(e.target as HTMLElement).closest('input,textarea,select,[contenteditable]')) { e.preventDefault(); setPalette(true); }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('ka-theme', next); } catch { /* ignore */ }
    setTheme(next);
  };

  return (
    <div className="shell">
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
        <div className="brand">
          <div className="brand-mark">KREATIF ATELIER<br /><b>Growth HQ</b></div>
          <div className="brand-sub">The Content, Creative &amp; Client Growth Operating System</div>
        </div>
        {NAV.map((g) => (
          <div key={g.group}>
            <div className="nav-group">{g.group}</div>
            {g.items.map((it) => (
              <NavLink key={it.to} to={it.to} end={it.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ ['--area' as string]: `var(--a-${it.area})` }}>
                <it.icon />{it.label}
              </NavLink>
            ))}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '18px 10px 0' }} className="small muted">
          Data is stored in this browser. <NavLink to="/help?tab=backup">Back up weekly</NavLink>.
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="btn ghost icon-btn menu-btn" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></button>
          <button className="search-trigger" onClick={() => setPalette(true)} aria-label="Search everything">
            <Search size={16} style={{ flex: 'none' }} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Search posts, scripts, prompts, assets, sources, leads…</span><kbd>⌘K</kbd>
          </button>
          <div className="grow" />
          <button className="btn ghost icon-btn" onClick={toggleTheme} aria-label="Toggle light and dark theme" title="Toggle theme">
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
          <NavLink to="/help" className="btn ghost sm" aria-label="How to use"><BookOpen /><span className="help-label">How to use</span></NavLink>
        </header>
        <main className="content"><ErrorBoundary resetKey={loc.pathname + loc.search}><Outlet /></ErrorBoundary></main>
      </div>
      {palette && <Palette onClose={() => setPalette(false)} />}
    </div>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [sel, setSel] = useState(0);
  const nav = useNavigate();
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { buildIndex().then(setDocs); input.current?.focus(); }, []);
  const results = useMemo(() => (docs ? searchDocs(docs, q, 40) : []), [docs, q]);
  useEffect(() => setSel(0), [q]);
  const go = (url: string) => { onClose(); nav(url); };
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal wide" role="dialog" aria-label="Search">
        <input ref={input} className="palette-input" placeholder="Search everything — try “AUDIT”, “Kling”, “PDF menu”, “Asha”…" value={q}
          onChange={(e) => setQ(e.target.value)} aria-label="Search query"
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
            if (e.key === 'Enter' && results[sel]) go(results[sel].url);
          }} />
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {!docs && <div className="result muted">Indexing…</div>}
          {docs && q.trim().length > 1 && results.length === 0 && <div className="result muted">No matches for “{q}”. Try fewer words.</div>}
          {docs && q.trim().length < 2 && <div className="result muted small">Searches {docs.length} records: posts, ideas, scripts, AI prompts, assets, leads, campaigns, research sources, NGO facts, lessons, tools and help. Enter opens the selected result; “See all” opens the full search page.</div>}
          {results.map((r, i) => (
            <div key={r.type + r.id} className={`result ${i === sel ? 'sel' : ''}`} onMouseEnter={() => setSel(i)} onClick={() => go(r.url)}>
              <div className="result-type">{r.type}</div>
              <div style={{ minWidth: 0 }}>
                <div className="list-title">{highlight(r.title, q).map((p, j) => (j % 2 ? <mark key={j}>{p}</mark> : p))}</div>
                <div className="list-meta">{r.meta}</div>
                <div className="small muted" style={{ marginTop: 2 }}>{highlight(r.snippet, q).map((p, j) => (j % 2 ? <mark key={j}>{p}</mark> : p))}</div>
              </div>
            </div>
          ))}
        </div>
        {q.trim().length > 1 && <div className="modal-foot"><button className="btn sm" onClick={() => go(`/search?q=${encodeURIComponent(q)}`)}>See all results</button></div>}
      </div>
    </div>
  );
}
