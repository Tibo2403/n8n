# n8n Auto Social Publisher

Automation workspace for n8n workflows that prepare and publish social content across channels.

## Structure

```text
workflows/        Exported workflow JSON files
docs/setup.md     Import, backup, and operations notes
.env.example      Required credentials and runtime variables
```

## Getting Started

1. Copy `.env.example` to `.env`.
2. Fill in the credentials required by the workflows you import.
3. Export workflows from n8n into `workflows/`.
4. Document each workflow trigger, destination, and expected output.

## Export Workflows

```bash
n8n export:workflow --all --output=workflows/
```

## Import Workflows

```bash
n8n import:workflow --input=workflows/auto-social-publisher.json
```

## Maintenance Checklist

- Keep secrets out of exported workflow JSON.
- Keep `.env.example` synchronized with workflow credentials.
- Commit workflow exports after each validated change.
- Add a short runbook entry in `docs/setup.md` when adding a new workflow.
