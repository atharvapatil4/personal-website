import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";

const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

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
      <main className="flex flex-col items-center py-12 px-4 text-left">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-semibold py-2">
            {matterResult.data.title}
          </h1>
          <p className="text-lg">{matterResult.data.description}</p>
          <div className="flex flex-wrap justify-center gap-x-8 mt-2 italic">
            <p className="text-[var(--muted)]">
              published {matterResult.data.date}
            </p>
            <p className="text-[var(--muted)]">
              last edited {matterResult.data.lastEdited}
            </p>
          </div>
          <p className="text-[var(--muted)] italic">
            average reading time {readingLength} minutes
          </p>
        </div>
        <hr className="my-6 w-full max-w-prose border-[var(--ink)]" />
        <div className={`prose text-left max-w-prose ${serif.className}`}>
          <MDXRemote source={matterResult.content} />
        </div>
        <p className="font-semibold py-10">
          <Link href="/blog" className="italic">
            Back to All Posts
          </Link>
        </p>
      </main>
    );
  } catch (error) {
    return (
      <main className="flex flex-col items-center py-16 px-4">
        <h1 className="text-3xl">Post not found</h1>
        <p>The requested blog post could not be found.</p>
        <Link href="/blog" className="mt-4 italic">
          Back to All Posts
        </Link>
      </main>
    );
  }
}
