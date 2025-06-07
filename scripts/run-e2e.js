const http = require('http');
const { spawn } = require('child_process');
const which = require('which');

const PORT = process.env.PORT || 3000;

function checkServer() {
  return new Promise(resolve => {
    const req = http.get({ hostname: 'localhost', port: PORT, path: '/' }, () => {
      req.destroy();
      resolve(true);
    });
    req.on('error', () => resolve(false));
  });
}

async function waitForServer(maxAttempts = 20) {
  for (let i = 0; i < maxAttempts; i++) {
    if (await checkServer()) return true;
    await new Promise(r => setTimeout(r, 1000));
  }
  return false;
}

(async () => {
  let serverProc;
  if (!(await checkServer())) {
    if (!which.sync('wasp', { nothrow: true })) {
      console.error('Wasp CLI not found. Please install it and run `wasp start` in another terminal.');
      process.exit(1);
    }
    console.log('Backend not detected, starting with "wasp start"...');
    serverProc = spawn('wasp', ['start'], { cwd: 'template/app', stdio: 'inherit' });
    const ok = await waitForServer();
    if (!ok) {
      console.error('Backend failed to start. Make sure `wasp start` works.');
      if (serverProc) serverProc.kill();
      process.exit(1);
    }
  }

  const testProc = spawn('npx', ['playwright', 'test'], { stdio: 'inherit' });
  testProc.on('exit', code => {
    if (serverProc) serverProc.kill();
    process.exit(code);
  });
})();
