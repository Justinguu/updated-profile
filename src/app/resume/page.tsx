'use client';

import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Globe, Download } from 'lucide-react';
import Link from 'next/link';
import resumeData from '@/data/resumeData.json';

export default function ResumePage() {
  const { personalInfo, experience, education, skills, projects, languages, interests } = resumeData;

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to home</span>
        </Link>
        
        <a 
          href="/Jung Gu Resume.pdf" 
          download
          className="btn-primary"
        >
          <Download size={18} className="mr-2" />
          Download Resume
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
              <span>{personalInfo.email}</span>
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
                GitHub
              </a>
            </div>
            <div className="flex items-center">
              <Linkedin size={16} className="mr-2 text-primary" />
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe size={16} className="mr-2 text-primary" />
                <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Portfolio
                </a>
              </div>
            )}
          </div>
          
          <p className="mt-4 text-foreground/85">
            {personalInfo.summary}
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Experience Section */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{job.position}</h3>
                    <span className="text-sm text-muted-foreground">{job.startDate} - {job.endDate}</span>
                  </div>
                  <p className="text-muted-foreground font-medium">{job.company}</p>
                  <div className="mt-2 text-foreground/85 whitespace-pre-line">
                    {job.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Education Section */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{edu.institution}</h3>
                    <span className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-muted-foreground">{edu.degree}</p>
                  {edu.description && (
                    <p className="mt-2 text-foreground/85">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
          
          {/* Skills Section */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="chip"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
          
          {/* Projects Section */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Projects</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-primary hover:underline"
                    >
                      View Project
                    </a>
                  </div>
                  <div className="mt-2 text-foreground/85 whitespace-pre-line">
                    {project.description}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="chip"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Languages Section */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Languages</h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center">
                  <span className="font-medium mr-2">{lang.language}:</span>
                  <span className="text-muted-foreground">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Interests Section */}
          <section>
            <h2 className="eyebrow mb-4 border-b border-border pb-2">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span 
                  key={index} 
                  className="chip"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Mobile download button (sticky at bottom for easy access) */}
      <div className="md:hidden fixed bottom-4 right-4 z-10">
        <a 
          href="/Jung Gu Resume.pdf" 
          download
          className="inline-flex items-center bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
          aria-label="Download Resume"
        >
          <Download size={24} />
        </a>
      </div>
    </div>
  );
}
