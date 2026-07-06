---
name: fix-bug
description: Diagnose and fix a specific bug using root-cause analysis and the smallest safe patch.
argument-hint: "[bug symptoms or error]"
disable-model-invocation: true
---

# Fix Bug Safely

Bug report:

$ARGUMENTS

Treat this as a debugging task, not a rewrite task.

Follow the global and project CLAUDE.md instructions.

## Phase 1: Understand

1. Restate the observed failure precisely.
2. Inspect the relevant code path.
3. Gather concrete evidence.
4. Inspect logs, errors, state transitions, requests, responses, listeners, effects, and configuration as relevant.
5. Identify plausible causes.

Do not edit yet unless the root cause is sufficiently supported.

## Phase 2: Diagnose

State clearly:

- observed symptom
- verified or best-supported root cause
- supporting evidence
- affected files
- why the current behavior occurs

If root cause is not sufficiently supported, continue investigating rather than stacking speculative fixes.

## Phase 3: Plan

Before changing code, give a brief plan:

1. change → verification
2. change → verification

Keep the plan minimal.

## Phase 4: Patch

- Make the smallest change that fixes the root cause.
- Preserve unrelated behavior.
- Preserve current architecture and style.
- Do not refactor unrelated code.
- Do not add dependencies unless necessary.
- Remove only unused code created by this change.
- Do not hide errors merely to remove the symptom.

## Phase 5: Verify

Use the narrowest relevant verification available in the project.

Possible checks include:

- reproduce the original failure
- targeted test
- targeted build
- targeted type check
- inspect request and response
- verify state no longer reverts
- verify listener behavior
- verify persistence after reload

Prefer a regression test only when suitable test infrastructure already exists.

## Final Report

Include:

1. Root cause
2. Evidence
3. Files changed
4. Exact fix
5. Verification performed
6. Remaining uncertainty

Never claim the bug is fixed unless verification supports that claim.
