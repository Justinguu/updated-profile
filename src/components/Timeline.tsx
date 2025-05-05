import React from 'react';

interface TimelineItem {
  type: 'education' | 'experience';
  title: string;
  organization: string;
  date: string;
  location?: string;
  description?: string[];
  skills?: string[];
}

const educationItems: TimelineItem[] = [
  {
    type: 'education',
    title: 'Full Stack Software Engineering',
    organization: 'App Academy',
    date: 'Feb 2022 - Nov 2022',
    description: ['Completed mastery of rigerous coding, algorithms, and real-world applications in team-oriented environments.'],
    skills: ['JavaScript', 'Python', 'React', 'Redux', 'SQL', 'Agile Methodologies']

  },
  {
    type: 'education',
    title: 'Business Administration',
    organization: 'Georgia State University',
    date: 'Aug 2014 - Jul 2017',
    description: ['No Degree, Completed class work in business administration and management, due to personal reasons.'],
    skills: ['SEO', 'SCRUM', 'PowerBI', 'SQL', 'Project Management']

  },

];


const experienceItems: TimelineItem[] = [
  {
    type: 'experience',
    title: 'Software Engineer',
    organization: 'Global Med Logistics',
    date: 'Feb 2024 - Present',
    description: [
      'Designed and deployed automated inventory management and email reporting systems, enhancing operational workflows and achieving significant cost reductions.',
      'Maintained backend systems and databases for medical devices, ensuring reliability and performance.',
      'Implemented Azure cloud architectures, enabling scalable and secure data management.'
    ],
    skills: ['Azure', 'Automation', 'Backend Development', 'Database Management']
  },
  {
    type: 'experience',
    title: 'Website Developer Intern',
    organization: 'Engaj Media',
    date: 'May 2023 - Dec 2023',
    description: [
      'Designed and developed a front-end landing page using TypeScript, npm, Figma, and React, fostering trust and confidence among visitors, leading them to request complimentary consultations and audits.',
      'Managed and implemented an HR dashboard incorporating employee information, announcements, and recent activities.'
    ],
    skills: ['TypeScript', 'npm', 'Figma', 'React', 'UI/UX Design']
  },
  {
    type: 'experience',
    title: 'Freelance Software Engineer',
    organization: 'YongMen Law P.C',
    date: 'Dec 2022 - Mar 2023',
    description: [
      'Architected a dynamic company website utilizing JavaScript libraries, and React, specializing in immigration law, while also seamlessly integrating email functionality.',
      'Boosted website traffic and engagement by 25% through ongoing Google Analytic-driven optimizations, resulting in increased client inquiries and fostering the law firm\'s growth and success.'
    ],
    skills: ['JavaScript', 'React', 'Email Integration', 'Google Analytics', 'SEO']
  }
];
const TimelineItem: React.FC<{ item: TimelineItem }> = ({ item }) => (
  <div className="mb-8 relative">
    <div className="absolute top-0 left-0 w-2 h-full bg-gray-200 dark:bg-gray-700" />
    <div className="ml-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="absolute left-0 top-4 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{item.organization}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500">{item.date}</p>
      {item.location && (
        <p className="text-sm text-gray-500 dark:text-gray-500">{item.location}</p>
      )}
      {item.description && (
        <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
          {item.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      )}
      {item.skills && (
        <div className="mt-2 flex flex-wrap gap-2">
          {item.skills.map((skill, index) => (
            <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Timeline: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Timeline</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Experience</h2>
          {experienceItems.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Education</h2>
          {educationItems.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;