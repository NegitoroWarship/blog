import rss from "@astrojs/rss";
import { getPublishedPosts } from "../lib/posts";

export async function GET(context) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Monsoon Letter",
    description: "Travel, tools, and quiet technology.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `posts/${post.id}/`,
    })),
    customData: "<language>en</language>",
  });
}
