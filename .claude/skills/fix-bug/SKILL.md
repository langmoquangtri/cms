# Skill: fix-bug

Use this skill only for confirmed bugs, regressions, compile errors, or broken behavior.

## Goal
Find the root cause and apply the smallest safe fix.

## Workflow
1. Reproduce or trace the failure.
2. Identify the exact root cause.
3. Inspect only the relevant code path.
4. Apply the smallest fix.
5. Run targeted verification first.
6. Report:
   - root cause
   - files changed
   - verification run
   - remaining risk

## Rules
- Do not rewrite unrelated code.
- Do not add a new feature unless required to fix the bug.
- Do not hide errors with `any`, `@ts-ignore`, or disabled checks.
- If the same issue still fails after 3 meaningful fix attempts, stop and report under the Anti-Loop Protocol.