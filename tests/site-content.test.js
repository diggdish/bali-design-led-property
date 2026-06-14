const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "_archive/minimal/index.html",
  "_archive/minimal/minimal.css",
  "_archive/minimal/minimal-slider.js",
  "assets/portfolio/home-page.jpeg",
  "assets/portfolio/home-page-2.jpeg",
  "assets/portfolio/home-page-3.jpeg",
  "assets/portfolio/home-page-4.jpeg",
  "assets/portfolio/the-saturday-villas-01.jpg",
  "assets/portfolio/laksana-matra.jpg",
];

for (let index = 1; index <= 11; index += 1) {
  requiredFiles.push(`assets/portfolio/sacra-stuja-${String(index).padStart(2, "0")}.jpg`);
}

for (let index = 1; index <= 29; index += 1) {
  requiredFiles.push(`assets/portfolio/batuan-villa-${String(index).padStart(2, "0")}.jpg`);
}

for (let index = 1; index <= 14; index += 1) {
  requiredFiles.push(`assets/portfolio/kedisan-boutique-hotel-${String(index).padStart(2, "0")}.jpg`);
}

for (let index = 1; index <= 12; index += 1) {
  requiredFiles.push(`assets/portfolio/molo-resto-${String(index).padStart(2, "0")}.jpg`);
}

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const archivedHtml = fs.readFileSync(path.join(root, "_archive", "minimal", "index.html"), "utf8");
const archivedCss = fs.readFileSync(path.join(root, "_archive", "minimal", "minimal.css"), "utf8");
const archivedJs = fs.readFileSync(path.join(root, "_archive", "minimal", "minimal-slider.js"), "utf8");
const netlify = fs.readFileSync(path.join(root, "netlify.toml"), "utf8");
const netlifyIgnore = fs.readFileSync(path.join(root, ".netlifyignore"), "utf8");

assert.ok(!fs.existsSync(path.join(root, "minimal")), "minimal folder should be archived, not live at root");
assert.ok(netlifyIgnore.includes("_archive/"), "archived pages should not be deployed to Netlify");

assert.ok(html.includes('<link rel="stylesheet" href="styles.css" />'), "root should load root stylesheet");
assert.ok(html.includes('<script src="script.js" defer></script>'), "root should load root script");
assert.ok(!html.includes("../assets/"), "root should not reference parent-relative assets");
assert.ok(!html.includes("minimal.css"), "root should not reference minimal stylesheet");
assert.ok(!html.includes("minimal-slider.js"), "root should not reference minimal script");
assert.ok(!html.includes('href="../"'), "root wordmark should not point to parent directory");
assert.ok(html.includes('<a class="wordmark" href="/">Dezier Studio</a>'), "root wordmark should point home");

for (const text of [
  'class="minimal-hero hero-slider"',
  'class="sidebar-menu"',
  'class="sidebar-row-toggle"',
  "Laksana Matra Karowista",
  "Published design: 1st Winner, Atma Jaya University",
  "Sacra|Stuja Cafe &amp; Resto",
  "Batuan Villa",
  "The Saturday Villas",
  "Kedisan Boutique Hotel",
  "Molo Resto",
  "https://wa.me/6281338716636",
  "dezier.studio",
]) {
  assert.ok(html.includes(text), `root index.html should include ${text}`);
}

for (const image of [
  "assets/portfolio/home-page.jpeg",
  "assets/portfolio/home-page-4.jpeg",
  "assets/portfolio/the-saturday-villas-01.jpg",
  "assets/portfolio/laksana-matra.jpg",
  "assets/portfolio/sacra-stuja-11.jpg",
  "assets/portfolio/batuan-villa-29.jpg",
  "assets/portfolio/kedisan-boutique-hotel-14.jpg",
  "assets/portfolio/molo-resto-12.jpg",
]) {
  assert.ok(html.includes(image), `root index.html should reference ${image}`);
}

for (const text of [
  "scroll-snap-type: y mandatory;",
  "position: fixed;",
  ".hero-dots",
  ".slider-dots",
  ".about-laksana",
  "object-fit: contain;",
]) {
  assert.ok(css.includes(text), `root styles.css should include ${text}`);
}

for (const text of [
  "setHeroSlide",
  'dots.className = "slider-dots";',
  "setActiveDot",
  "setInterval(advance, slideInterval);",
]) {
  assert.ok(js.includes(text), `root script.js should include ${text}`);
}

assert.ok(archivedHtml.includes("../assets/portfolio/home-page.jpeg"), "archived minimal page should keep subdirectory asset paths");
assert.strictEqual(css, archivedCss, "root stylesheet should match the archived minimal stylesheet");
assert.strictEqual(js, archivedJs, "root script should match the archived minimal script");
assert.ok(netlify.includes('publish = "."'), "Netlify should publish the static root");

console.log("site content checks passed");
