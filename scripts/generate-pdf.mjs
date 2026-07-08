import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, '..', 'docs', 'wspolna-brochure.html');
const outPath  = join(__dirname, '..', 'docs', 'assets', 'R2-Wspolna-Brochure.pdf');

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await browser.newPage();

await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log('PDF generated:', outPath);
