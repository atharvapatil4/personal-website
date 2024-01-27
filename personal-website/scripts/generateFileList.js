// scripts/generateFileList.js
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(process.cwd(), "public", "articles");
const outputFilePath = path.join(process.cwd(), "fileList.json");

function parseFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const frontMatterDelimiter = "---";
  const start = content.indexOf(frontMatterDelimiter);
  const end = content.indexOf(
    frontMatterDelimiter,
    start + frontMatterDelimiter.length
  );

  if (start !== -1 && end !== -1) {
    const frontMatterBlock = content
      .slice(start + frontMatterDelimiter.length, end)
      .trim();
    const frontMatterLines = frontMatterBlock.split("\n");

    const frontMatter = frontMatterLines.reduce((acc, line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      acc[key] = value;
      return acc;
    }, {});

    return frontMatter;
  }

  return null;
}

const files = fs.readdirSync(directoryPath).map((file) => {
  const fullPath = path.join(directoryPath, file);
  // const content = fs.readFileSync(fullPath, "utf8");
  const frontMatter = parseFrontMatter(fullPath);

  return {
    slug: file.replace(".md", ""),
    createdAt: fs.statSync(fullPath).birthtime,
    frontMatter: frontMatter,
  };
});

fs.writeFileSync(outputFilePath, JSON.stringify(files, null, 2));
console.log(`File list generated at ${outputFilePath}`);
