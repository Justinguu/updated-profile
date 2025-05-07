// GitHub configuration settings
// This file contains configuration for GitHub integration

// Define types for sort options
export type SortBy = 'stars' | 'updated' | 'forks' | 'name';
export type SortOrder = 'asc' | 'desc';

export const githubConfig = {
  // Your GitHub username
  username: 'justinguu',
  
  // Specify any repositories you want to hide from your portfolio
  hiddenRepositories: [
    // Add repository names you want to hide, for example:
    // 'private-repo',
    // 'work-in-progress'
  ] as string[],
  
  // Specify repositories you want to feature (empty array means show all non-hidden repos)
  // If this array contains values, ONLY these repositories will be shown
  featuredRepositories: [
    // Add repository names you want to prioritize/feature, for example:
    'Flickr_Clone',
    'API-project',
    'updated-profile',
    'zelp',
    // 'awesome-project'
  ] as string[],
   
  // Whether to show forked repositories
  showForkedRepositories: true,
  
  // Max number of repositories to display (0 means no limit)
  maxRepositories: 0,
  
  // Sort options
  defaultSortBy: 'updated' as SortBy,
  defaultSortOrder: 'desc' as SortOrder,
}; 