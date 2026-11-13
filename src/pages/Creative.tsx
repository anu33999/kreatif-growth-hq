import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { db, now, uid } from '../lib/db';
import { DESTINATIONS, PHOTO_BATCH_INTRO, PHOTO_BRIEFS } from '../content/photo';
import { IMAGE_TOOLS } from '../content/tools';
import { useParam } from '../components/common';
import { ToolTable } from '../components/ToolTable';
import { CopyBlock, Field, PageHead, Prose, Tabs, useToast } from '../components/ui';

const STYLE = 'quiet editorial, premium creative studio; palette deep charcoal #111210, warm cream #F3F0E9, muted antique gold #CDB98A accents; materials light oak, linen, matte paper, brushed brass';

export default function Creative() {
  const [tab, setTab] = useParam('tab');
  const cur = tab ?? 'builder';
  return (
    <div>
      <PageHead eyebrow="Produce" area="prod" title="Creative & Image Studio"
        lede="Build platform-specific image prompts, plan original photography, and use reusable templates. A Reel cover, LinkedIn document page, Facebook image and YouTube thumbnail are different deliverables — the destination sets the size and safe areas." />
      <Tabs value={cur as 'builder'} onChange={(t) => setTab(t === 'builder' ? null : t)}
        tabs={[{ id: 'builder', label: 'AI image prompt builder' }, { id: 'photo' as 'builder', label: 'Photography studio' }, { id: 'workflow' as 'builder', label: '10-step image workflow' }, { id: 'tools' as 'builder', label: 'Image tools' }]} />
      {cur === 'builder' && <Builder />}
      {cur === 'photo' && <Photo />}
      {cur === 'workflow' && <Prose text={`1. **Why is the image needed?** Write the job in one sentence (e.g. “Reel cover that reads at grid size”).
2. **Destination & dimensions:** choose it in the builder — sizes and safe areas follow.
3. **Method:** photograph it yourself if it shows real work or people; screen-capture if it shows a website; AI only for mood, texture or settings that can’t be photographed.
4. **Exact prompt:** use the builder; it writes subject → composition → angle → light → palette → materials → lens → mood → negative space → exclusions.
5. **Specify everything:** subject, composition, lighting, framing, palette, background, texture, negative space and exclusions are fields in the builder.
6. **Alternatives:** generate 4 variants; then change one variable at a time (angle or light), never everything.
7. **Select the strongest:** clean edges, believable objects, no fake text, space where text will go, matches neighbouring images.
8. **Add real text and branding in Canva:** upload → place on the template from the Asset Library → type the headline.
9. **Crop for each platform:** Canva → Resize (Pro) or duplicate the design at the new size; re-check safe areas.
10. **Record it:** “Save as asset” stores the prompt, destination and link so it can be reused without losing context.

Never ask an image generator for readable paragraphs, fake analytics, fabricated testimonials or detailed website text.`} />}
      {cur === 'tools' && <ToolTable rows={IMAGE_TOOLS} />}
    </div>
  );
}

