# Security Policy

## Supported version

Security fixes target the current default branch. The included workflows are
demonstrations and must be reviewed before operational use.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting or open a private security
advisory in this repository. Do not place API keys, webhook secrets, exported
credentials, personal data, or active endpoint URLs in a public issue.

Include the affected workflow or script, impact, reproduction steps, and a
minimal redacted export when possible.

## Workflow safety

Inspect every imported node, credential reference, webhook, schedule, and
external destination before enabling a workflow. Use test accounts and
least-privilege credentials first.
