import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Metadata } from "next";

// Calculate reading time
function getReadingLength(content: string) {
  const wordsPerMinute = 238;
  const numberOfWords = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return minutes;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), "public", "articles", `${slug}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);

    return {
      title: data.title,
      description: data.description || "Blog post",
    };
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Blog post not found",
    };
  }
}

// Generate static paths at build time
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "public", "articles");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), "public", "articles", `${slug}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(content);
    const readingLength = getReadingLength(matterResult.content);

    return (
      <main className="min-h-screen flex flex-col items-center py-28 px-2 text-left">
        <div className="text-center">
          <h1 className="text-5xl font-semibold py-2">
            {matterResult.data.title}
          </h1>
          <p className="text-xl">{matterResult.data.description}</p>
          <div className="flex justify-center space-x-8 mt-2 italic">
            <p className="text-slate-400">published {matterResult.data.date}</p>
            <p className="text-slate-400">
              last edited {matterResult.data.lastEdited}
            </p>
          </div>
          <p className="text-slate-400 italic">
            average reading time {readingLength} minutes
          </p>
        </div>
        <hr className="prose my-4 w-full border-black" />
        <div className="prose text-left">
          <MDXRemote source={matterResult.content} />
        </div>
        <br></br>
        <h1 className="font-semibold">
          <Link
            href="/blog"
            className="p-28 text-blue-500 hover:underline italic"
          >
            Back to All Posts
          </Link>
        </h1>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen flex flex-col items-center py-28 px-2">
        <h1 className="text-3xl">Post not found</h1>
        <p>The requested blog post could not be found.</p>
        <Link href="/blog" className="text-blue-500 hover:underline mt-4">
          Back to All Posts
        </Link>
      </main>
    );
  }
}
