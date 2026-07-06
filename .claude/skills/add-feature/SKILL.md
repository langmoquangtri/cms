---
name: add-feature
description: Add a requested feature while preserving existing behavior and architecture with minimal changes.
argument-hint: "[feature request]"
disable-model-invocation: true
---

# Add Feature Safely

Feature request:

$ARGUMENTS

Follow the global and project CLAUDE.md instructions.

## Phase 1: Understand

1. Read the current implementation.
2. Identify the exact requested behavior.
3. Identify existing patterns that can be reused.
4. Identify files that genuinely need changes.
5. Note ambiguity only when it materially affects correctness or architecture.

Do not add speculative requirements.

## Phase 2: Plan

Before editing, provide a brief plan:

1. step → verification
2. step → verification
3. step → verification

Also define a concrete success condition.

## Phase 3: Implement

- Prefer the smallest complete implementation.
- Reuse existing architecture and components.
- Preserve existing behavior.
- Preserve naming and coding style.
- Do not refactor unrelated code.
- Do not add speculative functionality.
- Do not add dependencies unless necessary.
- Handle realistic expected errors.
- Do not create configurability that was not requested.

Every changed line should trace directly to the feature request.

## Phase 4: Verify

Verify against the success condition.

Check as relevant:

- requested behavior works
- existing behavior remains intact
- loading state
- error state
- state persistence
- duplicate submissions
- API response handling
- build errors
- type errors

Use project-defined commands discovered from existing configuration. Do not invent commands.

## Final Report

Report:

1. What was added
2. Files changed
3. Verification performed
4. Known limitations
5. Anything not yet tested

Never claim success without evidence.
