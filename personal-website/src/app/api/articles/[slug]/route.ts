// src/app/api/articles/[slug]/route.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // 'a', 'b', or 'c'
  const filePath = path.join(process.cwd(), "public", "articles", `${slug}.md`);

  // Define a function to calculate the reading length of an article
  function getReadingLength(content: string) {
    const wordsPerMinute = 238;
    const numberOfWords = content.trim().split(/\s+/).length;
    const minutes = numberOfWords / wordsPerMinute;
    return Math.ceil(minutes);
  }

  try {
    const content = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(content);
    const readingLength = getReadingLength(matterResult.content);
    return new Response(
      JSON.stringify({
        content: matterResult.content,
        title: matterResult.data.title,
        date: matterResult.data.date,
        lastEdited: matterResult.data.lastEdited,
        description: matterResult.data.description,
        readingLength: readingLength,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Article not found at " + filePath }),
      {
        status: 404,
      }
    );
  }
}
