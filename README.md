# Client Intake Workbench

Public-safe templates for turning messy client chats, screenshots, file notes, quote signals, and delivery updates into a trackable service workflow.

客户需求整理工作台的公开安全版模板包：把微信聊天、截图、文件说明、报价线索和交付反馈整理成可追踪的客户、需求、项目、收款和交付记录。

This repository is extracted from real service-delivery work, but it does not include private client data, raw chat logs, production databases, accounts, or deployment secrets.

## Why

Small studios and solo builders often receive work through WeChat, Telegram, Taobao, email, screenshots, file bundles, and forwarded messages. The risky part is not only "getting the requirement"; it is remembering what was promised, what is missing, what was quoted, what has been paid, and what has already been delivered.

小团队和个人开发者最容易出问题的地方不是“客户有没有说需求”，而是需求散在聊天和文件里，后面报价、付款、修改边界、交付确认都靠记忆追。这个仓库把真实工作里反复出现的整理动作沉淀成模板和检查流程。

## What It Contains

- Intake summary prompt for messy chat records.
- Lead intake template for first-contact evaluation.
- Public/private boundary checklist.
- Sanitized example intake JSON.
- Copyable customer confirmation messages.
- A public-safety scan script before publishing.

## Workflow

1. Capture the original source into a private inbox.
2. Extract a draft instead of creating a final project immediately.
3. Keep uncertain fields in "missing information".
4. Generate a short confirmation message for the client.
5. Convert confirmed requirements into a project record.
6. Track quote, payment, delivery records, feedback, and next action.
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

- `Customer`: name, contact, source, notes, status.
- `Intake`: raw source, structured request, materials, deadline, budget signal, risk level, missing information, confirmation message.
- `Project`: status, quote, payment state, delivery checklist, acceptance criteria, next action.
- `Feedback`: raw feedback, normalized action items, priority, status.
- `DeliveryRecord`: what was sent, file note, confirmation state, delivered time.

## Privacy Boundary

Public:

- Generic templates.
- Sanitized sample data.
- Reusable prompts.
- Setup notes without secrets.
- Screenshots with fake names and fake content.

Private:

- Raw customer chats.
- Customer names, schools, companies, phone numbers, WeChat IDs, account screenshots, contracts, payment details, databases, API keys, and production `.env` files.

See [docs/public-private-boundary.md](docs/public-private-boundary.md).

## Roadmap

- Add a minimal Next.js starter after the private implementation is fully cleaned.
- Add CSV/SQLite import and export examples.
- Add a local OCR inbox example that keeps screenshots on device.
- Add optional AI summary adapters with local fallback behavior.

## License

MIT

