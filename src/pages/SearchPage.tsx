import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildIndex, highlight, searchDocs, type SearchDoc } from '../lib/search';
import { useParam } from '../components/common';
import { Empty, PageHead } from '../components/ui';

export default function SearchPage() {
  const [q, setQ] = useParam('q');
  const [type, setType] = useParam('type');
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const nav = useNavigate();
  useEffect(() => { buildIndex().then(setDocs); }, []);
  const all = useMemo(() => (docs ? searchDocs(docs, q ?? '', 500) : []), [docs, q]);
  const types = [...new Set(all.map((r) => r.type))];
  const results = all.filter((r) => !type || r.type === type);
  return (
    <div>
      <PageHead eyebrow="Search" title="Search everything" />
      <input className="input" style={{ fontSize: 16, padding: '10px 14px', marginBottom: 14 }} autoFocus value={q ?? ''} onChange={(e) => setQ(e.target.value || null)} placeholder="Search posts, scripts, prompts, assets, sources, leads, lessons…" aria-label="Search" />
      <div className="row" style={{ marginBottom: 14, gap: 6 }}>
        <button className={`btn sm ${!type ? 'primary' : ''}`} onClick={() => setType(null)}>All {all.length}</button>
        {types.map((t) => <button key={t} className={`btn sm ${type === t ? 'primary' : ''}`} onClick={() => setType(t)}>{t} {all.filter((r) => r.type === t).length}</button>)}
      </div>
      {!docs ? <div className="muted">Indexing…</div> : (q ?? '').trim().length < 2 ? <Empty title="Type at least two characters" /> : results.length === 0 ? <Empty title={`No results for “${q}”`}>Try fewer or different words.</Empty> : (
        <div className="panel">
          {results.map((r) => (
            <div key={r.type + r.id} className="result" onClick={() => nav(r.url)}>
              <div className="result-type">{r.type}</div>
              <div style={{ minWidth: 0 }}>
                <div className="list-title">{highlight(r.title, q ?? '').map((p, j) => (j % 2 ? <mark key={j}>{p}</mark> : p))}</div>
                <div className="list-meta">{r.meta}</div>
                <div className="small muted">{highlight(r.snippet, q ?? '').map((p, j) => (j % 2 ? <mark key={j}>{p}</mark> : p))}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
