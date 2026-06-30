# Assistant Startup

This document is for Codex, Claude Code, Hermes, OpenClaw, and other coding assistants.

## Start Here

From this repository, run:

```sh
/Users/adamroberts/Projects/Operating-System/conductor/agent-context.sh
```

This resolves the current repository through Workspace and prints:

- Workspace path and config
- Brain path
- Operating-System commands
- Software Factory path
- mapped repo alias
- GitHub slug
- Brain project note
- current branch and dirty status
- required startup steps

## Ideas and Tasks

If the user or another AI proposes an idea, do not jump directly to implementation.

Run:

```sh
/Users/adamroberts/Projects/Operating-System/conductor/idea-intake.sh --task "Describe the proposed work"
```

Then follow the printed route.

## Project Workflow

Project work starts with:

```sh
/Users/adamroberts/Projects/Operating-System/conductor/workflow-step.sh show context
```

Proceed one step at a time unless the user explicitly names a stage range.

## Non-Negotiables

- Do not hardcode `/Users/adamroberts/Brain`.
- Do not store source code in Brain.
- Do not move repositories unless explicitly requested.
- Do not skip verification silently.
- Do not claim success when critical checks were not run.
- Preserve unrelated local changes.
