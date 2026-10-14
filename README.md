# Smart Portfolio with AI Integration

This project is a modern portfolio website built with Next.js 14, featuring AI-powered components including a chatbot, tech stack validation, and interactive visualizations.

## Key Features

- **Tech Stack Architecture Visualization**: Interactive drag-and-drop interface to design and validate technology stacks with AI feedback
- **GitHub Integration**: Dynamic GitHub statistics, featured projects, and contribution graphs
- **Responsive Design**: Fully responsive UI with dark/light mode support using Tailwind CSS and NextUI components
- **Blog System**: Markdown-based blog with reading time estimation and syntax highlighting
- **Performance Optimized**: Server components, static generation, and efficient caching strategies

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS, NextUI components, Framer Motion
- **AI/ML**: 
  - ReactFlow for tech stack visualization
- **GitHub API**: Octokit for repository and contribution data
- **UI Components**: 
  - React Icons
  - Lucide React
  - Recharts for data visualization
- **Content**: 
  - React Markdown
  - Gray Matter for frontmatter parsing
  - React Syntax Highlighter

## Features Summary

1. **Home Page**: Featuring about section, skills, timeline, and featured projects
2. **Tech Stack Architect**: Interactive tool for designing and validating technology stacks with AI feedback
3. **Blog System**: Markdown-based blog with filtering capabilities
4. **AI Chatbot**: Conversational interface for exploring the portfolio
5. **GitHub Integration**: Dynamic display of repositories and statistics

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.17 or later
- npm or yarn package manager
- Git

## Installation Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/justin/smart-portfolio.git
   cd smart-portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key


   # GitHub
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token

   # Optional: Add any other API keys needed for additional features
   ```

4. **Database Setup**
   ```sql

   create table if not exists documents (
     id bigserial primary key,
     content text,
     metadata jsonb,
   );

   -- Create the matching function
   create or replace function match_documents(
     filter jsonb default '{}'::jsonb,
     match_count int default 10
   ) returns table (
     id bigint,
     content text,
     metadata jsonb,
     similarity float
   )
   language plpgsql
   as $$
   begin
     return query
     select
       id,
       content,
       metadata,
     from documents
     where metadata @> filter
     limit match_count;
   end;
   $$;
   ```

5. **Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:3004`

6. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Project Structure

```
/
├── src/
│   ├── app/              # Next.js app router pages and API routes
│   │   ├── api/          # API endpoints for chat, GitHub, and tech stack validation
│   │   ├── blog/         # Blog pages and post rendering
│   │   ├── projects/     # Project showcase pages
│   │   └── tech-stack-architect/ # Tech stack visualization tool
│   ├── components/       # React components
│   │   ├── tech-stack-architect/  # Tech stack visualization components
│   │   ├── ui/           # Reusable UI components
│   │   └── AIChatBox.tsx # AI chatbot implementation
│   ├── lib/              # Utility functions and API clients
│   │   ├── github.ts     # GitHub API integration
│   └── data/             # Static data and configuration
├── public/               # Static assets
├── scripts/              # Build and generation scripts
├── posts/                # Blog posts in markdown format
└── utils/                # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes content generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.