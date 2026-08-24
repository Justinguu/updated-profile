import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, FileText, ArrowUpRight } from 'lucide-react';

interface Contact {
  label: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
  external?: boolean;
}

const contacts: Contact[] = [
  { label: 'Email', value: 'justinguuu@gmail.com', icon: <Mail className="h-4 w-4" />, href: 'mailto:justinguuu@gmail.com' },
  { label: 'Phone', value: '(678) 923-2057', icon: <Phone className="h-4 w-4" />, href: 'tel:6789232057' },
  { label: 'Location', value: 'Duluth, Georgia', icon: <MapPin className="h-4 w-4" /> },
  { label: 'LinkedIn', value: 'in/jung-gu', icon: <Linkedin className="h-4 w-4" />, href: 'https://linkedin.com/in/jung-gu', external: true },
  { label: 'GitHub', value: 'Justinguu', icon: <Github className="h-4 w-4" />, href: 'https://github.com/Justinguu', external: true },
  { label: 'Resume', value: 'PDF', icon: <FileText className="h-4 w-4" />, href: '/Jung Gu Resume.pdf', external: true },
];

const ContactMe: React.FC = () => (
  <section id="contact" className="panel scroll-mt-20 p-6 sm:p-8">
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <div>
        <p className="eyebrow">Contact</p>
        <h2 className="display mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          Let&apos;s talk.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Open to full-time engineering roles and contract work. Email is the
          fastest way to reach me.
        </p>
        <a href="mailto:justinguuu@gmail.com" className="btn-primary mt-5">
          <Mail className="h-4 w-4" />
          Email Justin
        </a>
      </div>

      <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        {contacts.map((c) => {
          const inner = (
            <>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-primary">{c.icon}</span>
                {c.label}
              </span>
              <span className="flex items-center gap-1 text-sm text-foreground">
                {c.value}
                {c.href && (
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </span>
            </>
          );
          return (
            <div key={c.label} className="border-b border-border py-3 last:border-0 sm:[&:nth-last-child(2)]:border-0">
              {c.href ? (
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-3"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex items-center justify-between gap-3">{inner}</div>
              )}
            </div>
          );
        })}
      </dl>
    </div>
  </section>
);

export default ContactMe;
