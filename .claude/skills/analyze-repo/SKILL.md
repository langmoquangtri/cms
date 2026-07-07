# Skill: analyze-repo

Use this skill only when repository structure or architecture must be understood before implementation.

## Goal
Build the smallest accurate map needed for the current task.

## Workflow
1. Read `CLAUDE.md`.
2. Inspect only files relevant to the task.
3. Find:
   - entry points
   - affected modules
   - data flow
   - schemas/types
   - relevant package scripts
4. Search for existing implementations before proposing new ones.
5. Report briefly:
   - architecture found
   - affected files
   - likely risks
   - recommended next step

## Rules
- Do not audit the entire repo unless necessary.
- Do not refactor during analysis.
- Do not read unrelated directories.
- Prefer targeted searches over broad scans.
- Stop once enough context exists to implement safely.