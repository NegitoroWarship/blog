import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The deployed origin. Workers Builds supplies it as a build variable so the
// same source can be pointed at a custom domain later without a code change.
const siteUrl = process.env.SITE_URL;
const isCiBuild =
  process.env.WORKERS_CI === "1" || process.env.CI === "true";

if (isCiBuild && !siteUrl) {
  throw new Error(
    "SITE_URL is not set. Without it every canonical URL, sitemap entry and " +
      "RSS link would be built against http://localhost:4321. Set SITE_URL " +
      "(for example https://lines-in-still-water.<subdomain>.workers.dev) as a " +
      "build variable before deploying.",
  );
}

export default defineConfig({
  site: siteUrl ?? "http://localhost:4321",
  base: "/",
  trailingSlash: "always",
  integrations: [sitemap()],
});
