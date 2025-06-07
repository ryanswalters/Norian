#!/bin/bash
set -e

if ! command -v npm >/dev/null; then
  echo "npm is required. Install Node.js 18+ and try again." >&2
  exit 1
fi

if ! command -v wasp >/dev/null; then
  echo "wasp CLI not found. Install with: curl -sSL https://get.wasp.sh/installer.sh | sh" >&2
  exit 1
fi

echo "Installing project dependencies..."
if ! npm --prefix template/app install; then
  echo "Dependency installation failed. Ensure this environment has internet access or a local npm cache." >&2
  exit 1
fi

echo "Running database setup..."
if ! wasp db migrate-dev; then
  echo "Database migration failed. Check your Wasp setup." >&2
  exit 1
fi

if ! wasp db seed; then
  echo "Database seeding failed." >&2
  exit 1
fi

echo "Setup complete. Run 'npm test' and 'npm run coverage' to verify." 
