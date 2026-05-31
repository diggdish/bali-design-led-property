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

assert.ok(!html.includes('class="brand-mark"'), "header brand block should be removed");
assert.ok(
  !html.includes("<span>Bali Design-Led Property</span>"),
  "visible header label should be removed"
);

for (const text of [
  "Designing Your Future Home in Bali",
  "ALGA National General Assembly",
  "23-26 June 2026",
  "Canberra",
  "Andika Praba",
  "Dwik",
  "Strategy meets design",
  "Australian professionals",
  "qualified legal and financial advisors",
  "Discover",
  "Assess",
  "Design",
  "Build Plan",
  "Own / Stay / Operate",
  "Soon-to-be retirees",
  "Book a Private Consultation",
  "Download Portfolio",
  "Country / City",
  "Retirement home",
  "Budget range",
  "Timeline",
  "Samara Bay Plot B41",
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
  'id="collaboration"',
  'id="portfolio"',
  'id="investment"',
  'id="why-bali"',
  'id="audience"',
  'id="trust"',
  'id="consultation"',
  'id="contact"',
]) {
  assert.ok(html.includes(id), `index.html should include section ${id}`);
}

console.log("site content checks passed");
