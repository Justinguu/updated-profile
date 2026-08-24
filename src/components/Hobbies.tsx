import React from 'react';

/**
 * Off the clock. A short, plainly set list — the emoji carried the old
 * version; here the words do.
 */
const hobbies = [
  'Running',
  'Weightlifting',
  'Hiking',
  'Snowboarding',
  'Wakeboarding',
  'Fishing',
  'Reading',
];

const Hobbies: React.FC = () => (
  <section className="panel h-full p-6">
    <p className="eyebrow">Off the clock</p>
    <h2 className="display mt-2 text-xl font-bold text-foreground">Outside of work</h2>
    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
      Mostly outdoors. Georgia trails when it&apos;s warm, a snowboard when it isn&apos;t,
      and a lake somewhere in between.
    </p>
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {hobbies.map((h) => (
        <li key={h} className="chip">
          {h}
        </li>
      ))}
    </ul>
  </section>
);

export default Hobbies;
