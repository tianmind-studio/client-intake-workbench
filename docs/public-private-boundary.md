# Public / Private Boundary

This project exists because real work creates reusable assets. The rule is simple: publish the method, not the private case.

## Publishable

| Content | Public? | Notes |
| --- | --- | --- |
| Generic intake prompt | Yes | Remove private names and business-specific constraints. |
| Lead intake template | Yes | Keep fields generic. |
| Sanitized example JSON | Yes | Use fake names, fake contacts, fake amounts, and fake deadlines. |
| Workflow diagrams and SOPs | Yes | Describe the process without naming clients. |
| Public demo code | Yes | Only after secrets, uploads, databases, and production config are removed. |
| Safety scan script | Yes | Useful for other builders. |

## Keep Private

| Content | Public? | Why |
| --- | --- | --- |
| Raw chat logs | No | They contain private context and third-party wording. |
| Customer files and screenshots | No | They may expose identity, school, business, account, or payment data. |
| Production database | No | It is operational data, not a public example. |
| `.env`, API keys, browser credentials, SSH keys | No | Secrets must never enter the repo. |
| Pricing negotiation records | No | They can expose business strategy and client details. |
| Internal memory or Obsidian vault pages | No | Extract stable public rules instead of publishing the source notes. |
| Academic-risk or private delivery-boundary SOPs | No | Keep sensitive service boundaries private; publish only neutral process templates. |

## Release Checklist

- [ ] No `.env` file.
- [ ] No real database file.
- [ ] No uploads folder.
- [ ] No raw client messages.
- [ ] No phone, WeChat ID, email, address, school, company, payment screenshot, or account screenshot.
- [ ] No API key, token, browser credential, SSH private key, webhook secret, or login-state file.
- [ ] README explains what is real, what is template, and what is intentionally omitted.
- [ ] Examples are synthetic.
- [ ] License is present.

## Positioning

Good public wording:

> A local-first client-intake workflow for small studios and solo builders.

Avoid:

> This is my real customer management system with all of my work records.

## Practical Rule

If a reader can learn the workflow, fork the template, and adapt it without seeing your private clients, it is public-safe.
