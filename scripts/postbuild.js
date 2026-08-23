import fs from "fs";
import path from "path";

const distClient = path.join(process.cwd(), "dist", "client");
const indexHtml = path.join(distClient, "index.html");
const fallbackHtml = path.join(distClient, "404.html");

if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, fallbackHtml);
  console.log("Successfully copied index.html to 404.html for GitHub Pages fallback.");
} else {
  console.error("index.html not found in dist/client!");
}
