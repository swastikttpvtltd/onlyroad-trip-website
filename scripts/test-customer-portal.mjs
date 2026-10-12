import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { createHash, createHmac } from 'node:crypto';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const { NextRequest } = require('next/server');
const transpile = source => ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const policyUrl = moduleUrl(transpile(readFileSync(new URL('../portal/policy.ts', import.meta.url), 'utf8')));
const { refundQuote } = await import(policyUrl);
const policy = { version: 'test-only', approved: true, bands: [{ minimumHours: 720, chargeBasisPoints: 1000 }, { minimumHours: 360, chargeBasisPoints: 2500 }, { minimumHours: 168, chargeBasisPoints: 5000 }, { minimumHours: 72, chargeBasisPoints: 7500 }, { minimumHours: 0, chargeBasisPoints: 10000 }] };
const base = { policy, totalPaise: 8400000, paidPaise: 3000000, supplierPaise: 0, departure: '2026-11-20T06:00:00Z', acknowledgedAt: '2026-10-12T06:00:00Z' };
assert.equal(refundQuote(base).refundPaise, 2160000);
for (const [hours, charge] of [[720, 1000], [719.99, 2500], [360, 2500], [359.99, 5000], [168, 5000], [167.99, 7500], [72, 7500], [71.99, 10000], [-1, 10000]]) {
  const departure = new Date(Date.parse(base.acknowledgedAt) + hours * 3600000).toISOString();
  assert.equal(refundQuote({ ...base, departure }).chargePaise, Math.round(base.totalPaise * charge / 10000));
}
for (const overrides of [{ policy: null }, { acknowledgedAt: null }, { supplierPaise: null }, { paidPaise: -1 }, { paidPaise: 9000000 }, { departure: 'invalid' }]) assert.equal(refundQuote({ ...base, ...overrides }).available, false);
assert.equal(refundQuote({ ...base, supplierPaise: 4000000 }).refundPaise, 0);
const sqlite = new DatabaseSync(':memory:');
sqlite.exec(readFileSync(new URL('../migrations/0001_customer_portal.sql', import.meta.url), 'utf8'));
const db = { prepare(sql) { const query = sqlite.prepare(sql); let values = []; const statement = { bind(...args) { values = args; return statement; }, async first() { return query.get(...values) ?? null; }, async all() { return { results: query.all(...values) }; }, async run() { const result = query.run(...values); return { meta: { changes: Number(result.changes) } }; } }; return statement; }, async batch(statements) { sqlite.exec('BEGIN'); try { const results = []; for (const statement of statements) results.push(await statement.run()); sqlite.exec('COMMIT'); return results; } catch (error) { sqlite.exec('ROLLBACK'); throw error; } } };
const env = { PORTAL_ENABLED: 'true', PORTAL_DB: db, PORTAL_ORIGIN: 'https://staging.example.test', PORTAL_OTP_SECRET: 'test-only-secret-that-is-longer-than-32-characters', PORTAL_EMAIL_API_KEY: 'test-only', PORTAL_EMAIL_FROM: 'test@example.test' };
globalThis.__portalTestEnv = env;
let source = readFileSync(new URL('../portal/server.ts', import.meta.url), 'utf8');
source = source.replace('import { getCloudflareContext } from "@opennextjs/cloudflare";', 'const getCloudflareContext = () => ({ env: globalThis.__portalTestEnv });');
source = source.replace('from "next/server"', `from ${JSON.stringify(new URL(`file:///${require.resolve('next/server').replaceAll('\\', '/')}`).href)}`);
source = source.replace('from "./policy"', `from ${JSON.stringify(policyUrl)}`);
const { portalHandler } = await import(moduleUrl(transpile(source)));
const tokens = { alice: 'a'.repeat(64), bob: 'b'.repeat(64), admin: 'c'.repeat(64) };
const hash = token => createHash('sha256').update(token).digest('hex');
for (const id of ['alice', 'bob', 'admin']) { sqlite.prepare('INSERT INTO portal_customers(id,email,role) VALUES(?,?,?)').run(id, `${id}@example.test`, id === 'admin' ? 'admin' : 'customer'); sqlite.prepare('INSERT INTO portal_sessions VALUES(?,?,?)').run(hash(tokens[id]), id, Date.now() + 86400000); }
sqlite.prepare('INSERT INTO portal_policies VALUES(?,1,?,?,?)').run(policy.version, JSON.stringify(policy), 'https://example.test', new Date().toISOString());
sqlite.prepare('INSERT INTO portal_bookings VALUES(?,?,?,?,?,?,?,?,?,?)').run('booking-alice', 'alice', 'Test journey', '2027-11-20T06:00:00Z', '2027-11-27', 'confirmed', 8400000, 3000000, 0, policy.version);
sqlite.prepare('INSERT INTO portal_documents VALUES(?,?,?,?,?,?,?)').run('private-doc', 'booking-alice', 'Receipt', 'receipt', 'private/key', 'application/pdf', new Date().toISOString());
sqlite.prepare('INSERT INTO portal_payments VALUES(?,?,?,?,?,?,?)').run('payment-test','booking-alice','test-order','test-payment',3000000,'paid',new Date().toISOString());
assert.throws(() => sqlite.prepare('UPDATE portal_policies SET snapshot_json=? WHERE version=?').run('{}', policy.version), /immutable/);
async function call(path, user, data, origin = env.PORTAL_ORIGIN) {
  const headers = new Headers(); if (user) headers.set('cookie', `ort_portal_session=${tokens[user]}`);
  if (data !== undefined) { headers.set('origin', origin); headers.set('content-type', 'application/json'); }
  return portalHandler(new NextRequest(`${env.PORTAL_ORIGIN}/api/customer/${path}`, { method: data === undefined ? 'GET' : 'POST', headers, ...(data === undefined ? {} : { body: JSON.stringify(data) }) }), path.split('/'));
}
assert.equal((await call('overview')).status, 401);
assert.equal((await call('overview', 'alice')).headers.get('cache-control'), 'private, no-store');
assert.equal((await (await call('overview', 'bob')).json()).bookings.length, 0);
assert.equal((await call('documents/private-doc', 'bob')).status, 404);
assert.equal((await call('bookings/booking-alice/cancellation', 'bob')).status, 404);
sqlite.prepare('UPDATE portal_payments SET verified_at=NULL').run();
assert.match((await (await call('bookings/booking-alice/cancellation', 'alice')).json()).reason, /reconciliation/);
sqlite.prepare('UPDATE portal_payments SET verified_at=?').run(new Date().toISOString());
assert.equal((await call('admin/cancellations', 'alice')).status, 403);
assert.equal((await call('profile', 'alice', { name: 'Alice' }, 'https://evil.example')).status, 403);
assert.equal((await call('profile', 'alice', { name: 'Alice', role: 'admin' })).status, 200);
assert.equal(sqlite.prepare('SELECT role FROM portal_customers WHERE id=?').get('alice').role, 'customer');
assert.equal((await (await call('bookings/booking-alice/cancellation', 'alice')).json()).available, false);
assert.equal((await call('bookings/booking-alice/cancellation', 'alice', { reason: 'Plans have changed', confirm: true })).status, 201);
assert.equal((await call('bookings/booking-alice/cancellation', 'alice', { reason: 'Plans have changed', confirm: true })).status, 409);
const cancellation = sqlite.prepare('SELECT id FROM portal_cancellations').get();
assert.equal((await call(`admin/cancellations/${cancellation.id}`, 'admin', { decision: 'approve', note: 'Reviewed all supplier details' })).status, 409);
assert.equal((await call(`admin/cancellations/${cancellation.id}`, 'admin', { decision: 'acknowledge', note: 'Written request acknowledged' })).status, 200);
const approval = await (await call(`admin/cancellations/${cancellation.id}`, 'admin', { decision: 'approve', note: 'Reviewed all supplier details' })).json();
assert.equal(approval.status, 'approved'); assert.equal(approval.refundExecution, 'disabled');
assert.equal(sqlite.prepare('SELECT status FROM portal_bookings').get().status, 'confirmed');
// OTP replay is blocked, and successful verification issues a secure, HttpOnly session.
const codeHash = createHmac('sha256', env.PORTAL_OTP_SECRET).update('challenge-test:123456').digest('hex');
sqlite.prepare('INSERT INTO portal_challenges(id,email,code_hash,expires_at) VALUES(?,?,?,?)').run('challenge-test', 'new@example.test', codeHash, Date.now() + 300000);
const login = await call('auth/email/verify', null, { challengeId: 'challenge-test', code: '123456' });
assert.equal(login.status, 200); assert.match(login.headers.get('set-cookie'), /HttpOnly/i); assert.match(login.headers.get('set-cookie'), /Secure/i);
assert.equal((await call('auth/email/verify', null, { challengeId: 'challenge-test', code: '123456' })).status, 400);
sqlite.prepare('INSERT INTO portal_challenges(id,email,code_hash,expires_at) VALUES(?,?,?,?)').run('limit-test', 'limit@example.test', 'wrong', Date.now() + 300000);
for (let i = 0; i < 6; i++) assert.equal((await call('auth/email/verify', null, { challengeId: 'limit-test', code: '000000' })).status, 400);
assert.equal(sqlite.prepare('SELECT attempts FROM portal_challenges WHERE id=?').get('limit-test').attempts, 5);
globalThis.__portalTestEnv = {}; assert.equal((await call('overview', 'alice')).status, 503);
sqlite.close();
console.log('PASS: policy boundaries, missing data, refund caps, migration, ownership isolation, admin role, CSRF, duplicate requests, approval workflow, OTP replay/limits, secure cookies, disabled configuration. No external provider calls.');
