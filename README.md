# ZotFood Local — "Duolingo for Cooking" (UCI)

A **fully local, zero‑cloud** Next.js 14 app where UCI students learn cooking via gamified lessons and recipe matching from their pantry.
Everything (auth, DB, uploads) runs **on your machine**: SQLite + filesystem. No external APIs.

## One‑Command Setup
```bash
pnpm install && pnpm run setup
```
Then:
```bash
pnpm dev
```
Visit http://localhost:3000

## Architecture (ASCII)
```
Next.js App Router
  ├─ UI (Tailwind + shadcn-like components)
  ├─ API Routes (app/api/*)
  │    ├─ auth (NextAuth Credentials, bcrypt)
  │    ├─ recognize        (local mock / tfjs optional)
  │    ├─ match-recipes    (local scoring over Prisma/SQLite)
  │    ├─ lessons/complete (XP/streak update)
  │    ├─ favorite         (toggle user favorites)
  │    ├─ submit           (student submissions; admin review)
  │    ├─ admin/approve    (approve recipe/submission)
  │    └─ me               (profile, streak, xp summary)
  ├─ lib/*
  │    ├─ db.ts     (Prisma client singleton)
  │    ├─ auth.ts   (NextAuth Credentials config)
  │    ├─ scoring.ts
  │    ├─ synonyms.ts
  │    └─ fs-upload.ts (local file saves under public/uploads/*)
  └─ Prisma (SQLite)
       ├─ schema.prisma
       └─ seed.ts (ingredients/recipes/skills/lessons/achievements/demo user)
```

### Development Workflow
- Add ingredients/recipes/lessons inside Prisma seed or via the Admin page.
- All uploads saved under `public/uploads/YYYY-M/*`.
- To switch recognizer:
  - `INGREDIENT_RECOGNIZER=mock` (default) — label from filename tokens using `lib/synonyms.ts`
  - `INGREDIENT_RECOGNIZER=tfjs` — client loads a lightweight MobileNet model from `public/model` and maps labels via the synonyms map; server only saves file.

### Deployment Note
This project is local-only by design (SQLite + local FS). For production, migrate to PostgreSQL and managed object storage; replace credentials flow with SSO if needed.

## Seed Data Summary
- 25+ ingredients (fruit/veg/protein/grain/dairy) with storage tips
- 8 demo recipes (quick budget‑friendly)
- 3 skills × 4 lessons each with small MCQ quizzes
- 3 achievements
- Demo user: `demo@uci.edu` / `password123`

## License
MIT
