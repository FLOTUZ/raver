#!/usr/bin/env bash
set -e

APP_NAME="ravr-tickets"
OUTPUT="deploy-$APP_NAME.zip"

echo "🛠  Limpiando artefactos anteriores..."
rm -f $OUTPUT || true

echo "⚡ Construyendo NextJS..."
npm run build

echo "🔧 Generando Prisma Client..."
npx prisma generate

echo "🗂  Creando paquete (sin node_modules y sin .next/.cache)..."
npx bestzip $OUTPUT \
  .next \
  package.json \
  package-lock.json \
  prisma \
  public \
  next.config.js \
  --exclude=".next/.cache/**"

echo "✅ Paquete creado: $OUTPUT"
