import Link from 'next/link';
import { getSortedPostsData, PostData } from '../../../utils/markdown';

export const metadata = {
  title: 'Blog',
  description: 'Notes from building an operations platform: Azure, .NET, Python, and the decisions behind the work.',
};

/**
 * The manifest: every note logged, newest first. Each entry carries the same
 * mono field strip the post page opens with, so the index and the post read
 * as one record.
 */
export default async function BlogPage() {
  const posts = await getSortedPostsData();

  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-10">
        <p className="eyebrow">Manifest · {posts.length} entries</p>
        <h1 className="display mt-2 text-4xl font-extrabold text-foreground sm:text-5xl">Notes from the build</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          What I learned shipping an operations platform on Azure, in .NET and Python. Written after the fact, from the code.
        </p>
      </header>

      <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post: PostData) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.id}`}
              className="group panel flex h-full flex-col overflow-hidden transition-colors hover:border-primary/50"
            >
              {/* The strip is the cover's header fields, not a second headline */}
              <div className="relative flex items-center gap-4 border-b border-border bg-foreground px-6 py-4 text-background">
                <span aria-hidden className="h-6 w-px bg-signal" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-background/70">
                  <span className="text-signal">{post.category}</span>
                  {post.kicker && <><span aria-hidden> · </span>{post.kicker}</>}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                  {post.date}
                  <span aria-hidden> · </span>
                  {post.readTime}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
