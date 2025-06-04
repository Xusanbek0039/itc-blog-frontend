// app/sitemap.xml/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://itc-blog.uz";

  const res = await fetch("https://itc-blog-api.onrender.com/api/articles", {
    cache: "no-store", // har safar yangi ma'lumot olish
  });

  const articles = await res.json();

  const urls = articles.map((article: any) => {
    return `
      <url>
        <loc>${baseUrl}/articles/${article.slug}</loc>
        <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/articles</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${urls.join("")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
