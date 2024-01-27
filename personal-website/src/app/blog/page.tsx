// app/blog/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.slug} - {new Date(post.createdAt).toDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
