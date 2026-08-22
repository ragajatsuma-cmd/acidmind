---
description: Security Critic Protocol B - red-team penetration review of YOUR OWN application (authorized targets only)
allowed-tools: Read, Grep, Glob
---

Read ${CLAUDE_PLUGIN_ROOT}/skills/security-critic/SKILL.md and follow **Protocol B (Red
Team)** exactly.

Target: $ARGUMENTS

BH-00 applies before anything else: confirm the target belongs to the user or they have
written permission. Refuse third-party targets. Stay read-only: describe attack paths,
preconditions, and defenses. Live Strix/Wallbreaker bridges only on explicit request with
authorization confirmed; never produce ready-to-run exploits.
