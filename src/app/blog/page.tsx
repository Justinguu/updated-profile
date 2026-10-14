import Link from 'next/link';
import Image from 'next/image';
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
              <div className="relative aspect-[1200/630] w-full border-b border-border">
                <Image
                  src={`/images/${post.id}.png`}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="text-primary">{post.category}</span>
                  <span aria-hidden> · </span>
                  {post.date}
                  <span aria-hidden> · </span>
                  {post.readTime}
                </p>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
