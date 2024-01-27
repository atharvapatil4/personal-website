// scripts/generateFileList.js
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(process.cwd(), "public", "articles");
const outputFilePath = path.join(process.cwd(), "fileList.json");

const files = fs.readdirSync(directoryPath).map((file) => ({
  slug: file.replace(".md", ""),
  createdAt: fs.statSync(path.join(directoryPath, file)).birthtime,
}));

fs.writeFileSync(outputFilePath, JSON.stringify(files, null, 2));
console.log(`File list generated at ${outputFilePath}`);
