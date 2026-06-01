const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "minimal/index.html",
  "minimal/minimal.css",
  "minimal/minimal-slider.js",
  "styles.css",
  "script.js",
  "assets/portfolio/home-page.jpeg",
  "assets/portfolio/cover.jpg",
  "assets/portfolio/samara-bay.jpg",
  "assets/portfolio/wedding-chapel.jpg",
  "assets/portfolio/uwsun-eco-resort.jpg",
  "assets/portfolio/oblock-restaurant.jpg",
  "assets/portfolio/sacra-stuja-01.jpg",
  "assets/portfolio/sacra-stuja-02.jpg",
  "assets/portfolio/sacra-stuja-03.jpg",
  "assets/portfolio/sacra-stuja-04.jpg",
  "assets/portfolio/sacra-stuja-05.jpg",
  "assets/portfolio/batuan-villa-01.jpg",
  "assets/portfolio/batuan-villa-02.jpg",
  "assets/portfolio/batuan-villa-03.jpg",
  "assets/portfolio/batuan-villa-04.jpg",
  "assets/portfolio/batuan-villa-05.jpg",
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
assert.ok(!html.includes("<small>architecture</small>"), "fixed logo should not include architecture label");
assert.ok(css.includes("mix-blend-mode"), "fixed header and logo should use the clean transparent scroll style");
assert.ok(!css.includes("backdrop-filter"), "fixed navigation should not use the floating glass background");
assert.ok(html.includes('class="hero-statement"'), "hero wording should sit below the home image");
assert.ok(html.includes('href="minimal/"'), "homepage should link to the minimal version");
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
  "A calmer way to explore Bali as a next chapter.",
  "Audience focus",
  "A studio shaped by desire, translated into architecture.",
  "About the Studio",
  "Design rooted in place",
  'id="collaboration"',
  "portfolio-backed expertise",
  "Considering Bali as your next chapter?",
  'id="consultation"',
  "Who this is for",
  "Different futures, one careful starting point.",
  'id="audience"',
  "Trust &amp; Guidance",
  "Calm guidance before design decisions.",
  'id="trust"',
  "Design Process",
  "From first conversation to a clear architectural direction.",
  'href="#process"',
  'id="process"',
  "About Dezier Studio",
  "Design rooted in desire.",
  'href="#about-dezier-studio"',
  'id="about-dezier-studio"',
  "Dezier Studio by Laksana Matra",
  "Strategy meets design",
  "Plot",
  "plot",
];

for (const text of removedText) {
  assert.ok(!html.includes(text), `index.html should not include ${text}`);
}

for (const text of [
  "Designing Your Future Home in Bali",
  "Dezier Studio",
  "Laksana Matra",
  "design-led residences",
  "Location / City",
  "Private residence",
  "Project type",
  "Samara Bay Residence",
  "Sacra|Stuja Cafe &amp; Resto",
  "Hospitality / Cafe &amp; Resto",
  "Batuan Villa",
  "Private Residence",
  "O Block F&amp;B Restaurant",
  "dezierarchitect@gmail.com",
  "assets/portfolio/home-page.jpeg",
]) {
  assert.ok(html.includes(text), `index.html should include ${text}`);
}

for (const image of [
  "assets/portfolio/palm-grove.jpg",
  "assets/portfolio/kiko-sejuk.jpg",
  "assets/portfolio/uwsun-eco-resort.jpg",
  "assets/portfolio/samara-bay.jpg",
  "assets/portfolio/oblock-restaurant.jpg",
  "assets/portfolio/sacra-stuja-01.jpg",
  "assets/portfolio/sacra-stuja-02.jpg",
  "assets/portfolio/sacra-stuja-03.jpg",
  "assets/portfolio/sacra-stuja-04.jpg",
  "assets/portfolio/sacra-stuja-05.jpg",
  "assets/portfolio/batuan-villa-01.jpg",
  "assets/portfolio/batuan-villa-02.jpg",
  "assets/portfolio/batuan-villa-03.jpg",
  "assets/portfolio/batuan-villa-04.jpg",
  "assets/portfolio/batuan-villa-05.jpg",
]) {
  assert.ok(html.includes(image), `index.html should reference ${image}`);
}

