import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import MarkdownContent from '@/components/MarkdownContent';
import TableOfContents from '@/components/TableOfContents';
import { getSortedPostsData, getPostData, getAllPostIds } from '../../../../utils/markdown';

interface BlogPostProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths.map((path) => ({ id: path.params.id }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = await getPostData(params.id);
  if (!post) return { title: 'Not found' };
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, images: [`/images/${post.id}.png`] },
  };
}

async function getRelatedPosts(currentPostId: string, category: string) {
  const all = await getSortedPostsData();
  return all.filter((p) => p.id !== currentPostId && p.category === category).slice(0, 3);
}

/**
 * One post, laid out as a manifest entry: the field strip at the top says what
 * kind of note this is and when it was logged, the body is the note itself,
 * and the contents panel rides alongside on wide screens. No author box; the
 * whole site is the author box.
 */
export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPostData(params.id);
  if (!post) notFound();

  const related = await getRelatedPosts(post.id, post.category);

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        All posts
      </Link>

      <header className="mt-6">
        <dl className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex gap-2"><dt className="sr-only">Category</dt><dd className="text-primary">{post.category}{post.kicker && <span className="text-muted-foreground"> · {post.kicker}</span>}</dd></div>
          <div className="flex gap-2"><dt>Published</dt><dd className="text-foreground/80">{post.date}</dd></div>
          <div className="flex gap-2"><dt>Read</dt><dd className="text-foreground/80">{post.readTime}</dd></div>
        </dl>
        <h1 className="display mt-4 max-w-4xl text-balance text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{post.description}</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0">
          <div className="lg:hidden">
            <TableOfContents headings={post.headings} />
          </div>

          <article className="mt-6 max-w-[70ch]">
            <MarkdownContent content={post.content} />
          </article>

          <footer className="mt-14 max-w-[70ch] border-t border-border pt-6">
            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="chip">{tag}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Questions about this one? The fastest route is email.
              </p>
              <a
                href={`mailto:justinguuu@gmail.com?subject=${encodeURIComponent(`About your post: ${post.title}`)}`}
                className="btn-ghost"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email Justin
              </a>
            </div>
          </footer>

          {related.length > 0 && (
            <section className="mt-12 max-w-[70ch]" aria-labelledby="related-heading">
              <p className="eyebrow">Also in {post.category}</p>
              <h2 id="related-heading" className="display mt-2 text-xl font-bold text-foreground">More from this category</h2>
              <ul className="mt-4 divide-y divide-border">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link href={`/blog/${p.id}`} className="group flex gap-4 py-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{p.title}</h3>
                        <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">{p.date} · {p.readTime}</p>
                      </div>
                      <ArrowUpRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>
      </div>
    </div>
  );
}
