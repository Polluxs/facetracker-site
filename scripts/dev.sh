#!/bin/bash
set -e

echo "🗑️  Removing existing database container..."
docker compose down -v 2>/dev/null || true

echo "🐳 Starting fresh database container..."
docker compose up -d

echo "⏳ Waiting for database to be ready..."
until docker compose exec -T db pg_isready -U root -d facetracker > /dev/null 2>&1; do
  sleep 1
done
echo "✅ Database is ready!"

echo "🔌 Enabling database extensions..."
docker compose exec -T db psql -U root -d facetracker -c 'CREATE EXTENSION IF NOT EXISTS vector; CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

echo "📦 Running database migrations..."
pnpm drizzle-kit push --force

echo "🚀 Starting dev server..."
exec vite dev
