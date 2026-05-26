# n8n Auto Social Publisher

This repository is for n8n workflows that automate social publishing tasks.

## Suggested Structure

```text
workflows/
  auto-social-publisher.json
docs/
  setup.md
```

## Environment Variables

Document required credentials in `.env.example` before importing a workflow:

```text
N8N_HOST=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
OPENAI_API_KEY=
```

## Workflow Backup

Export workflows from n8n as JSON and store them in `workflows/`.

```bash
n8n export:workflow --all --output=workflows/
```

## Next Tasks

- Add exported workflow JSON files.
- Add `.env.example` with required credentials.
- Document import and deployment steps.
- Add a scheduled backup workflow.
