export interface HelpTopic { id: string; n: number; title: string; where: string; body: string }

export const HELP_TOPICS: HelpTopic[] = [
  { id: 'h1', n: 1, title: 'Find the next content idea', where: 'Content Library → Ideas', body: `1. Open **Content Library** and stay on the **Master ideas** tab.
2. Filter **Funnel = Reach** if you need new viewers, **Trust** if you need credibility, **Conversion** if you need enquiries.
3. Filter **Effort = Low** on busy weeks.
4. Sort mentally by: relevance to US/UK buyers first, then effort.
5. Open the idea. Its **Next action** tells you what to do (e.g. “Create Reel adaptation”).
6. Or go to **Overview → Generate a content idea**: it picks an un-produced idea that matches the pillar you have posted least recently.` },
  { id: 'h2', n: 2, title: 'Turn the idea into a script', where: 'Master idea → Adapt → open the post → Script tab', body: `1. Open a master idea → **Adapt to platforms** → tick the formats you want (e.g. Instagram Reel) → **Create**.
2. The new post opens with the idea, audience and objective copied in, plus a format-specific script skeleton.
3. In **Concept**, write 3 hooks and pick one (Learning Centre → Module 1 Lesson 1 shows how).
4. In **Script & Scenes**, replace each skeleton row with your exact words: what is said, what text appears, what is seen.
5. Read it aloud with a timer. 30 seconds ≈ 75–85 spoken words.
6. Set status to **Script Ready**.` },
  { id: 'h3', n: 3, title: 'Generate a storyboard', where: 'Post → Shots tab', body: `1. In the **Shots** tab, click **Build shot list from scenes** — one shot per scene is created with the method guessed from the scene text.
2. Edit each shot: what to film, angle, background, length, whether you appear.
3. For a visual storyboard, generate or photograph one reference image per shot and add each as an asset linked to the post (Assets tab → New asset).` },
  { id: 'h4', n: 4, title: 'Create the necessary images', where: 'Creative & Image Studio', body: `1. Open **Creative & Image Studio → Prompt builder**.
2. Choose the destination (e.g. Instagram carousel 1080×1440). Fill subject, composition, lighting. The style bible is pre-filled.
3. Click **Copy prompt** and paste it into your image tool (links in the tool table).
4. Generate 4 variants, pick one using the checklist under the builder.
5. Add real text in Canva — never ask the generator to write text.
6. Click **Save as asset**, link it to the post, and record where the file is stored (Drive/Dropbox link or upload a preview).` },
  { id: 'h5', n: 5, title: 'Generate AI video clips', where: 'Post → AI Video tab; AI Video Learning Centre', body: `1. Open the post → **AI Video** tab. Each AI shot shows: why AI, tool, mode, start frame, exact prompt, negative prompt, settings, continuity and how to judge the result.
2. Create the start frame first (step 4 above).
3. Open the tool via the link in the tool table, choose image-to-video, set ratio and duration as listed.
4. Paste the prompt and negative prompt. Generate 2 variants.
5. Judge with the “Evaluate” line. Use the QC lesson (Module 6) to fix problems.
6. Log the chosen clip as an asset (source: AI-generated).
7. If AI is too costly or unreliable, use the **No-AI alternative** shown on the same tab.` },
  { id: 'h6', n: 6, title: 'Record footage yourself', where: 'Post → Shots tab; Creative Studio → Photography', body: `1. Filter the shot list to method = Phone or Screen recording.
2. Phone footage: clean lens, 1080p 30 fps, vertical, lock exposure, window light, 3 takes per shot, 2 seconds of stillness before and after.
3. Screen recordings (Mac): press Cmd+Shift+5 → Record Selected Portion or Entire Screen; hide bookmarks and notifications (Focus mode) first; scroll slowly.
4. Name files with the shot number (S03_menu_pdf.mov).` },
  { id: 'h7', n: 7, title: 'Edit the Reel', where: 'Post → Edit tab; Learning Centre Module 5', body: `1. Open **Edit**. It lists the editing app (Instagram Edits by default — CapCut is blocked in India) and numbered steps specific to this video.
2. Follow each step; tick the production checklist items as you go.
3. Run the QC pass (Module 6) before export.` },
  { id: 'h8', n: 8, title: 'Build a carousel', where: 'Instagram Studio → Carousels; post → Slides tab', body: `1. Open the carousel post → **Slides** for exact slide text and layout per slide.
2. In Canva: Create a design → Custom size 1080×1440 → set Brand Kit colours.
3. Build slide 1 (cover) first; duplicate the page for every slide so margins stay identical.
4. Paste text from the slide table. Keep body text ≥ 32 px.
5. Download → PNG (or PDF for LinkedIn documents) → upload in the order listed.
6. Use **Guide me step by step** on the post for the full sequence.` },
  { id: 'h9', n: 9, title: 'Create Stories', where: 'Instagram Studio → Stories', body: `1. Open a Story sequence post. Each frame lists text, background, sticker and purpose.
2. Make frames in Canva at 1080×1920 or directly in Instagram.
3. Add stickers (poll, question, link) in Instagram — they can’t be added in Canva.
4. Save the sequence to the Highlight named in the post.` },
  { id: 'h10', n: 10, title: 'Publish content', where: 'Post → Publish tab', body: `1. Complete the **Publishing checklist** (script approved, assets, permissions, facts, captions, cover, CTA, links, full watch, export settings).
2. The status cannot be set to Ready to Publish until required production items are ticked.
3. Copy caption and keywords from the Publish tab.
4. Post via the native app or schedule in Meta Business Suite / LinkedIn / YouTube Studio.
5. Paste the live URL into **Published URL** and set status to Published. A review task is created for 7 days later.` },
  { id: 'h11', n: 11, title: 'Measure results', where: 'Post → Results; Analytics & Experiments', body: `1. Seven days after publishing, open the platform’s insights.
2. In the post’s **Results** tab, click **Add results** and enter the numbers you see (only real numbers).
3. For many posts at once use **Analytics → Import CSV** (template provided).
4. Write one sentence in **Observations**: what happened and your best guess why.` },
  { id: 'h12', n: 12, title: 'Improve the next post', where: 'Analytics → Weekly review', body: `1. Open **Analytics → Reviews → New weekly review**.
2. Answer each question using the per-platform tables.
3. From a strong post, click **Create follow-up** to generate a new master idea linked to it.
4. Record one experiment for next week (e.g. “Test problem-first vs result-first hook on two Reels”).` },
  { id: 'h13', n: 13, title: 'Convert attention into enquiries', where: 'Lead Generation → Journey', body: `1. Fix the profile first: copy the profile text for each platform from its Studio → Profile tab.
2. Make sure every link has UTM tags.
3. Add a CTA to every third post that offers the free audit.
4. Reply to every DM and comment within one working day.` },
  { id: 'h14', n: 14, title: 'Follow up with potential clients', where: 'Lead Generation → Follow-ups', body: `1. Every lead needs a **Next action** and **Next follow-up** date.
2. The Follow-ups tab and Overview list what is due today and overdue.
3. Use the message templates (adapt every one — no copy-paste blasts).
4. After two unanswered follow-ups, set status to Nurture.` },
  { id: 'h15', n: 15, title: 'Research a prospective client', where: 'Lead Generation → Leads → Add', body: `1. Use only public, professional information: their website, Google Business Profile, LinkedIn company page, public posts.
2. Record what you observed (e.g. “PDF menu, no booking link on mobile”) in Notes — this becomes your personalised opener.
3. Record a decision-maker only if they are publicly listed in a business role.
4. Do not scrape, buy lists, or guess email addresses.` },
  { id: 'h16', n: 16, title: 'Use the Asha NGO workspace responsibly', where: 'Asha NGO workspace', body: `1. Start at **Identity**: the organisation is Unconfirmed until you select the correct candidate and add an official source.
2. Add facts one at a time with source URL, date checked, confidence and status. Organisation claims are not independent verification.
3. Content ideas stay inside the NGO workspace and are not shown in agency calendars unless you choose “Show NGO items”.
4. Never present the NGO as a Kreatif Atelier client or partner without written confirmation.
5. Follow the safeguarding checklist on every NGO post.` },
  { id: 'h17', n: 17, title: 'Back up and restore your data', where: 'Help → Backup & restore (or Settings)', body: `1. Click **Download backup**. A .json file with everything (including uploaded previews) is saved.
2. Store it in Google Drive/Dropbox. Do this weekly — set a reminder.
3. To restore: **Restore from backup** → choose the file → choose **Merge** (keep current + add) or **Replace** (wipe and restore).
4. To move to another computer: back up here, restore there.` },
];

