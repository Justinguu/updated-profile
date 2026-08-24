import React from 'react';
import AboutMe from '@/components/AboutMe';
import Technologies from '@/components/Technologies';
import LatestPosts from '@/components/LatestPosts';
import SkillsOverview from '@/components/SkillsOverview';
import Timeline from '@/components/Timeline';
import Languages from '@/components/Languages';
import Hobbies from '@/components/Hobbies';
import ContactMe from '@/components/ContactMe';

/**
 * Home. One grid, one gutter. The hero spans full width; the tracking
 * history is the widest panel below it because it's the page's centrepiece.
 */
const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <AboutMe />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Timeline />
        </div>
        <div className="flex flex-col gap-4">
          <Technologies />
          <div className="flex-1">
            <SkillsOverview />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <LatestPosts />
        <Languages />
        <Hobbies />
      </div>

      <ContactMe />
    </div>
  );
};

export default HomePage;
