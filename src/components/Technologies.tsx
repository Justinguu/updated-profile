import React from 'react';
import { skills } from '../data/skills';
import * as Si from 'react-icons/si';
import { Cloud } from 'lucide-react';

/**
 * Icon grid for the stack. Brand colours stay on the icons, which gives the
 * panel its only colour beyond the accent — everything else is type.
 * Azure has no icon in simple-icons any more, so it gets a plain cloud mark.
 */
const Technologies: React.FC = () => {
  const icons = Si as unknown as Record<string, React.ElementType>;

  const items = [
    { name: 'Azure', color: '#0078D4', Icon: Cloud },
    ...skills.map((s) => ({ name: s.name, color: s.color, Icon: icons[s.icon] })),
  ].filter((s) => s.Icon);

  return (
    <section className="panel p-6">
      <p className="eyebrow">Stack</p>
      <h2 className="display mt-2 text-xl font-bold text-foreground">Tools I reach for</h2>

      <ul className="mt-5 grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(({ name, color, Icon }) => (
          <li
            key={name}
            className="group flex flex-col items-center gap-2 rounded-lg border border-transparent px-1 py-3 transition-colors hover:border-border hover:bg-secondary/60"
          >
            <Icon
              className="h-6 w-6 transition-transform group-hover:-translate-y-0.5"
              style={{ color }}
              aria-hidden
            />
            <span className="font-mono text-[10.5px] leading-none text-muted-foreground group-hover:text-foreground">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Technologies;
