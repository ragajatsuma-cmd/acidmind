---
description: Autocritic Skill — audit a SKILL.md before you install or ship it
allowed-tools: Read, Grep, Glob
---

Read ${CLAUDE_PLUGIN_ROOT}/skills/autocritic-skill/SKILL.md and follow it exactly.

Audit target: $ARGUMENTS

If no SKILL.md path was given, ask the user which skill file to audit.
Stay read-only: audit and prescribe fixes, never rewrite the skill unless explicitly asked.
