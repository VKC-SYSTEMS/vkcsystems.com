import type { APIRoute } from 'astro';

export const prerender = false;

const GRAPH_API = 'https://graph.microsoft.com/v1.0';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getGraphToken(env: Record<string, string | undefined>): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }
  const tokenUrl = `https://login.microsoftonline.com/${env.AZURE_TENANT_ID}/oauth2/v2.0/token`;
  const params = new URLSearchParams({
    client_id: env.AZURE_CLIENT_ID ?? '',
    client_secret: env.AZURE_CLIENT_SECRET ?? '',
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });
  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) {
    throw new Error(`Graph token fetch failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.set('remoteip', ip);
  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function redirectTo(request: Request, path: string): Response {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'vkcsystems.com';
  const proto = request.headers.get('x-forwarded-proto') ?? 'https';
  return Response.redirect(new URL(path, `${proto}://${host}`), 303);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const env = import.meta.env as unknown as Record<string, string | undefined>;
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return redirectTo(request, '/contact?status=error');
  }

  // Honeypot — silently accept to avoid signaling bots
  const honeypot = formData.get('_honey');
  if (honeypot && String(honeypot).length > 0) {
    return redirectTo(request, '/thank-you');
  }

  const name = String(formData.get('name') ?? '').trim();
  const company = String(formData.get('company') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const projectType = String(formData.get('project_type') ?? '').trim();
  const projectLocation = String(formData.get('project_location') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !name || name.length > 200 ||
    !company || company.length > 200 ||
    !email || email.length > 254 || !emailRe.test(email) ||
    !message || message.length > 5000 ||
    phone.length > 50 ||
    projectLocation.length > 200 ||
    projectType.length > 500
  ) {
    return redirectTo(request, '/contact?status=invalid');
  }

  const turnstileToken = String(formData.get('cf-turnstile-response') ?? '');
  const turnstileSecret = env.TURNSTILE_SECRET_KEY ?? '';
  if (!turnstileToken || !turnstileSecret) {
    return redirectTo(request, '/contact?status=bot');
  }
  const isHuman = await verifyTurnstile(turnstileToken, turnstileSecret, clientAddress ?? null);
  if (!isHuman) {
    return redirectTo(request, '/contact?status=bot');
  }

  const senderUserId = env.M365_SENDER_USER_ID;
  const recipient = env.M365_RECIPIENT_EMAIL ?? 'info@vkcsystems.com';
  if (!senderUserId) {
    console.error('M365_SENDER_USER_ID is not configured');
    return redirectTo(request, '/contact?status=error');
  }

  const subject = `New Project Inquiry - ${name} (${company})`;
  const bodyHtml = `
    <h2 style="color:#1f2937;font-family:Arial,sans-serif;">New Project Inquiry</h2>
    <table style="font-family:Arial,sans-serif;border-collapse:collapse;">
      <tr><td style="padding:4px 12px 4px 0;"><strong>Name:</strong></td><td style="padding:4px 0;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;"><strong>Company:</strong></td><td style="padding:4px 0;">${escapeHtml(company)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;"><strong>Email:</strong></td><td style="padding:4px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;"><strong>Phone:</strong></td><td style="padding:4px 0;">${escapeHtml(phone) || '<em style="color:#6b7280;">(not provided)</em>'}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;"><strong>Project Type:</strong></td><td style="padding:4px 0;">${escapeHtml(projectType) || '<em style="color:#6b7280;">(none selected)</em>'}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;"><strong>Location:</strong></td><td style="padding:4px 0;">${escapeHtml(projectLocation) || '<em style="color:#6b7280;">(not provided)</em>'}</td></tr>
    </table>
    <h3 style="color:#1f2937;font-family:Arial,sans-serif;margin-top:24px;">Project Description</h3>
    <p style="font-family:Arial,sans-serif;line-height:1.5;white-space:pre-wrap;">${escapeHtml(message)}</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
    <p style="font-family:Arial,sans-serif;color:#6b7280;font-size:12px;">Submitted via vkcsystems.com contact form.</p>
  `;

  try {
    const token = await getGraphToken(env);
    const sendRes = await fetch(
      `${GRAPH_API}/users/${encodeURIComponent(senderUserId)}/sendMail`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject,
            body: { contentType: 'HTML', content: bodyHtml },
            toRecipients: [{ emailAddress: { address: recipient } }],
            replyTo: [{ emailAddress: { address: email, name } }],
          },
          saveToSentItems: false,
        }),
      }
    );

    if (!sendRes.ok) {
      const errText = await sendRes.text();
      console.error('Graph sendMail failed:', sendRes.status, errText);
      // Force token refresh on next call in case the token was the problem
      cachedToken = null;
      return redirectTo(request, '/contact?status=error');
    }

    return redirectTo(request, '/thank-you');
  } catch (err) {
    console.error('Contact form error:', err);
    return redirectTo(request, '/contact?status=error');
  }
};

export const GET: APIRoute = ({ request }) => redirectTo(request, '/contact');
