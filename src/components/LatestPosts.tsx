import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSortedPostsData, PostData } from '../../utils/markdown';

const LatestPosts: React.FC = async () => {
  const allPosts = await getSortedPostsData();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <section className="panel flex h-full flex-col p-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Writing</p>
          <h2 className="display mt-2 text-xl font-bold text-foreground">Latest posts</h2>
        </div>
        <Link
          href="/blog"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          All posts →
        </Link>
      </div>

      <ul className="mt-5 divide-y divide-border">
        {latestPosts.map((post: PostData) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`} className="group flex gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                  {post.date} · {post.readTime}
                </p>
              </div>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LatestPosts;
