import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * 404 as a failed scan: the tracking number is not in the manifest. Same
 * panel, same type, same single accent as every other page.
 */
export default function NotFound() {
  return (
    <section className="panel mx-auto max-w-xl p-8 sm:p-10">
      <p className="eyebrow">Scan failed · 404</p>
      <h1 className="display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
        No record for this address<span className="text-primary">.</span>
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        The page you asked for isn&apos;t in the manifest. It may have moved, or the link may have a typo.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <Link href="/blog" className="btn-ghost">All posts</Link>
        <Link href="/resume" className="btn-ghost">Resume</Link>
      </div>
    </section>
  );
}
