# Portfolio (Tailwind)

Responsive portfolio scaffold — Next.js + Tailwind CSS. Paper designs are the source of truth.

## Quick start

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── app/
│   ├── page.tsx                    # Home
│   ├── case-studies/[slug]/        # 4 case study pages
│   └── data-stories/[slug]/        # 3 data story pages
├── components/
│   ├── layout/                     # Header, Footer
│   └── home/                       # Hero, card grids
└── lib/                            # Content + Paper URL refs
```

## Paper workflow

1. Paste frame links into [`PAPER_DESIGNS.md`](./PAPER_DESIGNS.md)
2. Ask Cursor to implement a section using the Paper link
3. Export assets to `public/assets/images/`

## Breakpoints (from design)

| Prefix | Width |
|--------|-------|
| `mobile:` | 360px |
| `tablet:` | 768px |
| `laptop:` | 1366px |
| `desktop:` | 1600px |
| `wide:` | 1920px |

## Vault reference

Architecture notes: [`../notes/architecture/2026-07-14-responsive-portfolio-css.md`](../notes/architecture/2026-07-14-responsive-portfolio-css.md)
