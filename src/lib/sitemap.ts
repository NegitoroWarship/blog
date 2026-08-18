import { categoryTitle, getPublishedPosts } from "./posts";
import { categoryPath, postPath, withBase } from "./paths";

export interface SitemapLink {
  href: string;
  label: string;
}

export interface SitemapSections {
  articles: SitemapLink[];
  categories: SitemapLink[];
  pages: SitemapLink[];
}

export async function getSitemapSections(): Promise<SitemapSections> {
  const posts = await getPublishedPosts();
  const categories = [...new Set(posts.map((post) => post.data.category))]
    .filter((category) => category !== "journal")
    .sort((a, b) => a.localeCompare(b));

  return {
    pages: [
      { href: withBase(), label: "Home" },
      { href: withBase("journal/"), label: "Journal" },
      { href: withBase("about/"), label: "About" },
    ],
    categories: categories.map((category) => ({
      href: categoryPath(category),
      label: categoryTitle(category),
    })),
    articles: posts.map((post) => ({
      href: postPath(post.id),
      label: post.data.title,
    })),
  };
}
