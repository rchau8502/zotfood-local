#!/usr/bin/env bash
set -euo pipefail
echo "📦 Installing dependencies..."
pnpm install

echo "🗄️ Prisma generate..."
pnpm prisma generate

echo "🗂️ Running migrations..."
pnpm prisma migrate dev --name init

echo "🌱 Seeding database..."
pnpm prisma db seed

echo "✅ Setup complete. Start dev server with: pnpm dev"
