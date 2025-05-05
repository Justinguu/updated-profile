import React from 'react';
import AboutMe from '@/components/AboutMe';
import Technologies from '@/components/Technologies';
import FeaturedProjects from '@/components/FeaturedProjects';
import LatestPosts from '@/components/LatestPosts';
import SkillsOverview from '@/components/SkillsOverview';
import Timeline from '@/components/Timeline';
import Languages from '@/components/Languages';
import ContactMe from '@/components/ContactMe';

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen p-2 max-w-7xl mx-auto space-y-2">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="lg:col-span-2">
          <AboutMe />
        </div>
        <div>
          <Technologies />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Featured Projects - Spans 2 columns */}
        <div className="lg:col-span-2">
          <FeaturedProjects />
        </div>

        {/* Skills Overview */}
        <div>
          <SkillsOverview />
        </div>

        {/* Timeline - Spans full width */}
        <div className="lg:col-span-3">
          <Timeline />
        </div>

        {/* Latest Posts */}
        <div className="lg:col-span-2">
          <LatestPosts />
        </div>

        {/* Languages */}
        <div>
          <Languages />
        </div>

        {/* Contact Info - Spans full width */}
        <div className="lg:col-span-3">
          <ContactMe />
        </div>
      </div>
    </main>
  );
};

export default HomePage;