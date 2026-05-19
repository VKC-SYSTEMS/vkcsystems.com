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

  const subject = `New Project Inquiry — ${name} (${company})`;

  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const projectTypePills = projectType
    ? projectType
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .map(
          (t) =>
            `<span style="display:inline-block;background-color:#fef2f2;color:#b82828;font-size:13px;font-weight:500;padding:5px 12px;border-radius:999px;margin:0 6px 6px 0;border:1px solid #fecaca;">${escapeHtml(t)}</span>`
        )
        .join('')
    : '<span style="color:#9ca3af;font-size:14px;font-style:italic;">None selected</span>';

  const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  const bodyHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:${FONT};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;padding:32px 12px;">
    <tr><td align="center">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">

        <tr>
          <td style="background-color:#dd3333;padding:28px 32px;">
            <div style="color:rgba(255,255,255,0.85);font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-family:${FONT};">VKC Systems</div>
            <div style="color:#ffffff;font-size:24px;font-weight:700;margin-top:6px;line-height:1.25;font-family:${FONT};">New Project Inquiry</div>
            <div style="color:rgba(255,255,255,0.85);font-size:13px;margin-top:8px;font-family:${FONT};">${escapeHtml(submittedAt)}</div>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 8px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;margin-bottom:12px;font-family:${FONT};">From</div>
            <div style="font-size:20px;font-weight:600;color:#0a0a0a;line-height:1.3;font-family:${FONT};">${escapeHtml(name)}</div>
            <div style="font-size:15px;color:#566678;margin-top:2px;font-family:${FONT};">${escapeHtml(company)}</div>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
              <tr>
                <td width="90" style="font-size:13px;color:#6b7280;padding:8px 0;font-family:${FONT};vertical-align:top;">Email</td>
                <td style="font-size:14px;padding:8px 0;font-family:${FONT};"><a href="mailto:${escapeHtml(email)}" style="color:#dd3333;text-decoration:none;font-weight:500;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td width="90" style="font-size:13px;color:#6b7280;padding:8px 0;font-family:${FONT};vertical-align:top;">Phone</td>
                <td style="font-size:14px;padding:8px 0;font-family:${FONT};color:#0a0a0a;">${phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#0a0a0a;text-decoration:none;">${escapeHtml(phone)}</a>` : '<span style="color:#9ca3af;font-style:italic;">Not provided</span>'}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="padding:0 32px;"><div style="border-top:1px solid #e5e7eb;height:1px;line-height:1px;font-size:1px;">&nbsp;</div></td></tr>

        <tr>
          <td style="padding:24px 32px 8px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;margin-bottom:12px;font-family:${FONT};">Project Type</div>
            <div style="line-height:1.8;">${projectTypePills}</div>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
              <tr>
                <td width="90" style="font-size:13px;color:#6b7280;padding:8px 0;font-family:${FONT};vertical-align:top;">Location</td>
                <td style="font-size:14px;padding:8px 0;font-family:${FONT};color:#0a0a0a;">${projectLocation ? escapeHtml(projectLocation) : '<span style="color:#9ca3af;font-style:italic;">Not provided</span>'}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="padding:0 32px;"><div style="border-top:1px solid #e5e7eb;height:1px;line-height:1px;font-size:1px;">&nbsp;</div></td></tr>

        <tr>
          <td style="padding:24px 32px 32px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;margin-bottom:12px;font-family:${FONT};">Project Description</div>
            <div style="font-size:15px;line-height:1.65;color:#0a0a0a;white-space:pre-wrap;font-family:${FONT};">${escapeHtml(message)}</div>
          </td>
        </tr>

        <tr>
          <td style="background-color:#f9fafb;padding:18px 32px;border-top:1px solid #e5e7eb;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size:13px;color:#566678;font-family:${FONT};line-height:1.5;">
                  Hit <strong style="color:#0a0a0a;">Reply</strong> to respond directly to ${escapeHtml(name.split(' ')[0])}.
                </td>
                <td align="right" style="font-size:13px;font-family:${FONT};white-space:nowrap;padding-left:12px;">
                  <a href="mailto:${escapeHtml(email)}" style="color:#dd3333;text-decoration:none;font-weight:600;">Reply &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;margin-top:24px;">
        <tr>
          <td align="center" style="font-size:12px;color:#9ca3af;line-height:1.6;font-family:${FONT};">
            Submitted via the contact form at <a href="https://vkcsystems.com" style="color:#9ca3af;text-decoration:underline;">vkcsystems.com</a><br>
            VKC Systems &middot; 89 Leuning St, South Hackensack, NJ 07606
          </td>
        </tr>
      </table>

    </td></tr>
  </table>
</body></html>`;

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
