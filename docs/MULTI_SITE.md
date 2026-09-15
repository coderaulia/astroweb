# Multi-Site Architecture & Deployment Guide

This guide explains how to use this boilerplate as a **GitHub Template** to spin up unlimited independent websites, each deploying automatically to its own Hostinger website or alternative hosting provider via GitHub Actions.

---

## Architecture: The Template Repository Pattern

Rather than cramming multiple unrelated client websites into a single large repository (monorepo) with entangled secrets, the **Template Repository** approach gives you:

- **Complete Isolation**: Each website has its own repository, git history, and domain configuration.
- **Secure Credentials**: FTP passwords and API tokens are scoped strictly to the respective website's GitHub Secrets.
- **Independent CI/CD**: Pushing changes to Website A will never trigger or risk breaking Website B.
- **Client Handoff Ready**: You can transfer repository ownership directly to a client at any time.

```
coderaulia/astroweb (Template Repository)
       │
       ├──> [Repo] client-bakery.com  ──(GitHub Action)──> Hostinger (public_html/)
       ├──> [Repo] client-dentist.com ──(GitHub Action)──> Hostinger (domains/dentist.com/public_html/)
       └──> [Repo] personal-blog.com  ──(GitHub Action)──> Cloudflare Pages / GitHub Pages
```

---

## Step 1: Enable Template Repository on GitHub

1. Open your repository: [https://github.com/coderaulia/astroweb](https://github.com/coderaulia/astroweb).
2. Click **Settings** (tab at the top right).
3. Under the **General** settings, find the **Template repository** checkbox.
4. Check the box **"Template repository"**.

Now, a green **"Use this template"** button will appear on the repository home page.

---

## Step 2: Create a New Website from the Template

1. Click **Use this template** &rarr; **Create a new repository**.
2. Set the repository name (e.g. `client-cafe` or `portfolio-2026`).
3. Choose Public or Private.
4. Click **Create repository from template**.

---

## Step 3: Initialize and Personalize the New Website

Clone your new website locally:

```bash
git clone https://github.com/your-username/your-new-website.git
cd your-new-website

# Install dependencies
pnpm install

# Run the interactive site initializer
pnpm init:site
```

The script will prompt you for:
- **Website Title** (e.g. `Artisan Bakery`)
- **Production URL** (e.g. `https://artisanbakery.com`)
- **Site Description**
- **Author / Company Name**

It automatically updates `astro.config.mjs`, `src/lib/constants.ts`, `public/robots.txt`, and `package.json`.

---

## Step 4: Configure Hostinger Auto-Deployment

Every new repository includes `.github/workflows/deploy-hostinger.yml`.

### 1. Retrieve Hostinger FTP Details
1. Log into **Hostinger hPanel**.
2. Navigate to **Websites** &rarr; choose your target domain &rarr; **Manage**.
3. In the sidebar, search for **FTP Accounts** (under *Files*).
4. Note your credentials:
   - **FTP IP / HostName**: (e.g. `ftp.yourdomain.com` or the IP address)
   - **FTP Username**: (e.g. `u123456789`)
   - **FTP Password**: (the password set for the account)
   - **FTP Root Path**:
     - For the primary domain: `public_html/`
     - For addon domains: `domains/yourdomain.com/public_html/`
     - For subdomains: `public_html/subdomain/`

### 2. Add Secrets to Your GitHub Repository
1. In your new GitHub repository, go to **Settings** &rarr; **Secrets and variables** &rarr; **Actions**.
2. Click **New repository secret** and add:
   - `FTP_SERVER`: Your Hostinger FTP host or IP.
   - `FTP_USERNAME`: Your Hostinger FTP username.
   - `FTP_PASSWORD`: Your Hostinger FTP password.
3. *(Optional)* If deploying to an addon domain or subdirectory instead of standard `public_html/`, add a secret or repository variable:
   - `FTP_SERVER_DIR`: e.g. `domains/yourdomain.com/public_html/`

### 3. Push to Deploy!
Commit and push your changes to branch `main`:

```bash
git add .
git commit -m "feat: customize site for client"
git push origin main
```

GitHub Actions will automatically run:
1. `pnpm install`
2. `pnpm build` (compiles 0-JS static files)
3. Synchronize `dist/` directly to Hostinger via FTP.

---

## Step 5: Deploying to Alternative Providers

If you have sites that do not use Hostinger, this boilerplate is 100% compatible with all major static hosting platforms:

### A. GitHub Pages (Pre-Configured)
1. Go to your repository **Settings** &rarr; **Pages**.
2. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
3. In the **Actions** tab, choose **Deploy to GitHub Pages** &rarr; click **Run workflow**.

### B. Cloudflare Pages
1. In Cloudflare Dashboard, go to **Workers & Pages** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**.
2. Select your repository.
3. Build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**. (Zero configuration required!)

### C. Netlify or Vercel
1. Connect your GitHub repository.
2. Build command: `pnpm build`
3. Publish directory: `dist`
4. Deploy site.
