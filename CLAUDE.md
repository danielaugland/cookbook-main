# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

This project (`cookbook-main`) uses two git worktrees under `my-cookbook/`:

- `cookbook-main/` — main worktree, `main` branch
- `cookbook-claude/` — linked worktree, `claude-fork` branch (this directory)

The remote is `https://github.com/danielaugland/cookbook-main.git`.

```
raw/                         # READ-ONLY — source recipes, never touched
reference/                   # Claude-facing reference docs (density table, etc.)
public/
  icons/                     # PWA icon
  photos/                    # Recipe photos (webp, named by recipe slug)
src/
  content/
    config.ts                # Zod Content Collection schema
    recipes/                 # Normalised recipe wiki pages (ingest target)
  components/
    ServingScaler.tsx         # Preact island — scales ingredient quantities
    SearchFilter.tsx          # Preact island — browse/search page
  layouts/
    BaseLayout.astro
    RecipeLayout.astro
  pages/
    index.astro              # Browse page
    recipes/[...slug].astro  # Recipe pages
astro.config.mjs
package.json
.github/workflows/deploy.yml
techniques/                  # Technique concept pages (not built into website yet)
ingredients/                 # Ingredient entity pages (not built into website yet)
index.md                     # Wiki catalog (not built)
log.md                       # Ingest log (not built)
```

## Raw Sources — Strictly Read-Only

**Files inside `raw/` must never be created, edited, renamed, moved, or deleted by Claude — under any circumstances.**

This is an absolute rule with no exceptions. It applies regardless of what the user asks, what errors are found, or what would be more convenient. The `raw/` folder is a permanent, untampered archive of exactly what was imported.

- Found a typo in a raw file? Fix it in the wiki page only.
- Raw file has wrong units? Correct them during ingest — the raw file stays as-is.
- User asks you to update a raw file? Decline and explain this rule.

The integrity of `raw/` as an unmodified archive is more important than any individual fix.

## Build Commands

```bash
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Deployment: push to `main` triggers GitHub Actions → GitHub Pages at `https://danielaugland.github.io/cookbook-main`.

## Ingest Workflow

When a new recipe is added to `raw/`:

1. Read the raw file — do not modify it.
2. Create a wiki page in `src/content/recipes/<slug>.md` with the format below.
3. Place any recipe photo (webp) in `public/photos/<slug>.webp` and set the `photo:` field.
4. Extract any reusable techniques and update or create pages in `techniques/`.
5. Update `index.md` with a link to the new recipe page.
6. Append an entry to `log.md` recording the ingest (date, raw file, wiki page created).

## Recipe Wiki Page Format

Each file in `src/content/recipes/` uses YAML frontmatter. The **`## Ingredients` section is not included in the markdown body** — it is rendered automatically from the `ingredients:` array by the layout.

```markdown
---
title: Pasta al Pomodoro
source: pasta-al-pomodoro.md
country: Italy
yield: 4
yieldUnit: servings
tags: [pasta, vegetarian]
photo: pasta-al-pomodoro.webp
ingredients:
  - { amount: 400, unit: g,     item: spaghetti,       scalable: true }
  - { amount: 500, unit: ml, weightG: 525, item: tomato passata, scalable: true }
  - { amount: 2,   unit: count, item: garlic cloves,   scalable: true }
  - { amount: 60,  unit: ml, weightG: 55,  item: olive oil,      scalable: true }
  - { item: salt to taste, scalable: false }
---

## Method

1. ...

## Notes

...
```

### Frontmatter fields

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Recipe name |
| `source` | string | Raw filename (e.g. `pasta.md`) — mandatory backlink to the raw archive |
| `country` | string | Country of origin (use `Unknown` if genuinely unclear) |
| `yield` | number | Base serving count |
| `yieldUnit` | string | Label for servings (default: `servings`) |
| `tags` | string[] | Optional descriptive tags |
| `photo` | string | Filename in `public/photos/` (omit if no photo) |
| `ingredients` | array | See ingredient schema below |

### Ingredient schema

| Field | Type | Notes |
|-------|------|-------|
| `amount` | number | Omit for items with no quantity (e.g. "salt to taste") |
| `unit` | enum | `g`, `kg`, `ml`, `L`, `count` |
| `weightG` | number | Weight in grams — **required for all liquids** (`ml`/`L` items) |
| `item` | string | Ingredient name |
| `scalable` | boolean | `false` for "salt to taste", "1 bay leaf" etc. |

## Unit Conventions

### Solids
Grams below 1kg, kilograms at 1kg and above. The `ServingScaler` handles conversion automatically.

### Liquids
All liquids must have **both** `unit: ml` (or `L`) and `weightG`. Consult `reference/density-table.md` for densities. The scaler scales both values independently.

Format rendered on page: `500ml (525g)` or `1L (1.03kg)`.

### Count-based items
Use `unit: count`. Examples: `2 eggs`, `3 garlic cloves`, `1 onion`. Do not convert to grams.

### Temperature
Always Celsius in the `## Method` text.

### Disallowed units
Never use cups, tablespoons, teaspoons, ounces, pounds, or Fahrenheit in wiki pages. Convert all of these during ingest.

## Lint Checklist

The Zod schema in `src/content/config.ts` enforces required fields at build time. Additionally verify:

- Every recipe has a `source:` field pointing to an existing file in `raw/`
- Every recipe has a `country:` field (`Unknown` is acceptable, blank is not)
- Every liquid ingredient has both `unit: ml/L` and a `weightG` value
- No `## Ingredients` section appears in the markdown body of recipe files
- `index.md` contains an entry for every file in `src/content/recipes/`
- `public/photos/` contains a photo for every recipe that has a `photo:` field
