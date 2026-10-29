// Offline tests for src/pages/api/contact.ts.
//
// The handler is bundled with fake configuration values and every outbound
// request goes through a mocked fetch, so no email is sent and Turnstile /
// Microsoft Graph are never contacted. Any unexpected URL fails the test.
//
// Analytics: VERCEL_URL points @vercel/analytics/server at a fake host, so
// the inquiry_delivered event is captured by the same mocked fetch.
//
// Run: npm run test:contact-api (named .unit.mjs so Playwright does not collect it)
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const FAKE_ENV = {
  AZURE_TENANT_ID: 'test-tenant',
  AZURE_CLIENT_ID: 'test-client',
  AZURE_CLIENT_SECRET: 'test-secret',
  M365_SENDER_USER_ID: 'sender@test.invalid',
  TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
};

const ANALYTICS_URL = 'https://analytics.test.invalid/_vercel/insights/event';
process.env.VERCEL_URL = 'analytics.test.invalid';

const entry = fileURLToPath(new URL('../src/pages/api/contact.ts', import.meta.url));
const { outputFiles } = await build({
  entryPoints: [entry],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
  define: { 'import.meta.env': JSON.stringify(FAKE_ENV) },
});
const { POST, GET } = await import(
  `data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`
);

let calls;
let turnstileSuccess;
let sendMailStatus;
let analyticsMode;

beforeEach(() => {
  calls = [];
  turnstileSuccess = true;
  sendMailStatus = 202;
  analyticsMode = 'ok';
});

globalThis.fetch = async (url, init = {}) => {
  const u = String(url);
  calls.push({ url: u, body: init.body, headers: init.headers });
  if (u === 'https://challenges.cloudflare.com/turnstile/v0/siteverify') {
    return Response.json({ success: turnstileSuccess });
  }
  if (u === `https://login.microsoftonline.com/${FAKE_ENV.AZURE_TENANT_ID}/oauth2/v2.0/token`) {
    return Response.json({ access_token: 'fake-token', expires_in: 3600 });
  }
  if (u.startsWith('https://graph.microsoft.com/v1.0/users/') && u.endsWith('/sendMail')) {
    return new Response(sendMailStatus < 300 ? null : 'mock failure', { status: sendMailStatus });
  }
  if (u === ANALYTICS_URL) {
    if (analyticsMode === 'fail') throw new Error('analytics down');
    if (analyticsMode === 'hang') return new Promise(() => {});
    return new Response('ok');
  }
  throw new Error(`Unexpected outbound request in test: ${u}`);
};

const VALID = {
  name: 'Pat Example',
  company: 'Example GC <Builders>',
  email: 'pat@example.com',
  phone: '201-555-0100',
  project_type: 'CCTV Systems, Communication Cabinets',
  project_location: 'Queens, NY',
  message: 'Bid due 12/1. Plans on the GC portal.',
  'cf-turnstile-response': 'token-from-widget',
};

async function submit(fields) {
  const body = new URLSearchParams(fields);
  const request = new Request('https://vkcsystems.com/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      host: 'vkcsystems.com',
      'user-agent': 'test-agent',
      referer: 'https://vkcsystems.com/contact',
      cookie: 'session=secret-cookie',
    },
    body,
  });
  const res = await POST({ request, clientAddress: '203.0.113.5' });
  return { status: res.status, location: new URL(res.headers.get('location')).pathname + new URL(res.headers.get('location')).search };
}

const sendMailCalls = () => calls.filter((c) => c.url.endsWith('/sendMail'));
const analyticsCalls = () => calls.filter((c) => c.url === ANALYTICS_URL);

test('valid submission sends one mocked email and redirects to /thank-you', async () => {
  const res = await submit(VALID);
  assert.equal(res.status, 303);
  assert.equal(res.location, '/thank-you');
  const sends = sendMailCalls();
  assert.equal(sends.length, 1);
  const payload = JSON.parse(sends[0].body);
  assert.equal(payload.message.toRecipients[0].emailAddress.address, 'info@vkcsystems.com');
  assert.equal(payload.message.replyTo[0].emailAddress.address, VALID.email);
  // User input is HTML-escaped in the email body
  assert.match(payload.message.body.content, /Example GC &lt;Builders&gt;/);
  assert.doesNotMatch(payload.message.body.content, /<Builders>/);
});

