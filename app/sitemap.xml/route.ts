import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.itc-blog.uz";

  const res = await fetch("https://itc-blog-api.onrender.com/api/articles", {
    cache: "no-store",
  });

  const data = await res.json();

  // Konsolga chiqarib ko'rish (keyin o'chirishingiz mumkin)
  console.log("API data:", data);

  // articles massivini olish va tekshirish
  let articles: any[] = [];

  if (Array.isArray(data)) {
    articles = data;
  } else if (Array.isArray(data.data)) {
    articles = data.data;
  } else {
    // Maqolalar yo'q bo'lsa, bo'sh massiv
    articles = [];
  }

  // Endi map bilan URL larni yaratamiz
  const urls = articles.map((article: any) => {
    const id = article.id || article._id || "";
    const lastmod = article.updatedAt || article.createdAt || new Date().toISOString();

    return `
      <url>
        <loc>${baseUrl}/article/${id}</loc>
        <lastmod>${new Date(lastmod).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
