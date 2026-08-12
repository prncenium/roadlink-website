/**
 * Optimise source artwork into web-ready WebP.
 *
 * Source PNGs live in `src/assets/source/` (kept out of the bundle — nothing
 * imports them). The generated .webp files in `src/assets/` are what the app
 * imports, so Vite hashes and cache-busts them.
 *
 * Run: npm run images
 */
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(root, 'src/assets/source');
const OUT = join(root, 'src/assets');

/** Per-image output settings. Widths are the largest rendered size × ~1.6 for HiDPI. */
const targets = {
  'hero-background': { width: 2200, quality: 72 },
  'hero-inspection': { width: 2200, quality: 78 },
  'services-background': { width: 2400, quality: 70 },
  // Card slots render at ~240px wide; 1200 covers retina with room to spare.
  'service-site-inspection': { width: 1200, quality: 78 },
  'service-progress-reports': { width: 1200, quality: 78 },
  'process-diagram': { width: 1400, quality: 80 },
  'about-hero': { width: 2400, quality: 76 },
  'about-team': { width: 1400, quality: 78 },
  // The source JPEG carries a printed border and white margin; trim it
  // or the mark renders as a boxed card in the navbar.
  logo: { width: 600, quality: 92, trim: 20 },
  'sectors-hero': { width: 2400, quality: 76 },
  'sectors-background': { width: 2400, quality: 70 },
  'sectors-capability': { width: 1400, quality: 78 },
};

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (files.length === 0) {
  console.log('No source images found in src/assets/source/');
  process.exit(0);
}

for (const file of files) {
  const { name } = parse(file);
  const cfg = targets[name] ?? { width: 1920, quality: 78 };
  const inPath = join(SRC, file);
  const outPath = join(OUT, `${name}.webp`);

  const before = (await stat(inPath)).size;

  let pipeline = sharp(inPath);
  if (cfg.trim) pipeline = pipeline.trim({ threshold: cfg.trim });

  await pipeline
    .resize({ width: cfg.width, withoutEnlargement: true })
    .webp({ quality: cfg.quality, effort: 6 })
    .toFile(outPath);

  const after = (await stat(outPath)).size;
  const saved = (100 - (after / before) * 100).toFixed(1);

  console.log(
    `${name.padEnd(18)} ${kb(before).padStart(9)} → ${kb(after).padStart(8)}  (-${saved}%)  w=${cfg.width}`
  );
}