export const STORAGE_NOTE = `### Where your data lives
Growth HQ stores your records in **IndexedDB**, a database built into your browser, on this device only.

- It survives closing the tab and restarting the computer.
- It is **not** synced to other devices or browsers, and other people cannot see it.
- It can be lost if you clear site data/browsing data for this site, use a private window, or the browser evicts storage under extreme disk pressure (Growth HQ asks the browser for persistent storage to reduce this risk).
- **Back up weekly** with Download backup. The backup is a plain JSON file you can restore anywhere.

Cloud sync is not implemented. If you later need multi-device or team access, the recommended path is a small server (e.g. Supabase or a Postgres database behind an authenticated API) with secrets kept server-side — the record structure here maps directly onto tables.`;

export const DEPLOY_GUIDE = `### Run it on your computer
1. Install Node.js 20+ from https://nodejs.org (LTS).
2. Open Terminal and run:
   cd ~/Downloads/computer-use-main/growth-hq
   npm install
   npm run dev
3. Open the address it prints (http://localhost:5320).

### Build for deployment
   npm run build
This creates a \`dist\` folder of static files. No server, database or API keys are needed.

### Deploy privately (recommended: Cloudflare Pages + Cloudflare Access)
The built site contains your strategy text, so it **must not be public**.
1. Create a free Cloudflare account → Workers & Pages → Create → Pages → **Upload assets** → upload the \`dist\` folder (or connect a private GitHub repo with build command \`npm run build\` and output \`dist\`).
2. Go to Zero Trust → Access → Applications → Add an application → Self-hosted → enter your Pages domain (e.g. growth-hq.pages.dev, and \`*.growth-hq.pages.dev\` for previews).
3. Add a policy: Action **Allow**, Include **Emails** → your team’s email addresses. Login method: One-time PIN (email code).
4. Visit the site: you’ll be asked for your email and a code before anything loads.

Alternatives: Vercel (Deployment Protection / password protection is a paid feature on some plans — check current pricing) or Netlify (password protection on paid plans).

### What the in-app passcode does (and doesn’t)
Settings → Privacy lock lets you set a passcode screen. It stops casual viewing on a shared computer, but it is **not** server-side security: the strategy text ships inside the app files. Use Cloudflare Access (above) for any online deployment.

### Each person has their own data
Because data is stored in each browser, two team members using the deployed site will each have separate records. Share by exporting a backup and importing it.`;

