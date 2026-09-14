# Architecture & Folder Structure

This document outlines the architectural decisions, directory layout, and conventions used across this Astro static boilerplate.

---

## 1. Directory Layout

```
astroweb/
├── docs/                        # Project documentation
│   ├── ARCHITECTURE.md          # Architecture & conventions (this file)
│   ├── CONTENT.md               # Page and content creation guide
│   ├── DEPLOY.md                # Hostinger static deployment guide
│   └── SETUP.md                 # Local setup and workflow
├── public/                      # Static assets served as-is at root
│   ├── .htaccess                # Apache caching, gzip, clean URLs & security
│   ├── favicon.ico              # Legacy favicon
│   ├── favicon.svg              # Modern vector favicon
│   └── robots.txt               # Search crawler instructions
├── src/
│   ├── assets/                  # Optimized image & media assets (processed by astro:assets)
│   │   └── hero-illustration.svg
│   ├── components/              # Reusable UI components
│   │   ├── Footer.astro         # Site footer
│   │   └── Header.astro         # Navigation header
│   ├── content/                 # Content collections markdown & MDX files
│   │   └── blog/                # Blog posts
│   │       └── hello-world.mdx
│   ├── layouts/                 # Page layout wrappers
│   │   └── BaseLayout.astro     # Core HTML shell, SEO, OG tags, accessibility
│   ├── lib/                     # Utilities and helpers
│   │   ├── constants.ts         # Navigation links, site metadata
│   │   └── seo.ts               # Canonical and SEO title formatting
│   ├── pages/                   # File-based routing
│   │   ├── 404.astro            # Custom 404 error page
│   │   ├── about.astro          # About page
│   │   ├── index.astro          # Landing / Home page
│   │   └── blog/
│   │       ├── [...slug].astro  # Dynamic post template
│   │       └── index.astro      # Blog post index
│   ├── styles/                  # CSS styles and design tokens
│   │   └── tokens.css           # Tailwind base + custom CSS variables
│   └── content.config.ts        # Content Layer collection schemas (Zod)
├── AGENTS.md                    # AI pair programming guidelines & conventions
├── astro.config.mjs             # Astro project configuration
├── package.json                 # Dependencies and build scripts
├── tailwind.config.mjs          # Tailwind design token mapping
└── tsconfig.json                # TypeScript strict configuration
```

---

## 2. Core Architectural Principles

### A. Zero Client-Side JavaScript by Default
- No framework runtimes (React, Vue, Svelte) are loaded on the client unless an explicit `client:*` directive is attached.
- All template logic, layout generation, and Markdown rendering execute strictly at build time.
- The resulting HTML page size is minimal, leading to instant First Contentful Paint (FCP) and zero layout shifts (CLS).

### B. Shared Hosting Compatibility
- The build targets pure static HTML (`output: 'static'` in `astro.config.mjs`).
- Does not require Node.js, Express, or persistent server processes.
- Can be uploaded directly to Hostinger, cPanel, Apache, Nginx, GitHub Pages, or Netlify.

### C. Design Tokens & CSS Architecture
- Design tokens reside in `src/styles/tokens.css` as standard CSS custom properties (`--color-brand-*`, `--color-surface-*`, `--color-text-*`).
- `tailwind.config.mjs` maps these variables to utility classes (`bg-surface-bg`, `text-content-primary`, `bg-brand-600`).
- Switching themes, re-branding, or tweaking spacing takes place in one centralized CSS file without refactoring HTML markup.

### D. Content Layer & Type Safety
- Blog and article content is powered by Astro's Content Layer API.
- Frontmatter schemas are strictly enforced via Zod (`z.object({ ... })`).
- Build errors are triggered immediately if required metadata (e.g. `title`, `pubDate`) is missing or invalid.
