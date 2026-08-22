---
description: Unified Critic, the full AcidMind panel - all lenses merged into one report with one gate
allowed-tools: Read, Grep, Glob, Task
---

Read ${CLAUDE_PLUGIN_ROOT}/skills/unified-critic/SKILL.md and follow it exactly,
including its panel order and deduplication rules. For each lens pass, also read that
lens's own SKILL.md from ${CLAUDE_PLUGIN_ROOT}/skills/<lens>/SKILL.md before running it.

Review target: $ARGUMENTS

If no target was given, ask the user what to put in front of the panel.
Respect lens inclusion rules: heart-attack only on launch/security framing, blackhat only on
explicit request with confirmed authorization, autocritic only for SKILL.md artifacts.
End with exactly one Gate line.
