#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Installing frontend dependencies..."
npm install

echo "Building frontend assets..."
npm run build

echo "Starting development server..."
npm run dev