// Fails when a std module has no page in the docs, so the site keeps up with the library.
//
//   PELAGO_SRC=../pelago node scripts/check-std-coverage.mjs
//
// A module `compiler/std/<name>.pel` counts as documented when a page under library/std is named
// `<name>.md`, or some page mentions `std.<name>`. Modules that are only an implementation detail go in `internal`.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const docs = join(here, "..", "content", "docs", "en-US");
const src = join(process.env.PELAGO_SRC || join(here, "..", "..", "..", "pelago"), "compiler", "std");
const internal = new Set([]);

if (!existsSync(src)) {
  console.error(`std sources not found at ${src} (set PELAGO_SRC to a pelago checkout)`);
  process.exit(2);
}

const pages = [];
(function walk(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.mdx?$/.test(n)) pages.push({ name: n.replace(/\.mdx?$/, ""), text: readFileSync(p, "utf8") });
  }
})(docs);

const missing = [];
for (const f of readdirSync(src)) {
  if (!f.endsWith(".pel")) continue;
  const mod = f.slice(0, -4);
  if (internal.has(mod)) continue;
  const ok = pages.some((p) => p.name === mod) || pages.some((p) => p.text.includes(`std.${mod}`));
  if (!ok) missing.push(mod);
}
if (missing.length) {
  console.error(`std modules with no docs page: ${missing.join(", ")}`);
  process.exit(1);
}
console.log("every std module has a docs page");
