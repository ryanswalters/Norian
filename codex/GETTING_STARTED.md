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
# The script verifies Node.js 18+ and write permissions before installing dependencies.
# If it fails, check your Node version, directory permissions and network access.
wasp start
```

This will start the development server at http://localhost:3000. If dependency installation fails, make sure you have internet access or manually install the packages listed in `package.json`.

To run end-to-end tests after the server is running, execute:

```bash
npm run e2e
```
Open `/preview` in the browser to access the live preview panel that shows agent replies and recent memory entries.
