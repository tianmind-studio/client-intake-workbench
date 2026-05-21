# Client Intake Workbench

Public-safe templates for turning scattered first-contact notes, screenshots, file descriptions, scope signals, delivery updates, and feedback into a trackable service workflow.

客户需求整理工作台的公开安全版模板包：把分散的沟通摘要、截图说明、文件说明、范围信号和交付反馈整理成可追踪的需求、项目、交付和后续行动记录。

This repository is extracted from real service-delivery patterns, but it does not include private client data, raw chat logs, production databases, account material, or deployment secrets.

## Why

Small studios and solo builders often receive work through many channels: WeChat, email, screenshots, file bundles, forwarded messages, public links, and short voice-note summaries.

The risky part is not only understanding the first request. It is keeping scope, missing information, acceptance criteria, feedback, and next action visible without copying private material into public systems.

这个仓库把真实工作里反复出现的整理动作沉淀成公开安全的模板和检查流程。它不是业务台账，也不保存客户原文。

## What It Contains

- Intake summary prompt for messy but redacted notes.
- Lead intake template for first-contact evaluation.
- Public/private boundary checklist.
- Sanitized example intake JSON.
- Copyable confirmation messages.
- A public-safety scan script before publishing.

## Workflow

1. Keep the original source in a private inbox.
2. Extract a draft instead of creating a final project immediately.
3. Keep uncertain fields in `missing information`.
4. Generate a short confirmation message for review.
5. Convert confirmed requirements into a project-ready summary.
6. Track scope, materials, delivery checklist, feedback, and next action.
7. Publish only sanitized templates, examples, and tooling.

## Quick Start

Use the templates directly:

```bash
cp templates/lead-intake-template.md my-lead.md
cp templates/intake-summary-prompt.md my-prompt.md
```

Run the public-safety check before pushing:

```bash
bash scripts/check-public-safe.sh
```

## Suggested Data Model

The private implementation can use any stack. The minimum useful records are:

- `Contact`: display label, source channel, notes, status.
- `Intake`: redacted source summary, structured request, materials, deadline signal, risk level, missing information, confirmation message.
- `Project`: status, scope, delivery checklist, acceptance criteria, next action.
- `Feedback`: redacted feedback summary, normalized action items, priority, status.
- `DeliveryRecord`: what was sent, file note, confirmation state, delivered time.

Keep raw source material outside the public repo.

## Public-Safe Boundary

Public:

- Generic templates.
- Sanitized sample data.
- Reusable prompts.
- Setup notes without secrets.
- Screenshots with fake names and fake content.

Private:

- Raw customer chats.
- No raw private conversations.
- Customer names, schools, companies, phone numbers, WeChat IDs, account screenshots, contracts, sensitive commercial records, databases, API keys, and production `.env` files.
- Private backend URLs, full private vault content, Hermes or safe-index configuration.

See [docs/public-private-boundary.md](docs/public-private-boundary.md).

## Related Public Proof

- TianMind service catalog: <https://junius.tianmind.com/services.html>
- Fit check: <https://junius.tianmind.com/fit.html>
- Scope sheet: <https://junius.tianmind.com/scope.html>
- Proof ledger: <https://junius.tianmind.com/proof-ledger.html>
- Delivery standard: <https://junius.tianmind.com/delivery.html>
- Trust center: <https://junius.tianmind.com/trust.html>

## Roadmap

- Add a minimal starter after the private implementation is fully cleaned.
- Add import and export examples using sanitized fixtures.
- Add a local OCR inbox example that keeps screenshots on device.
- Add optional AI summary adapters with local fallback behavior.

## License

MIT