function Builder() {
  const toast = useToast();
  const nav = useNavigate();
  const [dest, setDest] = useState(DESTINATIONS[0].id);
  const [v, setV] = useState({
    subject: 'an open silver laptop on a light oak desk, screen glowing soft white and blank',
    setting: 'a calm creative studio by a window', composition: 'subject in the lower half, rule of thirds', angle: 'slightly high three-quarter view at seated eye level',
    lighting: 'soft natural window light from the left, gentle shadows', lens: '35mm, shallow depth of field', mood: 'calm, confident, uncluttered',
    negativeSpace: 'upper third empty warm cream wall for text', exclusions: 'no text, no logos, no people, no plants, no clutter', style: STYLE,
  });
  const d = DESTINATIONS.find((x) => x.id === dest)!;
  const prompt = useMemo(() => `${d.ratio.includes('9:16') ? 'Vertical 9:16' : d.ratio.includes('16:9') ? 'Horizontal 16:9' : d.ratio.includes('3:4') ? 'Portrait 3:4' : d.ratio.includes('4:5') ? 'Portrait 4:5' : d.ratio} photograph of ${v.subject} in ${v.setting}. Composition: ${v.composition}; ${v.negativeSpace}. Camera: ${v.angle}, ${v.lens}. Lighting: ${v.lighting}. Style: ${v.style}. Mood: ${v.mood}. ${v.exclusions.charAt(0).toUpperCase() + v.exclusions.slice(1)}.`, [v, d]);
  const save = async () => {
    const id = uid('as');
    await db.assets.add({ id, name: `AI image — ${d.label} — ${v.subject.slice(0, 40)}`, type: 'Image', platform: 'multi', source: 'AI-generated', status: 'Briefed', prompt, dims: d.dims,
      method: `Generate with an image tool (see Image tools), pick best of 4, add text in Canva on the “${d.label}” template.`, permissions: 'Check the generator’s commercial-use terms. No real people or brands.', postIds: [], createdAt: now(), updatedAt: now() });
    toast('Saved to Asset Library'); nav('/assets?open=' + id);
  };
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });
  return (
    <div className="cols-main">
      <div className="panel panel-pad">
        <div className="grid-form">
          <Field label="Destination" wide>
            <select className="select" value={dest} onChange={(e) => setDest(e.target.value)}>{DESTINATIONS.map((x) => <option key={x.id} value={x.id}>{x.label} — {x.dims}</option>)}</select>
          </Field>
          {(['subject', 'setting', 'composition', 'angle', 'lighting', 'lens', 'mood', 'negativeSpace', 'exclusions'] as const).map((k) => (
            <Field key={k} label={k === 'negativeSpace' ? 'Negative space (where text goes)' : k} wide={k === 'subject'}><input className="input" value={v[k]} onChange={set(k)} /></Field>
          ))}
          <Field label="Style bible (palette, materials)" wide><textarea className="textarea" value={v.style} onChange={set('style')} /></Field>
        </div>
      </div>
      <div className="stack">
        <CopyBlock label="Your prompt" text={prompt} />
        <div className="notice info small">Size: <strong>{d.dims}</strong>. Generate at the destination ratio where the tool allows; otherwise generate larger and extend/crop. Add every word of text in Canva, not in the generator.</div>
        <div className="panel panel-pad small"><h4>Pick the best of 4</h4><ul className="prose"><li>Edges and objects look physically right</li><li>No gibberish text or logos</li><li>Empty space exactly where your headline goes</li><li>Light direction matches your other images</li></ul></div>
        <button className="btn primary" onClick={save}><Plus />Save as asset (with prompt)</button>
      </div>
    </div>
  );
}

function Photo() {
  const toast = useToast();
  const existing = useLiveQuery(() => db.assets.filter((a) => a.type === 'Photograph').toArray()) ?? [];
  const add = async (id: string) => {
    const b = PHOTO_BRIEFS.find((x) => x.id === id)!;
    await db.assets.add({ id: uid('as'), name: `${b.name} (${b.id})`, type: 'Photograph', platform: 'multi', source: 'Original', status: 'Briefed', brief: `${b.subject}. Composition: ${b.composition}. Light: ${b.lighting}. Angle: ${b.angle}. Background: ${b.background}. Framing: ${b.framing}. Text-safe: ${b.textSafe}.`, method: 'Phone, batch session', permissions: 'Original. Model consent needed if a person is identifiable.', postIds: [], createdAt: now(), updatedAt: now() });
    toast('Added to Asset Library as a briefed photo');
  };
  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="panel panel-pad"><Prose text={PHOTO_BATCH_INTRO} /></div>
      <div className="table-wrap"><table className="t">
        <thead><tr><th>Shot</th><th>Use</th><th>Subject & composition</th><th>Light & angle</th><th>Background & framing</th><th>Text-safe area</th><th /></tr></thead>
        <tbody>{PHOTO_BRIEFS.map((b) => (
          <tr key={b.id}>
            <td style={{ minWidth: 170 }}><div className="list-title">{b.name}</div><div className="small muted">{b.id} · {b.platforms}</div></td>
            <td className="wrap small">{b.use}</td>
            <td className="wrap small">{b.subject}. {b.composition}.</td>
            <td className="wrap small">{b.lighting}. {b.angle}.</td>
            <td className="wrap small">{b.background}. {b.framing}.</td>
            <td className="small">{b.textSafe}</td>
            <td>{existing.some((a) => a.name.includes(`(${b.id})`)) ? <span className="tag ok">in library</span> : <button className="btn sm" onClick={() => add(b.id)}>Add to assets</button>}</td>
          </tr>
        ))}</tbody>
      </table></div>
      <div className="small muted">Batch order to minimise setup changes: overhead flat lays (ph2, ph4, ph7, ph11) → desk setups (ph1, ph8, ph12) → phone & screen (ph3, ph5) → light study (ph9) → wall/portrait (ph10, ph6). <Link to="/assets">Open Asset Library</Link></div>
    </div>
  );
}
