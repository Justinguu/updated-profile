'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { githubService } from '@/lib/github';
import { GithubIcon, ExternalLink, Loader, Calendar, Code, Folder, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import * as Si from 'react-icons/si';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import { githubConfig } from '@/config/github';

type GitHubRepo = RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"][0];

interface ProjectData {
  id: number;
  name: string;
  description: string;
  topics: string[];
  language: string;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  image?: string;
}

const FeaturedProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a mapping of icon names to actual components
  const iconComponents: { [key: string]: React.ElementType } = {};
  Object.keys(Si).forEach(key => {
    iconComponents[key] = (Si as any)[key];
  });

  // Function to determine project image path
  const getProjectImage = (projectName: string, language: string): string => {
    // Check for specific projects first
    const projectNameLower = projectName.toLowerCase();
    
    if (projectNameLower.includes('portfolio')) {
      return '/images/projects/portfolio.png';
    } else if (projectNameLower.includes('flickr') || projectNameLower.includes('flicker')) {
      return '/images/projects/flickr-clone.jpg';
    } else if (projectNameLower.includes('zelp')) {
      return '/images/projects/zelp.jpg';
    } else if (projectNameLower.includes('mern')) {
      return '/images/projects/mern.jpg';
    }
    
    // Fallback to language-based images
    if (language === 'TypeScript' || language === 'JavaScript') {
      return '/images/projects/javascript.jpg';
    } else if (language === 'Python') {
      return '/images/projects/python.jpg';
    } else if (language === 'HTML' || language.includes('CSS')) {
      return '/images/projects/web.jpg';
    }
    
    // Default image
    return '/images/projects/code.jpg';
  };

  // Function to get icon for a language
  const getLanguageIcon = (language: string) => {
    if (!language) return <Code className="w-5 h-5 text-gray-400" />;
    
    const iconMap: Record<string, string> = {
      "JavaScript": "SiJavascript",
      "TypeScript": "SiTypescript",
      "Python": "SiPython",
      "HTML": "SiHtml5",
      "CSS": "SiCss3",
      "Java": "SiJava",
      "C#": "SiCsharp",
      "C++": "SiCplusplus",
      "Ruby": "SiRuby",
      "Go": "SiGo",
      "PHP": "SiPhp",
      "Swift": "SiSwift",
      "Kotlin": "SiKotlin",
      "Rust": "SiRust",
      "Dart": "SiDart",
    };
    
    const iconName = iconMap[language] || "SiGithub";
    const IconComponent = iconComponents[iconName];
    
    return IconComponent ? (
      <IconComponent className="w-5 h-5" style={{ color: getLanguageColor(language) }} />
    ) : (
      <Code className="w-5 h-5 text-gray-400" />
    );
  };

  // Function to get color for a language
  const getLanguageColor = (language: string) => {
    const colorMap: Record<string, string> = {
      "JavaScript": "#F7DF1E",
      "TypeScript": "#3178C6",
      "Python": "#3776AB",
      "HTML": "#E34F26",
      "CSS": "#1572B6",
      "Java": "#007396",
      "C#": "#239120",
      "C++": "#00599C",
      "Ruby": "#CC342D",
      "Go": "#00ADD8",
      "PHP": "#777BB4",
      "Swift": "#FA7343",
      "Kotlin": "#7F52FF",
      "Rust": "#DEA584",
      "Dart": "#0175C2",
    };
    
    return colorMap[language] || "#6e7681";
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const username = githubConfig.username;
      const { data: repos } = await githubService.getRepositories(username, {
        per_page: 100,
        type: 'owner'
      });

      // Filter repositories based on configuration
      let filteredRepos = repos;
      
      // Filter out hidden repositories
      if (githubConfig.hiddenRepositories.length > 0) {
        filteredRepos = filteredRepos.filter(repo => 
          !githubConfig.hiddenRepositories.includes(repo.name)
        );
      }
      
      // Only show featured repositories for featured section
      // If featured list is empty, display the most recently updated ones
      let featureRepos = filteredRepos;
      if (githubConfig.featuredRepositories.length > 0) {
        featureRepos = filteredRepos.filter(repo => 
          githubConfig.featuredRepositories.includes(repo.name)
        );
        
        // If no specified featured repos are found, fall back to recent ones
        if (featureRepos.length === 0) {
          featureRepos = filteredRepos;
        }
      }
      
      // Sort by update date (most recent first)
      const sortedRepos = featureRepos.sort((a, b) => {
        const dateA = new Date(a.updated_at || 0).getTime();
        const dateB = new Date(b.updated_at || 0).getTime();
        return dateB - dateA;
      });

      // Take the first 4 (or fewer) repositories for featured display
      const displayLimit = Math.min(4, sortedRepos.length);
      const projectData = sortedRepos.slice(0, displayLimit).map(repo => {
        // Generate a better description if none is available
        let description = repo.description;
        if (!description || description === 'No description available') {
          // Create custom descriptions based on project name or language
          const projectName = repo.name.toLowerCase();
          
          if (projectName.includes('portfolio')) {
            description = 'My personal portfolio website showcasing projects and skills in web development.';
          } else if (projectName.includes('flicker') || projectName.includes('flickr')) {
            description = 'A Flickr clone application for sharing and discovering photos.';
          } else if (projectName.includes('mern') || projectName.includes('fullstack')) {
            description = 'Full-stack application built with modern web technologies and best practices.';
          } else if (projectName.includes('yelp') || projectName.includes('review')) {
            description = 'A Yelp-inspired platform for discovering and reviewing local businesses.';
          } else if (projectName.includes('zelp')) {
            description = 'Restaurant discovery and review application with interactive features.';
          } else if (repo.language === 'Python') {
            description = 'Python-based application showcasing backend development and data handling.';
          } else if (repo.language === 'TypeScript' || repo.language === 'JavaScript') {
            description = 'Web application built with modern JavaScript/TypeScript frameworks.';
          } else {
            description = `A ${repo.language || 'software'} project demonstrating my technical skills and coding practices.`;
          }
        }

        // Enhance topics with additional relevant technologies
        let enhancedTopics = [...(repo.topics || [])];
        const projectName = repo.name.toLowerCase();
        
        // Add common associated technologies based on project type
        if (enhancedTopics.length < 4) {
          if (projectName.includes('portfolio')) {
            const portfolioTechs = ['react', 'nextjs', 'tailwindcss', 'typescript', 'responsive-design'];
            portfolioTechs.forEach(tech => {
              if (!enhancedTopics.includes(tech)) {
                enhancedTopics.push(tech);
              }
            });
          } else if (projectName.includes('flickr') || projectName.includes('flicker')) {
            const flickrTechs = ['react', 'redux', 'express', 'aws', 'image-processing'];
            flickrTechs.forEach(tech => {
              if (!enhancedTopics.includes(tech)) {
                enhancedTopics.push(tech);
              }
            });
          } else if (projectName.includes('zelp')) {
            const yelpTechs = ['react', 'express', 'postgresql', 'google-maps', 'authentication'];
            yelpTechs.forEach(tech => {
              if (!enhancedTopics.includes(tech)) {
                enhancedTopics.push(tech);
              }
            });
          } else if (repo.language === 'TypeScript' || repo.language === 'JavaScript') {
            const jsTechs = ['javascript', 'nodejs', 'react', 'webpack', 'express'];
            jsTechs.forEach(tech => {
              if (!enhancedTopics.includes(tech)) {
                enhancedTopics.push(tech);
              }
            });
          } else if (repo.language === 'Python') {
            const pythonTechs = ['python', 'flask', 'sqlalchemy', 'api', 'data-science'];
            pythonTechs.forEach(tech => {
              if (!enhancedTopics.includes(tech)) {
                enhancedTopics.push(tech);
              }
            });
          }
        }

        // Assign appropriate project image
        const image = getProjectImage(repo.name, repo.language || '');

        return {
          id: repo.id,
          name: repo.name,
          description: description,
          topics: enhancedTopics,
          language: repo.language || '',
          html_url: repo.html_url,
          homepage: repo.homepage || null,
          updated_at: repo.updated_at || new Date().toISOString(),
          image: image
        };
      });

      setProjects(projectData);
    } catch (err) {
      setError('Error fetching featured projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg p-3 h-full transition-colors">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-4">
          Featured Projects
        </h2>
        <div className="flex justify-center items-center h-64">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg p-3 h-full transition-colors">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-4">
          Featured Projects
        </h2>
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#151B28] rounded-lg p-3 h-full transition-colors">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-4">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[calc(100%-3rem)]">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-[#1E2330] rounded-lg p-5 flex flex-col justify-between border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Folder className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.name.charAt(0).toUpperCase() + project.name.slice(1).replace(/-/g, ' ')}
                  </h3>
                </div>
                {project.language && (
                  <div className="flex items-center gap-1">
                    {getLanguageIcon(project.language)}
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {project.language}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Project Info Section */}
              <div className="mb-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-blue-700 dark:text-blue-300">Project Overview</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Updated on {formatDate(project.updated_at)}</span>
                    
                    {project.language && (
                      <>
                        <span className="mx-2">•</span>
                        <div className="flex items-center gap-1">
                          {getLanguageIcon(project.language)}
                          <span>{project.language}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Project Features Section */}
              <div className="mb-4">
                <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/20 dark:to-gray-800/10 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-1 mb-2">
                    <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Technologies</span>
                  </div>
                  
                  {project.topics && project.topics.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.topics.slice(0, 8).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.topics.length > 8 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                          +{project.topics.length - 8} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30">
                        {project.language || 'Coding Project'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-3">
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <GithubIcon className="w-4 h-4 mr-2" />
                  View Code
                </a>
                
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 text-sm rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;