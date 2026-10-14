import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';
import resumeData from '@/data/resumeData.json';

/**
 * The full record. Same JSON as the PDF, same sections in the same order,
 * and the same eyebrow-plus-display pairing as every other page, so the
 * page a recruiter forwards looks like the site they came from.
 */
const PDF_PATH = '/Jung_Gu_Resume.pdf';

const bullets = (description: string) =>
  description
    .split('\n')
    .map((l) => l.replace(/^•\s*/, '').trim())
    .filter(Boolean);

const Section: React.FC<{ id: string; eyebrow: string; title: string; children: React.ReactNode }> = ({ id, eyebrow, title, children }) => (
  <section aria-labelledby={id} className="border-t border-border pt-6">
    <p className="eyebrow">{eyebrow}</p>
    <h2 id={id} className="display mt-2 text-xl font-bold text-foreground">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

export default function ResumePage() {
  const { personalInfo, experience, education, skillGroups, languages } = resumeData;

  const contact = [
    { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: <Mail className="h-4 w-4" aria-hidden /> },
    { label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\D/g, '')}`, icon: <Phone className="h-4 w-4" aria-hidden /> },
    { label: 'Address', value: personalInfo.location, icon: <MapPin className="h-4 w-4" aria-hidden /> },
    { label: 'GitHub', value: personalInfo.github.replace(/^https?:\/\//, ''), href: personalInfo.github, external: true, icon: <Github className="h-4 w-4" aria-hidden /> },
    { label: 'LinkedIn', value: personalInfo.linkedin, href: `https://${personalInfo.linkedin}`, external: true, icon: <Linkedin className="h-4 w-4" aria-hidden /> },
    { label: 'Site', value: personalInfo.website, href: `https://${personalInfo.website}`, external: true, icon: <Globe className="h-4 w-4" aria-hidden /> },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back to home
        </Link>
        <a href={PDF_PATH} download="Jung_Gu_Resume.pdf" className="btn-primary">
          <Download className="h-4 w-4" aria-hidden />
          Download resume
        </a>
      </div>

      <article className="panel p-6 sm:p-10">
        <header>
          <p className="eyebrow">Full record</p>
          <h1 className="display mt-2 text-4xl font-extrabold text-foreground sm:text-5xl">
            {personalInfo.name}<span className="text-primary">.</span>
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{personalInfo.title}</p>

          <ul className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {contact.map((c) => {
              const inner = (
                <>
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="text-primary">{c.icon}</span>
                    {c.label}
                  </span>
                  <span className="text-sm text-foreground">{c.value}</span>
                </>
              );
              return (
                <li key={c.label} className="border-b border-border py-2.5 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                  {c.href ? (
                    <a href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined} className="flex items-center justify-between gap-3 hover:text-primary">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-3">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </header>

        <div className="mt-8 space-y-8">
          <Section id="summary" eyebrow="Summary" title="In brief">
            <p className="text-base leading-relaxed text-foreground/85">{personalInfo.summary}</p>
          </Section>

          <Section id="skills" eyebrow="Technical skills" title="What I work with">
            <dl className="grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-[10rem_1fr] sm:gap-x-4">
              {skillGroups.map((g) => (
                <React.Fragment key={g.name}>
                  <dt className="font-semibold text-foreground">{g.name}</dt>
                  <dd className="mb-2 text-foreground/85 sm:mb-0">{g.items.join(', ')}</dd>
                </React.Fragment>
              ))}
            </dl>
          </Section>

          <Section id="experience" eyebrow="Work experience" title="Shipping record">
            <ol className="space-y-7">
              {experience.map((job) => (
                <li key={`${job.company}-${job.startDate}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {job.position} <span className="font-normal text-muted-foreground">· {job.company}</span>
                    </h3>
                    <span className={`whitespace-nowrap font-mono text-xs ${job.endDate === 'Present' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {job.endDate === 'Present' ? `In transit · since ${job.startDate}` : `${job.startDate} – ${job.endDate}`}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-foreground/85">
                    {bullets(job.description).map((b, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="education" eyebrow="Education" title="Origin">
            <ol className="space-y-4">
              {education.map((edu) => (
                <li key={edu.institution}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {edu.institution} <span className="font-normal text-muted-foreground">· {edu.degree}</span>
                    </h3>
                    <span className="whitespace-nowrap font-mono text-xs text-muted-foreground">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  {edu.description && <p className="mt-1 text-sm text-foreground/85">{edu.description}</p>}
                </li>
              ))}
            </ol>
          </Section>

          <Section id="languages" eyebrow="Languages" title="Spoken">
            <p className="text-sm text-foreground/85">{languages.map((l) => `${l.language} (${l.proficiency})`).join(' · ')}</p>
          </Section>
        </div>
      </article>
    </div>
  );
}
