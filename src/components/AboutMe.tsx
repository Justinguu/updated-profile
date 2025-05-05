'use client';

import React from 'react';
import Image from 'next/image';
import heroImage from "@/assets/Justin-optimized.png";
import { Twitter, GithubIcon, Linkedin, Download } from 'lucide-react';

const AboutMe: React.FC = () => {


  
    const handleDownloadResume = () => {
      const resumeUrl = '/Jung-Gu-Resume.pdf';
      window.open(resumeUrl, '_blank');
    };

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg p-4 h-full transition-colors">
      <div className="flex flex-col h-full">
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <div className="flex-shrink-0">
            <Image
              src={heroImage}
              alt="Justin Gu's profile picture"
              className="rounded-full w-24 h-24 object-cover ring-2 ring-blue-500/20"
              priority
              width={96}
              height={96}
              quality={90}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col h-full">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Justin Gu
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">@Justin</p>
              </div>
              
              <div className="flex-1 bg-gray-50 dark:bg-[#1E2330] rounded-lg p-4 mb-8 mt-4">
                <div className="space-y-3">
                  <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed">
                  Hey there, I&apos;m Jung aka Justin, a Software Developer based in Duluth, Georgia, with a passion for desigining, building and managing software solutions. My experience spans from start ups to mid-sized companies, equipping me with a diverse skill set and the ability to adapt seemlessly to different challenges.With an eye for detail and a hunger for learning, I&apos;m all about delivering high-quality solutions that meet both user needs and business objectives.
                  </p>
                  <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed">
                    Automizing business processes and building scalable software solutions is my forte.
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex items-center space-x-4 justify-between">
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/Justinguu" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://linkedin.com/in/jung-gu" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <button 
                    onClick={handleDownloadResume}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Resume</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;