---
name: analyze-repo
description: Analyze the current repository architecture and state without modifying files. Use for understanding an unfamiliar codebase or planning major work.
argument-hint: "[optional focus area]"
disable-model-invocation: true
---

# Analyze Repository

Perform a read-only repository analysis.

Focus request:

$ARGUMENTS

If no focus request is provided, analyze the repository broadly.

## Process

1. Inspect the repository structure.
2. Read relevant package manifests and workspace configuration.
3. Identify applications, packages, workers, services, and entry points.
4. Inspect relevant configuration files.
5. Trace major data flows and external integrations.
6. Distinguish verified facts from inference.
7. Identify incomplete areas, risks, and unknowns.

For this CMS repository, pay particular attention when present to:

- FireCMS
- Firebase initialization
- Authentication
- Firestore collections
- Firestore security rules
- Cloudflare R2
- Upload workers
- environment variables
- frontend entry points
- build scripts
- deploy scripts

## Output

Report:

1. Architecture summary
2. Main components
3. Entry points
4. Data flow
5. External integrations
6. Confirmed findings
7. Risks or incomplete areas
8. Unknowns requiring verification
9. Recommended next step

## Restrictions

- Do not edit files.
- Do not install packages.
- Do not refactor.
- Do not run destructive commands.
- Do not commit, push, or deploy.
- Do not present guesses as facts.
