import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import resumeData from '@/data/resumeData.json';

/**
 * Contact as the delivery address on the record. One decision: email. Three
 * address fields beside it, and the two profiles as a quiet secondary pair.
 */
const { personalInfo } = resumeData;
const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent('Opportunity for Justin')}`;

const fields = [
  { label: 'Email', value: personalInfo.email, href: mailto, icon: <Mail className="h-4 w-4" aria-hidden /> },
  { label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\D/g, '')}`, icon: <Phone className="h-4 w-4" aria-hidden /> },
  { label: 'Address', value: `${personalInfo.location} · Eastern time`, icon: <MapPin className="h-4 w-4" aria-hidden /> },
];

const ContactMe: React.FC = () => (
  <section id="contact" className="panel scroll-mt-20 p-6 sm:p-8" aria-labelledby="contact-heading">
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="eyebrow">Delivery address</p>
        <h2 id="contact-heading" className="display mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          Let&apos;s talk<span className="text-primary">.</span>
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Open to full-time engineering roles and contract work. Email is the
          fastest way to reach me.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href={mailto} className="btn-primary">
            <Mail className="h-4 w-4" aria-hidden />
            Email Justin
          </a>
          <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Linkedin className="h-4 w-4" aria-hidden />
            LinkedIn
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </a>
        </div>
      </div>

      <ul className="self-center">
        {fields.map((f) => {
          const inner = (
            <>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-primary">{f.icon}</span>
                {f.label}
              </span>
              <span className="text-sm text-foreground">{f.value}</span>
            </>
          );
          return (
            <li key={f.label} className="border-b border-border py-3 last:border-0">
              {f.href ? (
                <a href={f.href} className="flex items-center justify-between gap-3 hover:text-primary">{inner}</a>
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
