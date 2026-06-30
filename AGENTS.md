# Meeting Calculator Agent Instructions

Read this file before meaningful work in this repository.

## Required Startup

Run the shared Operating-System startup packet from this repository:

```sh
/Users/adamroberts/Projects/Operating-System/conductor/agent-context.sh
```

If a human or AI partner proposes an idea or task, route it through intake before planning or building:

```sh
/Users/adamroberts/Projects/Operating-System/conductor/idea-intake.sh --task "Describe the idea"
```

Before planning or implementing:

1. Read this file.
2. Read `/Users/adamroberts/Projects/Operating-System/AGENTS.md`.
3. Read `/Users/adamroberts/Projects/Workspace/AGENTS.md`.
4. Read `/Users/adamroberts/Projects/Workspace/docs/architecture-handbook.md`.
5. Read `/Users/adamroberts/Projects/Workspace/workspace.yml`.
6. Read `README.md`.
7. Search Brain for relevant CalWizz and meeting calculator context using the Brain path from Workspace.
8. Summarize relevant Brain context, or state explicitly that none exists.
9. Inspect repository status and surface unrelated dirty work.
10. Continue through the stepwise workflow.

Primary Brain note:

```text
Projects/meeting-calculator.md
```

## Default Workflow

Project work starts at `context`:

```sh
/Users/adamroberts/Projects/Operating-System/conductor/workflow-step.sh show context
```

Standard stage order:

```text
context
scope
plan
approve
build
verify
review
fix
commit
push
brain
handoff
```

## Approval Rule

A proposed idea is intake, not approval to build.

Get explicit approval before implementation when the work affects behavior, architecture, data, permissions, dependencies, deployment, workflow policy, or user-visible output.

Only group stages or skip gates when the user explicitly names the repo/layer and the stage range or skipped gate.

## Project Boundaries

- This repo contains the standalone CalWizz meeting cost calculator.
- CalWizz app/backend work belongs in `/Users/adamroberts/Projects/calwizz/time-insights-app`.
- CalWizz extension work belongs in `/Users/adamroberts/Projects/calwizz/calwizz-extension`.
- Workspace owns local paths, repo aliases, GitHub slugs, and Brain project-note mappings.
- Operating-System owns workflow policy and conductor behavior.
- Software Factory owns reusable templates and shared assets.
- Durable decisions and project context belong in Brain.
- Do not store source code in Brain.

## Verification

- For content or layout changes, inspect `index.html` in a browser or local static server.
- For calculator logic changes, test affected inputs, URL parameters, and displayed totals.
- For SEO/social changes, inspect meta tags and shareable URL behavior.
