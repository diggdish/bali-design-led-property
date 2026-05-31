const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "assets/portfolio/cover.jpg",
  "assets/portfolio/samara-bay.jpg",
  "assets/portfolio/wedding-chapel.jpg",
  "assets/portfolio/uwsun-eco-resort.jpg",
  "assets/portfolio/oblock-restaurant.jpg",
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const phrase = (...codes) => String.fromCharCode(...codes);

assert.ok(!html.includes('class="brand-mark"'), "header brand block should be removed");
assert.ok(
  !html.includes("<span>Bali Design-Led Property</span>"),
  "visible header label should be removed"
);
assert.ok(!html.includes("<footer"), "footer should be removed");
assert.ok(html.includes('class="scroll-logo"'), "fixed Dezier Studio logo should be present");
assert.ok(!css.includes("mix-blend-mode"), "fixed header and logo should not use blend mode");
assert.ok(css.includes("backdrop-filter"), "fixed navigation should have a readable floating background");
const removedText = [
  phrase(80, 114, 105, 118, 97, 116, 101, 32, 99, 111, 110, 99, 101, 112, 116, 32, 102, 111, 114, 32, 65, 117, 115, 116, 114, 97, 108, 105, 97, 110, 32, 108, 105, 102, 101, 115, 116, 121, 108, 101, 32, 105, 110, 118, 101, 115, 116, 111, 114, 115),
  phrase(80, 114, 101, 112, 97, 114, 101, 100, 32, 102, 111, 114, 32, 99, 111, 110, 118, 101, 114, 115, 97, 116, 105, 111, 110, 115, 32, 97, 114, 111, 117, 110, 100, 32, 116, 104, 101, 32, 65, 76, 71, 65, 32, 78, 97, 116, 105, 111, 110, 97, 108, 32, 71, 101, 110, 101, 114, 97, 108, 32, 65, 115, 115, 101, 109, 98, 108, 121),
  phrase(67, 97, 110, 98, 101, 114, 114, 97, 32, 47, 32, 50, 51, 45, 50, 54, 32, 74, 117, 110, 101, 32, 50, 48, 50, 54),
  phrase(65, 117, 115, 116, 114, 97, 108, 105, 97, 110, 32, 112, 114, 111, 102, 101, 115, 115, 105, 111, 110, 97, 108, 115),
  phrase(65, 117, 115, 116, 114, 97, 108, 105, 97),
  phrase(65, 117, 115, 116, 114, 97, 108, 105, 97, 110, 115),
  phrase(108, 111, 99, 97, 108, 32, 103, 111, 118, 101, 114, 110, 109, 101, 110, 116, 32, 108, 101, 97, 100, 101, 114, 115),
  phrase(115, 111, 111, 110, 45, 116, 111, 45, 98, 101, 32, 114, 101, 116, 105, 114, 101, 101, 115),
  phrase(83, 111, 111, 110, 45, 116, 111, 45, 98, 101, 32, 114, 101, 116, 105, 114, 101, 101, 115),
  phrase(114, 101, 116, 105, 114, 101, 109, 101, 110, 116),
  phrase(105, 110, 118, 101, 115, 116, 109, 101, 110, 116),
  phrase(65, 110, 100, 105, 107, 97, 32, 80, 114, 97, 98, 97),
  phrase(65, 110, 100, 105, 107, 97),
  phrase(68, 119, 105, 107),
  "Strategy meets design",
  "Plot",
  "plot",
];

for (const text of removedText) {
  assert.ok(!html.includes(text), `index.html should not include ${text}`);
}

for (const text of [
  "Designing Your Future Home in Bali",
  "About Dezier Studio",
  "Dezier Studio",
  "Latin",
  "desire",
  "Laksana Matra",
  "Design rooted in place",
  "international clients",
  "global clients",
  "design-led residences",
  "Discover",
  "Brief",
  "Design",
  "Develop",
  "Experience",
  "Homeowners",
  "Second Homes",
  "Long-Stay Living",
  "Boutique Villas",
  "Family Retreats",
  "Book a Private Consultation",
  "Download Portfolio",
  "Location / City",
  "Private residence",
  "Project type",
  "Samara Bay Residence",
  "O Block F&amp;B Restaurant",
  "dezierarchitect@gmail.com",
]) {
  assert.ok(html.includes(text), `index.html should include ${text}`);
}

for (const image of [
  "assets/portfolio/palm-grove.jpg",
  "assets/portfolio/kiko-sejuk.jpg",
  "assets/portfolio/uwsun-eco-resort.jpg",
  "assets/portfolio/samara-bay.jpg",
  "assets/portfolio/oblock-restaurant.jpg",
]) {
  assert.ok(html.includes(image), `index.html should reference ${image}`);
}

for (const id of [
  'id="context"',
  'id="about-dezier-studio"',
  'id="collaboration"',
  'id="portfolio"',
  'id="process"',
  'id="why-bali"',
  'id="audience"',
  'id="trust"',
  'id="consultation"',
  'id="contact"',
]) {
  assert.ok(html.includes(id), `index.html should include section ${id}`);
}

console.log("site content checks passed");
