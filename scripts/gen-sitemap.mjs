import { writeFileSync } from "node:fs";
const BASE = process.env.SITE_URL || "https://tdstudiosdigital.com";
const routes = [
  "/",
  "/web",
  "/dev",
  "/portfolio",
  "/shop",
  "/mylar-designs",
  "/custom-designs",
  "/tdstudios",
  "/tdlinkage",
  "/punkiez",
  "/quickprintz",
  "/contact",
];
const today = new Date().toISOString().split("T")[0];
const urlset = routes
  .map(
    (p) => `
  <url>
    <loc>${BASE}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === "/" ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
writeFileSync("public/sitemap.xml", xml.trim());
console.log("sitemap.xml generated");
