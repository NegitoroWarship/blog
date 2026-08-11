# Monsoon Letter

雨季の木陰で読む、小さな旅行・技術誌。

Astroで静的生成し、GitHub ActionsからGitHub Pagesへ公開する個人ブログです。旅、建築、道具、Web開発について、余白のある編集デザインで記録します。

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

本番相当の確認は次のコマンドで行います。

```sh
pnpm build
pnpm preview
```

## Writing

記事は`src/content/blog`へMarkdownとして追加します。公開前の記事にはFront Matterで`draft: true`を指定してください。

```yaml
---
title: 記事タイトル
description: 記事の概要
pubDate: 2026-08-11
category: notes
tags:
  - Astro
draft: true
---
```

## Deployment

リポジトリのSettings → Pages → Build and deploymentで、Sourceを`GitHub Actions`に設定します。`main`へのpushで自動的にビルド・公開されます。

通常のプロジェクトリポジトリでは、AstroがGitHub Actions上で`/<repository-name>/`を自動設定します。独自ドメインへ移行するときは、Actionsに`SITE_URL`と`BASE_PATH`を設定してください。

## Visual direction

Tropical Modernismと雨季の静けさを組み合わせた、生成り・深緑・チーク・褪せた藍の編集テーマです。ヒーロー画像はこのプロジェクトのためにAIで生成したオリジナル素材です。
