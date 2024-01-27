// app/blog/[slug]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import Head from "next/head";
import { PageWrapper } from "@/app/pageWrapper";

const Post = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  console.log("Component props:", { slug });
  const [postContent, setPostContent] =
    useState<MDXRemoteSerializeResult | null>(null);

  const [postTitle, setPostTitle] = useState<string | null>(null);
  const [postDate, setPostDate] = useState<string | null>(null);
  const [postLastEdited, setPostLastEdited] = useState<string | null>(null);
  const [postDescription, setPostDescription] = useState<string | null>(null);
  const [postReadingLength, setPostReadingLength] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (slug) {
      console.log(`Fetching content for slug: ${slug}`);
      fetch(`/api/articles/${slug}`)
        .then((res) => res.json())
        .then(async (data) => {
          console.log("Data received:", data);

          setPostTitle(data.title);
          setPostDate(data.date);
          setPostLastEdited(data.lastEdited);
          setPostDescription(data.description);
          setPostReadingLength(data.readingLength);

          const mdxSource = await serialize(data.content, {
            mdxOptions: {
              development: process.env.NODE_ENV === "development",
            },
          });
          setPostContent(mdxSource);
        });
      // .catch((error) => console.error("Error fetching post:", error));
    } else {
      console.log("Slug is not provided.");
    }
  }, [slug]);

  if (!postContent) return;

  return (
    <main className="min-h-screen flex flex-col items-center py-28 px-2 text-left">
      <Head>
        <title>{postTitle}</title>
        <meta name="description" content={postDescription || "Blog post"} />
      </Head>
      <div className="text-center">
        <h1 className="text-5xl font-semibold py-2">{postTitle}</h1>
        <p className="text-xl">{postDescription}</p>
        <div className="flex justify-center space-x-8 mt-2 italic">
          <p className="text-slate-400">published {postDate}</p>
          <p className="text-slate-400">last edited {postLastEdited}</p>
        </div>
        <p className="text-slate-400 italic">
          average reading time {postReadingLength} minutes
        </p>
      </div>
      <hr className="prose my-4 w-full border-black" />
      <div className="prose text-left">
        <MDXRemote {...postContent} />
      </div>
      <br></br>
      <h1 className="font-semibold">
        {" "}
        <Link
          href="/blog"
          className=" p-28 text-blue-500 hover:underline italic"
        >
          Back to All Posts
        </Link>
      </h1>
    </main>
  );
};

export default Post;
