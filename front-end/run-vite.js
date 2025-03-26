// run-vite.js
import { spawn } from 'child_process';

// Read CLI args
const args = process.argv.slice(2);
const getArg = (name) => {
    const index = args.indexOf(name);
    return index !== -1 ? args[index + 1] : undefined;
};

const port = getArg('port') || '5173';
const apiPort = getArg('api') || '8000';

console.log("args: ", process.argv);
console.log(`[run-vite] Launching Vite on port ${port} with API port ${apiPort}`);

const child = spawn('vite', ['--port', port], {
    env: {
        ...process.env,
        VITE_API_PORT: apiPort
    },
        stdio: 'inherit',
        shell: true // optional: needed if 'vite' isn't directly executable on some systems
    }
);
