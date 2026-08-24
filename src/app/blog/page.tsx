import { Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData, PostData, getAllCategories, getAllTags } from "../../../utils/markdown";
import { Calendar, Clock, Tag, Loader } from 'lucide-react';

export const metadata = {
  title: "Blog",
  description: "Explore insightful articles on web development, design, and technology.",
};

async function BlogPosts() {
  const posts = await getSortedPostsData();
  const allCategories = await getAllCategories();
  const allTags = await getAllTags();

  return (
    <>
    {/* <BlogFilters categories={allCategories} tags={allTags} /> */}
      <header className="mb-10">
        <p className="eyebrow">Writing</p>
        <h1 className="display mt-2 text-4xl font-extrabold text-foreground sm:text-5xl">Notes from the build</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Cloud, Python, and the tooling decisions behind the work.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post: PostData) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="group">
            <article className="panel overflow-hidden transition-colors hover:border-primary/50 h-full flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={`/images/${post.id}.png`}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{post.description}</p>
                <div className="flex items-center font-mono text-[11px] text-muted-foreground mt-auto">
                  <span className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center mr-4">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center">
                    <Tag size={14} className="mr-1" />
                    {post.category}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function BlogPage() {
  return (
    <section className="max-w-6xl mx-auto py-6">
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-primary" size={48} />
        </div>
      }>
        <BlogPosts />
      </Suspense>
    </section>
  );
}