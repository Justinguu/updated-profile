'use client';

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, FileText, ExternalLink } from 'lucide-react';

interface ContactInfo {
  type: string;
  value: string;
  icon: React.ReactNode;
  link?: string;
  label: string;
}

const ContactMe: React.FC = () => {
  const contactInfo: ContactInfo[] = [
    {
      type: 'Email',
      value: 'justinguuu@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      link: 'mailto:justinguuu@gmail.com',
      label: 'Send an email'
    },
    {
      type: 'Phone',
      value: '(678) 923-2057',
      icon: <Phone className="w-5 h-5" />,
      link: 'tel:6789232057',
      label: 'Call me'
    },
    {
      type: 'Location',
      value: 'Duluth, Georgia',
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location'
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/jung-gu',
      icon: <Linkedin className="w-5 h-5" />,
      link: 'https://linkedin.com/in/jung-gu',
      label: 'Connect on LinkedIn'
    },
    {
      type: 'GitHub',
      value: 'github.com/Justinguu',
      icon: <Github className="w-5 h-5" />,
      link: 'https://github.com/Justinguu',
      label: 'View GitHub profile'
    },
    {
      type: 'Resume',
      value: 'Download Resume',
      icon: <FileText className="w-5 h-5" />,
      link: '/Jung-Gu-Resume.pdf',
      label: 'Download my resume'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg p-4 transition-colors">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-4">
        Get In Touch
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contactInfo.map((info, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-[#1E2330] rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md text-blue-600 dark:text-blue-400 mr-3">
                {info.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {info.type}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {info.value}
                </p>
              </div>
            </div>
            
            {info.link && (
              <a
                href={info.link}
                target={info.type !== 'Email' && info.type !== 'Phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <span>{info.label}</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Feel free to reach out for opportunities, collaborations, or just to say hello!
        </p>
      </div>
    </div>
  );
};

export default ContactMe; 