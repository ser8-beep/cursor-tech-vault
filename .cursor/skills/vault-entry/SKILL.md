---
name: vault-entry
description: Create a new tech vault note with consistent frontmatter, folder placement, and markdown template. Use when the user asks to add a note, capture research, document a decision, save a snippet, or invokes /vault-entry.
disable-model-invocation: true
---

# Vault Entry

Create a new note in this tech vault following project conventions in `CLAUDE.md`.

## Workflow

1. **Gather inputs** from the user (ask if missing):
   - `topic` — short slug for the filename
   - `category` — one of: `architecture`, `tools`, `decisions`, `snippets`
   - `tags` — array of lowercase hyphenated tags
   - `source` — URL, `personal`, or `conversation`
   - `summary` — one-paragraph overview

2. **Determine the file path**:
   ```
   notes/{category}/YYYY-MM-DD-{topic}.md
   ```
   Use today's date. Slugify the topic (lowercase, hyphens, no spaces).

3. **Check for duplicates** — search `notes/` for existing files on the same topic. If one exists, offer to update it instead of creating a duplicate.

4. **Write the file** using the template below. Set `status: draft` unless the user says otherwise.

5. **Confirm** — tell the user the file path and suggest cross-links to related notes if any exist.

## Template

```markdown
---
title: "{Title in sentence case}"
category: {category}
tags: [{tags}]
source: "{source}"
created: {YYYY-MM-DD}
status: draft
---

# {Title}

## Summary

{summary}

## Details

{Expand with structured content: context, findings, examples, or rationale depending on category.}

## Key takeaways

- 

## Related

- 
```

## Category guidance

| Category | What to include in Details |
|----------|---------------------------|
| `architecture` | Context, diagram (mermaid if helpful), trade-offs, alternatives considered |
| `tools` | What it does, pros/cons, when to use, comparison to alternatives |
| `decisions` | Problem, decision, consequences, status (ADR format) |
| `snippets` | Language, usage example, when to reach for it, caveats |

## Examples

**Input**: topic=`cursor-hooks`, category=`tools`, tags=`cursor,automation`, source=`conversation`

**Output path**: `notes/tools/2026-07-14-cursor-hooks.md`

**Input**: topic=`event-sourcing-adr`, category=`decisions`, tags=`event-driven,architecture`

**Output path**: `notes/decisions/2026-07-14-event-sourcing-adr.md`
