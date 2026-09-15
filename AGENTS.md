# AGENTS.md — Agent Guidelines & Conventions

## Project Purpose
A reusable, production-ready static website boilerplate optimized for speed, zero client-side JavaScript, and seamless deployment to Hostinger shared hosting.

## Tech Stack Summary
- **Framework**: Astro (latest stable, pure static output: `output: 'static'`)
- **Styling**: Tailwind CSS with design tokens defined in `src/styles/tokens.css`
- **Language**: TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Content**: Astro Content Collections (Content Layer API) + MDX
- **Optimization**: Built-in image optimization via `astro:assets` + Sharp
- **SEO & Feeds**: `@astrojs/sitemap`, OpenGraph meta tags, canonical URL generators
- **Deployment Target**: Hostinger Apache shared hosting (no Node.js server runtime required)

## Commands
```bash
# Start local development server
pnpm dev
# (or background mode for automated workflows)
astro dev --background

# Initialize / customize site title, URL, author
pnpm init:site

# Build static site for production (outputs to dist/)
pnpm build

# Build and generate zip archive for Hostinger upload (dist.zip)
pnpm build:zip

# Preview the production static build locally
pnpm preview
```

## Coding Conventions
1. **Naming Conventions**:
   - Components & Layouts: PascalCase (`Header.astro`, `BaseLayout.astro`, `PostCard.astro`).
   - Utilities & Configs: camelCase (`seo.ts`, `constants.ts`) or kebab-case.
   - Pages & Routes: lowercase kebab-case (`404.astro`, `about.astro`, `[...slug].astro`).
2. **Component Structure**:
   - Keep frontmatter logic at the top of `.astro` files concise.
   - Separate reusable presentation logic into `src/components/`.
   - Prefer centralized constants (`src/lib/constants.ts`) over hardcoded navigation URLs or site titles.
3. **No Unnecessary Client-Side JavaScript**:
   - Render strictly static HTML and CSS by default.
   - Do NOT add `<script>` tags or client-side UI frameworks unless interactive state (such as complex client-side search or cart modals) strictly demands an Astro island (`client:load` / `client:visible`).
4. **Styling & Tokens**:
   - Do not hardcode ad-hoc hex codes in components. Use the semantic Tailwind classes mapped to CSS design tokens (`bg-surface-bg`, `text-content-primary`, `bg-brand-600`).

## Rules for AI Agents
- **Static First**: Never add a Node.js runtime dependency or server adapter (e.g. `@astrojs/node`). The site must remain fully static and hostable on standard Apache/Nginx web servers.
- **Component Modularity**: Keep components small, focused, and single-purpose.
- **Prefer .astro Files**: Always prefer pure `.astro` components over framework islands (React/Vue/Svelte) unless user explicitly requests client interactivity.
- **Validate Builds**: Always run `pnpm build` (or verify static route generation) before marking any task as complete.
- **Preserve .htaccess**: Ensure `public/.htaccess` remains up-to-date with caching, compression, and routing directives for Hostinger.

## Deployment Target Note
**Hostinger Static Hosting**: The production target is Hostinger shared hosting using Apache (`public_html/`). There is NO Node.js runtime or backend daemon. All routing, caching, and error handling are handled by static files and `.htaccess`.
