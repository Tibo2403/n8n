# Setup

## Import workflows

1. Export workflows from an n8n instance into `workflows/`.
2. Copy `.env.example` to `.env` and fill in the required credentials.
3. Import a workflow:

```bash
n8n import:workflow --input=workflows/auto-social-publisher.json
```

## Backup workflows

```bash
n8n export:workflow --all --output=workflows/
```

## Operational checklist

- Keep credentials out of committed workflow exports.
- Document every required credential in `.env.example`.
- Add a short note for every workflow trigger, target channel, and expected output.
