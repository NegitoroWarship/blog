# Lines in Still Water

Travel, technology, and life.

A personal editorial blog about travel, architecture, tools, and web development. Astro generates the static site, and Cloudflare Workers Builds deploys it as Workers static assets.

## Stack

- Astro
- Markdown Content Collections
- Cloudflare Workers Builds
- Workers static assets

## Local development

```sh
pnpm install
pnpm dev
```

Run the production checks with:

```sh
pnpm build
pnpm preview
```

## Writing

Add articles as Markdown files in `src/content/blog`. Set `draft: true` in the front matter for anything that is not ready to publish.

Categories are generated automatically from published articles. Use a lowercase URL-friendly value such as `books` or `field-notes`; its navigation link and archive page will be created during the build. Categories without a published article are not generated.

```yaml
---
title: Article title
description: A short summary of the article
pubDate: 2026-08-11
cover: ./assets/article-slug/cover.webp
coverAlt: A concise description of the cover image
category: notes
language: en
tags:
  - Astro
draft: true
---
```

The featured article's `cover` image is also used as the home-page hero. Its path is relative to the article file.

## Deployment

Every push to `main` triggers Workers Builds, which runs `pnpm build` and then
`npx wrangler deploy`. The static output in `dist/` is served by Workers static
assets; `wrangler.jsonc` holds the asset routing. GitHub only hosts the source —
nothing deploys from there.

`SITE_URL` must be set as a build variable in the Workers Builds settings — it
is the origin every canonical URL, sitemap entry and RSS link is built against.
The build fails fast when it is missing in CI, because the silent fallback would
otherwise publish `http://localhost:4321` URLs. Moving to a custom domain later
means changing that one variable and nothing else.

## Visual direction

The visual system combines Tropical Modernism with the stillness of monsoon season: rice-paper ivory, rain green, teak, faded indigo, and muted clay. The hero and social artwork are original AI-generated assets created for this project.
