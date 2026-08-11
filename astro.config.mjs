import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const [repositoryOwner = "", repositoryName = ""] = (
  process.env.GITHUB_REPOSITORY ?? "/"
).split("/");
const isGitHubBuild = process.env.GITHUB_ACTIONS === "true";
const isUserSite =
  repositoryName && repositoryName === `${repositoryOwner}.github.io`;

const site =
  process.env.SITE_URL ??
  (isGitHubBuild && repositoryOwner
    ? `https://${repositoryOwner}.github.io`
    : "http://localhost:4321");

const base =
  process.env.BASE_PATH ??
  (isGitHubBuild && repositoryName && !isUserSite
    ? `/${repositoryName}`
    : "/");

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  integrations: [sitemap()],
});
