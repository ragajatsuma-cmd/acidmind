#!/usr/bin/env node
// Single source of truth sync.
// Canonical facts: skills = folders in skills/ containing SKILL.md;
// version = first "## [x.y.z]" header in CHANGELOG.md.
// Syncs: VERSION file, README badges, and warns on drift elsewhere.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const fail = (msg) => {
  console.error(`  [drift] ${msg}`);
  process.exitCode = 1;
};

// --- facts ---
const skills = readdirSync("skills").filter((d) => {
  try {
    readFileSync(`skills/${d}/SKILL.md`, "utf8");
    return true;
  } catch {
    return false;
  }
});

const changelog = readFileSync("CHANGELOG.md", "utf8");
const versionMatch = changelog.match(/^## \[(\d+\.\d+\.\d+)\]/m);
if (!versionMatch) fail("CHANGELOG.md has no '## [x.y.z]' header");
const version = versionMatch ? versionMatch[1] : null;

console.log(`facts: ${skills.length} skills, v${version}`);

// --- VERSION file ---
if (version) {
  const current = readFileSync("VERSION", "utf8").trim();
  if (current !== version) {
    writeFileSync("VERSION", `${version}\n`);
    console.log(`  synced: VERSION ${current} -> ${version}`);
  } else {
    console.log("  ok: VERSION matches CHANGELOG");
  }
}

// --- README badges ---
let readme = readFileSync("README.md", "utf8");
readme = readme.replace(
  /version-\d+\.\d+\.\d+-orange/,
  `version-${version}-orange`,
);
readme = readme.replace(
  /skills-\d+-8a2be2/,
  `skills-${skills.length}-8a2be2`,
);
writeFileSync("README.md", readme);
console.log("  synced: README badges (version, skills count)");

// --- cli/index.mjs SKILLS keys vs reality ---
const cli = readFileSync("cli/index.mjs", "utf8");
for (const skill of skills) {
  if (!new RegExp(`"${skill}"`).test(cli)) {
    fail(`cli/index.mjs SKILLS map is missing "${skill}"`);
  }
}

// --- AcidMind.md router table rows ---
const router = readFileSync("AcidMind.md", "utf8");
for (const skill of skills) {
  if (!router.includes(`skills/${skill}/SKILL.md`)) {
    fail(`AcidMind.md router table is missing "${skill}"`);
  }
}

// --- stale hardcoded counts in living docs ---
for (const [file, content] of [["README.md", readme], ["AcidMind.md", router]]) {
  for (const m of content.matchAll(/\b(seven|eight|nine) (specialist|critique|critics|skills|lenses)/gi)) {
    fail(`${file} contains hardcoded count "${m[0]}" — use the real number or neutral wording`);
  }
}

console.log(process.exitCode ? "\nsync finished WITH DRIFT" : "\nsync finished clean.");
