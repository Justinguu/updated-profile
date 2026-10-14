'use client';

import React, { useEffect, useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Heading } from '../../utils/markdown';

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

/**
 * Contents list for a post. The headings arrive from the server, so the list
 * renders without script and every link is a plain hash link: the URL updates,
 * the back button works, and focus moves to the heading. Script only adds the
 * "where am I" highlight and the collapse on small screens.
 */
export default function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [open, setOpen] = useState(true);
  const listId = useId();

  useEffect(() => {
    if (headings.length === 0) return;
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveId(entry.target.id);
      },
      { rootMargin: '0px 0px -75% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Contents" className={cn('panel p-5', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={listId}
        className="flex w-full items-center justify-between gap-3 text-left lg:pointer-events-none"
      >
        <span className="eyebrow">Contents</span>
        <ChevronDown
          aria-hidden
          className={cn('h-4 w-4 text-muted-foreground transition-transform lg:hidden', !open && '-rotate-90')}
        />
      </button>

      <ol id={listId} className={cn('mt-3 space-y-1', !open && 'hidden lg:block')}>
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id} className={cn(h.level === 3 && 'pl-3')}>
              <a
                href={`#${h.id}`}
                aria-current={active ? 'location' : undefined}
                className={cn(
                  'block border-l py-1 pl-3 text-sm leading-snug transition-colors',
                  active
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-track hover:text-foreground',
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
