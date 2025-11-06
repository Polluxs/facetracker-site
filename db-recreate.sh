#!/bin/bash
set -e

# Change to the directory where this script is located
cd "$(dirname "$0")"

echo "🗑️  Stopping and removing existing database..."
docker compose down -v

echo "🚀 Starting new database with pgvector..."
docker compose up -d

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 3

echo "🔌 Enabling required extensions..."
docker compose exec -T db psql -U root -d facetracker -c "CREATE EXTENSION IF NOT EXISTS vector;"
docker compose exec -T db psql -U root -d facetracker -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"

echo "📊 Generating migrations..."
pnpm exec drizzle-kit generate

echo "📊 Applying migrations..."
pnpm exec drizzle-kit migrate

echo "🌱 Seeding database..."
pnpm run db:seed

echo ""
echo "✅ Database recreated successfully!"
