import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import { slugify } from '../../utils/markdown';

interface MarkdownContentProps {
  content: string;
}

/**
 * Post body. Every element is styled on the site's tokens so a post reads as
 * the same object as the home page. Headings get their ids here, on the
 * server, so the table of contents and the URL hash work before any script.
 */
const textOf = (children: React.ReactNode): string =>
  React.Children.toArray(children)
    .map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : textOf((c as React.ReactElement)?.props?.children)))
    .join('');

const components: Components = {
  code({ node, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    if (!match) {
      return (
        <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground" {...props}>
          {children}
        </code>
      );
    }
    return (
      <div className="my-5 overflow-hidden rounded-lg border border-border">
        <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{match[1]}</span>
        </div>
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            customStyle={{ margin: 0, borderRadius: 0, background: 'hsl(222 48% 8%)', fontSize: '13px', lineHeight: 1.6, padding: '1rem', fontFamily: 'var(--font-mono), ui-monospace, monospace' }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  },
  pre: ({ node, children }) => <>{children}</>,
  h2: ({ node, children, ...props }) => (
    <h2 id={slugify(textOf(children))} className="display mt-12 scroll-mt-20 text-2xl font-bold text-foreground sm:text-3xl" {...props}>
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }) => (
    <h3 id={slugify(textOf(children))} className="mt-8 scroll-mt-20 text-lg font-semibold text-foreground" {...props}>
      {children}
    </h3>
  ),
  p: ({ node, ...props }) => <p className="my-5 text-base leading-relaxed text-foreground/85" {...props} />,
  ul: ({ node, ...props }) => <ul className="my-5 space-y-2 pl-5 text-foreground/85 marker:text-primary" {...props} />,
  ol: ({ node, ...props }) => <ol className="my-5 list-decimal space-y-2 pl-5 text-foreground/85 marker:font-mono marker:text-muted-foreground" {...props} />,
  li: ({ node, ...props }) => <li className="pl-1 leading-relaxed [&>p]:my-0" {...props} />,
  a: ({ node, ...props }) => (
    <a className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary" {...props} />
  ),
  strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="my-6 border-l border-border pl-5 text-muted-foreground [&>p]:my-2" {...props} />
  ),
  hr: ({ node, ...props }) => <hr className="my-10 border-border" {...props} />,
  table: ({ node, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-sm" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-secondary" {...props} />,
  tbody: ({ node, ...props }) => <tbody className="divide-y divide-border" {...props} />,
  th: ({ node, ...props }) => (
    <th className="px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground" {...props} />
  ),
  td: ({ node, ...props }) => <td className="px-4 py-2.5 align-top text-foreground/85" {...props} />,
  img: ({ node, alt, src, ...props }) =>
    src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt ?? ''} loading="lazy" className="my-6 w-full rounded-lg border border-border" {...props} />
    ) : null,
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => (
  <div className="[&>ul]:list-disc">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownContent;
