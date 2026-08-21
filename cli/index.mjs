#!/usr/bin/env node
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

const DEFAULT_REPO = "ragajatsuma-cmd/acidmind";
const DEFAULT_BRANCH = "main";
const SKILLS = {
  "ruthless-critic": "General brutal review of code, arguments, plans — the default lens",
  "design-critic": "Architecture & system design: coupling, abstraction, dependencies",
  "feature-critic": "Feature completeness & correctness for real users",
  "badass-critic": "Performance review with concrete numbers, not vibes",
  "heart-attack-critic": "Worst-case disaster simulation before launch / security audit",
  "skill-critic": "Meta-audit of a SKILL.md before you install or ship it",
  "tellingtruth-critic": "Unstructured, human, no-label honest opinion",
};

const USAGE = `acidmind — install AcidMind critique skills from GitHub

Usage:
  acidmind init [dir]            Install the router + all 7 skills
  acidmind add <skill>...        Install one or more specific skills
  acidmind router                Install just ACIDMIND.md (the router)
  acidmind list                  List available skills

Options:
  --lang <en|id>     Language variant for docs (default: en)
  --dest <dir>       Destination directory (default: current directory)
  --repo <owner/name>  Source GitHub repo (default: ${DEFAULT_REPO})
  --branch <name>    Source branch (default: ${DEFAULT_BRANCH})
  --force            Overwrite existing files
  --no-pointer       With init: skip adding the pointer block to AGENTS.md/CLAUDE.md
  -h, --help         Show this help

Examples:
  npx acidmind-cli init
  npx acidmind-cli add ruthless-critic badass-critic --dest .agent
  npx acidmind-cli list`;

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
    lang: "en",
    dest: process.cwd(),
    repo: process.env.ACIDMIND_REPO || DEFAULT_REPO,
    branch: process.env.ACIDMIND_BRANCH || DEFAULT_BRANCH,
    force: false,
    pointer: true,
  };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--lang") opts.lang = argv[++i];
    else if (a === "--dest") opts.dest = argv[++i];
    else if (a === "--repo") opts.repo = argv[++i];
    else if (a === "--branch") opts.branch = argv[++i];
    else if (a === "--force") opts.force = true;
    else if (a === "--no-pointer") opts.pointer = false;
    else if (a === "-h" || a === "--help") opts.help = true;
    else positional.push(a);
  }
  return { opts, positional };
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
`.trimEnd();

async function installSkill(name, opts) {
  if (!SKILLS[name]) {
    throw new Error(`Unknown skill "${name}". Run \`acidmind list\` to see options.`);
  }
  const targets = [
    { remote: `skills/${name}/SKILL.md`, local: path.join(opts.dest, "skills", name, "SKILL.md") },
    {
      remote: `skills/${name}/SKILL-ID.md`,
      local: path.join(opts.dest, "skills", name, "SKILL-ID.md"),
      optional: true,
    },
  ];
  const written = [];
  for (const t of targets) {
    let content;
    try {
      content = await fetchFile(opts.repo, opts.branch, t.remote);
    } catch (err) {
      if (t.optional) continue;
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
  const routerName = opts.lang === "id" ? "ACIDMIND-ID.md" : "ACIDMIND.md";
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
  const routerFile = opts.lang === "id" ? "ACIDMIND-ID.md" : "ACIDMIND.md";
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
  for (const skill of Object.keys(SKILLS)) {
    await installSkill(skill, opts);
  }

  if (opts.pointer) {
    console.log("");
    await addPointerBlock(opts);
  }
  console.log("\nDone. Your agent now reads ACIDMIND.md on review requests.");
}

async function cmdAdd(positional, opts) {
  if (positional.length === 0) {
    console.error('Usage: acidmind add <skill>...   e.g. acidmind add ruthless-critic');
    process.exitCode = 1;
    return;
  }
  for (const skill of positional) {
    await installSkill(skill, opts);
  }
}

async function cmdRouter(opts) {
  const routerFile = opts.lang === "id" ? "ACIDMIND-ID.md" : "ACIDMIND.md";
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
  console.log("\nInstall with: acidmind add <skill>...");
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
  process.exit(1);
});
