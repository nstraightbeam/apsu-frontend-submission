// Polling avoids macOS EMFILE watcher failures in constrained environments.
// This is scoped to the dev child process and does not change system settings.
import { spawn } from 'node:child_process';
const child = spawn(
  process.execPath,
  [
    'node_modules/next/dist/bin/next',
    'dev',
    '--webpack',
    '--hostname',
    '127.0.0.1',
    ...process.argv.slice(2),
  ],
  { stdio: 'inherit', env: { ...process.env, WATCHPACK_POLLING: '1000' } },
);
child.on('exit', (code) => process.exit(code ?? 0));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
