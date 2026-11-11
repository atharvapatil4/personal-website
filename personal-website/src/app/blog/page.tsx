import fs from "fs";
import path from "path";
import PostPreview from "../components/post";
import { BlogPostSchema } from "../components/post";
import matter from "gray-matter";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}

export default async function Blog() {
  const postsDirectory = path.join(process.cwd(), "public", "articles");
  const filenames = fs.readdirSync(postsDirectory);

  const posts: BlogPostSchema[] = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      createdAt: formatDate(fs.statSync(filePath).birthtime.toString()),
      frontMatter: matterResult.data,
    };
  });

  // Sort posts by date (most recent first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.frontMatter.date).getTime();
    const dateB = new Date(b.frontMatter.date).getTime();
    return dateB - dateA;
  });

  return (
    <main className="py-12 px-4">
      <h1 className="font-semibold text-center text-4xl italic py-4">Blog</h1>

      <div className="grid grid-cols-1 gap-6 mx-auto max-w-2xl">
        {sortedPosts.map((post) => (
          <div key={post.slug} className="border-l-4 border-black pl-3">
            <PostPreview {...post} />
          </div>
        ))}
      </div>
    </main>
  );
}
