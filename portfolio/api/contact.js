import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
const FROM_EMAIL = 'no-reply@pitanu.xyz';

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();

  // Drop stale entries so the map doesn't grow unbounded.
  if (rateLimitMap.size > 500) {
    for (const [key, timestamps] of rateLimitMap) {
      const recent = timestamps.filter((ts) => now - ts < WINDOW_MS);
      if (recent.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, recent);
      }
    }
  }

  const recent = (rateLimitMap.get(ip) || []).filter((ts) => now - ts < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    rateLimitMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { name, email, message } = req.body || {};

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (
    trimmedName.length > MAX_NAME_LENGTH ||
    trimmedEmail.length > MAX_EMAIL_LENGTH ||
    trimmedMessage.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({ error: 'One or more fields are too long' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!CONTACT_EMAIL) {
    console.error('CONTACT_EMAIL is not configured');
    return res.status(500).json({ error: 'Email failed to send' });
  }

  const html = `
    <strong>Name:</strong> ${escapeHtml(trimmedName)}<br/>
    <strong>Email:</strong> ${escapeHtml(trimmedEmail)}<br/><br/>
    <strong>Message:</strong><br/>${escapeHtml(trimmedMessage).replaceAll('\n', '<br/>')}
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: trimmedEmail,
      subject: `New portfolio contact from ${trimmedName}`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: 'Email failed to send' });
  }
}
