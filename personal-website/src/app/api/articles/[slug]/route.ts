// src/app/api/articles/[slug]/route.ts
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // 'a', 'b', or 'c'
  const filePath = path.join(process.cwd(), "public", "articles", `${slug}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Article not found at " + filePath }),
      {
        status: 404,
      }
    );
  }
}
