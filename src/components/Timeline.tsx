'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import resumeData from '@/data/resumeData.json';

/**
 * Work history, presented as a shipment tracking record.
 *
 * Justin's day job is logistics software, so the metaphor is literal: each
 * role is a scan event with a timestamp, the current role is "in transit",
 * and education is the origin scan.
 *
 * Every word here comes from resumeData.json — the same file that drives the
 * /resume page and the PDF — so the site can never drift from the resume.
 */

type Kind = 'experience' | 'education';

interface ScanEvent {
  kind: Kind;
  title: string;
  organization: string;
  start: string;
  end: string;
  notes: string[];
  tags: string[];
}

const toNotes = (description: string) =>
  description
    .split('\n')
    .map((l) => l.replace(/^•\s*/, '').trim())
    .filter(Boolean);

const events: ScanEvent[] = [
  ...resumeData.experience.map((j) => ({
    kind: 'experience' as const,
    title: j.position,
    organization: j.company,
    start: j.startDate,
    end: j.endDate,
    notes: toNotes(j.description),
    tags: j.tags ?? [],
  })),
  ...resumeData.education.map((e) => ({
    kind: 'education' as const,
    title: e.degree,
    organization: e.institution,
    start: e.startDate,
    end: e.endDate,
    notes: toNotes(e.description ?? ''),
    tags: e.tags ?? [],
  })),
];

const ScanRow: React.FC<{ event: ScanEvent; index: number }> = ({ event, index }) => {
  const reduce = useReducedMotion();
  const live = event.end === 'Present';

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3), ease: [0.2, 0.7, 0.2, 1] }}
      className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 sm:grid-cols-[7.5rem_auto_minmax(0,1fr)] sm:gap-x-5"
    >
      {/* Timestamp column (desktop) */}
      <div className="hidden pt-0.5 font-mono text-xs leading-5 text-muted-foreground sm:block">
        <div className={cn(live && 'text-primary')}>{live ? 'In transit' : event.end}</div>
        <div className="opacity-70">{event.start}</div>
      </div>

      {/* Rail + dot */}
      <div className="relative flex justify-center">
        <div aria-hidden className="absolute inset-y-0 w-px bg-track" />
        <span
          className={cn(
            'relative mt-1.5 block h-3 w-3 rounded-full ring-4 ring-card',
            live ? 'scan-live bg-primary' : event.kind === 'education' ? 'border-2 border-track bg-card' : 'bg-foreground/70',
          )}
        />
      </div>

      {/* Event body */}
      <div className="min-w-0 pb-9">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {event.title}
          </h3>
          <span className="text-sm text-muted-foreground">{event.organization}</span>
          {live && (
            <span className="chip border-primary/40 text-primary">current</span>
          )}
        </div>
        <div className="mt-0.5 font-mono text-xs text-muted-foreground sm:hidden">
          {event.start} to {event.end}
        </div>

        {event.notes.length > 0 && (
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
            {event.notes.map((note, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        )}

        {event.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
};

const Timeline: React.FC = () => {
  const experience = events.filter((e) => e.kind === 'experience');
  const education = events.filter((e) => e.kind === 'education');

  return (
    <section id="history" className="panel scroll-mt-20 p-6 sm:p-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Tracking history</p>
          <h2 className="display mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            Where I&apos;ve shipped from
          </h2>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {events.length} scan events · newest first
        </p>
      </header>

      <ol className="sm:ml-0">{experience.map((e, i) => <ScanRow key={e.organization} event={e} index={i} />)}</ol>

      <div className="mb-6 mt-1 flex items-center gap-3">
        <span className="eyebrow">Origin</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <ol>{education.map((e, i) => <ScanRow key={e.organization} event={e} index={i + experience.length} />)}</ol>
    </section>
  );
};

export default Timeline;
