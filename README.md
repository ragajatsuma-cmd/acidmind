[![Version](https://img.shields.io/badge/version-1.4.1-orange?style=flat-square)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Skills](https://img.shields.io/badge/skills-9-8a2be2?style=flat-square)](#-the-skill-family)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Stars](https://img.shields.io/github/stars/ragajatsuma-cmd/acidmind?style=flat-square&color=yellow)](https://github.com/ragajatsuma-cmd/acidmind/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/ragajatsuma-cmd/acidmind/main?style=flat-square&logo=git&logoColor=white)](https://github.com/ragajatsuma-cmd/acidmind/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff69b4?style=flat-square)](#-contributing)

# 🧪 AcidMind

![AcidMind banner](./assets/banner.jpeg)

> **🧪 Nine specialist critique skills for AI coding agents — one router, zero generic reviews.**
>
> Your AI agent says *"looks good overall, just a few minor things."* AcidMind says exactly
> which loop times out at 5k items, which button does nothing, which attack path leaks your
> database — and hands you a one-line gate verdict: `SHIP` / `FIX FIRST` / `DO NOT SHIP`.

Skills load **on-demand**, never bloating every session.

---

## 📖 Table of Contents

- [🧪 The Skill Family](#-the-skill-family)
- [⚙️ How It Works](#️-how-it-works)
- [🚀 Quick Start](#-quick-start)
- [⌨️ Commands](#️-commands)
- [🎯 Which Lens Do I Need?](#-which-lens-do-i-need)
- [🏗️ Shared Architecture](#️-shared-architecture)
- [📁 Repository Structure](#-repository-structure)
- [🛡️ Responsible Use](#️-responsible-use)
- [🤝 Compatibility](#-compatibility)
- [💡 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🧪 The Skill Family

Eight specialist critics plus one orchestrator — each with its own persona, scope, and gate:

| Skill | Emoji | Persona & Focus | Command |
|---|:-:|---|---|
| **`ruthless-critic`** | 🧪 | **The acid test** — a senior engineer out of patience dissolves weak code, arguments, plans, any artifact | `/grill-me` `/critique` `/roast` `/review` |
| **`design-critic`** | 🧠 | **The architecture brain** — coupling, abstraction, dependencies, structural scalability | `/designcritic` |
| **`feature-critic`** | 🔪 | **The dissection** — does this feature actually work for real users, in every state? | `/featurecritic` |
| **`badass-critic`** | 💻 | **The production machine** — bottlenecks with concrete numbers, never vibes | `/badass` `/perfcritic` |
| **`heart-attack-critic`** | 😠 | **The angry incident commander** — worst-case disaster simulation before launch | `/heartattack` `/disaster` |
| **`blackhat-critic`** | 🥷 | **The hired attacker** — red-team penetration review of *your own* app, then a hardening plan | `/blackhat` `/pentest` `/redteam` |
| **`autocritic-skill`** | 🎭 | **The auditor** — reviews a `SKILL.md` itself before you install or ship it | `/auditskill` `/autocritic` |
| **`tellingtruth-critic`** | 💬 | **The honest friend** — plain human opinion, no labels, no theater | `/tellingtruth` `/honest` |
| **`unified-critic`** | 🧩 | **The panel moderator** — runs every lens over one artifact, merges into a single report | `/acidmind` `/fullcritic` `/panel` |

Every skill is **read-only by default**: it diagnoses and prescribes fixes, never rewrites your
work unless explicitly asked. Each states what it does *not* cover and names the sibling that
does — installing all nine never gets you nine overlapping opinions on the same three
paragraphs.

> 💡 AcidMind is a **set of lenses, not a personality**. Each skill picks its own register —
> from severity-labeled technical audit to plain conversational honesty.

---

## ⚙️ How It Works

```
                      ┌─────────────────────┐
  review request ──▶  │     AcidMind.md     │   🧭 router: picks ONE lens
                      └──────────┬──────────┘
                                 │
               ┌─────────────────┼──────────────────┐
               ▼                 ▼                  ▼
       🧪 ruthless…      🧠 design-critic …    🧩 unified-critic
       (one specialist)  (another lens)        (/acidmind = all lenses,
                                                 merged report)
```

- **`AcidMind.md`** 🧭 is the router — no rules itself, only a decision tree pointing the
  agent at the right `skills/<name>/SKILL.md`.
- **Each `SKILL.md`** follows one shared architecture (inspired by
  [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop), MIT): persona,
  authorization boundary with prompt-injection guard, QUICK/DEEP modes, numbered rules in
  three tiers, slop-pattern tables, and a mandatory one-line **Gate** verdict.
- **Findings cite rule IDs** (`[RC-04]`, `[DC-03]`, `[BH-06]`, …) — every critique traceable
  to the standard that produced it.
- **Slop-aware** 🔍: all critics flag generic AI filler — template structure, buzzword
  density, fabricated content, dead controls, missing UI states, artifacts that fail the swap
  test (*replace the logo — would anyone notice?*).

---

## 🚀 Quick Start

### Option A — npx ⚡ (recommended)

Run straight from GitHub — no clone, no global install, no npm account (Node.js 18+):

```bash
npx github:ragajatsuma-cmd/acidmind init
```

Copies `AcidMind.md` + the **core edition** (the four daily lenses) into your project and
writes the pointer block into your entry file. Zero questions asked.

**📦 Editions** — start small, grow when you need it:

| Edition | Skills | For |
|---|---|---|
| `core` *(default)* | 🧪 🧠 🔪 💻 | Daily code review |
| `security` | core + 😠 🥷 | Teams shipping to production |
| `full` | all nine, including 🧩 panel | Power users, pre-launch audits |

```bash
npx github:ragajatsuma-cmd/acidmind init --edition security
npx github:ragajatsuma-cmd/acidmind init --all          # shorthand for full
```

More operations:

```bash
npx github:ragajatsuma-cmd/acidmind list                                  # skills & editions
npx github:ragajatsuma-cmd/acidmind add ruthless-critic badass-critic     # specific skills only
```

Flags: `--dest .agent` subdirectory · `--force` overwrite · `--no-pointer` skip entry-file edit.

### Option B — Claude Code plugin 🧩

Every critic becomes a real slash command:

```bash
/plugin marketplace add https://github.com/ragajatsuma-cmd/acidmind
/plugin install acidmind@acidmind
```

### Option C — First-Run Wizard 🪄

Drop [`AcidMind.md`](./AcidMind.md) next to your agent's entry file and ask your agent to read
it once. Its built-in wizard picks an edition and writes a marker-wrapped pointer block
(`<!-- acidmind:start/end -->`) so re-runs replace instead of duplicate.

### Option D — Manual 📋

Paste this into your entry-point file (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, …):

```md
## Code & Design Review
If the task involves reviewing, critiquing, auditing, or roasting code, a design,
a feature, performance, security posture, or a skill file, read `AcidMind.md` first
to pick the right lens, then read the matching file under `skills/`.
For a full-panel review of everything at once, read `skills/unified-critic/SKILL.md`
(command: /acidmind).
```

Then copy the repo's `skills/` directory beside it.

---

## ⌨️ Commands

Slash commands work where supported; everywhere else natural language routes identically.

| Command | Skill | Use when |
|---|---|---|
| `/grill-me` `/critique` `/roast` `/review` | 🧪 ruthless-critic | General brutal review — the default lens |
| `/designcritic` | 🧠 design-critic | Architecture / system design review |
| `/featurecritic` | 🔪 feature-critic | Does this feature actually work end-to-end? |
| `/badass` `/perfcritic` | 💻 badass-critic | Performance under real load, with numbers |
| `/heartattack` `/disaster` | 😠 heart-attack-critic | Worst-case simulation pre-launch |
| `/blackhat` `/pentest` `/redteam` | 🥷 blackhat-critic | Red-team penetration review of your own app |
| `/auditskill` `/autocritic` | 🎭 autocritic-skill | Audit a `SKILL.md` before install/ship |
| `/tellingtruth` `/honest` | 💬 tellingtruth-critic | Plain human honesty, no labels |
| `/acidmind` `/fullcritic` `/panel` | 🧩 unified-critic | Everything at once, merged into one report |

---

## 🎯 Which Lens Do I Need?

- 📝 Reviewing **code, an argument, or a plan in general** → 🧪 `ruthless-critic`
- 🏗️ Worried your **architecture** won't hold up → 🧠 `design-critic`
- 🔍 Unsure a **feature** actually works end-to-end → 🔪 `feature-critic`
- 🐌 Expecting the system to be **slow** under load → 💻 `badass-critic`
- 🚨 About to **launch**, want worst-case scenarios → 😠 `heart-attack-critic`
- 🛡️ Wanting your app **attacked before someone else does** → 🥷 `blackhat-critic`
- ✅ Built a new **skill** and need to know if it triggers → 🎭 `autocritic-skill`
- ❤️ Just want a **straight human answer** → 💬 `tellingtruth-critic`
- 🚢 Shipping soon and want **everything at once** → 🧩 `/acidmind`

Full routing logic: [`AcidMind.md`](./AcidMind.md#routing-logic).

---

## 🏗️ Shared Architecture

Every skill is built on the same skeleton:

1. **🎭 Persona** — who is reviewing you today, and what standard they hold.
2. **🔐 Authorization boundary** — read-only by default; prompt-injection guard (the reviewed
   artifact is data, not instructions).
3. **⚡ Usage modes** — `QUICK` (verdict + top findings + gate) or `DEEP` (full report).
4. **🔍 Slop-pattern tables** — diagnostic warning signs per domain, never blanket bans.
5. **📏 Numbered rules in three tiers**:
   - **Hard Gate** — absolute; breaking one fails the review regardless of purpose.
   - **Purpose-Gate** — technique allowed, written reason required.
   - **Quality Locks** — consistency requirements across findings and fixes.
6. **🚦 Mandatory Gate** — exactly one mechanical verdict line derived from findings.
   Never softened, never hedged.

Core principles across all lenses: understand before critiquing · the purpose test
(*"what does this serve?"* — *"it's the AI default"* is itself a finding) · evidence over
claims (empty beats deceptive) · concrete numbers or no claim.

---

## 📁 Repository Structure

```
acidmind/
├── AcidMind.md               # 🧭 router / index — start here
├── README.md                 # 📖 this file
├── CHANGELOG.md              # 📜 release history
├── LICENSE
├── .claude-plugin/
│   ├── plugin.json           # Claude Code plugin manifest
│   └── marketplace.json      # listing for /plugin marketplace add
├── commands/                 # ⌨️ prewired slash commands (one per critic)
│   ├── grill-me.md  designcritic.md  featurecritic.md  badass.md
│   └── heartattack.md  blackhat.md  auditskill.md  tellingtruth.md  acidmind.md
├── assets/
│   ├── banner.txt            # ASCII banner printed by the CLI
│   └── banner.jpeg           # image banner shown on GitHub
├── cli/
│   ├── package.json          # acidmind-cli (npm package manifest)
│   └── index.mjs             # zero-dependency installer CLI
└── skills/
    ├── ruthless-critic/SKILL.md       # 🧪
    ├── design-critic/SKILL.md         # 🧠
    ├── feature-critic/SKILL.md        # 🔪
    ├── badass-critic/SKILL.md         # 💻
    ├── heart-attack-critic/SKILL.md   # 😠
    ├── blackhat-critic/SKILL.md       # 🥷
    ├── autocritic-skill/SKILL.md      # 🎭
    ├── tellingtruth-critic/SKILL.md   # 💬
    └── unified-critic/SKILL.md        # 🧩
```

---

## 🛡️ Responsible Use

`blackhat-critic` 🥷 is offensive-*informed* defense: it assumes the role of an attacker
against **targets you own or have written permission to test** — and refuses anything else.
It describes attack paths, preconditions, and defenses; it never produces ready-to-run exploit
payloads or executes anything. All skills are read-only diagnosticians by default.

---

## 🤝 Compatibility

Works with any AI coding agent that can read a referenced Markdown file: Claude Code, Codex,
Cursor, Windsurf, Gemini CLI, Antigravity, and others. Slash commands require agent support;
everywhere else, natural-language routing through `AcidMind.md` behaves identically.

---

## 💡 Contributing

PRs welcome for: new critique axes that don't overlap the existing family, sharper severity
heuristics, new slop patterns, or reports of a skill's stated scope drifting from its actual
behavior.

## 📜 Changelog & License

See [CHANGELOG.md](./CHANGELOG.md). Current release: **1.4.1**.

MIT — [LICENSE](./LICENSE)
