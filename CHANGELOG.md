# Changelog

All notable changes to AcidMind are documented in this file.

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
