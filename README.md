# Lines in Still Water

Travel, technology, and life.

A personal editorial blog about travel, architecture, tools, and web development. Astro generates the static site, and GitHub Actions prepares it for GitHub Pages.

## Stack

- Astro
- Markdown Content Collections
- GitHub Actions
- GitHub Pages

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

The workflow validates every push to `main`. While the repository is private on GitHub Free, it builds the site without attempting a Pages deployment.

When the repository becomes public, the `public` event enables GitHub Pages and deploys the site automatically. Astro derives the `/<repository-name>/` base path in GitHub Actions. For a custom domain, provide `SITE_URL` and `BASE_PATH` in Actions.

## Visual direction

The visual system combines Tropical Modernism with the stillness of monsoon season: rice-paper ivory, rain green, teak, faded indigo, and muted clay. The hero and social artwork are original AI-generated assets created for this project.
