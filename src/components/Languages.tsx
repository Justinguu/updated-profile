'use client';

import React from 'react';
import { GlobeIcon, BookOpenText, MessageSquare, Headphones, Mic } from 'lucide-react';

interface LanguageSkill {
  name: string;
  nativeName: string;
  flag: string;
  proficiency: {
    speaking: number;
    writing: number;
    reading: number;
    listening: number;
  };
  level: string;
  description: string;
}

const Languages: React.FC = () => {
  const languages: LanguageSkill[] = [
    {
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      proficiency: {
        speaking: 100,
        writing: 100,
        reading: 100,
        listening: 100
      },
      level: 'Native / Fluent',
      description: 'Professional working proficiency with excellent communication skills for technical and business contexts.'
    },
    {
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      proficiency: {
        speaking: 90,
        writing: 80,
        reading: 80,
        listening: 90
      },
      level: 'Fluent',
      description: 'Conversational fluency with strong understanding of cultural nuances and technical terminology.'
    }
  ];

  // Skills categories
  const skillCategories = [
    { name: 'Speaking', icon: <Mic className="w-4 h-4" /> },
    { name: 'Writing', icon: <BookOpenText className="w-4 h-4" /> },
    { name: 'Reading', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Listening', icon: <Headphones className="w-4 h-4" /> }
  ];

  // Function to render proficiency bar
  const renderProficiencyBar = (proficiency: number) => {
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="h-2 rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${proficiency}%` }}
        />
      </div>
    );
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg p-4 h-full transition-colors">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-4">
        Language Proficiency
      </h2>
      
      <div className="space-y-5">
        {languages.map((language, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1E2330] rounded-lg p-4 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{language.flag}</span>
                <div>
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                    {language.name} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({language.nativeName})</span>
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{language.level}</p>
                </div>
              </div>
              <div className="flex items-center">
                <GlobeIcon className="w-4 h-4 text-gray-400 mr-1" />
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {language.description}
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {skillCategories.map((category, catIdx) => (
                <div key={catIdx} className="space-y-1">
                  <div className="flex items-center mb-1">
                    <div className="text-gray-500 dark:text-gray-400 mr-1">
                      {category.icon}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {category.name}
                    </span>
                  </div>
                  {renderProficiencyBar(language.proficiency[category.name.toLowerCase() as keyof typeof language.proficiency])}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;