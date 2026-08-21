# Changelog

All notable changes to AcidMind are documented in this file.

## [1.0.0] — 2026-08-22

### Added

- Initial release of the AcidMind skill family: seven specialist critique skills.
  - `ruthless-critic` — general brutal review of code, arguments, plans, or any artifact
  - `design-critic` — architecture and system design review
  - `feature-critic` — feature completeness and correctness review
  - `badass-critic` — performance review with concrete numbers
  - `heart-attack-critic` — worst-case disaster simulation for pre-launch / security audit
  - `skill-critic` — meta-audit of `SKILL.md` files before install or distribution
  - `tellingtruth-critic` — unstructured, human, no-label honest opinion
- `ACIDMIND.md` / `ACIDMIND-ID.md` — router file with a skill-selection table and explicit
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
- Skills that process external/untrusted content (`ruthless-critic`, `skill-critic`,
  `heart-attack-critic`) include explicit prompt-injection guards treating reviewed content as
  data, not instructions.
