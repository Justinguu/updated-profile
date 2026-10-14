import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import resumeData from '@/data/resumeData.json';

/**
 * Competencies, the short version. Four groups, a handful of chips each,
 * and a pointer to the full matrix on the resume. No self-graded bars.
 */
const SHOW_GROUPS = ['C# / .NET', 'Python', 'Azure', 'AI & Integrations'];
const PER_GROUP = 5;

const groups = SHOW_GROUPS
  .map((name) => resumeData.skillGroups.find((g) => g.name === name))
  .filter((g): g is { name: string; items: string[] } => !!g)
  .map((g) => ({ name: g.name, items: g.items.slice(0, PER_GROUP).map((i) => i.replace(/\s*\(.*?\)\s*/g, '')) }));

const SkillsOverview: React.FC = () => (
  <section className="panel h-full p-6" aria-labelledby="skills-heading">
    <p className="eyebrow">Competencies</p>
    <h2 id="skills-heading" className="display mt-2 text-xl font-bold text-foreground">What I do well</h2>

    <dl className="mt-5 space-y-4">
      {groups.map((g) => (
        <div key={g.name}>
          <dt className="text-sm font-semibold text-foreground">{g.name}</dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <span key={item} className="chip">{item}</span>
            ))}
          </dd>
        </div>
      ))}
    </dl>

    <Link href="/resume#skills" className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
      Full matrix on the resume
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
    </Link>
  </section>
);

export default SkillsOverview;
