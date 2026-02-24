#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy

echo "Running database seeds..."
npx prisma db seed || echo "Seed warning: may already be applied or failed, continuing..."

echo "Starting server..."
exec npm start
