import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The deployed origin, baked in so a dashboard build variable can never be
// missing or malformed. Every canonical URL, sitemap entry and RSS link is
// built against it. SITE_URL overrides it, which is all a move to a custom
// domain needs.
const site =
  process.env.SITE_URL ??
  "https://blog.negitorowarship.workers.dev";

export default defineConfig({
  site,
  base: "/",
  trailingSlash: "always",
  integrations: [sitemap()],
});
