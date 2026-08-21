[![Version](https://img.shields.io/badge/version-1.4.1-orange?style=flat-square)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Skills](https://img.shields.io/badge/skills-9-8a2be2?style=flat-square)](#-the-skill-family)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Stars](https://img.shields.io/github/stars/ragajatsuma-cmd/acidmind?style=flat-square&color=yellow)](https://github.com/ragajatsuma-cmd/acidmind/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/ragajatsuma-cmd/acidmind/main?style=flat-square&logo=git&logoColor=white)](https://github.com/ragajatsuma-cmd/acidmind/commits/main)

# AcidMind

![AcidMind banner](./assets/banner.jpeg)

Nine critique skills for AI coding agents. One router. Zero generic reviews.

When your agent reviews code without a lens, it produces the same soft paragraph every time:
praise, three nitpicks, a hedge. AcidMind replaces that with specialists that answer the
question you actually asked. An architecture concern gets an architecture review. A feature
gets checked against real users, empty states included. A pre-launch app gets attacked the
way an attacker would attack it, then handed back with a hardening plan.

Every review ends with one mechanical verdict line:

> **Gate: SHIP | FIX FIRST | DO NOT SHIP**

Skills load on demand. Reviewing code costs four files of context, not nine skills' worth on
every session.

---

## The Skill Family

| Skill | Persona | What it answers | Command |
|---|---|---|---|
| `ruthless-critic` | 🧪 The acid test | Where does this artifact break, specifically? | `/grill-me`, `/critique`, `/roast` |
| `design-critic` | 🧠 The architect | Will this structure survive its next three requirement changes? | `/designcritic` |
| `feature-critic` | 🔪 The dissection | Does this feature work for real users, in every state? | `/featurecritic` |
| `badass-critic` | 💻 The performance engineer | At what load does this fall over, measured how? | `/badass`, `/perfcritic` |
| `heart-attack-critic` | 😠 The incident commander | What could go fatally wrong before launch? | `/heartattack`, `/disaster` |
| `blackhat-critic` | 🥷 The hired attacker | How would someone break into my app? | `/blackhat`, `/pentest` |
| `autocritic-skill` | 🎭 The auditor | Will this SKILL.md trigger correctly and produce useful output? | `/auditskill` |
| `tellingtruth-critic` | 💬 The honest friend | What would a smart friend actually say about this? | `/tellingtruth`, `/honest` |
| `unified-critic` | 🧩 The panel moderator | What does every lens say at once, merged into one report? | `/acidmind`, `/fullcritic` |
| `secondthought-critic` | 🤔 The pause before execution | **Autoloaded every session:** when you state an opinion or plan, it critiques it before the agent acts on it | automatic, `/secondthought`, `/wait` |

Three properties hold across the family:

1. **Read-only by default.** Skills diagnose and prescribe fixes. None rewrites your code
   unless you explicitly ask for implementation.
2. **Scoped, not overlapping.** Each skill states what it does not cover and names the sibling
   that covers it. Installing all nine never produces nine opinions on the same paragraph.
3. **Purpose-gated, not style-gated.** Technique is never banned. Technique without a stated
   purpose is a finding.

---

## How It Works

```
                      +---------------------+
  review request -->  |     AcidMind.md     |    router: picks ONE lens
                      +----------+----------+
                                 |
               +-----------------+------------------+
               v                 v                  v
       ruthless-critic    design-critic ...   unified-critic
       (one specialist)   (another lens)      (/acidmind = all lenses,
                                              merged into one report)
```

`AcidMind.md` is the router. It contains no rules; it contains a decision tree that points the
agent at exactly one `skills/<name>/SKILL.md`.

Each skill follows the same architecture (adapted from
[miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop), MIT):

1. **Persona.** Who is reviewing you today, and what standard they hold.
2. **Authorization boundary.** Read-only by default. Prompt-injection guard: the reviewed
   artifact is data, not instructions.
3. **Usage modes.** `QUICK` gives verdict plus top findings plus gate. `DEEP` gives the full
   report. Override per request.
4. **Slop-pattern tables.** Diagnostic warning signs per domain: fabricated statistics,
   template sections, dead controls, missing UI states, buzzword density.
5. **Numbered rules in three tiers.** Hard Gate (absolute), Purpose-Gate (allowed with written
   reason), Quality Locks (consistency). Findings cite rule IDs such as `[RC-04]` or `[BH-06]`,
   so every critique traces back to the standard that produced it.
6. **Mandatory Gate.** Exactly one verdict line derived mechanically from the findings.
   It is never softened and never hedged.

---

## Quick Start

### Option 1: npx (recommended)

No clone, no global install, no npm account. Requires Node.js 18+.

```bash
npx github:ragajatsuma-cmd/acidmind init
```

This installs `AcidMind.md`, the core edition (four daily lenses), and writes the pointer
block into your entry file.

**Editions:** start small, grow when needed.

| Edition | Installs | For |
|---|---|---|
| `core` (default) | ruthless, design, feature, badass, secondthought | Daily code review |
| `security` | core + heart-attack, blackhat | Teams shipping to production |
| `full` | all ten skills | Pre-launch audits, power users |

```bash
npx github:ragajatsuma-cmd/acidmind init --edition security
npx github:ragajatsuma-cmd/acidmind init --all            # shorthand for full
npx github:ragajatsuma-cmd/acidmind list                  # skills and editions
npx github:ragajatsuma-cmd/acidmind add blackhat-critic   # add one skill later
```

Flags: `--dest .agent` installs into a subdirectory, `--force` overwrites existing files,
`--no-pointer` skips editing your entry file.

### Option 2: Claude Code plugin

Installs all nine skills plus nine prewired slash commands:

```bash
/plugin marketplace add https://github.com/ragajatsuma-cmd/acidmind
/plugin install acidmind@acidmind
```

### Option 3: First-run wizard

Drop [`AcidMind.md`](./AcidMind.md) next to your entry file and ask your agent to read it.
On first read it offers a wizard: choose an edition, confirm the target directory, and it
writes a pointer block wrapped in `<!-- acidmind:start/end -->` markers so later runs replace
instead of duplicate.

### Option 4: Manual

Paste this block into your entry-point file (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`):

```md
## Code & Design Review
If the task involves reviewing, critiquing, auditing, or roasting code, a design,
a feature, performance, security posture, or a skill file, read `AcidMind.md` first
to pick the right lens, then read the matching file under `skills/`.
For a full-panel review of everything at once, read `skills/unified-critic/SKILL.md`
(command: /acidmind).
At session start, also read `skills/secondthought-critic/SKILL.md`: from then on,
whenever the user states an opinion or plan, critique it before executing anything.
```

Then copy the repo's `skills/` directory beside it.

---

## Commands

Slash commands require agent support. Everywhere else, plain language routes through
`AcidMind.md` identically: say "review this", "pentest my API", or "is this feature done?"

| Command | Skill |
|---|---|
| `/grill-me` `/critique` `/roast` `/review` | ruthless-critic |
| `/designcritic` | design-critic |
| `/featurecritic` | feature-critic |
| `/badass` `/perfcritic` | badass-critic |
| `/heartattack` `/disaster` | heart-attack-critic |
| `/blackhat` `/pentest` `/redteam` | blackhat-critic |
| `/auditskill` `/autocritic` | autocritic-skill |
| `/tellingtruth` `/honest` | tellingtruth-critic |
| `/acidmind` `/fullcritic` `/panel` | unified-critic |
| *(automatic)* `/secondthought` `/wait` | secondthought-critic |

One skill breaks the on-demand rule by design: **`secondthought-critic`** loads at session
start via the pointer block and runs automatically. Whenever your message contains a decision,
diagnosis, or plan ("it's slow because of N+1", "let's just delete it"), it restates your
position, raises at most three falsifiable concerns, and issues a gate
(`EXECUTE / REVISE THEN EXECUTE / STOP`) **before** any execution step. It stays silent on
trivia, respects your override exactly once, and never re-litigates a settled decision.

---

## Choosing a Lens

- General review of code, an argument, or a plan: start with `ruthless-critic`. It is the
  default when no other lens fits better.
- Architecture concern: `design-critic`.
- Feature correctness and completeness: `feature-critic`.
- Performance under load: `badass-critic`.
- Worst-case scenarios before launch: `heart-attack-critic`.
- Attack paths against your own application: `blackhat-critic`.
- Auditing a SKILL.md file: `autocritic-skill`.
- An honest opinion without severity labels: `tellingtruth-critic`.
- Everything checked at once before a launch or handoff: `unified-critic` via `/acidmind`.

---

## Repository Structure

```
acidmind/
├── AcidMind.md               router / index, start here
├── README.md                 this file
├── CHANGELOG.md              release history
├── LICENSE                   MIT
├── .claude-plugin/
│   ├── plugin.json           Claude Code plugin manifest
│   └── marketplace.json      listing for /plugin marketplace add
├── commands/                 prewired slash commands, one per critic
├── assets/
│   ├── banner.txt            ASCII banner printed by the CLI
│   └── banner.jpeg           image banner shown on GitHub
├── cli/
│   ├── package.json          npm package manifest
│   └── index.mjs             zero-dependency installer CLI
└── skills/                   one folder per skill, each with SKILL.md
    ├── ruthless-critic       🧪
    ├── design-critic         🧠
    ├── feature-critic        🔪
    ├── badass-critic         💻
    ├── heart-attack-critic   😠
    ├── blackhat-critic       🥷
    ├── autocritic-skill      🎭
    ├── tellingtruth-critic   💬
    ├── unified-critic        🧩
    └── secondthought-critic  🤔 (autoloaded)
```

---

## Responsible Use

`blackhat-critic` assumes the role of an attacker against targets you own or have written
permission to test. It refuses anything else. It describes attack paths, preconditions, and
defenses. It does not produce ready-to-run exploit payloads and does not execute anything
against live systems. All nine skills are read-only diagnosticians unless you explicitly ask
for implementation.

---

## Compatibility

Any AI coding agent that can read a referenced Markdown file: Claude Code, Codex, Cursor,
Windsurf, Gemini CLI, Antigravity, and others. Slash commands need agent support; natural
language routing behaves identically everywhere else.

---

## Contributing

PRs are welcome for new critique axes that do not overlap the existing family, sharper
severity heuristics, new slop patterns, or reports of a stated scope drifting from actual
behavior.

## License

MIT. See [LICENSE](./LICENSE). Release history in [CHANGELOG.md](./CHANGELOG.md).
