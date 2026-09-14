# Hostinger Static Deployment Guide

This guide details the exact steps to build and deploy your static Astro website to Hostinger shared hosting (cPanel / hPanel).

---

## Architecture Overview

This project builds pure static HTML, CSS, images, and sitemaps into the `dist/` directory. No Node.js runtime, PM2 process, or SSR server is required. Hostinger's standard Apache web server serves the static assets directly.

```
Local Project (dist/)  ───>  Hostinger Apache (public_html/)
 - index.html                 - index.html
 - .htaccess                  - .htaccess (caching & compression)
 - _astro/*.css               - _astro/*.css
 - blog/                      - blog/
 - 404.html                   - 404.html
```

---

## Step 1: Configure Your Site URL

Before building, configure your canonical domain in `astro.config.mjs` and `src/lib/constants.ts`:

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://yourdomain.com', // Replace with your production domain
  output: 'static',
  // ...
});
```

---

## Step 2: Build the Production Files

Run the build script:

```bash
# Option A: Standard Build (outputs to dist/)
pnpm build

# Option B: Build and bundle into dist.zip directly
pnpm build:zip
```

After building:
- The static files are placed in `dist/`.
- If you ran `pnpm build:zip`, a `dist.zip` archive is created in your project root containing the contents of `dist/`.

---

## Step 3: Deployment Method 1 — Hostinger File Manager (Recommended)

1. Log into your **Hostinger hPanel** dashboard.
2. Navigate to **Websites** &rarr; select your domain &rarr; click **File Manager**.
3. Open the `public_html/` directory.
   - If hosting a primary domain, files go directly inside `public_html/`.
   - If hosting a subdomain or addon domain, files go inside `public_html/subdomain/`.
4. Delete any default placeholder files (e.g. `default.php`).
5. Click the **Upload** icon &rarr; choose **File** &rarr; select `dist.zip`.
6. Right-click `dist.zip` in Hostinger File Manager and choose **Extract**.
7. Extract the files directly into `public_html/`.
8. Ensure `.htaccess` is present:
   - Ensure "Show Hidden Files (dotfiles)" is enabled in File Manager settings.
   - Confirm `.htaccess` is in `public_html/`.
9. Delete `dist.zip` from `public_html/`.

---

## Step 4: Deployment Method 2 — FTP / SFTP (FileZilla / Cyberduck)

1. In Hostinger hPanel, obtain your FTP credentials under **Files** &rarr; **FTP Accounts**:
   - **Host / IP**: `ftp.yourdomain.com` (or server IP)
   - **Username**: your FTP username
   - **Port**: `21` (or `22` for SFTP)
2. Open your FTP client (e.g. FileZilla) and connect.
3. On the remote server side, navigate to `/public_html/`.
4. On your local side, navigate to the `dist/` directory.
5. Upload all files and folders inside `dist/` into `public_html/`.
6. Make sure dotfiles are visible so `.htaccess` is transferred.

---

## Step 5: .htaccess & Performance Notes

The project includes an optimized `.htaccess` inside `public/`, which Astro automatically moves to `dist/.htaccess`.

When deployed to Hostinger Apache:
- **Clean URLs**: Routes like `/about` or `/blog/hello-world/` are resolved smoothly to their respective `index.html`.
- **404 Handling**: Unmatched URLs automatically render `404.html`.
- **Gzip & Deflate Compression**: Static text assets (HTML, CSS, SVGs, JSON, XML) are compressed on the fly.
- **Browser Caching**:
  - CSS, fonts, and hashed media in `/_astro/` are given a 1-year immutable cache (`max-age=31536000`).
  - HTML documents have a 1-hour revalidation window (`max-age=3600`).

---

## Step 6: SSL / HTTPS Verification

1. In Hostinger hPanel, go to **Security** &rarr; **SSL**.
2. Verify that your **Let's Encrypt SSL** is active for your domain.
3. If you want Apache to force HTTPS redirection, open `.htaccess` in Hostinger File Manager and uncomment:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
