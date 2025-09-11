#!/usr/bin/env bash
set -e

APP_NAME="ravr-tickets"
OUTPUT="deploy-$APP_NAME.zip"

echo "🛠  Limpiando artefactos anteriores..."
rm -f $OUTPUT

echo "⚡ Construyendo NextJS..."
npm run build

echo "🔧 Generando Prisma Client..."
npx prisma generate

echo "🗂  Creando paquete (sin node_modules y sin .next/.cache)..."
rm -rf .next/cache
npx bestzip $OUTPUT \
  .next \
  package.json \
  package-lock.json \
  prisma \
  public \
  next.config.js

echo "✅ Paquete creado: $OUTPUT"