for (const id of [
  'id="portfolio"',
  'id="why-bali"',
  'id="contact"',
]) {
  assert.ok(html.includes(id), `index.html should include section ${id}`);
}

const minimalHtml = fs.readFileSync(path.join(root, "minimal", "index.html"), "utf8");
const minimalCss = fs.readFileSync(path.join(root, "minimal", "minimal.css"), "utf8");
const minimalSliderJs = fs.readFileSync(path.join(root, "minimal", "minimal-slider.js"), "utf8");

assert.ok(minimalHtml.includes('<a class="wordmark" href="../">Dezier Studio</a>'), "minimal header wordmark should be Dezier Studio");
assert.ok(!minimalHtml.includes('<a class="wordmark" href="../">Bali Design-Led Property</a>'), "minimal header wordmark should not use Bali Design-Led Property");
assert.ok(!minimalHtml.includes('aria-label="Minimal page sections"'), "minimal header menu should be removed");
assert.ok(!minimalHtml.includes('class="hero-grid"'), "minimal hero text block should be removed");
assert.ok(!minimalHtml.includes("Alternative route / editorial version"), "minimal hero kicker should be removed");
assert.ok(!minimalHtml.includes('id="about"'), "minimal about section should be removed");
assert.ok(!minimalHtml.includes("Property thinking, held quietly."), "minimal about heading should be removed");
assert.ok(!minimalHtml.includes('id="approach"'), "minimal approach section should be removed");
assert.ok(!minimalHtml.includes("We design for place, not decoration."), "minimal manifesto content should be removed");
assert.ok(!minimalHtml.includes('aria-labelledby="collaboration-title"'), "minimal collaboration section should be removed");
assert.ok(!minimalHtml.includes("Strategy defines the brief. Architecture gives it form."), "minimal collaboration heading should be removed");
assert.ok(!minimalHtml.includes("Project Index"), "minimal project index should be removed");
assert.ok(!minimalHtml.includes("Canberra, June 2026"), "minimal canberra section should be removed");
assert.ok(!minimalHtml.includes("Send enquiry"), "minimal contact form should be removed");
assert.ok(minimalCss.includes("scroll-snap-type: x mandatory;"), "minimal projects should use horizontal sliders");
assert.ok(minimalCss.includes("object-fit: contain;"), "minimal slider images should fit inside the screen");
assert.ok(minimalCss.includes("background: transparent;"), "minimal header should not create a white bar over the hero");
assert.ok(minimalCss.includes("height: 100svh;"), "minimal hero image should fill the first screen from the top");
assert.ok(minimalCss.includes("--gallery: #10100f;"), "minimal sliders should use a dark gallery canvas");
assert.ok(minimalHtml.includes('<script src="minimal-slider.js" defer></script>'), "minimal page should load the auto slider script");
assert.ok(minimalSliderJs.includes("setInterval(advance, slideInterval);"), "minimal sliders should auto-advance");

for (const text of [
  "Sacra|Stuja Cafe &amp; Resto",
  "Batuan Villa",
]) {
  assert.ok(minimalHtml.includes(text), `minimal/index.html should include ${text}`);
}

for (const text of [
  "official partnership",
  "sponsorship",
  "ROI",
  "testimonial",
  "gradient",
]) {
  assert.ok(!minimalHtml.includes(text), `minimal/index.html should avoid ${text}`);
}

for (const image of [
  "../assets/portfolio/home-page.jpeg",
  "../assets/portfolio/sacra-stuja-01.jpg",
  "../assets/portfolio/sacra-stuja-02.jpg",
  "../assets/portfolio/sacra-stuja-03.jpg",
  "../assets/portfolio/sacra-stuja-04.jpg",
  "../assets/portfolio/sacra-stuja-05.jpg",
  "../assets/portfolio/batuan-villa-01.jpg",
  "../assets/portfolio/batuan-villa-02.jpg",
  "../assets/portfolio/batuan-villa-03.jpg",
  "../assets/portfolio/batuan-villa-04.jpg",
  "../assets/portfolio/batuan-villa-05.jpg",
]) {
  assert.ok(minimalHtml.includes(image), `minimal/index.html should reference ${image}`);
}

console.log("site content checks passed");
