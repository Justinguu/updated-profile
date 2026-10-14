'use client';

import React from 'react';
import Image from 'next/image';
import heroImage from '@/assets/Justin-optimized.png';
import { Github, Linkedin, Download, ArrowDown } from 'lucide-react';
import resumeData from '@/data/resumeData.json';

/**
 * Hero. The thesis is the headline: what Justin builds, in one line.
 * Everything else on this panel is quiet — the name set wide in Archivo
 * carries the personality.
 *
 * The positioning, the employer name, and every number on this panel are
 * taken from the resume so a recruiter reading both sees one story.
 */
const { personalInfo } = resumeData;

/** Proof line: numbers a recruiter can find again on the resume PDF. */
const proof: [string, string][] = [
  ['80%', 'lower hosting cost'],
  ['40%', 'less manual work'],
  ['0', 'downtime deploys'],
  ['1,844', 'automated tests'],
];

const AboutMe: React.FC = () => {
  return (
    <section className="panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
      {/* Faint rail in the background ties the hero to the tracking timeline below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-track to-transparent sm:left-8 lg:left-10 lg:block"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div className="flex min-w-0 flex-col lg:pl-8">
          <p className="eyebrow rise rise-1">
            {personalInfo.location} &nbsp;·&nbsp; Full-stack software engineer
          </p>

          <h1 className="display rise rise-2 mt-5 text-[2.75rem] font-extrabold leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
            Jung Gu<span className="text-primary">.</span>
          </h1>
          <p className="rise rise-2 mt-2 font-mono text-sm text-muted-foreground">
            goes by Justin
          </p>

          <p className="rise rise-3 mt-7 max-w-xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
            I build the operations platform behind a medical-device logistics
            company in C# / .NET and Python, from the PostgreSQL schema to the
            Azure pipelines that deploy it.
          </p>
          <p className="rise rise-3 mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            At GlobalMed Logistix I own features end to end alongside the CTO:
            a .NET 10 Blazor app that replaced a legacy Django system, LLM-powered
            analytics on the Claude API, scheduled jobs on Azure Container Apps,
            and zero-downtime releases through GitHub Actions and staging slot
            swaps.
          </p>

          {/* Proof line: the numbers a recruiter looks for, set as one mono ledger row */}
          <ul className="rise rise-3 mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
            {proof.map(([n, label]) => (
              <li key={label} className="flex items-baseline gap-1.5">
                <span className="display text-base font-bold text-foreground">{n}</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/Jung_Gu_Resume.pdf"
              download="Jung_Gu_Resume.pdf"
              className="btn-primary"
            >
              <Download className="h-4 w-4" />
              Download resume
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="GitHub profile"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="#history"
              className="ml-auto hidden items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Work history
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Portrait: a rounded-rect, not a circle — reads as an ID photo on a badge */}
        <div className="rise rise-2 order-first lg:order-none">
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
