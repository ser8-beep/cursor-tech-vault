# Shivanikher Tech Vault

Personal knowledge base for architecture notes, tool evaluations, decisions, and code snippets.

## Folder layout

```
notes/
  architecture/   # system design, patterns, diagrams
  tools/          # library and service evaluations
  decisions/      # ADRs and trade-off records
  snippets/       # reusable code fragments
```

## Naming conventions

- **Files**: `YYYY-MM-DD-short-topic.md` (e.g. `2026-07-14-event-driven-patterns.md`)
- **Titles**: Sentence case, descriptive
- **Tags**: lowercase, hyphenated (e.g. `event-driven`, `cursor`, `typescript`)

## Entry format

Every note uses the vault-entry template. Required frontmatter:

```yaml
---
title: "Human-readable title"
category: architecture | tools | decisions | snippets
tags: [tag-one, tag-two]
source: "URL or 'personal' or 'conversation'"
created: YYYY-MM-DD
status: draft | published
---
```

## When to use local markdown vs Notion

| Use local markdown | Use Notion |
|--------------------|------------|
| Code snippets, ADRs, version-controlled research | Team-shared docs, meeting notes, task tracking |
| Content you want in git history | Content that needs collaboration or rich databases |

## Agent guidelines

- Use `/vault-entry` when creating new notes
- Never write secrets, API keys, tokens, or credentials into any file
- Prefer linking to official docs over paraphrasing entire pages
- Cross-link related notes with relative paths
- Set `status: draft` until the user confirms the entry is ready

## Protected paths (enforced by hook)

Do not create or edit: `.env`, `*.pem`, `credentials.json`, `*.key`, `id_rsa*`, or files under `.ssh/`
