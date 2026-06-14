const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

function assertInsideRoot(target) {
  const resolved = path.resolve(target);
  if (!resolved.startsWith(root + path.sep)) {
    throw new Error(`Refusing to write outside project root: ${resolved}`);
  }
  return resolved;
}

function copyFile(relativePath) {
  fs.copyFileSync(path.join(root, relativePath), path.join(dist, relativePath));
}

function copyDirectory(relativePath) {
  fs.cpSync(path.join(root, relativePath), path.join(dist, relativePath), {
    recursive: true,
  });
}

assertInsideRoot(dist);
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of ["index.html", "styles.css", "script.js", "_redirects"]) {
  copyFile(file);
}

copyDirectory("assets");

console.log("Static site built to dist");
