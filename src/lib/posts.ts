import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getCategories(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return [...new Set(posts.map((post) => post.data.category))]
    .sort((a, b) => a.localeCompare(b));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function categoryLabel(category: string): string {
  return category.replaceAll("-", " ").toUpperCase();
}

export function categoryTitle(category: string): string {
  return category
    .split("-")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}
