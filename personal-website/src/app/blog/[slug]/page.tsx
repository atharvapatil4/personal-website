// app/blog/[slug]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

const Post = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  console.log("Component props:", { slug });
  const [postContent, setPostContent] =
    useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    if (slug) {
      console.log(`Fetching content for slug: ${slug}`);
      fetch(`/api/articles/${slug}`)
        .then((res) => res.json())
        .then(async (data) => {
          console.log("Data received:", data);
          // const mdxSource = await serialize(data.content);
          const mdxSource = await serialize(data.content, {
            mdxOptions: {
              development: process.env.NODE_ENV === "development",
            },
          });
          console.log("here!");
          console.log("Serialized MDX:", mdxSource);
          setPostContent(mdxSource);
        })
        .catch((error) => console.error("Error fetching post:", error));
    } else {
      console.log("Slug is not provided.");
    }
  }, [slug]);

  if (!postContent) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-28 bg-gradient-radial">
      <div className="text-center">
        <MDXRemote {...postContent} />
      </div>
    </main>
  );
};

export default Post;
