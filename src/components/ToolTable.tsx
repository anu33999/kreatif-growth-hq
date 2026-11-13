import type { ToolRow } from '../content/tools';
import { CHECKED } from '../content/tools';
import { Ext } from './ui';

export function ToolTable({ rows, video }: { rows: ToolRow[]; video?: boolean }) {
  return (
    <div className="stack" style={{ gap: 8 }}>
      <div className="table-wrap">
        <table className="t">
          <thead>
            <tr>
              <th>Tool</th><th>Access &amp; pricing</th><th>India</th>
              {video && <><th>Text→video</th><th>Image→video</th><th>References</th><th>Camera</th><th>Aspect</th></>}
              <th>Best for</th><th>Watch out</th><th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.name}>
                <td style={{ minWidth: 150 }}><div className="list-title">{t.name}</div><Ext href={t.url}>Official site</Ext></td>
                <td className="wrap small">{t.access}</td>
                <td className="wrap small" style={{ minWidth: 170 }}>{t.india}</td>
                {video && <><td className="small">{t.t2v ?? '—'}</td><td className="small" style={{ minWidth: 120 }}>{t.i2v ?? '—'}</td><td className="small" style={{ minWidth: 140 }}>{t.refs ?? '—'}</td><td className="small" style={{ minWidth: 130 }}>{t.camera ?? '—'}</td><td className="small">{t.aspect ?? '—'}</td></>}
                <td className="wrap small">{t.bestFor}</td>
                <td className="wrap small">{t.watchOut}</td>
                <td>
                  <span className={`tag ${t.confidence === 'High' ? 'ok' : t.confidence === 'Medium' ? 'warn' : 'danger'}`}>{t.confidence}</span>
                  {t.sources.map((s) => <div key={s.url} className="small" style={{ marginTop: 4 }}><Ext href={s.url}>{s.title.slice(0, 40)}</Ext></div>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small muted">Researched {CHECKED} by web search. Several prices come from third-party summaries that disagreed with each other; confirm on the official pricing page before paying. “India” describes availability for an India-based account, not legal advice.</p>
    </div>
  );
}

export const AI_VIDEO_WORKFLOW: { step: string; detail: string }[] = [
  { step: 'Decide which shots should be AI', detail: 'Only shots you cannot film or design easily (abstract transitions, environments without real businesses). Screens, text, real work and people are recorded or designed — never AI.' },
  { step: 'Pick the tool', detail: 'Practise on Kling free credits (watermarked). For publishable clips: Kling paid, Veo via Google AI Pro, or Runway. Sora is unavailable; CapCut is blocked in India.' },
  { step: 'Check access, limits and licence', detail: 'Confirm your plan allows commercial use and how many generations remain today.' },
  { step: 'Confirm capabilities', detail: 'Text-to-video vs image-to-video, reference images, camera controls and 9:16 output — see the table.' },
  { step: 'Open the tool and start a generation', detail: 'Sign in → open the video generator → choose Image to Video.' },
  { step: 'Choose settings', detail: 'Aspect 9:16 (Reels/Shorts) or 16:9 (YouTube). Shortest duration (5 s). Standard quality for drafts; high quality for the final.' },
  { step: 'Create or select the starting image', detail: 'Generate a keyframe with the prompt in the shot card (Module 2) or photograph it. Approve it before animating.' },
  { step: 'Write the prompt', detail: 'For image-to-video describe motion only: what moves, camera move, speed. Add the negative prompt where supported.' },
  { step: 'Generate each shot separately', detail: 'One shot = one generation. Do not try to generate the whole Reel in one prompt.' },
  { step: 'Fix inconsistent or distorted results', detail: 'Shorten, slow down, use start + end frames, regenerate changing one variable, or replace with the no-AI alternative.' },
  { step: 'Create matching extra shots', detail: 'Re-use the same keyframe or reference image and the same style bible sentence.' },
  { step: 'Select the strongest results', detail: 'Watch each 3× (motion, objects/edges, fit with neighbours). Keep only the clean 2–4 seconds.' },
  { step: 'Assemble the Reel', detail: 'In Edits (phone) or DaVinci Resolve (Mac), place clips in shot order with your recordings.' },
  { step: 'Add voiceover, subtitles, sound, music, transitions', detail: 'Voice first, cut to voice, auto-captions proofread, music 10–20% under voice, one deliberate transition.' },
  { step: 'Export', detail: '1080×1920, 30 fps, highest quality. YouTube long-form: 1920×1080.' },
  { step: 'Review before publishing', detail: 'QC pass (Learning Centre Module 6): sound off, sound on, on a phone; then the publishing checklist.' },
];