export const LIMITATIONS = [
  { feature: 'AI image / video generation', status: 'Not built in', detail: 'Growth HQ gives prompts, settings and step-by-step workflows for external tools. It does not call any AI API.' },
  { feature: 'Automatic publishing / scheduling', status: 'Not built in', detail: 'Use Meta Business Suite, LinkedIn native scheduling or YouTube Studio. Growth HQ tracks the checklist, URL and dates.' },
  { feature: 'Analytics sync', status: 'Manual entry + CSV import', detail: 'Official APIs (Instagram Graph API, LinkedIn Community Management API, YouTube Analytics API) need app review, OAuth and a server to keep tokens secret. Not configured.' },
  { feature: 'Cloud sync / multi-user', status: 'Not built in', detail: 'Local browser storage with JSON backup/restore. See Storage notes for the upgrade path.' },
  { feature: 'Access control for deployment', status: 'Documented, not configured', detail: 'Requires your Cloudflare (or similar) account. Steps in Deploy.' },
  { feature: 'Asha NGO identity', status: 'Unconfirmed', detail: 'Several organisations share the name. Select and verify the correct one in the NGO workspace.' },
  { feature: 'Tool pricing & availability', status: 'Researched 2026-10-28, partly third-party', detail: 'Confirm on each official pricing page before paying.' },
];
