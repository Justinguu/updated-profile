// Renders src/data/resumeData.json to public/Jung Gu Resume.pdf with headless Chrome.
// Run: npm run resume:pdf
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const data = JSON.parse(readFileSync(resolve('src/data/resumeData.json'), 'utf8'));
const { personalInfo: p, experience, education, skillGroups, languages } = data;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const bullets = (desc) => desc.split('\n').map((l) => `<li>${esc(l.replace(/^•\s*/, ''))}</li>`).join('');

const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(p.name)} Resume</title>
<style>
  @page { size: Letter; margin: 0.5in 0.6in; }
  * { box-sizing: border-box; }
  html, body { height: auto; }
  body { font: 10pt/1.36 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #111; margin: 0; }
  h1 { font-size: 21pt; margin: 0; letter-spacing: -0.01em; }
  .title { color: #444; margin: 2px 0 6px; font-size: 10.5pt; }
  .contact { font-size: 9pt; color: #333; display: flex; flex-wrap: wrap; gap: 4px 14px; }
  h2 { font-size: 9pt; text-transform: uppercase; letter-spacing: 0.12em; color: #E8641B; border-bottom: 1px solid #ddd; padding-bottom: 3px; margin: 13px 0 6px; }
  .summary { margin: 0; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .row strong { font-size: 10.6pt; }
  .row .org { color: #444; }
  .row .date { color: #555; font-size: 9pt; white-space: nowrap; }
  ul { margin: 3px 0 8px; padding-left: 15px; }
  li { margin: 1.5px 0; }
  .skills { display: grid; grid-template-columns: 11em 1fr; row-gap: 2px; }
  .skills b { font-weight: 600; }
  .edu { margin-bottom: 5px; }
  .edu p { margin: 1px 0 0; color: #333; }
</style></head><body>
<h1>${esc(p.name)}</h1>
<div class="title">${esc(p.title)}</div>
<div class="contact">
  <span>${esc(p.email)}</span><span>${esc(p.phone)}</span><span>${esc(p.location)}</span>
  <span>${esc(p.linkedin.replace(/^www\./, ''))}</span><span>${esc(p.github.replace(/^https?:\/\//, ''))}</span><span>${esc(p.website)}</span>
</div>

<h2>Summary</h2>
<p class="summary">${esc(p.summary)}</p>

<h2>Technical skills</h2>
<div class="skills">
${skillGroups.map((g) => `<b>${esc(g.name)}</b><span>${g.items.map(esc).join(', ')}</span>`).join('\n')}
</div>

<h2>Experience</h2>
${experience.map((j) => `
<div class="row"><span><strong>${esc(j.position)}</strong> <span class="org">· ${esc(j.company)}</span></span><span class="date">${esc(j.startDate)} – ${esc(j.endDate)}</span></div>
<ul>${bullets(j.description)}</ul>`).join('')}

<h2>Education</h2>
${education.map((e) => `
<div class="edu"><div class="row"><span><strong>${esc(e.institution)}</strong> <span class="org">· ${esc(e.degree)}</span></span><span class="date">${esc(e.startDate)} – ${esc(e.endDate)}</span></div><p>${esc(e.description)}</p></div>`).join('')}

<h2>Languages</h2>
<p style="margin:0 0 0">${languages.map((l) => `${esc(l.language)} (${esc(l.proficiency)})`).join(' · ')}</p>
</body></html>`;

mkdirSync('.resume-build', { recursive: true });
const htmlPath = resolve('.resume-build/resume.html');
writeFileSync(htmlPath, html);

const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = resolve('public/Jung Gu Resume.pdf');
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${out}`, `file://${htmlPath}`], { stdio: 'ignore' });
console.log(`Wrote ${out}`);
