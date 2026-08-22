# Changelog

All notable changes to AcidMind are documented in this file.

## [2.3.0] — 2026-08-22

### Added

- **International documentation** — translated READMEs in Korean, Japanese, Simplified
  Chinese, Portuguese (BR), and Spanish under `docs/i18n/`, with a centered language
  navigator and for-the-badge shield row in the main README (style referenced from
  MatrAIx-Persona-8B).

## [2.2.1] — 2026-08-22

### Changed

- `secondthought-critic` QUICK interrogation cap raised from 3 to **5 questions** (up to 5
  personas), applied consistently across Usage Modes, Step C merge rules, ST-17 hard limits,
  and the output template.

## [2.2.0] — 2026-08-22

### Added

- **Cognitive failure catalog** in `secondthought-critic` dissection: four named reasoning
  patterns with signature counter-questions — WRONG-TARGET (barking up the wrong tree),
  OVERSCOPE (biting off more than you can chew), EVASION (beating around the bush), TUNNEL
  (missing the forest for the trees).
- **ST-17 Anti-paralysis clause**: one interrogation round per decision, max three QUICK
  questions, and EXECUTE when sparring leaves no HIGH concern standing. The autoloaded critic
  is barred from becoming the paralysis it was built to prevent.
- **Register style rules** for ruthless AUTOPSY & HONEST: relatable hooks over arrogant
  sarcasm (8-second attention ceiling), assertive-not-aggressive candor, and self-disclosure
  of the critique's own weakest point before the reader finds it.

## [2.1.0] — 2026-08-22

### Added

- **Visual forensics injected across three critics** (from the forensic design audit guide):
  - `design-critic`: Advocatus Diaboli persona stance (integrity of code over visual taste);
    new axes for split-hairs waste, the 8-second intent test, aesthetics-vs-accessibility
    collisions, template cut corners, motion/CSS forensics (DOM thrash, selector collisions,
    unexplainable properties), and frontend-backend desync.
  - `badass-critic`: new rendering & motion cost axis — frame budgets, CPU spikes from heavy
    transitions/parallax, memory leaks from micro-interaction overload, CSS payload bloat;
    animation masking data latency is treated as a latency problem in costume.
  - `feature-critic`: visual blockers that break the core task (low-contrast navigation,
    overlays over inputs) are `[BLOCKER]`, not design taste; the 8-second intent test added.

## [2.0.0] — 2026-08-22

### Changed

- **Consolidation: the family is now 8 skills** (down from 10):
  - `heart-attack-critic` + `blackhat-critic` merged into **`security-critic`** — one lens,
    two protocols: Protocol A (disaster simulation, HA-rules) and Protocol B (red-team attack
    paths, BH-rules) with both live bridges (Strix, Wallbreaker). All old commands still work
    (`/heartattack`, `/disaster`, `/blackhat`, `/pentest`, `/redteam`).
  - `tellingtruth-critic` absorbed into **`ruthless-critic`** as its HONEST register
    (`/tellingtruth`, `/honest`). The AUTOPSY register (`/autopsy`) also lands here: a
    whole-repo brutal autopsy in raw street register, deliberately exempt from tone
    calibration and anti-slop copywriting filters, with two surviving guardrails — every
    insult welded to a verifiable defect, and final ownership stays human.
- Router, wizard, CLI map, plugin commands, unified-critic panel order, secondthought persona
  table, and README all updated to the eight-skill structure; routing steps renumbered;
  security-edition references corrected everywhere.

## [1.9.5] — 2026-08-22

### Added

