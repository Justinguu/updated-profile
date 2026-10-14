'use client';

import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Globe, Download } from 'lucide-react';
import Link from 'next/link';
import resumeData from '@/data/resumeData.json';

/**
 * The resume, rendered from the same JSON the PDF is built from. The sections
 * and their order mirror the PDF exactly: summary, skills, experience,
 * education. Anything that is not on the PDF does not belong here.
 */
const PDF_PATH = '/Jung_Gu_Resume.pdf';

const bullets = (description: string) =>
  description
    .split('\n')
    .map((l) => l.replace(/^•\s*/, '').trim())
    .filter(Boolean);

export default function ResumePage() {
  const { personalInfo, experience, education, skillGroups, languages } = resumeData;

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to home</span>
        </Link>

        <a href={PDF_PATH} download="Jung_Gu_Resume.pdf" className="btn-primary">
          <Download size={18} className="mr-2" />
          Download resume
        </a>
      </div>

      <div className="panel p-6 sm:p-10">
        {/* Header Section */}
        <div className="mb-8 border-b pb-6">
          <h1 className="display text-4xl font-extrabold mb-2">{personalInfo.name}</h1>
          <p className="eyebrow mb-5">{personalInfo.title}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-primary" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">{personalInfo.email}</a>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-primary" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-primary" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center">
              <Github size={16} className="mr-2 text-primary" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                {personalInfo.github.replace(/^https?:\/\//, '')}
              </a>
            </div>
            <div className="flex items-center">
              <Linkedin size={16} className="mr-2 text-primary" />
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                {personalInfo.linkedin}
              </a>
            </div>
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe size={16} className="mr-2 text-primary" />
                <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {personalInfo.website}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Summary */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Summary</h2>
            <p className="text-foreground/85 leading-relaxed">{personalInfo.summary}</p>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Technical Skills</h2>
            <dl className="grid grid-cols-1 gap-y-2 sm:grid-cols-[10rem_1fr] sm:gap-x-4 text-sm">
              {skillGroups.map((g) => (
                <React.Fragment key={g.name}>
                  <dt className="font-semibold text-foreground">{g.name}</dt>
                  <dd className="text-foreground/85 mb-2 sm:mb-0">{g.items.join(', ')}</dd>
                </React.Fragment>
              ))}
            </dl>
          </section>

          {/* Experience */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Work Experience</h2>
            <div className="space-y-6">
              {experience.map((job) => (
                <div key={job.company}>
                  <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold">
                      {job.position} <span className="font-normal text-muted-foreground">· {job.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{job.startDate} – {job.endDate}</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-foreground/85 text-sm leading-relaxed">
                    {bullets(job.description).map((b, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.institution}>
                  <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold">
                      {edu.institution} <span className="font-normal text-muted-foreground">· {edu.degree}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  {edu.description && (
                    <p className="mt-1 text-sm text-foreground/85">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Languages</h2>
            <p className="text-sm text-foreground/85">
              {languages.map((l) => `${l.language} (${l.proficiency})`).join(' · ')}
            </p>
          </section>
        </div>
      </div>

      {/* Mobile download button (sticky at bottom for easy access) */}
      <div className="md:hidden fixed bottom-4 right-4 z-10">
        <a
          href={PDF_PATH}
          download="Jung_Gu_Resume.pdf"
          className="inline-flex items-center bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
          aria-label="Download resume"
        >
          <Download size={24} />
        </a>
      </div>
    </div>
  );
}
