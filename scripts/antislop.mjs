// Anti-slop linter for living docs.
//   node scripts/antislop.mjs          fix in place
//   node scripts/antislop.mjs --check  report only, exit 1 if issues
// Checks: em dash usage (" — ") and banned marketing buzzwords.
import fs from "node:fs";
import path from "node:path";

const CHECK = process.argv.includes("--check");
const BANNED = /\b(seamless|revolutionary|cutting-edge|next-generation|game-changing|blazing fast)\b/gi;
// Quoted occurrences are documented pattern examples (slop tables), not actual slop.
const files = [];

function walk(dir) {
  let entries = [];
  try { entries = fs.readdirSync(dir); } catch { return; }
  for (const e of entries) {
    const p = path.join(dir, e);
    if (fs.statSync(p).isDirectory()) {
      if (!p.includes("node_modules") && !p.includes(".git")) walk(p);
    } else if (/\.md$/.test(e)) {
      files.push(p);
    }
  }
}

walk("skills");
walk("docs/i18n");
files.push("README.md", "CHANGELOG.md", "AcidMind.md", "CONTRIBUTING.md");

let issues = 0;
for (const f of files) {
  let c = fs.readFileSync(f, "utf8");
  const emCount = (c.match(/ — /g) || []).length;
  const buzz = [...c.matchAll(BANNED)]
    .filter((m) => c[m.index - 1] !== '"') // skip quoted pattern examples
    .map((m) => m[0]);
  const hasIssues = emCount > 0 || buzz.length > 0;
  if (!hasIssues) continue;
  issues++;
  console.log(`[slop] ${f}: ${emCount} em dash(es), ${buzz.length} banned buzzword(s)`);
  for (const b of buzz) console.log(`       banned: "${b}"`);
  if (!CHECK) {
    c = c.replace(/ — /g, ", ");
    c = c.replace(/^— /gm, "");
    fs.writeFileSync(f, c);
  }
}

if (CHECK && issues > 0) process.exitCode = 1;
console.log(issues === 0 ? "anti-slop: clean" : `anti-slop: ${issues} file(s) ${CHECK ? "with issues" : "fixed"}`);
