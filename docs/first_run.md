# First-Time Setup

1. Install the Wasp CLI:
   ```bash
   curl -sSL https://get.wasp.sh/installer.sh | sh
   ```
2. Clone this repository and run the bootstrap script:
   ```bash
   git clone https://github.com/ryanswalters/Norian.git
   cd Norian
   ./scripts/dev_bootstrap.sh
   ```

The script installs dependencies, runs database migrations, seeds demo data, creates `.env.server` if missing and starts the dev server at `http://localhost:3000`.
