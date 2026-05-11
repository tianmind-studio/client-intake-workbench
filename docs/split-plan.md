# Split Plan

This is the safe extraction path from a private workbench into a public GitHub asset.

## Phase 1: Method Package

Status: current.

Public assets:

- README.
- Intake prompt.
- Lead intake template.
- Customer confirmation scripts.
- Synthetic JSON example.
- Public/private boundary document.
- Safety scan script.

Do not copy private app code yet.

## Phase 2: Starter Schema

Extract a minimal schema that describes the workflow without production data:

- Customer.
- Intake.
- Project.
- Feedback.
- Delivery record.

Keep implementation notes stack-agnostic unless the starter app is ready.

## Phase 3: Minimal App Starter

Only after cleanup:

- Create a fresh Next.js starter.
- Add SQLite or JSON-file storage with demo data only.
- Add `.env.example`, never `.env`.
- Add local fallback summary logic.
- Add a short smoke-test script.
- Add screenshots with synthetic data.

## Phase 4: Real Public Release

Before publishing:

- Run `bash scripts/check-public-safe.sh`.
- Review `git status --short`.
- Confirm `git remote -v` points to the intended public repo.
- Confirm GitHub description, topics, README, and license.
- Push only after manual confirmation.

## Suggested GitHub Metadata

Repository name:

```text
client-intake-workbench
```

Description:

```text
Local-first client intake and delivery traceability templates for small studios and solo builders.
```

Topics:

```text
client-intake, freelancer, solo-builder, small-studio, workflow, ai-agent, templates, service-delivery
```

