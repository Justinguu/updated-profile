import React from 'react';
import { Code2, Server, Database, Workflow } from 'lucide-react';

/**
 * Competencies, grouped by what a hiring manager actually asks about.
 * No self-graded "8/10" bars — a list that says what he can do is more
 * credible than a number he assigned himself.
 */
interface Group {
  name: string;
  icon: React.ReactNode;
  items: string[];
}

const groups: Group[] = [
  {
    name: 'Backend & automation',
    icon: <Server className="h-4 w-4" />,
    items: ['Python', 'C# / .NET', 'REST API design', 'Scheduled jobs & pipelines', 'Unit testing'],
  },
  {
    name: 'Cloud & DevOps',
    icon: <Workflow className="h-4 w-4" />,
    items: ['Azure Container Apps', 'Azure API Management', 'Docker', 'CI/CD', 'VM → container migrations'],
  },
  {
    name: 'Data',
    icon: <Database className="h-4 w-4" />,
    items: ['PostgreSQL', 'SQL', 'MongoDB', 'Pandas', 'Data accuracy & reconciliation'],
  },
  {
    name: 'Frontend',
    icon: <Code2 className="h-4 w-4" />,
    items: ['React / Next.js', 'TypeScript', 'Responsive UI', 'Figma hand-off'],
  },
];

const SkillsOverview: React.FC = () => {
  return (
    <section className="panel h-full p-6">
      <p className="eyebrow">Competencies</p>
      <h2 className="display mt-2 text-xl font-bold text-foreground">What I do well</h2>

      <dl className="mt-5 divide-y divide-border">
        {groups.map((g) => (
          <div key={g.name} className="py-4 first:pt-0 last:pb-0">
            <dt className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="text-primary">{g.icon}</span>
              {g.name}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {g.items.join(' · ')}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default SkillsOverview;
