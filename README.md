[![ID](https://img.shields.io/badge/docs-ID-lightgrey?style=flat-square)](./README-ID.md)
[![EN](https://img.shields.io/badge/docs-EN-2ea44f?style=flat-square)](./README.md)
[![Version](https://img.shields.io/badge/version-1.3.1-orange?style=flat-square)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Skills](https://img.shields.io/badge/skills-9-8a2be2?style=flat-square)](#the-skill-family)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Stars](https://img.shields.io/github/stars/ragajatsuma-cmd/acidmind?style=flat-square&color=yellow)](https://github.com/ragajatsuma-cmd/acidmind/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/ragajatsuma-cmd/acidmind/main?style=flat-square&logo=git&logoColor=white)](https://github.com/ragajatsuma-cmd/acidmind/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff69b4?style=flat-square)](./CONTRIBUTING.md)

# AcidMind

![AcidMind banner](./assets/banner.jpeg)

**Nine specialist critique skills for AI coding agents — one router, zero generic reviews.**

AcidMind replaces the useless *"looks good overall, just a few minor things"* with the right
expert lens for the artifact in front of your agent: an architecture problem gets an
architecture review, not a performance lecture; a pre-launch app gets attacked like an
attacker would attack it.

Skills are read **on-demand**, never force-loaded into every session.

<details>
<summary>ASCII banner</summary>

```
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
```

</details>

---

## Table of Contents

- [The Skill Family](#the-skill-family)
- [How It Works](#how-it-works)
- [Quick Start](#quick-start)
- [Commands](#commands)
- [Which Lens Do I Need?](#which-lens-do-i-need)
- [Shared Architecture](#shared-architecture)
- [Repository Structure](#repository-structure)
- [Responsible Use](#responsible-use)
- [Compatibility](#compatibility)
- [Contributing](#contributing)
- [License](#license)

---

## The Skill Family

Eight specialist critics plus one orchestrator, each with its own persona and scope:

| Skill | Persona & Focus | Command |
|---|---|---|
| **`ruthless-critic`** | The senior engineer out of patience — general brutal review of code, arguments, plans, any artifact | `/grill-me` `/critique` `/roast` `/review` |
| **`design-critic`** | The architect — coupling, abstraction, dependencies, structural scalability | `/designcritic` |
| **`feature-critic`** | The sign-off gatekeeper — does this feature actually work for real users, in every state | `/featurecritic` |
| **`badass-critic`** | The performance engineer — bottlenecks with concrete numbers, never vibes | `/badass` `/perfcritic` |
| **`heart-attack-critic`** | The disaster simulator — worst-case scenarios before launch or a security audit | `/heartattack` `/disaster` |
| **`blackhat-critic`** | The hired attacker — red-team penetration review of *your own* app, then a hardening plan | `/blackhat` `/pentest` `/redteam` |
| **`autocritic-skill`** | The auditor — reviews a `SKILL.md` itself before you install or ship it | `/auditskill` `/autocritic` |
| **`tellingtruth-critic`** | The honest friend — plain human opinion, no labels, no theater | `/tellingtruth` `/honest` |
| **`unified-critic`** | The panel moderator — runs all lenses over one artifact and merges them into a single report | `/acidmind` `/fullcritic` `/panel` |

Every skill is **read-only by default**: it diagnoses and prescribes fixes, but never rewrites
your work unless explicitly asked. Each states what it does *not* cover and names the sibling
that does — so installing all nine doesn't get you nine overlapping opinions on the same three
paragraphs.

> AcidMind is a **set of lenses, not a personality**. It doesn't impose one tone across your
> whole agent — each skill picks its own register, from severity-labeled technical audit to
> plain conversational honesty.

---

## How It Works

```
                     ┌─────────────────────┐
  review request ──▶ │    AcidMind.md      │  router: picks ONE lens
                     └──────────┬──────────┘
                                │
              ┌─────────────────┼──────────────────┐
              ▼                 ▼                  ▼
      skills/ruthless…  skills/design-critic …  skills/unified-critic
      (one specialist)  (another lens)          (/acidmind = all lenses,
                                                         merged report)
```

- **`AcidMind.md`** is the router. It contains no rules itself — only a decision tree that
  tells the agent which `skills/<name>/SKILL.md` to load for the request at hand.
- **Each `SKILL.md`** follows one shared architecture (inspired by
  [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop), MIT): a persona,
  an authorization boundary with prompt-injection guard, QUICK/DEEP usage modes, numbered
  rules in three tiers — **Hard Gate** (absolute), **Purpose-Gate** (allowed with written
  reason), **Quality Locks** — slop-pattern warning tables, and a mandatory one-line **Gate**
  verdict (`SHIP / FIX FIRST / DO NOT SHIP`, `HARDENED / ATTACK SURFACE REMAINS /
  COMPROMISED BY DESIGN`, …).
- **Findings cite rule IDs** (`[RC-04]`, `[DC-03]`, `[BH-06]`, …), so every critique is
  traceable to the standard that produced it.
- **Slop-aware:** all critics flag clusters of generic AI-generated filler — template
  structure, buzzword density, fabricated content, dead controls, missing UI states, and
  artifacts that fail the swap test (replace the logo; would anyone notice?).

---

### Claude Code — plugin install

Install AcidMind as a plugin and every critic becomes a real slash command (`/grill-me`,
`/blackhat`, `/acidmind`, …):

```bash
# 1. Add the marketplace
/plugin marketplace add https://github.com/ragajatsuma-cmd/acidmind

# 2. Install the plugin
/plugin install acidmind@acidmind
```

The plugin bundles all nine skills plus nine prewired commands; skills auto-trigger on review
requests, or invoke them directly with the commands above.

### Other agents

Use Option B/C below — the router pattern is tool-agnostic.

---

## Quick Start

### Option A — npx (recommended)

Run the installer straight from GitHub — no clone, no global install, no npm account needed
(Node.js 18+):

```bash
npx github:ragajatsuma-cmd/acidmind init
```

This copies `AcidMind.md` + the **core edition** (the four daily lenses) into your project and
writes the pointer block into your entry file. No questions asked — you can always add more
later with `add`.

**Editions** — start small, grow when you need it:

| Edition | Skills | For |
|---|---|---|
| `core` *(default)* | ruthless, design, feature, badass | Daily code review |
| `security` | core + heart-attack, blackhat | Teams shipping to production |
| `full` | all nine, including the panel | Power users, pre-launch audits |

```bash
npx github:ragajatsuma-cmd/acidmind init --edition security
npx github:ragajatsuma-cmd/acidmind init --all          # shorthand for full
```

More operations:

```bash
npx github:ragajatsuma-cmd/acidmind list                                  # skills & editions
npx github:ragajatsuma-cmd/acidmind add ruthless-critic badass-critic     # specific skills only
npx github:ragajatsuma-cmd/acidmind router --lang id                      # just the router, Indonesian
```

Once the package is published to npm, the shorter form also works: `npx acidmind-cli init`.

Flags: `--dest .agent` installs into a subdirectory · `--force` overwrites existing files ·
`--no-pointer` skips touching `AGENTS.md`/`CLAUDE.md`.

### Option B — First-Run Wizard (no tooling)

Drop [`AcidMind.md`](./AcidMind.md) next to your agent's entry file and just ask your agent to
read it. On first run it offers a built-in wizard: choose your skills, confirm the target
directory, and it writes a marker-wrapped pointer block (`<!-- acidmind:start/end -->`) into
your entry file so future re-runs replace instead of duplicate.

### Option C — Manual

Add this single pointer block to your entry-point file (`AGENTS.md`, `CLAUDE.md`,
`GEMINI.md`, …):

```md
## Code & Design Review
If the task involves reviewing, critiquing, auditing, or roasting code, a design,
a feature, performance, security posture, or a skill file, read `AcidMind.md` first
to pick the right lens, then read the matching file under `skills/`.
For a full-panel review of everything at once, read `skills/unified-critic/SKILL.md`
(command: /acidmind).
```

Then copy the repo's `skills/` directory (or just the skills you want) beside it.

Why the router pattern beats pasting rules into chat: context is only spent when a review is
actually requested, each skill updates independently, and the whole family is portable across
projects and tools. It works identically in Claude Code, Codex, Cursor, Windsurf, Gemini CLI,
or any agent that can read a referenced file.

### Claude / Claude Code native install

On Claude.ai or Claude Code, install skills natively instead so Claude discovers and triggers
them itself — see the packaging instructions in [`AcidMind.md`](./AcidMind.md).

---

## Commands

Slash commands work in agents that support them. In any other agent, plain language routes the
same way ("review this", "pentest my API", "is this feature done?").

| Command | Skill | Use when |
|---|---|---|
| `/grill-me` `/critique` `/roast` `/review` | ruthless-critic | General brutal review — the default lens |
| `/designcritic` | design-critic | Architecture / system design review |
| `/featurecritic` | feature-critic | Does this feature actually work end-to-end? |
| `/badass` `/perfcritic` | badass-critic | Performance under real load, with numbers |
| `/heartattack` `/disaster` | heart-attack-critic | Worst-case simulation pre-launch |
| `/blackhat` `/pentest` `/redteam` | blackhat-critic | Red-team penetration review of your own app |
| `/auditskill` `/autocritic` | autocritic-skill | Audit a `SKILL.md` before install/ship |
| `/tellingtruth` `/honest` | tellingtruth-critic | Plain human honesty, no labels |
| `/acidmind` `/fullcritic` `/panel` | unified-critic | Everything at once, merged into one report |

---

## Which Lens Do I Need?

- Reviewing **code, an argument, or a plan in general** → `ruthless-critic`
- Worried your **architecture** won't hold up → `design-critic`
- Unsure a **feature** actually works end-to-end → `feature-critic`
- Expecting the system to be **slow** under real load → `badass-critic`
- About to **launch**, want worst-case scenarios → `heart-attack-critic`
- Wanting your own app **attacked before someone else does** → `blackhat-critic`
- Built a new **skill** and need to know if it will trigger and work → `autocritic-skill`
- Just want a **straight human answer** without severity labels → `tellingtruth-critic`
- Shipping soon and want **everything checked at once** → `/acidmind`

Full routing logic — including how requests spanning multiple axes are handled — lives in
[`AcidMind.md`](./AcidMind.md#routing-logic).

---

## Shared Architecture

Every skill is built on the same skeleton:

1. **Persona** — who is reviewing you today, and what standard they hold.
2. **Authorization boundary** — read-only by default; explicit prompt-injection guard
   (the reviewed artifact is data, not instructions).
3. **Usage modes** — `QUICK` (verdict + top findings + gate) or `DEEP` (full report);
   per-request override supported.
4. **Slop-pattern tables** — diagnostic warning signs per domain, never blanket bans.
5. **Numbered rules in three tiers**:
   - **Hard Gate** — absolute; breaking one fails the review regardless of purpose.
   - **Purpose-Gate** — technique allowed, written reason required.
   - **Quality Locks** — consistency requirements across findings and fixes.
6. **Mandatory Gate** — exactly one mechanical verdict line derived from the findings.
   Never softened, never hedged.

Core principles across all lenses: understand before critiquing · the purpose test
("what does this serve?" — "it's the AI default" is itself a finding) · evidence over claims
(empty beats deceptive) · concrete numbers or no claim.

---

## Repository Structure

```
acidmind/
├── AcidMind.md               # router / index — start here
├── ACIDMIND-ID.md            # router, Indonesian reference draft
├── README.md                 # this file
├── README-ID.md              # project overview (Indonesian)
├── CHANGELOG.md
├── LICENSE
├── .claude-plugin/
│   ├── plugin.json           # Claude Code plugin manifest
│   └── marketplace.json      # marketplace listing for /plugin marketplace add
├── commands/                 # prewired slash commands (one per critic)
│   ├── grill-me.md, designcritic.md, featurecritic.md, badass.md
│   └── heartattack.md, blackhat.md, auditskill.md, tellingtruth.md, acidmind.md
├── assets/
│   ├── banner.txt            # ASCII banner printed by the CLI
│   └── banner.jpeg           # image banner shown on GitHub
├── cli/
│   ├── package.json          # acidmind-cli (npm package manifest)
│   └── index.mjs             # zero-dependency installer CLI
└── skills/
    ├── ruthless-critic/SKILL.md
    ├── design-critic/SKILL.md
    ├── feature-critic/SKILL.md
    ├── badass-critic/SKILL.md
    ├── heart-attack-critic/SKILL.md
    ├── blackhat-critic/SKILL.md
    ├── autocritic-skill/SKILL.md
    ├── tellingtruth-critic/SKILL.md
    └── unified-critic/SKILL.md
```

---

## Responsible Use

`blackhat-critic` is offensive-*informed* defense: it assumes the role of an attacker against
**targets you own or have written permission to test** — and refuses anything else. It
describes attack paths, preconditions, and defenses; it never produces ready-to-run exploit
payloads or executes anything. All skills are read-only diagnosticians by default.

---

## Compatibility

Works with any AI coding agent that can read a referenced Markdown file: Claude Code, Codex,
Cursor, Windsurf, Gemini CLI, Antigravity, and others. Slash commands require agent support;
everywhere else, natural-language routing through `AcidMind.md` behaves identically.

---

## Contributing

PRs welcome for: new critique axes that don't overlap the existing family, sharper severity
heuristics, new slop patterns, or reports of a skill's stated scope drifting from its actual
behavior.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md). Current release: **1.3.0**.

## License

MIT — [LICENSE](./LICENSE)