- **ST-16 Verify against original parameters** in `secondthought-critic` (from the Critical
  Verification Method guide's meta-prompting rules): after sparring, re-read the user's stated
  goal and constraints; confirm every surviving concern bears on that goal and no constraint
  was silently dropped mid-dissection.
- **Documented enforcement precedent** for undisclosed AI authorship in `ruthless-critic`
  (Vilnius University: ten students expelled) — the slop pattern now carries real-world
  consequence evidence, not just ethics framing.

## [1.9.4] — 2026-08-22

### Added

- **Sparring Partner self-check (ST-15)** in `secondthought-critic` (protocol from the
  Intellectual Integrity guide): before the Gate, the critic steelmans the user's position
  and generates the three strongest counter-arguments against its own concerns. Concerns that
  don't survive the sparring are dropped or downgraded, visibly.
- **Reference integrity check** in `ruthless-critic`: fabricated or unverifiable citations
  (hallucinated papers, invented attributions) are `[CRITICAL]`; applies symmetrically to
  the critic's own evidence.
- **Undisclosed AI authorship** added to the slop scan: deliverables presenting AI-generated
  work as unaided human output where disclosure matters are a trust defect.

## [1.9.3] — 2026-08-22

### Added

- **Full Davies ch.9 framework** (from the complete chapter text, replacing the metadata-only
  injection of 1.9.2):
  - `ruthless-critic` argument anatomy now covers all four structural elements — contention,
    tiered reasons/premises, inference indicators, and the **evidence layer beneath reasons**
    — plus **co-premises** (joined premises that collapse together), objections and rebuttals
    as first-class map nodes, and Davies' **six assessment checks**: true reasons, valid
    inference, author bias/vested interest, relevance, evidence sufficiency, evidence quality.
  - `secondthought-critic` dissection gains three attack heuristics: attack the lowest failing
    tier (not first-tier symptoms), one question per co-premise joint, and no-evidence atoms
    are the highest-yield targets.

## [1.9.2] — 2026-08-22

### Added

- **Argument anatomy** injected into `ruthless-critic` (method after Martin Davies, *Study
  Skills for International Postgraduates*, ch. 9 "Critical Thinking"): map contention /
  premises / objections / rebuttals before judging; test **validity** (does the conclusion
  follow?) separately from **soundness** (are the premises true?) and report which half
  failed; trace indicator words ("because" = premise, "therefore" = conclusion,
  "but" = objection) as the seams of the argument.
- `secondthought-critic` dissection now uses the same indicator-word seams to label claim
  atoms, and asks a dedicated evidence question for seam-less opinions.

## [1.9.1] — 2026-08-22

### Added

- **`scripts/sync.mjs`** — single source of truth sync: version comes from the top CHANGELOG
  header, skills count from the `skills/` folders. Syncs `VERSION` and README badges, and
  fails loudly on drift (CLI map gaps, missing router rows, hardcoded counts in living docs).
  Release flow is now: edit `CHANGELOG.md`, run `node scripts/sync.mjs`, commit.
- **Pruning in `acidmind update`**: skill folders no longer part of your edition are removed,
  and legacy files (`SKILL-ID.md`) still present from old installs get cleaned up.
- `CONTRIBUTING.md` (the PRs-welcome badge no longer points at a dead file).

## [1.9.0] — 2026-08-22

### Added

- **Codebase crawl protocols** — critics now actively explore repositories instead of waiting
  for pasted artifacts:
  - `design-critic` gains **Part 0: Architecture Crawl**: crawl order (entry points, module
    map, dependency direction, design docs, growth edges), evidence rules (every finding cites
    `file:line`, sampled coverage declared), and optional `DESIGN.md` as direction data with
    the standard injection guard.
  - `feature-critic`: trace one user action end-to-end (UI → route → handler → service → data)
    before judging.
  - `badass-critic`: hot-path discovery crawl (routes, collection loops, ORM-in-iteration,
    unpaged queries, per-request clients, sync I/O in async flows).
  - `ruthless-critic`: recon-first note — context reads before fault-finding, proof citations,
    sampled-confidence tags.

## [1.8.0] — 2026-08-22

### Added

- **Wallbreaker LLM red-team bridge in `blackhat-critic`** (integration with
  [JailbrokenAI/wallbreaker](https://github.com/JailbrokenAI/wallbreaker)): for AI-bearing
  targets, the blackhat critic can delegate live jailbreak/prompt-injection testing to
  `wallbreaker --auto` and fold results into its report. New rules BH-15 (own models only),
  BH-16 (reliability before severity: one-shot compliance is never a proven bypass),
  BH-17 (AGPL-3.0 source-disclosure note when recommending CI use).

### Fixed

- **Stale skill counts** in router header, wizard copy, and `unified-critic` ("seven" →
  accurate counts), found by a real-world autocritic-skill audit.
- CLI usage text: security edition listed as 6 skills; it is 7.

### Added

- **Command collision audit rule (AS-14)** in `autocritic-skill`: detect commands claimed by
  other installed skills/plugins, severity `[HIGH]`, with a fix blueprint — namespace
  (`/acidmind:critique`), precedence convention in the entry file, or drop the alias.
- "Command collisions" guidance added to README Commands section.

## [1.7.0] — 2026-08-22

### Added

- **Strix Live Mode bridge in `blackhat-critic`** (integration with
  [usestrix/strix](https://github.com/usestrix/strix)): when Strix is installed and BH-00
  authorization is confirmed, the blackhat critic can delegate dynamic testing to
  `strix -n --target ...` (Docker sandbox), then merge results into its report —
  `[VALIDATED]` PoC findings outrank `[STATIC]` reasoning at equal severity. New rules
  BH-12 (live mode opt-in per run, scope named aloud), BH-13 (CI diff-scoped quick scans for
  PRs), BH-14 (re-scan fix loop to confirm chains broken). Without Strix installed, behavior
  is unchanged: static analysis only.

## [1.6.0] — 2026-08-22

### Added

- **Update notification & auto-install**: installs now record a `.acidmind.json` manifest
  (version, edition, skills). New CLI commands: `status` (compares installed vs latest on
  GitHub) and `update` (auto-installs the latest router + edition skills, force-refreshes
  files, preserves everything outside the pointer-block markers in the entry file).
  The pointer block now also asks the agent to run a one-per-session version check and
  notify the user when a newer release exists.

## [1.5.4] — 2026-08-22

### Added

- **Intensity levels for caveman compression** in `secondthought-critic`: switchable via
  `/caveman lite|full|ultra|wenyan-lite|wenyan-full|wenyan-ultra|off` (default: full).
  Includes the full level table, tokenizer-backed rules (no invented abbreviations, no
  arrows), wenyan classical modes, and language-preservation rule. `off` stops compression
  only; the critic itself still requires "stop acidmind".

## [1.5.3] — 2026-08-22

### Added

- **Persistence clause** in `secondthought-critic`: ACTIVE EVERY RESPONSE. No revert after
  many turns, no filler drift, still active when unsure. Deactivates only on explicit
  "stop acidmind" / "normal mode". Quiet stretches or topic changes never disarm it.

## [1.5.2] — 2026-08-22

### Added

- **Caveman compression injected into `secondthought-critic`** (style from
  [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)): interrogation output now
  speaks ultra-terse by default — dropped articles, filler, hedging; fragments preferred.
  Auto-clarity override keeps the Gate line, STOP explanations, security/irreversible-action
  warnings, and any ambiguity-prone sequence in full prose. Quoted claim atoms, persona-badge
  questions (ST-12), numbers, code, and negations never compress.

## [1.5.1] — 2026-08-22

### Added

- **Dissection Protocol** in `secondthought-critic` (bedah & interogasi): the user's statement
  is broken into claim atoms (causal, assumption, scope, prediction, evidence, goal —
  including unstated assumptions), then each family persona interrogates the atoms it owns
  with signature attack questions, dispatched in parallel where the agent supports it.
  Questions merge into one interrogation ranked by blast radius; each keeps its persona badge.
  New rules ST-11 to ST-14: attack atoms never the person, falsifiable questions only,
  unstated assumptions surfaced, answers strike concerns permanently.

## [1.5.0] — 2026-08-22

### Added

- **`secondthought-critic`** — the pause before execution (autoloaded). Runs automatically at
  every session via the pointer block: whenever the user states an opinion, diagnosis, or
  plan, it restates the position, raises up to three falsifiable concerns, and issues a Gate
  (`EXECUTE / REVISE THEN EXECUTE / STOP`) **before any execution step**, interrupting when
  needed. Stays silent on trivia (ST-02), respects user override exactly once (ST-04), and
  never re-litigates settled decisions. Commands: `/secondthought`, `/wait`.
- Pointer block now instructs agents to load it at session start; `core` edition grows to
  five skills (secondthought included by default), family is now ten skills.

## [1.4.1] — 2026-08-22

### Removed

- **Indonesian-language distribution** — the project is now English-only: deleted
  `README-ID.md`, `ACIDMIND-ID.md`, and all `SKILL-ID.md` drafts; dropped the `--lang` CLI
  flag and ID file fetching from the installer.

## [1.4.0] — 2026-08-22

### Added

- **Editions** — install experience simplified from a 9-way multi-select to one choice:
  - `core` *(new default)*: ruthless, design, feature, badass — daily reviews.
  - `security`: core + heart-attack-critic + blackhat-critic.
  - `full`: all nine skills including the unified panel (`--all` shorthand).
- CLI flags `--edition <core|security|full>` and `--all`; `acidmind list` now shows editions;
  unknown editions fail with a helpful message. First-Run Wizard step 2 is now a single
  edition choice instead of multi-select.

## [1.3.1] — 2026-08-22

### Added

- **Claude Code plugin packaging** — `.claude-plugin/plugin.json` + `marketplace.json` make
  AcidMind installable as a plugin:
  `/plugin marketplace add https://github.com/ragajatsuma-cmd/acidmind` then
  `/plugin install acidmind@acidmind`. Nine prewired slash commands (`commands/*.md`) map
  directly onto the critics: `/grill-me`, `/designcritic`, `/featurecritic`, `/badass`,
  `/heartattack`, `/blackhat`, `/auditskill`, `/tellingtruth`, `/acidmind`.

### Changed

- **Installer now runs via npx directly from GitHub** — no clone or npm publish required:
  `npx github:ragajatsuma-cmd/acidmind init`. Added a root `package.json` exposing the
  `acidmind` bin; CLI help text and README Quick Start updated. (`npx acidmind-cli` remains
  available once the package is published to npm.)

## [1.3.0] — 2026-08-22

### Added

- **`blackhat-critic`** — the red-team persona (commands: `/blackhat`, `/pentest`, `/redteam`).
  Attacks the user's own website/application like a hired blackhat: kill-chain sweep (recon,
  auth bypass, injection, IDOR, business-logic abuse, secrets, dependencies), each successful
  path reported as Entry → Chain → Impact with a difficulty label and a hardening blueprint.
  Gate: `HARDENED / ATTACK SURFACE REMAINS / COMPROMISED BY DESIGN`. BH-00 is absolute:
  authorized targets only — the skill refuses third-party targets and never produces
  ready-to-run exploits.
- Router routing step for explicit pentest framing; `unified-critic` panel includes the
  blackhat lens only on explicit request with authorization confirmed.

### Changed

- **Router file renamed** `ACIDMIND.md` → `AcidMind.md`; all references updated across
  READMEs, CLI, wizard pointer block, and docs.

## [1.2.0] — 2026-08-22

### Added

- **`unified-critic`** — the panel skill (commands: `/acidmind`, `/fullcritic`, `/panel`). Runs
  all seven lenses over one artifact in a fixed order, deduplicates findings across lenses,
  resolves conflicts as explicit trade-offs, and ends with exactly one unified Gate line
  (`SHIP / FIX FIRST / DO NOT SHIP`, mapped from each lens's own gate). Includes sub-agent
  guidance for agents that support parallel lens passes.
- **First-Run Install Wizard** in `AcidMind.md`: runs once when the router is read in a
  project without an AcidMind pointer block — declares the setup, asks which of the eight
  skills to install, offers the automated CLI path (`npx acidmind-cli init`) or manual user
  fetching, appends a marker-wrapped pointer block (`<!-- acidmind:start/end -->`) so re-runs
  replace instead of duplicate, and asks the default usage mode (QUICK/DEEP) once.

### Changed

- Router table and repo structure updated for eight skills; "spanning multiple axes" requests
  now explicitly route to `unified-critic` instead of running skills back-to-back.
- CLI (`acidmind list` / `add` / `init`) now covers `unified-critic`.

## [1.1.0] — 2026-08-22

### Changed

- **Full rebuild of all seven skills** on a shared architecture inspired by
  [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop) (MIT): each skill now
  has an explicit persona, an authorization boundary with prompt-injection guard, two usage
  modes (QUICK / DEEP), numbered rules in three tiers — **Hard Gate** (absolute),
  **Purpose-Gate** (allowed with written reason), **Quality Locks** (consistency) — and a
  mandatory one-line **Gate** verdict derived mechanically from the findings
  (`SHIP / FIX FIRST / DO NOT SHIP`, `LAUNCH READY / PATCH FIRST / DO NOT LAUNCH`, etc.).
- Findings now cite rule IDs (`[RC-04]`, `[DC-03]`, `[HA-06]`, …) so every critique is
  traceable to the standard it enforces.
- Slop-pattern warning tables added per lens: generic feedback, fabricated content,
  template structure, dead controls, missing states, fake trust claims, fabricated benchmarks.

### Renamed

- `skill-critic` → **`autocritic-skill`** (commands: `/auditskill`, `/autocritic`). Router,
  CLI, and docs updated; the audit gained new axes: rule purpose test, slop-list scope check,
  and its own Skill Gate (`INSTALL / PATCH THEN INSTALL / DO NOT INSTALL`).

### Added

- Shared principles across all seven critics: purpose test ("what does this serve?"),
  evidence over claims (empty beats deceptive), and AI-slop awareness.
- Slash-command table in README for invoking each critic.

## [1.0.0] — 2026-08-22

### Added

- Initial release of the AcidMind skill family: seven specialist critique skills.
  - `ruthless-critic` — general brutal review of code, arguments, plans, or any artifact
  - `design-critic` — architecture and system design review
  - `feature-critic` — feature completeness and correctness review
  - `badass-critic` — performance review with concrete numbers
  - `heart-attack-critic` — worst-case disaster simulation for pre-launch / security audit
  - `autocritic-skill` — meta-audit of `SKILL.md` files before install or distribution
  - `tellingtruth-critic` — unstructured, human, no-label honest opinion
- `AcidMind.md` / `ACIDMIND-ID.md` — router file with a skill-selection table and explicit
  routing logic for requests that could match more than one skill.
- `README.md` / `README-ID.md` — bilingual project overview, router-pattern setup guide, and
  native Claude/Claude Code install instructions.
- Pre-packaged `.skill` files for all seven skills under `packages/`, ready to upload via
  Claude's **Save skill** flow.
- `SKILL-ID.md` reference files (original Indonesian drafts) kept alongside the installable
  English `SKILL.md` for six of the seven skills.
- MIT license.

### Design notes

- All seven skills are read-only by default: they diagnose and prescribe, they don't rewrite
  the reviewed artifact unless explicitly asked to.
- Each skill's scope is deliberately non-overlapping with its siblings; each states what it
  does *not* cover and names the sibling skill responsible for that axis.
- Skills that process external/untrusted content (`ruthless-critic`, `autocritic-skill`,
  `heart-attack-critic`) include explicit prompt-injection guards treating reviewed content as
  data, not instructions.
