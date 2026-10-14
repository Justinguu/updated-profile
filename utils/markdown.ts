// File: utils/markdown.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  date: string;
  title: string;
  readTime: string;
  tags: string[];
  category: string;
  kicker?: string;
  description: string;
  author: string;
}

export interface PostContent extends PostData {
  content: string;
  headings: Heading[];
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** One slug rule, shared by the heading renderer and the table of contents. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** h2 and h3 only. Lines inside fenced code blocks are skipped. */
export function extractHeadings(markdown: string): Heading[] {
  const out: Heading[] = [];
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^(##|###)\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[`*_~]/g, '');
    out.push({ id: slugify(text), text, level: m[1].length === 2 ? 2 : 3 });
  }
  return out;
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const fileNames = (await fs.readdir(postsDirectory)).filter((f) => f.endsWith('.md'));
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const readTime = readingTime(matterResult.content).text;

    return {
      id,
      readTime,
      ...(matterResult.data as Omit<PostData, 'id' | 'readTime'>),
    };
  }));

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<PostContent | null> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  let fileContents: string;
  try {
    fileContents = await fs.readFile(fullPath, 'utf8');
  } catch {
    return null;
  }
  const matterResult = matter(fileContents);
  const readTime = readingTime(matterResult.content).text;

  return {
    id,
    content: matterResult.content,
    headings: extractHeadings(matterResult.content),
    readTime,
    ...(matterResult.data as Omit<PostData, 'id' | 'readTime'>),
  };
}

export async function getAllPostIds(): Promise<{ params: { id: string } }[]> {
  const fileNames = (await fs.readdir(postsDirectory)).filter((f) => f.endsWith('.md'));
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}
