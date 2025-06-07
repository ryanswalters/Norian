const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const which = require('which');

if (!which.sync('wasp', { nothrow: true })) {
  console.error('Wasp CLI not found. Install it with `npm install -g @wasp/cli` or `curl -sSL https://get.wasp.sh/installer.sh | sh`.');
  console.error('See docs/first_run.md for details.');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

function checkEndpoint(path) {
  return new Promise(resolve => {
    const req = http.get({ hostname: 'localhost', port: PORT, path }, () => {
      req.destroy();
      resolve(true);
    });
    req.on('error', () => resolve(false));
  });
}

async function checkServer() {
  if (await checkEndpoint('/')) {
    // also try diagnostics endpoint for more reliable readiness
    if (await checkEndpoint('/api/diagnostics')) return true;
  }
  return false;
}

async function waitForServer(maxAttempts = 180) {
  for (let i = 0; i < maxAttempts; i++) {
    if (await checkServer()) return true;
    await new Promise(r => setTimeout(r, 1000));
  }
  return false;
}

(async () => {
  let serverProc;
  let backendReady = false;
  if (!(await checkServer())) {
    console.log('Backend not detected, starting with "wasp start"...');
    console.log('Writing backend output to e2e-backend.log');
    const logStream = fs.createWriteStream('e2e-backend.log');
    serverProc = spawn('wasp', ['start'], { cwd: 'template/app' });
    serverProc.stdout.pipe(logStream);
    serverProc.stderr.pipe(logStream);
    serverProc.on('exit', code => {
      if (!backendReady) {
        console.error(`Backend exited with code ${code}. Check e2e-backend.log for details.`);
        process.exit(1);
      }
    });
    const ok = await waitForServer();
    backendReady = ok;
    if (!ok) {
      console.error('Backend failed to start after waiting. Check e2e-backend.log and try running "wasp start" manually.');
      serverProc.kill();
      process.exit(1);
    }
  }

  const testProc = spawn('npx', ['playwright', 'test'], { stdio: 'inherit' });
  testProc.on('exit', code => {
    if (serverProc) serverProc.kill();
    process.exit(code);
  });
})();
