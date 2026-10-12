import type { APIRoute } from "astro";
import { getSitemapSections } from "../lib/sitemap";

export const GET: APIRoute = async ({ site }) => {
  const sections = await getSitemapSections();
  // Same URL set as the XML sitemap: category archives and the HTML sitemap
  // stay reachable through links but are not submitted.
  const links = [...sections.pages, ...sections.articles];
  const origin = site ?? new URL("http://localhost:4321");
  const urls = links.map((link) => new URL(link.href, origin).href);

  return new Response(`${urls.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
