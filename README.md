[![ID](https://img.shields.io/badge/ID-lightgrey?style=for-the-badge)](./README-ID.md) [![EN](https://img.shields.io/badge/EN-2ea44f?style=for-the-badge)](./README.md)

# AcidMind: Seven Critique Skills for AI Agents

![AcidMind banner](./assets/banner.jpeg)

<details>
<summary>ASCII banner</summary>

```
@@@@@@           @@@      @@@ @@@@@@@@@@  @@@               @@@
@@@@@@@@          @@@      @@@ @@@@@@@@@@@ @@@               @@@
@@!  @@@                   @@@ @@! @@! @@!                   @@@
!@!  @!@  @@@@@@@ @@@  @@@@@@@ !@! !@! !@! @@@ @@@@@@@   @@@@@@@
@!@!@!@! @@@@@@@@ @@@ @@@@@@@@ @!! !!@ @!@ @@@ @@@@@@@@ @@@@@@@@
!!!@!!!! @@!      @@@ @@!  @@@ !@!   ! !@! @@@ @@!  @@@ @@!  @@@
!!:  !!! !@!      @!@ !@!  @!@ !!:     !!: @!@ !@!  @!@ !@!  @!@
:!:  !:! @!@!@!@! !@! !!@!@!@! :!:     :!: !@! !!@  !@! !!@!@!@!
::   ::: :!!@!@@! ::! :!!@!@@! :::     ::  ::! !:!  @:! :!!@!@@!
 :   : :  :  :! :   :  :  :! :  :      :     :  :   : :  :  :! :
        seven critique skills for AI coding agents · v0.0.1
```

</details>

> A router-pattern skill family that stops AI coding agents from giving generic "looks good
> overall" reviews. Seven specialist critics — design, features, performance, disaster
> scenarios, meta-skill auditing, general critique, and plain human honesty — each read
> **on-demand**, never force-loaded into every session.

The ASCII banner lives at [`assets/banner.txt`](./assets/banner.txt) and is what the CLI
prints (in green) on every run; the image banner lives at
[`assets/banner.jpeg`](./assets/banner.jpeg).

---

## What Is This?

`ACIDMIND.md` is a router file, and `skills/` holds seven specialist critique skills, each with
its own `SKILL.md`:

- **`ruthless-critic`** — general brutal review of code, arguments, plans, any artifact
- **`design-critic`** — architecture and system design: coupling, abstraction, dependencies
- **`feature-critic`** — feature completeness and correctness for real users
- **`badass-critic`** — performance review with concrete numbers, not vibes
- **`heart-attack-critic`** — worst-case disaster simulation before launch or a security audit
- **`skill-critic`** — meta: audits a `SKILL.md` file itself before you install or ship it
- **`tellingtruth-critic`** — unstructured, human, no-label honest opinion

Each skill is **read-only by default**: it diagnoses and prescribes, it doesn't rewrite your
work unless you explicitly ask it to. Each skill states — in its own frontmatter and body —
exactly what it does *not* cover, and points to the sibling skill that does, so installing all
seven doesn't get you seven overlapping opinions on the same three paragraphs.

> AcidMind is a **set of lenses, not a personality**. It doesn't impose a tone across your whole
> agent — each skill picks its own register (from severity-labeled technical audit to plain
> conversational honesty) matched to what that kind of review actually needs.

---

## Setup: The Router Pattern

Most projects using an AI coding agent already have an entry-point file (`AGENTS.md`,
`CLAUDE.md`, `GEMINI.md`, etc.) that the agent **always** reads at the start of a session. That
file usually holds general project info: stack, conventions, build/test commands.

`ACIDMIND.md` is **not** meant to be merged or copy-pasted into that entry-point file. Instead,
keep the `skills/` directory and `ACIDMIND.md` wherever your other rules files live (project
root, `.agent/`, `.ai/`, or similar), and add a **single pointer block** to your existing
entry-point file:

```
## Code & Design Review
If the task involves reviewing, critiquing, auditing, or roasting code, a design,
a feature, performance, security posture, or a skill file, read `ACIDMIND.md` first
to pick the right lens, then read the matching file under `skills/`.
```

Why this pattern beats merging everything in:

- **Saves context:** seven skills' worth of rules only load when a review is actually
  requested, instead of bloating every unrelated task.
- **Easier to maintain:** updating one skill never requires touching your entry-point file or
  the other six skills.
- **Portable:** copy the whole `skills/` directory — or just the one skill you need — into any
  project and add the one pointer line above.

This pattern is **generic and tool-agnostic**. The pointer line is plain natural-language
instruction the agent executes using its own file-read tool, so it works identically in Claude
Code, Codex, Cursor, Windsurf, or any other agent capable of reading a referenced file.

### Claude / Claude Code native install

On Claude.ai or Claude Code you don't need the router pattern at all — install skills natively
so Claude discovers and triggers them itself. See [`ACIDMIND.md`](./ACIDMIND.md#claude--claude-code-native-skill-install)
for packaging instructions.

### Manual / one-off prompt

Don't want to set up any file? Copy the full contents of the `skills/<name>/SKILL.md` you need
and paste it at the start of your prompt before asking for a review.

> **Warning:** this approach is less reliable than the router pattern. When a long block of
> rules is pasted into a chat rather than loaded as a native context file, agents are more
> likely to partially ignore or drift from the instructions as the conversation grows longer.
> Use it as a quick fallback, not a primary setup.

---

## Install via CLI

The easiest way to install AcidMind into any project is the bundled CLI (Node 18+):

```
npx acidmind-cli init                                  # router + all 7 skills + pointer block
npx acidmind-cli list                                  # see available skills
npx acidmind-cli add ruthless-critic badass-critic     # install specific skills only
npx acidmind-cli router --lang id                      # just the router, Indonesian
```

Useful flags: `--dest .agent` to install into a subdirectory, `--force` to overwrite existing
files, `--no-pointer` with `init` to skip touching `AGENTS.md`/`CLAUDE.md`.

---

## How to Get the Files

Download the router file directly from the command line:

```
curl -o ACIDMIND.md https://raw.githubusercontent.com/<your-username>/acidmind/main/ACIDMIND.md
```

Or the Indonesian version:

```
curl -o ACIDMIND-ID.md https://raw.githubusercontent.com/<your-username>/acidmind/main/ACIDMIND-ID.md
```

Or grab a single skill you actually need, e.g.:

```
curl -o SKILL.md https://raw.githubusercontent.com/<your-username>/acidmind/main/skills/ruthless-critic/SKILL.md
```

Then place the file(s) wherever your other agent rules files live.

---

## Which Skill Do I Want?

- Reviewing **code, an argument, or a plan in general** → `ruthless-critic`
- Worried your **architecture** won't hold up → `design-critic`
- Worried a **feature** doesn't actually work end-to-end → `feature-critic`
- Worried the system will be **slow** under real load → `badass-critic`
- About to **launch** and want to know what could catastrophically go wrong → `heart-attack-critic`
- Built a **new skill** and want to know if it will actually trigger and work → `skill-critic`
- Just want a **straight, human answer** without severity labels and emoji headers → `tellingtruth-critic`

Full routing logic, including how to handle requests that span more than one axis, is in
[`ACIDMIND.md`](./ACIDMIND.md#routing-logic).

---

## File Structure

```
acidmind/
├── ACIDMIND.md               # router / index — start here
├── ACIDMIND-ID.md            # router, Indonesian
├── README.md                 # this file
├── README-ID.md              # this file, Indonesian
├── LICENSE
├── assets/
│   ├── banner.txt            # ASCII banner printed by the CLI
│   └── banner.jpeg           # image banner shown on GitHub
└── skills/
    ├── ruthless-critic/SKILL.md
    ├── design-critic/SKILL.md
    ├── feature-critic/SKILL.md
    ├── badass-critic/SKILL.md
    ├── heart-attack-critic/SKILL.md
    ├── skill-critic/SKILL.md
    ├── tellingtruth-critic/SKILL.md
    └── cli/
        ├── package.json
        └── index.mjs
```

---

## Design Principles Shared Across All Seven Skills

- **Understand before you critique.** Every skill restates the artifact's intent in terms its
  author would agree with before finding fault — a strawman critique is a failed critique.
- **Severity labels, not vibes.** Findings are ranked so you know what to fix first.
- **Concrete over vague.** "This might be slow" is banned; a specific input, load threshold, or
  scenario is required.
- **Scoped, not overlapping.** Each skill explicitly states what it does *not* cover and names
  the sibling skill that does.
- **Read-only by default.** Diagnostic tools that propose fixes; they don't apply them unless
  asked.
- **Prompt-injection aware.** Skills that process external artifacts explicitly treat the
  reviewed content as data, not instructions.

---

## Contributing

PRs are welcome for new critique axes that don't overlap the existing seven, sharper severity
heuristics, or reports of a skill's stated scope drifting from its actual behavior.

## License

MIT — [LICENSE](./LICENSE)
