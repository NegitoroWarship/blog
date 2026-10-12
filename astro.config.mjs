import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The deployed origin, baked in so a dashboard build variable can never be
// missing or malformed. Every canonical URL, sitemap entry and RSS link is
// built against it. SITE_URL overrides it, which is all a move to a custom
// domain needs.
const site =
  process.env.SITE_URL ??
  "https://blog.negitorowarship.workers.dev";

// The sitemap integration runs outside the content layer, so it reads the
// article front matter directly: dates give each URL a <lastmod>, and the
// categories identify the archive pages to leave out of the XML sitemap.
const contentDir = "./src/content/blog";

function frontMatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+?)["']?\\s*$`, "m"));
  return match?.[1];
}

function readPosts(dir = contentDir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return readPosts(path);
    if (!/\.mdx?$/.test(entry.name)) return [];

    const source = readFileSync(path, "utf8");
    const frontMatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    if (frontMatterValue(frontMatter, "draft") === "true") return [];

    const date = frontMatterValue(frontMatter, "updatedDate") ??
      frontMatterValue(frontMatter, "pubDate");
    return [{
      id: relative(contentDir, path).replace(/\.mdx?$/, "").replaceAll("\\", "/"),
      category: frontMatterValue(frontMatter, "category"),
      lastmod: date ? new Date(date) : undefined,
    }];
  });
}

const posts = readPosts();
const postLastmod = new Map(posts.map((post) => [`/posts/${post.id}/`, post.lastmod]));
const latestLastmod = posts
  .map((post) => post.lastmod)
  .filter(Boolean)
  .sort((a, b) => b.valueOf() - a.valueOf())[0];

// Category archives repeat the journal listing and the HTML sitemap is a
// navigation aid; both stay crawlable through links but are not submitted.
const unsubmitted = new Set([
  "/sitemap/",
  ...posts
    .map((post) => post.category)
    .filter((category) => category && category !== "journal")
    .map((category) => `/${category}/`),
]);

export default defineConfig({
  site,
  base: "/",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !unsubmitted.has(new URL(page).pathname),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const lastmod = postLastmod.get(path) ??
          (path === "/" || path === "/journal/" ? latestLastmod : undefined);
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
  ],
});
