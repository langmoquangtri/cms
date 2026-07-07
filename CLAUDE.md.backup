# CMS Project Context

## Current Goal

Maintain and extend this CMS safely.

Known repository areas include:

- `firecms-admin/`
- `r2-upload-worker/`
- `firestore.rules`

The current direction is to complete the CMS and then build the frontend.

Do not infer architecture from names alone. Inspect actual code, package manifests, entry points, configuration, and data flow before making architectural claims.

## Project Rules

- Preserve existing working behavior.
- Do not modify unrelated functionality.
- Do not refactor unrelated code.
- Do not replace working architecture merely because another approach seems cleaner.
- Prefer minimal, reversible changes.
- Do not add dependencies unless necessary.
- Match the existing code style and project structure.

## Before Non-Trivial Changes

1. Inspect relevant files.
2. Understand current behavior.
3. Identify the exact change surface.
4. State a brief plan.
5. Define a verifiable success condition.
6. Make the smallest necessary change.
7. Verify the result.

## Debugging

For bugs:

1. Reproduce the failure or gather concrete evidence.
2. Trace the relevant execution path.
3. Inspect state flow, async behavior, listeners, requests, responses, and configuration as relevant.
4. Identify root cause before editing.
5. Apply the smallest safe fix.
6. Verify the original failure no longer occurs.

Do not stack speculative fixes.

If a previous fix failed, reassess the diagnosis before making additional changes.

## Sensitive Areas

Treat these as high-risk:

- Firebase Authentication
- Firestore data model
- Firestore security rules
- Cloudflare R2
- Worker configuration
- environment variables
- API credentials
- deployment configuration

Before modifying sensitive areas:

1. inspect current behavior
2. explain the impact
3. make the smallest change
4. verify

## Security

- Never expose or print full secrets.
- Never commit API keys, tokens, passwords, cookies, or credentials.
- Do not hardcode secrets.
- Do not weaken Firestore rules merely to make an error disappear.
- Do not make storage or database access public as a debugging shortcut.

## Commands

Do not invent build, test, or deploy commands.

Discover commands from:

- `package.json`
- workspace configuration
- README files
- existing scripts
- deployment configuration

Use the narrowest relevant verification command.

## Git Discipline

Before meaningful changes:

- inspect `git status`
- preserve unrelated user modifications
- inspect relevant existing diff when necessary

Do not commit, push, merge, or deploy unless explicitly requested.

After changes:

- summarize files changed
- state verification performed
- state remaining uncertainty

## Definition of Done

A task is complete only when:

- requested behavior is implemented
- unrelated behavior is preserved
- relevant verification has been attempted
- failures or uncertainty are reported honestly

Distinguish clearly between:

- verified working
- logically expected
- not yet tested
