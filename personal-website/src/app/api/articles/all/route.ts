// app/api/articles/GET.ts
import fileList from "../../../../../fileList.json"; // Adjust the path as needed
import matter from "gray-matter";

export async function GET() {
  return new Response(JSON.stringify(fileList), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
