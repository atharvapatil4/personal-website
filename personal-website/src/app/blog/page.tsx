// app/blog/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

interface BlogPost {
  slug: string;
  createdAt: string; // Adjust as per the structure of your JSON file
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/articles/all")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Fetching error:", error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-20 bg-gradient-radial">
      <h1 className="font-semibold text-5xl">Blog</h1>
      <ul className="w-full">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="grid grid-cols-2 gap-0 p-0 place-items-center "
          >
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-500 hover:underline truncate"
            >
              {post.slug}
            </Link>
            <span className="text-right">
              {new Date(post.createdAt).toDateString()}
            </span>
          </li>
        ))}
      </ul>
      <h1 className="font-semibold">
        {" "}
        <Link href="/" className=" text-blue-500 hover:underline italic">
          Back to Home
        </Link>
      </h1>
    </main>
  );
}
