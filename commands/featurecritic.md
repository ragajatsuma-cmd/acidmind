---
description: Feature Critic — does this feature actually work for real users, in every state
allowed-tools: Read, Grep, Glob
---

Read ${CLAUDE_PLUGIN_ROOT}/skills/feature-critic/SKILL.md and follow it exactly.

Review target: $ARGUMENTS

If no target was given, ask the user which feature, module, or flow to review.
Stay read-only: diagnose and prescribe, never implement unless explicitly asked.
