import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import resumeData from '@/data/resumeData.json';

/**
 * Work history, presented as a shipment tracking record.
 *
 * Each role is a scan event with a timestamp, the current role is "in
 * transit", and education is the origin scan. Every word comes from
 * resumeData.json, the same file that drives /resume and the PDF.
 *
 * The home page's job is to make someone open the resume, not to be it: a
 * role shows its first three notes and points at the full record. Rows are
 * plain markup with no entrance animation, so the record is complete on
 * first paint, in print, and in link previews.
 */

type Kind = 'experience' | 'education';

interface ScanEvent {
  kind: Kind;
  title: string;
  organization: string;
  start: string;
  end: string;
  notes: string[];
  more: number;
  tags: string[];
}

const NOTE_CAP = 3;
const TAG_CAP = 5;

const toNotes = (description: string) =>
  description
    .split('\n')
    .map((l) => l.replace(/^•\s*/, '').trim())
    .filter(Boolean);

const events: ScanEvent[] = [
  ...resumeData.experience.map((j) => {
    const notes = toNotes(j.description);
    return {
      kind: 'experience' as const,
      title: j.position,
      organization: j.company,
      start: j.startDate,
      end: j.endDate,
      notes: notes.slice(0, NOTE_CAP),
      more: Math.max(0, notes.length - NOTE_CAP),
      tags: (j.tags ?? []).slice(0, TAG_CAP),
    };
  }),
  ...resumeData.education.map((e) => ({
    kind: 'education' as const,
    title: e.degree,
    organization: e.institution,
    start: e.startDate,
    end: e.endDate,
    notes: toNotes(e.description ?? ''),
    more: 0,
    tags: (e.tags ?? []).slice(0, TAG_CAP),
  })),
];

const ScanRow: React.FC<{ event: ScanEvent }> = ({ event }) => {
  const live = event.end === 'Present';

  return (
    <li className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 sm:grid-cols-[7.5rem_auto_minmax(0,1fr)] sm:gap-x-5">
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
          <h3 className="text-base font-semibold leading-snug text-foreground">{event.title}</h3>
          <span className="text-sm text-muted-foreground">{event.organization}</span>
        </div>
        <div className={cn('mt-0.5 font-mono text-xs sm:hidden', live ? 'text-primary' : 'text-muted-foreground')}>
          {live ? `In transit · since ${event.start}` : `${event.start} to ${event.end}`}
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

        {event.more > 0 && (
          <Link
            href="/resume"
            className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {event.more} more on the full record
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}

        {event.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools">
            {event.tags.map((tag) => (
              <li key={tag} className="chip">{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

const Timeline: React.FC = () => {
  const experience = events.filter((e) => e.kind === 'experience');
  const education = events.filter((e) => e.kind === 'education');

  return (
    <section id="history" className="panel scroll-mt-20 p-6 sm:p-8" aria-labelledby="history-heading">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Tracking history</p>
          <h2 id="history-heading" className="display mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            Where I&apos;ve shipped from
          </h2>
        </div>
        <p className="font-mono text-xs text-muted-foreground">newest first</p>
      </header>

      <ol>{experience.map((e) => <ScanRow key={`${e.organization}-${e.start}`} event={e} />)}</ol>

      <div className="mb-6 mt-1 flex items-center gap-3">
        <span className="eyebrow">Origin</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <ol>{education.map((e) => <ScanRow key={`${e.organization}-${e.start}`} event={e} />)}</ol>
    </section>
  );
};

export default Timeline;
