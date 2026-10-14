import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import resumeData from '@/data/resumeData.json';

/**
 * Contact as the delivery address on the record: where the shipment is going
 * and how to reach the consignee. One primary action (email, with the subject
 * already filled in), then the address fields.
 */
const { personalInfo } = resumeData;
const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent('Opportunity for Justin')}`;

interface Field {
  label: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
  external?: boolean;
}

const fields: Field[] = [
  { label: 'Email', value: personalInfo.email, icon: <Mail className="h-4 w-4" aria-hidden />, href: mailto },
  { label: 'Phone', value: personalInfo.phone, icon: <Phone className="h-4 w-4" aria-hidden />, href: `tel:${personalInfo.phone.replace(/\D/g, '')}` },
  { label: 'Address', value: `${personalInfo.location} · Eastern time`, icon: <MapPin className="h-4 w-4" aria-hidden /> },
  { label: 'LinkedIn', value: personalInfo.linkedin.replace(/^linkedin\.com\//, ''), icon: <Linkedin className="h-4 w-4" aria-hidden />, href: `https://${personalInfo.linkedin}`, external: true },
  { label: 'GitHub', value: personalInfo.github.replace(/^https?:\/\/github\.com\//, ''), icon: <Github className="h-4 w-4" aria-hidden />, href: personalInfo.github, external: true },
];

const ContactMe: React.FC = () => (
  <section id="contact" className="panel scroll-mt-20 p-6 sm:p-8" aria-labelledby="contact-heading">
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <div>
        <p className="eyebrow">Delivery address</p>
        <h2 id="contact-heading" className="display mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          Let&apos;s talk<span className="text-primary">.</span>
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Open to full-time engineering roles and contract work. Email is the
          fastest way to reach me.
        </p>
        <a href={mailto} className="btn-primary mt-5">
          <Mail className="h-4 w-4" aria-hidden />
          Email Justin
        </a>
      </div>

      <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        {fields.map((f) => {
          const inner = (
            <>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-primary">{f.icon}</span>
                {f.label}
              </span>
              <span className="flex items-center gap-1 text-sm text-foreground">
                {f.value}
                {f.href && (
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                )}
              </span>
            </>
          );
          return (
            <li key={f.label} className="border-b border-border py-3 last:border-0 sm:[&:nth-last-child(2)]:border-0">
              {f.href ? (
                <a
                  href={f.href}
                  target={f.external ? '_blank' : undefined}
                  rel={f.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-3"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex items-center justify-between gap-3">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default ContactMe;
