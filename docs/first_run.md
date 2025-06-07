# First-Time Setup

1. Install the Wasp CLI:
   ```bash
   curl -sSL https://get.wasp.sh/installer.sh | sh
   ```
2. Clone this repository and run the setup script:
   ```bash
   git clone https://github.com/ryanswalters/Norian.git
   cd Norian
  ./scripts/setup-dev.sh
  ```
The script installs dependencies, checks your Node.js version (18+ required) and basic write permissions, then runs database migrations, seeds demo data, and creates `.env.server` if missing. It will exit with instructions if any step fails or if packages cannot be fetched.

Run `scripts/dev_bootstrap.sh` afterwards if you want the server started automatically.

## Troubleshooting

If `npm run coverage` fails with `vitest: not found`, ensure dev dependencies are installed:

```bash
npm --prefix template/app install
```

If the `@vitest/coverage-v8` package is missing, add it with:

```bash
npm --prefix template/app install -D @vitest/coverage-v8
```

## Known Issues

Tests and coverage need internet access to install dev dependencies. If running in an offline or restricted environment, run `scripts/setup-dev.sh` on a machine with internet first, or manually install the packages specified in `package.json`.
