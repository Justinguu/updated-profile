import React from 'react';

/**
 * The one panel on the home page that the resume does not say outright: how
 * the work gets done. Each line is drawn from a resume fact, phrased as a
 * working habit rather than an achievement.
 */
const habits = [
  {
    title: 'One owner, end to end',
    body: 'Schema, migration, UI, pipeline, and the runbook that retires the old path. I ship the whole feature, not a layer of it.',
  },
  {
    title: 'Built next to the people who use it',
    body: 'Daily conversations with IT, customer support, operations and division managers decide what gets built and in what order.',
  },
  {
    title: 'Rehearsed before production',
    body: 'Every schema change runs against a staging copy first. 176 migrations so far, each one tested that way.',
  },
  {
    title: 'Test runs cannot reach customers',
    body: 'Anything that emails or texts people ships behind a flag that routes test runs to one mailbox.',
  },
];

const HowIWork: React.FC = () => (
  <section className="panel p-6" aria-labelledby="how-heading">
    <p className="eyebrow">Handling instructions</p>
    <h2 id="how-heading" className="display mt-2 text-xl font-bold text-foreground">How I work</h2>
    <ul className="mt-5 divide-y divide-border">
      {habits.map((h) => (
        <li key={h.title} className="py-4 first:pt-0 last:pb-0">
          <p className="text-sm font-semibold text-foreground">{h.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default HowIWork;
