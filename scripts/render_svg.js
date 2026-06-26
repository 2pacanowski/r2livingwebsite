// Dev-only helper: rasterize an SVG file to PNG at a fixed pixel scale, 1 SVG-unit = `scale` px.
// Usage: node render_svg.js <input.svg> <output.png> <scale>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { readFileSync } = require('fs');

const [, , inputPath, outputPath, scaleArg] = process.argv;
const scale = parseFloat(scaleArg || '4');

const svg = readFileSync(inputPath, 'utf8');
const vbMatch = svg.match(/viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/);
const vbW = Number(vbMatch[3]);
const vbH = Number(vbMatch[4]);

const width = Math.round(vbW * scale);
const height = Math.round(vbH * scale);

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto('file://' + inputPath);
  await page.evaluate(({ w, h }) => {
    const svg = document.documentElement;
    svg.style.width = w + 'px';
    svg.style.height = h + 'px';
    svg.style.background = '#fff';
    if (document.body) document.body.style.margin = '0';
  }, { w: width, h: height });
  await page.waitForTimeout(200);
  await page.screenshot({ path: outputPath });
  await browser.close();
  console.log(JSON.stringify({ vbW, vbH, width, height, scale }));
})();
