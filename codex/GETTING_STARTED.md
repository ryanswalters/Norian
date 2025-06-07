# Norian Dev Setup

## Prerequisites
- Node.js 18+
- Wasp CLI

## Steps

```bash
# Install Wasp CLI
curl -sSL https://get.wasp.sh/installer.sh | sh

# Clone the repo
git clone https://github.com/ryanswalters/Norian.git
cd Norian

# Run setup
./scripts/setup-dev.sh
# The script verifies Node.js 18+, write permissions, and that the Wasp CLI and Vitest are installed.
# If it fails, check your Node version, directory permissions, network access, and ensure `wasp --version` works.
wasp start
```

This will start the development server at http://localhost:3000. If dependency installation fails, make sure you have internet access or manually install the packages listed in `package.json`.

To run end-to-end tests execute:

```bash
npm run e2e
```
The script will start `wasp start` automatically if it isn't already running. Open `/preview` in the browser to confirm the backend is up and view recent memory entries.
