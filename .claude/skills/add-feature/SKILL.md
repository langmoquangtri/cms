# Skill: add-feature

Use this skill only when implementing a new capability.

## Goal
Add the feature with minimal architectural disruption.

## Workflow
1. Read the task and acceptance criteria.
2. Inspect the existing integration points.
3. Reuse existing schemas, components, utilities, and data sources.
4. Define a short implementation plan.
5. Implement the smallest complete version.
6. Preserve backward compatibility where relevant.
7. Run targeted verification, then final build if needed.
8. Report:
   - feature implemented
   - files changed
   - data model changes
   - verification
   - remaining risk

## Rules
- Do not create parallel systems when an existing one can be extended.
- Do not add speculative features.
- Avoid unnecessary dependencies.
- Do not touch unrelated code.
- For remote data tests, follow the repository test-data limits.