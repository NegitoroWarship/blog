import rss from "@astrojs/rss";
import { getPublishedPosts } from "../lib/posts";

export async function GET(context) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Monsoon Letter",
    description: "雨季の木陰で読む、小さな旅行・技術誌。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `posts/${post.id}/`,
    })),
    customData: "<language>ja</language>",
  });
}
