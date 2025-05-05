'use client';

import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';
import Link from 'next/link';
import resumeData from '@/data/resumeDtata.json';

export default function ResumePage() {
  const { personalInfo, experience, education, skills, projects, languages, interests } = resumeData;

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200">
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to home</span>
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header Section */}
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold mb-2">{personalInfo.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{personalInfo.title}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-blue-600" />
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-blue-600" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-blue-600" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center">
              <Github size={16} className="mr-2 text-blue-600" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                GitHub
              </a>
            </div>
            <div className="flex items-center">
              <Linkedin size={16} className="mr-2 text-blue-600" />
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                LinkedIn
              </a>
            </div>
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe size={16} className="mr-2 text-blue-600" />
                <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  Portfolio
                </a>
              </div>
            )}
          </div>
          
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {personalInfo.summary}
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Experience Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium">{job.position}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{job.startDate} - {job.endDate}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{job.company}</p>
                  <div className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {job.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Education Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium">{edu.institution}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{edu.degree}</p>
                  {edu.description && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
          
          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
          
          {/* Projects Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Projects</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium">{project.name}</h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Project
                    </a>
                  </div>
                  <div className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {project.description}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded text-xs"
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
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Languages</h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center">
                  <span className="font-medium mr-2">{lang.language}:</span>
                  <span className="text-gray-600 dark:text-gray-400">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Interests Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span 
                  key={index} 
                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
