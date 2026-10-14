import React from 'react';

/**
 * The one panel on the home page that the resume does not say outright: how
 * the work gets done. Each line is drawn from a resume fact, phrased as a
 * working habit rather than an achievement, and none of them carries a count.
 */
const habits = [
  {
    title: 'Features, end to end',
    body: 'I take a feature from the schema and migration through the UI, the pipeline, and the rollout. After it ships I keep coming back to it, updating it as the work changes so it stays useful.',
  },
  {
    title: 'Built with the people who use it',
    body: 'I start at planning with the people who will use it. IT, customer support, operations managers, and division managers stay in the loop as it takes shape, and we refine it together until it fits how the work is actually done.',
  },
  {
    title: 'Tested before it ships',
    body: 'Every feature is tested thoroughly, and schema changes run against a staging copy before they touch production.',
  },
  {
    title: 'Written down for the next person',
    body: 'Cutovers come with a runbook, and scheduled jobs come with a control panel, so the team can run what I build without me in the loop.',
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
