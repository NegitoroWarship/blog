import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const sitemapUrl = (filename: string) =>
    site ? new URL(`${base.replace(/^\//, "")}${filename}`, site).href : "";
  const sitemaps = [sitemapUrl("sitemap.txt"), sitemapUrl("sitemap-index.xml")]
    .filter(Boolean)
    .map((sitemap) => `Sitemap: ${sitemap}`)
    .join("\n");

  return new Response(
    `User-agent: *\nAllow: /\n${sitemaps ? `\n${sitemaps}\n` : ""}`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
