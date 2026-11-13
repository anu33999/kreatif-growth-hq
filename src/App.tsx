import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { seedIfEmpty } from './seed';
import { getSetting } from './lib/db';
import { ToastProvider } from './components/ui';
import Layout from './components/Layout';
import LockScreen from './components/LockScreen';
import Overview from './pages/Overview';
import Strategy from './pages/Strategy';
import Calendar from './pages/Calendar';
import Library from './pages/Library';
import IdeaPage from './pages/IdeaPage';
import PostPage from './pages/PostPage';
import Studio from './pages/Studio';
import Learn from './pages/Learn';
import Creative from './pages/Creative';
import Assets from './pages/Assets';
import Leads from './pages/Leads';
import Analytics from './pages/Analytics';
import Ngo from './pages/Ngo';
import Help from './pages/Help';
import SearchPage from './pages/SearchPage';

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await seedIfEmpty();
        try { await navigator.storage?.persist?.(); } catch { /* optional */ }
        const hash = await getSetting<string | null>('lockHash', null);
        let unlocked = false;
        try { unlocked = sessionStorage.getItem('ka-unlocked') === '1'; } catch { /* ignore */ }
        setLocked(!!hash && !unlocked);
        setReady(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  if (error) {
    return (
      <div className="lock"><div className="panel">
        <h2>Growth HQ could not open its database</h2>
        <p className="muted" style={{ marginTop: 10 }}>{error}</p>
        <p className="small">This usually happens in a private/incognito window or when site storage is blocked. Open Growth HQ in a normal window, or allow site data for this address.</p>
      </div></div>
    );
  }
  if (!ready || locked === null) return <div className="lock"><div className="muted">Opening Growth HQ…</div></div>;
  if (locked) return <LockScreen onUnlock={() => setLocked(false)} />;

  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/library" element={<Library />} />
            <Route path="/idea/:id" element={<IdeaPage />} />
            <Route path="/ngo/idea/:id" element={<IdeaPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/ngo/post/:id" element={<PostPage />} />
            <Route path="/studio/:platform" element={<Studio />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/creative" element={<Creative />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ngo" element={<Ngo />} />
            <Route path="/help" element={<Help />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<div className="empty"><h4>Page not found</h4><a href="#/">Back to Overview</a></div>} />
          </Route>
        </Routes>
      </HashRouter>
    </ToastProvider>
  );
}
