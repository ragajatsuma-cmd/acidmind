#!/usr/bin/env node
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

const DEFAULT_REPO = "ragajatsuma-cmd/acidmind";
const DEFAULT_BRANCH = "main";
const SKILLS = {
  "ruthless-critic": "General brutal review of code, arguments, plans — the default lens (/grill-me)",
  "design-critic": "Architecture & system design: coupling, abstraction, dependencies (/designcritic)",
  "feature-critic": "Feature completeness & correctness for real users (/featurecritic)",
  "badass-critic": "Performance review with concrete numbers, not vibes (/badass)",
  "heart-attack-critic": "Worst-case disaster simulation before launch / security audit (/heartattack)",
  "blackhat-critic": "Red-team penetration review of your own app, attacker-style (/blackhat)",
  "autocritic-skill": "Auto-audit of a SKILL.md before you install or ship it (/auditskill)",
  "tellingtruth-critic": "Unstructured, human, no-label honest opinion (/honest)",
  "unified-critic": "All lenses merged into one panel review with one gate (/acidmind)",
  "secondthought-critic": "Autoloaded: critiques your opinion/plan BEFORE the agent executes (/wait)",
};
const EDITIONS = {
  core: ["ruthless-critic", "design-critic", "feature-critic", "badass-critic", "secondthought-critic"],
  security: [
    "ruthless-critic",
    "design-critic",
    "feature-critic",
    "badass-critic",
    "secondthought-critic",
    "heart-attack-critic",
    "blackhat-critic",
  ],
  full: Object.keys(SKILLS),
};

const USAGE = `acidmind — install AcidMind critique skills from GitHub

Usage:
  npx github:ragajatsuma-cmd/acidmind init [dir]
  npx github:ragajatsuma-cmd/acidmind add <skill>...
  npx acidmind-cli init [dir]        (after npm publish)

Commands:
  init [dir]            Install the router + one edition of skills + pointer block
  add <skill>...        Install one or more specific skills
  router                Install just AcidMind.md (the router)
  status                Compare installed version against latest on GitHub
  update                Auto-install the latest version (preserves entry file)
  list                  List available skills and editions

Editions (--edition <name>, default: core):
  core                  ruthless, design, feature, badass — daily reviews (4 skills)
  security              core + heart-attack + blackhat — safe release (6 skills)
  full                  all nine skills including autocritic, honest, panel

Options:
  --edition <name>   core | security | full (default: core)
  --all              shorthand for --edition full
  --dest <dir>       Destination directory (default: current directory)
  --repo <owner/name>  Source GitHub repo (default: ${DEFAULT_REPO})
  --branch <name>    Source branch (default: ${DEFAULT_BRANCH})
  --force            Overwrite existing files
  --no-pointer       With init: skip adding the pointer block to AGENTS.md/CLAUDE.md
  -h, --help         Show this help

Examples:
  npx github:ragajatsuma-cmd/acidmind init
  npx github:ragajatsuma-cmd/acidmind init --edition security
  npx github:ragajatsuma-cmd/acidmind add ruthless-critic badass-critic --dest .agent
  npx github:ragajatsuma-cmd/acidmind list`;

const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

const FALLBACK_BANNER = `
@@@@@@           @@@      @@@ @@@@@@@@@@  @@@               @@@
@@@@@@@@          @@@      @@@ @@@@@@@@@@@ @@@               @@@
@@!  @@@                   @@@ @@! @@! @@!                   @@@
!@!  @!@  @@@@@@@ @@@  @@@@@@@ !@! !@! !@! @@@ @@@@@@@   @@@@@@@
@!@!@!@! @@@@@@@@ @@@ @@@@@@@@ @!! !!@ @!@ @@@ @@@@@@@@ @@@@@@@@
!!!@!!!! @@!      @@@ @@!  @@@ !@!   ! !@! @@@ @@!  @@@ @@!  @@@
!!:  !!! !@!      @!@ !@!  @!@ !!:     !!: @!@ !@!  @!@ !@!  @!@
:!:  !:! @!@!@!@! !@! !!@!@!@! :!:     :!: !@! !!@  !@! !!@!@!@!
::   ::: :!!@!@@! ::! :!!@!@@! :::     ::  ::! !:!  @:! :!!@!@@!
 :   : :  :  :! :   :  :  :! :  :      :     :  :   : :  :  :! :
`;

