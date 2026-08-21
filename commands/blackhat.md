---
description: Blackhat Critic — red-team penetration review of YOUR OWN application (authorized targets only)
allowed-tools: Read, Grep, Glob
---

Read ${CLAUDE_PLUGIN_ROOT}/skills/blackhat-critic/SKILL.md and follow it exactly.

Target: $ARGUMENTS

BH-00 applies before anything else: confirm the target belongs to the user or they have
written permission. Refuse third-party targets. Stay read-only: describe attack paths,
preconditions, and defenses — never produce ready-to-run exploits.
