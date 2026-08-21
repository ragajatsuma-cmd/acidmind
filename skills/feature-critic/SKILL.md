---
name: feature-critic
description: >
  Critiques the completeness, logic, and correctness of a feature specifically — whether the
  existing feature actually does what it claims, whether edge cases are unhandled, whether
  important functionality is missing, and whether the implementation matches real-world needs.
  Activate when the user asks for a feature review, user story review, acceptance criteria
  review, or a review of a specific function's implementation. Also triggers on the
  /featurecritic or /feature-critic commands. Focus: does this feature ACTUALLY work for real
  users under real conditions — not in theory, not in a demo.
---

# Feature Critic

## Focus

One question: **does this feature actually work?**

Not "is the code clean." Not "is the architecture elegant."
Can real users use this without hitting a brick wall.

---

## Before You Critique: Understand the Context

1. Who are the users? What are they trying to do?
2. What does "success" mean for this feature?
3. State what this feature claims to do — in terms its author would agree with.
4. Only then go looking for holes.

---

## Output Format

---

### 🚫 Feature Verdict
*(One sentence. Under what conditions does this feature fail to serve its users?)*

---

### 🕳️ Feature Holes

Severity labels:

- **[BLOCKER]** — Users cannot complete the core task. The feature doesn't work.
- **[SEVERE]** — Works on the happy path, fails under common real-world conditions.
- **[MODERATE]** — An edge case users *will* eventually hit — it's just a matter of time.
- **[MINOR]** — Small friction that erodes UX over time.

Format for each hole:

> **[SEVERITY] Label** — The specific condition under which this feature fails. Not "might
> fail" — show the concrete scenario: what input, what state, what sequence of actions.

---

### 📋 Features That Should Exist But Don't

List features that are *absent* but logically necessary for the existing feature to work in
production:
- Why this missing piece is a problem (not a nice-to-have)
- The concrete scenario where its absence breaks the user experience

---

### 🔧 Specific Fixes

For every BLOCKER and SEVERE:
- The condition that needs to be handled
- What the correct behavior should be
- What to add, change, or remove — specifically

---

## Axes of Feature Evaluation

### Functional Correctness
- Does the output match the input for all cases, not just the demonstrated one?
- Are state transitions correct? (loading → success, loading → error, empty state)
- Is it idempotent where it should be idempotent?

### Error Handling
- What happens with invalid input?
- What happens when an external dependency fails (API timeout, DB down)?
- Does the error message give the user enough information to act on it?
- Is the error recoverable or fatal?

### Edge Cases Users Will Hit
- Empty / null / undefined input
- Input at the maximum boundary (longest string, largest file, biggest value)
- Concurrent access (two users doing the same thing at once)
- Repeated actions (submitting a form twice, double-clicking, refreshing mid-process)
- Users with different permissions
- Stale data / data that's no longer valid

### Consistency With Other Features
- Does this feature behave consistently with similar features in the same system?
- Does it introduce a new pattern that will confuse users?

### Observability
- Is there a way to know this feature failed before a user reports it?
- Is there enough logging to debug production issues?

---

## Boundaries of This Skill

This skill does **not** comment on:
- Architecture or design pattern choices (→ use design-critic)
- Overall system performance (→ use badass-critic)
- Whether this feature *should* exist at all (a product decision, not a technical one)
