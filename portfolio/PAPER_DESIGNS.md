# Paper design links

Paste Paper file/frame links here as you implement each page. Reference these when asking Cursor to match the design.

**Home file:** https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/2-0

## Home

| Section | Paper link | Status |
|---------|------------|--------|
| Header | https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/13BX-0 | linked |
| Hero splash | https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/2-0 | implemented |
| Case study cards | https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/13FO-0 | linked |
| Data story cards | https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/13WK-0 | linked |
| Contact strip / footer | https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/139C-0 | linked |

## Case study detail pages

| Slug | Paper link | Status |
|------|------------|--------|
| insurance | | pending |
| maternity | | pending |
| smart-home | | pending |
| erp | | pending |

## Data story detail pages

| Slug | Paper link | Status |
|------|------------|--------|
| story-one | | pending |
| story-two | | pending |
| story-three | | pending |

## Components

| Component | Paper link | Status |
|-----------|------------|--------|
| Header (responsive) | https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/13BX-0 | linked |
| Case study card | https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/13FO-0 | linked |
| Contact strip | https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/139C-0 | linked |

---

After pasting links, update the matching entry in `src/lib/case-studies.ts` or `src/lib/data-stories.ts` with the `paperUrl` field.

- **Home card grids** → `paperUrl` on each item points to the shared card component frame
- **Detail pages** → `paperUrl` on each slug points to that page's detail frame (when pasted)
