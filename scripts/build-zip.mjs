import fs from 'node:fs';
import path from 'node:path';
import { ZipArchive } from 'archiver';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const zipPath = path.join(rootDir, 'dist.zip');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ directory not found. Please run "pnpm build" first.');
  process.exit(1);
}

// Remove existing dist.zip if present
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

const output = fs.createWriteStream(zipPath);
const archive = new ZipArchive({
  zlib: { level: 9 }, // Maximum compression
});

output.on('close', () => {
  const sizeMb = (archive.pointer() / (1024 * 1024)).toFixed(2);
  console.log(`\n📦 Successfully created dist.zip (${sizeMb} MB) ready for Hostinger upload!`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Include all files from dist including hidden files like .htaccess
archive.glob('**/*', {
  cwd: distDir,
  dot: true,
});

await archive.finalize();