async function loadBanner() {
  try {
    const assetPath = new URL("../assets/banner.txt", import.meta.url);
    return await readFile(assetPath, "utf8");
  } catch {
    return FALLBACK_BANNER;
  }
}

let BANNER = FALLBACK_BANNER;

function showBanner() {
  console.log(`${GREEN}${BANNER}${RESET}`);
  console.log();
}

function parseArgs(argv) {
  const opts = {
    dest: process.cwd(),
    repo: process.env.ACIDMIND_REPO || DEFAULT_REPO,
    branch: process.env.ACIDMIND_BRANCH || DEFAULT_BRANCH,
    force: false,
    pointer: true,
    edition: "core",
  };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dest") opts.dest = argv[++i];
    else if (a === "--repo") opts.repo = argv[++i];
    else if (a === "--branch") opts.branch = argv[++i];
    else if (a === "--force") opts.force = true;
    else if (a === "--no-pointer") opts.pointer = false;
    else if (a === "--edition") opts.edition = argv[++i];
    else if (a === "--all") opts.edition = "full";
    else if (a === "-h" || a === "--help") opts.help = true;
    else positional.push(a);
  }
  return { opts, positional };
}

function editionSkills(edition) {
  const list = EDITIONS[edition];
  if (!list) {
    throw new Error(
      `Unknown edition "${edition}". Choose one of: ${Object.keys(EDITIONS).join(", ")}.`,
    );
  }
  return list;
}

const MANIFEST = ".acidmind.json";

async function fetchLatestVersion(opts) {
  const raw = await fetchFile(opts.repo, opts.branch, "VERSION");
  return raw.trim();
}

async function readManifest(dest) {
  const p = path.join(dest, MANIFEST);
  if (!(await exists(p))) return null;
  try {
    return JSON.parse(await readFile(p, "utf8"));
  } catch {
    return null;
  }
}

async function writeManifest(dest, patch) {
  const p = path.join(dest, MANIFEST);
  const prev = (await readManifest(dest)) || {};
  const next = { ...prev, ...patch, updatedAt: new Date().toISOString() };
  await writeFile(p, JSON.stringify(next, null, 2) + "\n", "utf8");
  console.log(`  manifest: ${MANIFEST} (v${next.version})`);
  return next;
}

