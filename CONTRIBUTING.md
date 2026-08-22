# Contributing to AcidMind

Thanks for helping make AI agent reviews sharper. This guide covers the fast path.

## What We Accept

- **New critique axes** that do not overlap the existing family (check the scope boundaries
  in each `skills/<name>/SKILL.md` before proposing one).
- **Sharper heuristics**: better severity rules, new slop patterns, new interrogation
  questions for `secondthought-critic`'s dissection protocol.
- **Drift reports**: a skill's stated scope diverging from its actual behavior.
- **CLI improvements** to the installer (`cli/index.mjs`), keep it zero-dependency.

## Ground Rules

Every skill follows the shared architecture. Before submitting changes, verify your edit
keeps all of these intact:

1. Persona + authorization boundary with prompt-injection guard.
2. Numbered rules in three tiers: Hard Gate / Purpose-Gate / Quality Locks.
3. A mandatory mechanical Gate verdict at the end of every review.
4. Read-only by default: diagnose and prescribe; never rewrite unless asked.
5. Scope statement: what this skill does NOT cover, and which sibling does.

## How to Submit

1. Open an issue first for new skills or behavior changes; small fixes can go straight to PR.
2. Keep one logical change per PR.
3. Update `CHANGELOG.md` under an `[Unreleased]` heading if user-visible.

## Consistency Check

Before pushing, run:

```bash
node scripts/sync.mjs
```

It verifies skill counts, router table rows, CLI map entries, and version badges against the
canonical facts (folders in `skills/`, top header in `CHANGELOG.md`). PRs that introduce
drift will be asked to fix it, the script tells you exactly where.

## License

By contributing, you agree your contributions are licensed MIT alongside the project.
