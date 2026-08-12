import nodemailer from 'nodemailer';

/**
 * Vercel serverless function — POST /api/enquiries
 *
 * Same contract as server/src/index.js, minus the long-lived process. Env vars
 * are set in Vercel → Settings → Environment Variables.
 *
 * Rate limiting is intentionally omitted: serverless instances do not share
 * memory, so an in-process counter would not hold. The honeypot, origin check
 * and validation are what protect this endpoint.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUBJECTS = [
  'Request a site inspection',
  'Quality audit enquiry',
  'Material testing booking',
  'Report a road defect',
  'Tender / procurement query',
  'Right to Information (RTI)',
  'Other',
];

const clean = (v) => (typeof v === 'string' ? v.trim() : '');
const header = (v) => String(v).replace(/[\r\n]+/g, ' ').trim();
const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function validate(body = {}) {
  const errors = {};
  const name = clean(body.name);
  if (!name) errors.name = 'Enter your full name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 80) errors.name = 'Name must be 80 characters or fewer.';

  const email = clean(body.email);
  if (!email) errors.email = 'Enter an email address so we can reply.';
  else if (!EMAIL.test(email)) errors.email = 'Enter a valid email address.';

  const phone = clean(body.phone);
  const digits = phone.replace(/[^\d]/g, '');
  if (!phone) errors.phone = 'Enter a contact phone number.';
  else if (digits.length < 10 || digits.length > 13)
    errors.phone = 'Enter a valid phone number with 10 to 13 digits.';

  const subject = clean(body.subject);
  if (!subject) errors.subject = 'Select the subject of your enquiry.';
  else if (!SUBJECTS.includes(subject)) errors.subject = 'Unrecognised subject.';

  const message = clean(body.message);
  if (!message) errors.message = 'Describe your enquiry.';
  else if (message.length < 20) errors.message = 'Message must be at least 20 characters.';
  else if (message.length > 1500) errors.message = 'Message must be 1500 characters or fewer.';

  return { errors, valid: Object.keys(errors).length === 0, data: { name, email, phone, subject, message } };
}

export default async function handler(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const origin = req.headers.origin;

  if (origin && allowed.length && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (origin && allowed.length && !allowed.includes(origin))
    return res.status(403).json({ ok: false, error: 'Origin not allowed' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  // Honeypot: answer 200 so a bot cannot tell it was rejected.
  if (body.company) return res.status(200).json({ ok: true });

  const { valid, errors, data } = validate(body);
  if (!valid) return res.status(400).json({ ok: false, errors });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE ?? 'true') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const rows = [
      ['Name', data.name],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Subject', data.subject],
      ['Received', new Date().toISOString()],
    ];

    await transporter.sendMail({
      from: `"RLCS Website" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      replyTo: `"${header(data.name)}" <${header(data.email)}>`,
      subject: `[Website] ${header(data.subject)} — ${header(data.name)}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${data.message}\n`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#0E1726;max-width:640px">
          <h2 style="margin:0 0 4px;font-size:18px">New website enquiry</h2>
          <p style="margin:0 0 20px;color:#646D7A;font-size:13px">Road Link Consultancy Services contact form</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:8px 12px 8px 0;color:#646D7A;white-space:nowrap;border-bottom:1px solid #EAEDF1">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #EAEDF1">${esc(v)}</td></tr>`
              )
              .join('')}
          </table>
          <h3 style="margin:24px 0 8px;font-size:14px">Message</h3>
          <div style="white-space:pre-wrap;line-height:1.6;font-size:14px;padding:14px;background:#F7F9FB;border:1px solid #EAEDF1;border-radius:8px">${esc(data.message)}</div>
        </div>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[enquiries]', err.message);
    return res.status(502).json({
      ok: false,
      error: 'The message could not be sent right now. Please email us directly.',
    });
  }
}