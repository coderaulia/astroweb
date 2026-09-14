# Local Development & Setup Guide

This guide walks you through setting up and running the Astro static boilerplate on your local machine.

---

## 1. Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: `v20.0.0` or higher (`v22+` recommended)
- **pnpm**: `v9.0.0` or higher (`v11.x` supported)

Verify versions:
```bash
node -v
pnpm -v
```

---

## 2. Clone & Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url> my-astro-site
cd my-astro-site

# Install dependencies using pnpm
pnpm install
```

---

## 3. Development Server

Start the local Astro development server:

```bash
pnpm dev
```

The site will be available at:
```
http://localhost:4321/
```

> **Background Mode**: If you are using an AI agent or automated daemon, you can start the dev server in the background:
> ```bash
> pnpm astro dev --background
> ```

---

## 4. Environment Variables (Optional)

This boilerplate is completely static by default and requires no mandatory environment variables.

If your site needs public environment variables (e.g. analytics tracking ID, custom site URL), create a `.env` file at the root:

```ini
# .env
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

Access these inside `.astro` files via:
```astro
---
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
---
```

---

## 5. Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts local development server on port 4321 |
| `pnpm build` | Compiles static site into the `dist/` directory |
| `pnpm build:zip` | Compiles static site and zips `dist/` into `dist.zip` for Hostinger |
| `pnpm preview` | Locally serves the production static build from `dist/` |
| `pnpm astro` | Runs Astro CLI commands directly |
