import React from 'react';

/**
 * Spoken languages. Two rows, no bars — "native" and "fluent" say more than
 * a percentage could.
 */
const languages = [
  { name: 'English', native: 'English', level: 'Native' },
  { name: 'Korean', native: '한국어', level: 'Fluent · speaking & listening; professional reading & writing' },
];

const Languages: React.FC = () => (
  <section className="panel h-full p-6">
    <p className="eyebrow">Languages</p>
    <h2 className="display mt-2 text-xl font-bold text-foreground">Spoken</h2>
    <dl className="mt-5 divide-y divide-border">
      {languages.map((l) => (
        <div key={l.name} className="py-4 first:pt-0 last:pb-0">
          <dt className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-foreground">{l.name}</span>
            <span className="font-mono text-xs text-muted-foreground">{l.native}</span>
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">{l.level}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default Languages;
