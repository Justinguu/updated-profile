import React from 'react';

interface Hobby {
  name: string;
  icon: string;
}

const hobbies: Hobby[] = [
  { name: 'Running', icon: '🏃' },
  { name: 'Weightlifting', icon: '🏋️' },
  { name: 'Reading', icon: '📚' },
  { name: 'Hiking', icon: '🥾' },
  { name: 'Snowboarding', icon: '🏂' },
  { name: 'Wakeboarding', icon: '🏄' },
  { name: 'Fishing', icon: '🎣' },
];

interface HobbyCardProps {
  hobby: Hobby;
  index: number;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ hobby }) => (
  <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1E2330] rounded-lg border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-all">
    <div className="text-2xl">
      {hobby.icon}
    </div>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {hobby.name}
    </span>
  </div>
);

const Hobbies: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg p-4 transition-colors">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-3">
        Hobbies & Interests
      </h2>
      <div className="space-y-2">
        {hobbies.map((hobby, index) => (
          <HobbyCard key={hobby.name} hobby={hobby} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Hobbies;