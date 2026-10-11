import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const env = { ...process.env, INSTAGRAM_ASSET_ORIGIN: 'https://onlyroadtrip-instagram.ishpreetsinghkeith.workers.dev', NEXT_PRIVATE_STANDALONE: 'true', NEXT_PRIVATE_OUTPUT_TRACE_ROOT: root };
function run(file, args) { const r = spawnSync(process.execPath,[file,...args],{cwd:root,env,stdio:'inherit'}); if (r.error) throw r.error; if(r.status!==0) process.exit(r.status||1); }
function bin(pkg, name) { const dir = path.join(root,'node_modules',...pkg.split('/')); const config = JSON.parse(readFileSync(path.join(dir,'package.json'),'utf8')); return path.resolve(dir,typeof config.bin==='string'?config.bin:config.bin[name]); }
run(path.join(root,'node_modules/next/dist/bin/next'),['build']);
run(bin('@opennextjs/cloudflare','opennextjs-cloudflare'),['build','--skipNextBuild']);
run(bin('wrangler','wrangler'),['deploy','--config','wrangler.instagram.jsonc']);
