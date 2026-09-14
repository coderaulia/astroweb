# Content Management Guide

This document explains how to add and edit pages, blog articles, and content collections in this Astro project.

---

## 1. Adding Regular Pages

Astro uses file-based routing based on the files located in `src/pages/`.

### Example: Adding a Contact Page
Create `src/pages/contact.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Contact Us"
  description="Get in touch with our team."
>
  <div class="mx-auto max-w-3xl px-4 py-16">
    <h1 class="text-3xl font-bold text-content-primary">Contact Us</h1>
    <p class="mt-4 text-content-secondary">
      Reach us at info@example.com.
    </p>
  </div>
</BaseLayout>
```

This page will automatically be available at `/contact/` and included in `sitemap-index.xml`.

---

## 2. Managing Content Collections

Content collections are managed via `src/content.config.ts` and stored in `src/content/`.

### Schema Definition (`src/content.config.ts`)

The `blog` collection schema is defined using Zod:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Anonymous'),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

---

## 3. Creating a New Blog Post

Create a new file in `src/content/blog/your-post-slug.md` or `.mdx`:

```mdx
---
title: 'How to Build Ultra Fast Websites'
description: 'Step-by-step techniques to achieve 100/100 Lighthouse performance.'
pubDate: 2026-09-20
author: 'Jane Doe'
tags: ['webdev', 'performance', 'astro']
draft: false
---

# Your Headline

Write standard Markdown here.

## Interactive / Rich Elements with MDX
Because MDX is enabled, you can also import and use Astro components inside this post:

```astro
import Callout from '../../components/Callout.astro';

<Callout type="tip">Pro-tip: Always optimize images with astro:assets.</Callout>
```
```

---

## 4. Drafting Posts

Set `draft: true` in the frontmatter of any post you are not ready to publish.
The blog queries in `src/pages/blog/index.astro` automatically filter out drafts:

```typescript
const posts = await getCollection('blog', ({ data }) => !data.draft);
```

---

## 5. Adding Images to Posts

1. Place image assets in `src/assets/`.
2. Reference images using relative Markdown paths or standard Astro `<Image>` components:

```mdx
---
title: 'Post with Image'
...
---
import { Image } from 'astro:assets';
import diagram from '../../assets/diagram.png';

<Image src={diagram} alt="Architecture diagram" width={700} height={400} />
```
Astro will compress and generate responsive WebP/AVIF images at build time.
