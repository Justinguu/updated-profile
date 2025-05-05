'use client';

import React from 'react';
import { Code2, Server, Database, LineChart, Workflow, Cpu, Users, Shield } from 'lucide-react';

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Array<{
    name: string;
    proficiency: number; // 1-10
  }>;
  color: string;
}
 
const SkillsOverview: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend Development',
      icon: <Code2 className="w-4 h-4" />,
      color: '#3B82F6', // blue-500
      skills: [
        { name: 'Responsive Design', proficiency: 9 },
        { name: 'React/Next.js', proficiency: 9 },
        { name: 'UI/UX Design', proficiency: 8 },
        { name: 'JavaScript', proficiency: 8 },
      ]
    },
    {
      name: 'Backend Development',
      icon: <Server className="w-4 h-4" />,
      color: '#10B981', // emerald-500
      skills: [
        { name: 'Python', proficiency: 10 },
        { name: 'API Development', proficiency: 9 },
        { name: 'RESTful APIs', proficiency: 10 },
        { name: 'Unit Testing', proficiency: 8 },
      ]
    },
    {
      name: 'Database',
      icon: <Database className="w-4 h-4" />,
      color: '#8B5CF6', // violet-500
      skills: [
        { name: 'PostgreSQL', proficiency: 10 },
        { name: 'Data Automation', proficiency: 9 },
        { name: 'SQL', proficiency: 9 },
        { name: 'MongoDB', proficiency: 8 },
      ]
    },
    {
      name: 'DevOps & Tools',
      icon: <Workflow className="w-4 h-4" />,
      color: '#EC4899', // pink-500
      skills: [
        { name: 'Azure', proficiency: 10 },
        { name: 'Docker', proficiency: 9 },
        { name: 'Git/GitHub', proficiency: 9 },
        { name: 'CI/CD', proficiency: 9 },
      ]
    }
  ];

  // Function to render proficiency bar
  const renderProficiencyBar = (proficiency: number, color: string) => {
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-500"
          style={{ 
            width: `${proficiency * 10}%`,
            backgroundColor: color
          }}
        />
      </div>
    );
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg p-4 h-full transition-colors">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-4">
        Skills & Competencies
      </h2>
      
      <div className="space-y-5">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1E2330] rounded-lg p-4 transition-colors">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-md" style={{ backgroundColor: `${category.color}20` }}>
                <div style={{ color: category.color }}>{category.icon}</div>
              </div>
              <h3 className="text-md font-semibold ml-2 text-gray-800 dark:text-gray-200">
                {category.name}
              </h3>
            </div>
            
            <div className="space-y-3">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{skill.proficiency}/10</span>
                  </div>
                  {renderProficiencyBar(skill.proficiency, category.color)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsOverview; 