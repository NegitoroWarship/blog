import type { APIRoute } from "astro";
import { withBase } from "../lib/paths";
import { getSitemapSections } from "../lib/sitemap";

export const GET: APIRoute = async ({ site }) => {
  const sections = await getSitemapSections();
  const links = [
    ...sections.pages,
    { href: withBase("sitemap/"), label: "Sitemap" },
    ...sections.categories,
    ...sections.articles,
  ];
  const origin = site ?? new URL("http://localhost:4321");
  const urls = links.map((link) => new URL(link.href, origin).href);

  return new Response(`${urls.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