test('all contact form project types fit the project_type limit', async () => {
  const allTypes = [
    'Network Infrastructure', 'CCTV Systems', 'Access Control', 'Public Address / Intercom',
    'Communication Cabinets', 'Testing & Commissioning', 'CADD & Closeout Documentation',
    'IT Infrastructure', 'Other',
  ].join(', ');
  const res = await submit({ ...VALID, project_type: allTypes });
  assert.equal(res.location, '/thank-you');
  const html = JSON.parse(sendMailCalls()[0].body).message.body.content;
  assert.match(html, /Testing &amp; Commissioning/);
  assert.match(html, /CADD &amp; Closeout Documentation/);
});

test('honeypot submissions are accepted silently without sending', async () => {
  const res = await submit({ ...VALID, _honey: 'spam' });
  assert.equal(res.location, '/thank-you');
  assert.equal(calls.length, 0);
});

for (const [label, override] of [
  ['missing name', { name: '' }],
  ['missing company', { company: '' }],
  ['invalid email', { email: 'not-an-email' }],
  ['missing message', { message: '' }],
  ['message too long', { message: 'x'.repeat(5001) }],
]) {
  test(`rejects ${label} before any outbound request`, async () => {
    const res = await submit({ ...VALID, ...override });
    assert.equal(res.location, '/contact?status=invalid');
    assert.equal(calls.length, 0);
  });
}

test('missing Turnstile token is rejected without verification or email', async () => {
  const { ['cf-turnstile-response']: _, ...noToken } = VALID;
  const res = await submit(noToken);
  assert.equal(res.location, '/contact?status=bot');
  assert.equal(calls.length, 0);
});

test('failed Turnstile verification is rejected without email', async () => {
  turnstileSuccess = false;
  const res = await submit(VALID);
  assert.equal(res.location, '/contact?status=bot');
  assert.equal(sendMailCalls().length, 0);
});

test('Graph send failure redirects to the error message and is not counted', async () => {
  sendMailStatus = 500;
  const res = await submit(VALID);
  assert.equal(res.location, '/contact?status=error');
  assert.equal(analyticsCalls().length, 0);
});

test('failed Turnstile verification is not counted as an inquiry', async () => {
  turnstileSuccess = false;
  await submit(VALID);
  assert.equal(analyticsCalls().length, 0);
});

test('delivered inquiry sends one inquiry_delivered event after the email, without personal data', async () => {
  const res = await submit({ ...VALID, source: 'google.com' });
  assert.equal(res.location, '/thank-you');
  const events = analyticsCalls();
  assert.equal(events.length, 1);
  const sendIndex = calls.findIndex((c) => c.url.endsWith('/sendMail'));
  assert.ok(calls.indexOf(events[0]) > sendIndex, 'event must follow the accepted sendMail');
  const event = JSON.parse(events[0].body);
  assert.equal(event.en, 'inquiry_delivered');
  assert.deepEqual(event.ed, { projectType: VALID.project_type, source: 'google.com' });
  // Nothing personal reaches analytics: not in the event, and no cookies forwarded
  const raw = events[0].body;
  for (const value of [VALID.name, VALID.company, VALID.email, VALID.phone, VALID.message, VALID.project_location]) {
    assert.ok(!raw.includes(value), `analytics payload must not include "${value}"`);
  }
  assert.equal(events[0].headers.cookie, undefined);
});

test('inquiry with no project type or source is counted with placeholders', async () => {
  await submit({ ...VALID, project_type: '' });
  assert.deepEqual(JSON.parse(analyticsCalls()[0].body).ed, { projectType: 'None selected', source: 'unknown' });
});

test('referral source is sanitized and included in the email', async () => {
  await submit({ ...VALID, source: 'LinkedIn / Social<script>' });
  assert.equal(JSON.parse(analyticsCalls()[0].body).ed.source, 'linkedin / socialscript');
  const html = JSON.parse(sendMailCalls()[0].body).message.body.content;
  assert.match(html, />Source<\/td>/);
  assert.match(html, /linkedin \/ socialscript/);
});

test('analytics failure never blocks a delivered inquiry', async () => {
  analyticsMode = 'fail';
  const res = await submit(VALID);
  assert.equal(res.location, '/thank-you');
  assert.equal(sendMailCalls().length, 1);
});

test('a hanging analytics endpoint delays the reply by at most about 1.5 s', async () => {
  analyticsMode = 'hang';
  const started = Date.now();
  const res = await submit(VALID);
  const elapsed = Date.now() - started;
  assert.equal(res.location, '/thank-you');
  assert.ok(elapsed < 2500, `took ${elapsed} ms`);
});

test('GET redirects to the contact page', async () => {
  const res = GET({ request: new Request('https://vkcsystems.com/api/contact', { headers: { host: 'vkcsystems.com' } }) });
  assert.equal(new URL(res.headers.get('location')).pathname, '/contact');
});
