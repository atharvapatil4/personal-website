// app/blog/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPostSchema } from "../components/post";
import PostPreview from "../components/post";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostSchema[]>([]);

  useEffect(() => {
    fetch("/api/articles/all")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Fetching error:", error));
  }, []);

  const postPreviews = posts
    .slice() // Create a shallow copy to avoid mutating the original array
    .sort((a, b) => {
      // Parse the dates and compare them
      const dateA = new Date(a.frontMatter.date).getTime();
      const dateB = new Date(b.frontMatter.date).getTime();
      return dateB - dateA; // Sort in descending order (most recent first)
    })
    .map((post) => <PostPreview key={post.slug} {...post} />);

  return (
    <main className="min-h-screen p-28">
      <h1 className="font-semibold text-center text-5xl italic py-6">Blog</h1>
      <div className="grid grid-cols-1 gap-4 mx-auto max-w-2xl px-6">
        {postPreviews}
      </div>
      <h1 className="font-semibold text-center py-6">
        {" "}
        <Link href="/" className=" text-blue-500 hover:underline italic">
          Back to Home
        </Link>
      </h1>
    </main>
  );
}
