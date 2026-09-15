#!/usr/bin/env node

/**
 * Site Initialization Helper
 * Quick setup script to customize a new website cloned from this template.
 * Usage:
 *   pnpm init:site
 *   pnpm init:site --title "My Business" --url "https://mybiz.com" --desc "Description" --author "Team"
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rootDir = process.cwd();

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        parsed[key] = next;
        i++;
      } else {
        parsed[key] = true;
      }
    }
  }
  return parsed;
}

const flags = parseArgs();

async function prompt(question, defaultValue) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (${defaultValue}): `, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function run() {
  console.log('\n🚀 Astro Boilerplate — New Website Initializer\n');

  const siteTitle = flags.title || (await prompt('Website Title', 'My New Website'));
  const siteUrl = flags.url || (await prompt('Production URL', 'https://example.com'));
  const siteDesc = flags.desc || (await prompt('Site Description', 'High-performance static website.'));
  const author = flags.author || (await prompt('Author / Company Name', 'My Team'));
  const pkgName = flags.name || siteTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'my-astro-site';

  // Normalize site URL (no trailing slash)
  const cleanUrl = siteUrl.replace(/\/+$/, '');

  console.log('\nApplying configurations:');
  console.log(`- Title:       ${siteTitle}`);
  console.log(`- URL:         ${cleanUrl}`);
  console.log(`- Description: ${siteDesc}`);
  console.log(`- Author:      ${author}`);
  console.log(`- Package:     ${pkgName}\n`);

  // 1. Update astro.config.mjs
  const astroConfigPath = path.join(rootDir, 'astro.config.mjs');
  if (fs.existsSync(astroConfigPath)) {
    let content = fs.readFileSync(astroConfigPath, 'utf8');
    content = content.replace(/site:\s*['"`]([^'"`]*)['"`]/, `site: '${cleanUrl}'`);
    fs.writeFileSync(astroConfigPath, content, 'utf8');
    console.log('✓ Updated astro.config.mjs (site URL)');
  }

  // 2. Update src/lib/constants.ts
  const constantsPath = path.join(rootDir, 'src', 'lib', 'constants.ts');
  if (fs.existsSync(constantsPath)) {
    let content = fs.readFileSync(constantsPath, 'utf8');
    content = content.replace(/title:\s*['"`]([^'"`]*)['"`]/, `title: '${siteTitle.replace(/'/g, "\\'")}'`);
    content = content.replace(/description:\s*['"`]([^'"`]*)['"`]/, `description: '${siteDesc.replace(/'/g, "\\'")}'`);
    content = content.replace(/siteUrl:\s*['"`]([^'"`]*)['"`]/, `siteUrl: '${cleanUrl}'`);
    content = content.replace(/author:\s*['"`]([^'"`]*)['"`]/, `author: '${author.replace(/'/g, "\\'")}'`);
    fs.writeFileSync(constantsPath, content, 'utf8');
    console.log('✓ Updated src/lib/constants.ts');
  }

  // 3. Update public/robots.txt
  const robotsPath = path.join(rootDir, 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    let content = fs.readFileSync(robotsPath, 'utf8');
    content = content.replace(/Sitemap:\s*.*/, `Sitemap: ${cleanUrl}/sitemap-index.xml`);
    fs.writeFileSync(robotsPath, content, 'utf8');
    console.log('✓ Updated public/robots.txt');
  }

  // 4. Update package.json
  const pkgPath = path.join(rootDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.name = pkgName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    console.log('✓ Updated package.json (name)');
  }

  console.log('\n🎉 Setup complete! You can now run:');
  console.log('  pnpm dev        # Test your new site locally');
  console.log('  pnpm build      # Test static production build\n');
}

run().catch((err) => {
  console.error('Error during site initialization:', err);
  process.exit(1);
});
