// Visitor-action events for Vercel Web Analytics, loaded on every page by
// BaseLayout. Delivered inquiries are tracked on the server instead, in
// /api/contact, only after Microsoft 365 accepts the email.
//
// Keep each event to two properties (the Pro plan limit) and never send
// personal details: no names, email addresses, phone numbers, or messages.
import { track } from '@vercel/analytics';

export const SOURCE_KEY = 'vkc_source';
// sessionStorage is per tab, so the source is also kept in localStorage for
// tabs opened from the site, e.g. the contact page via middle-click
const SHARED_KEY = 'vkc_source_shared';
const SHARED_TTL_MS = 30 * 60 * 1000;

/**
 * Remember where this visit came from (first page of the tab only), so the
 * contact form can send it with an inquiry: "linkedin / social" from UTM
 * tags, a referring hostname like "google.com", or "direct".
 */
function recordSource() {
  try {
    let source = sessionStorage.getItem(SOURCE_KEY);
    if (!source) {
      const params = new URLSearchParams(location.search);
      const utm = [params.get('utm_source'), params.get('utm_medium')].filter(Boolean).join(' / ');
      const ownHost = location.hostname.replace(/^www\./, '');
      const referrerHost = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
      if (utm) {
        source = utm;
      } else if (referrerHost && referrerHost !== ownHost) {
        source = referrerHost;
      } else if (referrerHost === ownHost) {
        // New tab opened from the site: reuse the visit's source if recent
        const shared = JSON.parse(localStorage.getItem(SHARED_KEY) ?? 'null');
        source = shared && Date.now() - shared.at < SHARED_TTL_MS ? shared.source : 'unknown';
      } else {
        source = 'direct';
      }
      source = source.toLowerCase().replace(/[^a-z0-9./ _-]/g, '').slice(0, 100) || 'unknown';
      sessionStorage.setItem(SOURCE_KEY, source);
    }
    localStorage.setItem(SHARED_KEY, JSON.stringify({ source, at: Date.now() }));
  } catch {
    // Storage blocked (private mode, disabled cookies): inquiries report "unknown"
  }
}

/** Where on the page a link sits; links can name themselves with data-track. */
function placement(link: Element): string {
  const named = link.closest('[data-track]')?.getAttribute('data-track');
  if (named) return named;
  if (link.closest('#mobile-menu')) return 'mobile menu';
  if (link.closest('header')) return 'header';
  if (link.closest('footer')) return 'footer';
  return 'page';
}

function eventFor(link: Element): string | null {
  const href = link.getAttribute('href') ?? '';
  if (href.startsWith('tel:')) return 'phone_click';
  if (href.startsWith('mailto:')) return 'email_click';
  if (href.includes('VKC-Systems-Infrastructure-Capabilities-Statement.pdf')) return 'capability_pdf_download';
  // Only the "Invite VKC to Bid" buttons, not other links to the bid form
  if (href.endsWith('/contact#bid') && /Invite VKC to Bid/i.test(link.textContent ?? '')) return 'bid_invite_click';
  return null;
}

recordSource();

function onLinkActivated(event: MouseEvent) {
  // auxclick also fires for right-clicks; only count the middle button
  if (event.type === 'auxclick' && event.button !== 1) return;
  const link = (event.target as Element | null)?.closest?.('a[href]');
  if (!link) return;
  const name = eventFor(link);
  if (name) track(name, { placement: placement(link), page: location.pathname });
}

document.addEventListener('click', onLinkActivated);
document.addEventListener('auxclick', onLinkActivated);
