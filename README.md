# n8n Auto Social Publisher

[![Validate Workflows](https://github.com/Tibo2403/n8n/actions/workflows/validate-workflows.yml/badge.svg)](https://github.com/Tibo2403/n8n/actions/workflows/validate-workflows.yml)

Automation workspace for n8n workflows that prepare, review, and publish social content.

## Contents

```text
workflows/                         Exported n8n workflow JSON files
workflows/auto-social-publisher.json Demo workflow export
docs/setup.md                      Import, backup, and operations notes
scripts/validate-workflows.mjs      CI validation for workflow exports
.env.example                       Required credentials and runtime variables
```

## Demo Workflow

`workflows/auto-social-publisher.json` is a safe demo export. It runs on a schedule, prepares a topic brief, composes a deterministic demo post, and returns a JSON preview. It does not include production credentials.

## Getting Started

1. Copy `.env.example` to `.env`.
2. Fill in credentials for the integrations you use.
3. Import the demo workflow:

   ```bash
   n8n import:workflow --input=workflows/auto-social-publisher.json
   ```

4. Review nodes and credentials inside n8n before enabling the workflow.

## Export Workflows

```bash
n8n export:workflow --all --output=workflows/
```

## Validate Exports

```bash
node scripts/validate-workflows.mjs
```

## Maintenance Checklist

- Keep secrets out of exported workflow JSON.
- Keep `.env.example` synchronized with workflow credentials.
- Commit workflow exports after each validated change.
- Add a short runbook entry in `docs/setup.md` when adding a new workflow.
