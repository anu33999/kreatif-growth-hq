import { useState } from 'react';
import { getSetting } from '../lib/db';

export async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await getSetting<string | null>('lockHash', null);
    if (hash && (await sha256('ka:' + code)) === hash) {
      try { sessionStorage.setItem('ka-unlocked', '1'); } catch { /* ignore */ }
      onUnlock();
    } else setErr('That passcode is not correct.');
  };
  return (
    <div className="lock">
      <form className="panel" onSubmit={submit}>
        <div className="eyebrow">Kreatif Atelier</div>
        <h2>Growth HQ is locked</h2>
        <p className="muted small" style={{ margin: '8px 0 16px' }}>Enter the passcode set in Help → Settings. This screen prevents casual viewing on a shared device; it is not server-side security.</p>
        <input className="input" type="password" autoFocus value={code} onChange={(e) => setCode(e.target.value)} aria-label="Passcode" />
        {err && <p className="small" style={{ color: 'var(--danger)', marginTop: 8 }}>{err}</p>}
        <button className="btn primary" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>Unlock</button>
      </form>
    </div>
  );
}
