import React from 'react';
import Image from 'next/image';
import heroImage from '@/assets/Justin-optimized.png';
import { Github, Linkedin, Download, ArrowDown } from 'lucide-react';
import resumeData from '@/data/resumeData.json';

/**
 * Hero as the waybill header. The field strip at the top is the record's
 * header fields (origin, status, service); the name is the consignee set
 * wide in Archivo; the ledger below reframes the resume's numbers as fields
 * on the same record. Name and thesis paint immediately; only the ledger and
 * the actions rise in, so the first frame is never empty.
 */
const { personalInfo } = resumeData;
const current = resumeData.experience.find((j) => j.endDate === 'Present');

const fields: [string, string][] = [
  ['Origin', personalInfo.location],
  ['Status', current ? `In transit · ${current.company}` : 'Available'],
  ['Service', 'Full-stack · C# / .NET and Python'],
];

const ledger: [string, string][] = [
  ['80%', 'lower hosting cost'],
  ['40%', 'less manual work'],
  ['0', 'downtime on release'],
  ['1,844', 'automated tests'],
];

const AboutMe: React.FC = () => {
  return (
    <section className="panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
      {/* Faint rail in the background ties the hero to the tracking timeline below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-signal/40 to-transparent sm:left-8 lg:left-10 lg:block"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div className="flex min-w-0 flex-col lg:pl-8">
          <dl className="flex flex-col gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6">
            {fields.map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt>{k}</dt>
                <dd className={k === 'Status' ? 'text-primary' : 'text-foreground/80'}>{v}</dd>
              </div>
            ))}
          </dl>

          <h1 className="display mt-5 text-[2.75rem] font-extrabold leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
            Jung Gu<span className="text-primary">.</span>
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">goes by Justin</p>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
            I build and run the operations platform behind a medical-device
            logistics company, in C# / .NET and Python, from the PostgreSQL
            schema to the Azure pipelines that deploy it.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Three years into my career, I co-develop a .NET 10 Blazor app with
            the CTO at GlobalMed Logistix. It replaced a legacy Django system,
            and I take its features from first design to production and keep
            them running: LLM-powered analytics on the Claude API, scheduled
            jobs on Azure Container Apps, and zero-downtime releases through
            GitHub Actions and staging slot swaps.
          </p>


          <dl className="rise rise-1 mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-5 sm:grid-cols-4">
            {ledger.map(([n, label]) => (
              <div key={label}>
                <dd className="display text-xl font-bold text-foreground">{n}</dd>
                <dt className="mt-0.5 font-mono text-[11px] text-muted-foreground">{label}</dt>
              </div>
            ))}
          </dl>

          <div className="rise rise-2 mt-7 flex flex-wrap items-center gap-3">
            <a href="/Jung_Gu_Resume.pdf" download="Jung_Gu_Resume.pdf" className="btn-primary">
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Github className="h-4 w-4" aria-hidden />
              GitHub
            </a>
            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <a
              href="#history"
              className="hidden items-center gap-1.5 px-1 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              See the record
              <ArrowDown className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>

        {/* Portrait: a rounded-rect, not a circle. It reads as the ID photo on a badge. */}
        <div className="order-first lg:order-none">
          <div className="relative mx-auto w-40 sm:w-48 lg:w-64">
            <Image
              src={heroImage}
              alt="Portrait of Jung (Justin) Gu"
              priority
              sizes="(min-width: 1024px) 256px, 192px"
              className="aspect-[0.9] w-full rounded-2xl object-cover object-top ring-1 ring-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