async function fetchFile(repo, branch, remotePath) {
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${remotePath}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  return res.text();
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const POINTER_BLOCK = (routerRel) => `
## Code & Design Review
If the task involves reviewing, critiquing, auditing, or roasting code, a design,
a feature, performance, security posture, or a skill file, read \`${routerRel}\` first
to pick the right lens, then read the matching file under \`skills/\`.
For a full-panel review of everything at once, read \`skills/unified-critic/SKILL.md\`
(command: /acidmind).
At session start, also read \`skills/secondthought-critic/SKILL.md\`: from then on,
whenever the user states an opinion or plan, critique it before executing anything.
Update check (once per session): read \`.acidmind.json\`; with web access, compare its
version against https://raw.githubusercontent.com/ragajatsuma-cmd/acidmind/main/VERSION —
if newer, notify the user and offer: npx github:ragajatsuma-cmd/acidmind update
`.trimEnd();

async function installSkill(name, opts) {
  if (!SKILLS[name]) {
    throw new Error(`Unknown skill "${name}". Run \`acidmind list\` to see options.`);
  }
  const targets = [
    { remote: `skills/${name}/SKILL.md`, local: path.join(opts.dest, "skills", name, "SKILL.md") },
  ];
  const written = [];
  for (const t of targets) {
    let content;
    try {
      content = await fetchFile(opts.repo, opts.branch, t.remote);
    } catch (err) {
      throw err;
    }
    if ((await exists(t.local)) && !opts.force) {
      console.log(`  skipped (exists): ${path.relative(process.cwd(), t.local)}`);
      continue;
    }
    await mkdir(path.dirname(t.local), { recursive: true });
    await writeFile(t.local, content, "utf8");
    written.push(t.local);
    console.log(`  installed: ${path.relative(process.cwd(), t.local)}`);
  }
  return written;
}

async function addPointerBlock(opts) {
  const candidates = ["AGENTS.md", "CLAUDE.md", "GEMINI.md"];
  let entryFile = null;
  let content = "";
  for (const c of candidates) {
    const p = path.join(opts.dest, c);
    if (await exists(p)) {
      entryFile = p;
      content = await readFile(p, "utf8");
      break;
    }
  }
  const routerName = "AcidMind.md";
  if (content.includes(routerName)) {
    console.log(`pointer block already present in ${entryFile ? path.basename(entryFile) : "entry file"}`);
    return;
  }
  if (!entryFile) {
    entryFile = path.join(opts.dest, "AGENTS.md");
    content = "# AGENTS.md\n";
    console.log(`creating ${path.basename(entryFile)}`);
  } else {
    console.log(`updating ${path.basename(entryFile)}`);
  }
  content = `${content.trimEnd()}\n\n${POINTER_BLOCK(`./${routerName}`)}\n`;
  await writeFile(entryFile, content, "utf8");
}

async function cmdInit(positional, opts) {
  const dirArg = positional[0];
  if (dirArg) opts.dest = path.resolve(dirArg);
  const routerFile = "AcidMind.md";
  const routerDest = path.join(opts.dest, routerFile);

  console.log(`Installing AcidMind into ${opts.dest}\n`);

  if (!(await exists(routerDest)) || opts.force) {
    const content = await fetchFile(opts.repo, opts.branch, routerFile);
    await mkdir(opts.dest, { recursive: true });
    await writeFile(routerDest, content, "utf8");
    console.log(`  installed: ${path.relative(process.cwd(), routerDest)}`);
  } else {
    console.log(`  skipped (exists): ${path.relative(process.cwd(), routerDest)}`);
  }

  console.log("");
  for (const skill of editionSkills(opts.edition)) {
    await installSkill(skill, opts);
  }

  if (opts.pointer) {
    console.log("");
    await addPointerBlock(opts);
  }

  let version = "unknown";
  try {
    version = await fetchLatestVersion(opts);
  } catch {}
  await writeManifest(opts.dest, {
    version,
    edition: opts.edition,
    repo: opts.repo,
    branch: opts.branch,
    skills: editionSkills(opts.edition),
  });

  console.log("\nDone. Your agent now reads AcidMind.md on review requests.");
}

async function cmdAdd(positional, opts) {
  if (positional.length === 0) {
    console.error('Usage: acidmind add <skill>...   e.g. acidmind add ruthless-critic');
    process.exitCode = 1;
    return;
  }
  const installed = [];
  for (const skill of positional) {
    const written = await installSkill(skill, opts);
    installed.push(...written);
  }
  const manifest = await readManifest(opts.dest);
  if (manifest) {
    const skills = new Set([...(manifest.skills || []), ...positional.filter((s) => SKILLS[s])]);
    await writeManifest(opts.dest, { skills: [...skills] });
  }
}

async function cmdStatus(opts) {
  const manifest = await readManifest(opts.dest);
  if (!manifest) {
    console.log(`No ${MANIFEST} found in ${opts.dest}. Is AcidMind installed here? Run: acidmind init`);
    process.exitCode = 1;
    return;
  }
  let latest;
  try {
    latest = await fetchLatestVersion(opts);
  } catch (err) {
    console.error(`error: cannot reach ${opts.repo} (${err.message})`);
    process.exitCode = 1;
    return;
  }
  console.log(`installed: v${manifest.version} (edition: ${manifest.edition || "unknown"}, ${manifest.skills.length} skills)`);
  console.log(`latest:    v${latest}`);
  if (manifest.version === latest) {
    console.log("\nUp to date.");
  } else {
    console.log(`\nUpdate available. Run: npx github:ragajatsuma-cmd/acidmind update`);
    process.exitCode = 1;
  }
}

async function cmdUpdate(positional, opts) {
  const manifest = await readManifest(opts.dest);
  if (!manifest) {
    console.log(`No ${MANIFEST} found in ${opts.dest}. Run: acidmind init`);
    process.exitCode = 1;
    return;
  }
  const edition = opts.edition && opts.edition !== "core" ? opts.edition : manifest.edition || "core";
  const latest = await fetchLatestVersion(opts);
  if (manifest.version === latest && !opts.force) {
    console.log(`Already up to date (v${latest}). Use --force to reinstall anyway.`);
    return;
  }
  console.log(`Updating AcidMind: v${manifest.version} -> v${latest}\n`);

  const routerFile = "AcidMind.md";
  const routerDest = path.join(opts.dest, routerFile);
  const content = await fetchFile(opts.repo, opts.branch, routerFile);
  await mkdir(opts.dest, { recursive: true });
  await writeFile(routerDest, content, "utf8");
  console.log(`  updated: ${path.relative(process.cwd(), routerDest)}`);
  console.log("");
  for (const skill of editionSkills(edition)) {
    await installSkill(skill, { ...opts, force: true });
  }
  if (opts.pointer) {
    console.log("");
    await addPointerBlock(opts);
  }
  await writeManifest(opts.dest, {
    version: latest,
    edition,
    repo: opts.repo,
    branch: opts.branch,
    skills: editionSkills(edition),
  });
  console.log("\nUpdate complete. Changelog: https://github.com/ragajatsuma-cmd/acidmind/blob/main/CHANGELOG.md");
}

async function cmdRouter(opts) {
  const routerFile = "AcidMind.md";
  const destPath = path.join(opts.dest, routerFile);
  const content = await fetchFile(opts.repo, opts.branch, routerFile);
  await mkdir(opts.dest, { recursive: true });
  await writeFile(destPath, content, "utf8");
  console.log(`installed: ${path.relative(process.cwd(), destPath)}`);
}

function cmdList() {
  console.log("Available AcidMind skills:\n");
  for (const [name, desc] of Object.entries(SKILLS)) {
    console.log(`  ${name.padEnd(22)} ${desc}`);
  }
  console.log("\nEditions (used with init):\n");
  for (const [name, skills] of Object.entries(EDITIONS)) {
    const label = name === "core" ? "default" : name === "full" ? "everything" : "release-ready";
    console.log(`  ${name.padEnd(22)} ${skills.length} skills — ${label}`);
  }
  console.log("\nInstall with: acidmind init [--edition core|security|full]");
  console.log("Or pick individually: acidmind add <skill>...");
}

async function main() {
  BANNER = await loadBanner();
  const [, , command, ...rest] = process.argv;
  const { opts, positional } = parseArgs(rest);

  if (!command || command === "-h" || command === "--help" || opts.help) {
    showBanner();
    console.log(USAGE);
    return;
  }

  showBanner();

  switch (command) {
    case "init":
      await cmdInit(positional, opts);
      break;
    case "add":
      await cmdAdd(positional, opts);
      break;
    case "router":
      await cmdRouter(opts);
      break;
    case "status":
      await cmdStatus(opts);
      break;
    case "update":
      await cmdUpdate(positional, opts);
      break;
    case "list":
      cmdList();
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(USAGE);
      process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`error: ${err.message}`);
  process.exitCode = 1;
});
