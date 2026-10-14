import React from 'react';
import { Code2, Cloud, Database, Workflow, Sparkles, Braces } from 'lucide-react';
import resumeData from '@/data/resumeData.json';

/**
 * Competencies, grouped exactly the way the resume groups them.
 * No self-graded "8/10" bars — a list that says what he can do is more
 * credible than a number he assigned himself.
 *
 * The groups and items come from resumeData.json; only the icon is chosen
 * here, keyed by group name, so adding a group to the resume adds it here.
 */
const iconFor: Record<string, React.ReactNode> = {
  'C# / .NET': <Braces className="h-4 w-4" />,
  Python: <Code2 className="h-4 w-4" />,
  'Web & Data': <Database className="h-4 w-4" />,
  Azure: <Cloud className="h-4 w-4" />,
  DevOps: <Workflow className="h-4 w-4" />,
  'AI & Integrations': <Sparkles className="h-4 w-4" />,
};

const SkillsOverview: React.FC = () => {
  return (
    <section className="panel h-full p-6">
      <p className="eyebrow">Competencies</p>
      <h2 className="display mt-2 text-xl font-bold text-foreground">What I do well</h2>

      <dl className="mt-5 divide-y divide-border">
        {resumeData.skillGroups.map((g) => (
          <div key={g.name} className="py-4 first:pt-0 last:pb-0">
            <dt className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="text-primary">{iconFor[g.name] ?? <Code2 className="h-4 w-4" />}</span>
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
