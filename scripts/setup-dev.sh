#!/bin/bash
set -e

REQUIRED_NODE_MAJOR=18

if ! command -v node >/dev/null; then
  echo "Node.js $REQUIRED_NODE_MAJOR+ is required." >&2
  exit 1
fi

node_version=$(node -v)
node_major=$(echo "$node_version" | sed -E 's/v([0-9]+).*/\1/')

if [ "$node_major" -lt "$REQUIRED_NODE_MAJOR" ]; then
  echo "Node.js $REQUIRED_NODE_MAJOR+ required, found $node_version" >&2
  exit 1
fi

if ! command -v npm >/dev/null; then
  echo "npm is required. Install Node.js $REQUIRED_NODE_MAJOR+ and try again." >&2
  exit 1
fi


if ! command -v wasp >/dev/null; then
  echo "Wasp CLI not found. Install with one of the following:" >&2
  echo "  curl -sSL https://get.wasp.sh/installer.sh | sh" >&2
  echo "  npm install -g @wasp/cli" >&2
  echo "See docs/first_run.md for more information." >&2
  exit 1
fi

wasp_version=$(wasp --version | awk '{print $2}')
required_wasp_major=0
if [ -z "$wasp_version" ]; then
  echo "Failed to detect Wasp CLI version." >&2
  exit 1
fi
wasp_major=$(echo "$wasp_version" | cut -d'.' -f1)
if [ "$wasp_major" -lt "$required_wasp_major" ]; then
  echo "Wasp CLI version $wasp_version detected. Please upgrade to the latest release." >&2
  exit 1
fi

if ! touch .setup_write_test 2>/dev/null; then
  echo "Write permission required in $(pwd)." >&2
  exit 1
else
  rm .setup_write_test
fi

echo "Installing project dependencies..."
if ! npm --prefix template/app install; then
  echo "Dependency installation failed. Ensure this environment has internet access or a local npm cache." >&2
  exit 1
fi

if [ ! -x template/app/node_modules/.bin/vitest ]; then
  echo "Vitest was not installed correctly. Check your network connection or npm cache and rerun this script." >&2
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

echo "Verifying backend can start..."
wasp start > /tmp/wasp_setup.log 2>&1 &
SETUP_PID=$!
for i in {1..20}; do
  if curl -s http://localhost:3000/ >/dev/null 2>&1; then
    break
  fi
  sleep 1
done
if ! kill $SETUP_PID >/dev/null 2>&1; then
  echo "Backend failed to start. Check /tmp/wasp_setup.log for details." >&2
  exit 1
fi
rm /tmp/wasp_setup.log

echo "Setup complete. Run 'npm test' and 'npm run coverage' to verify."
