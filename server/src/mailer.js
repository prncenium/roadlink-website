import nodemailer from 'nodemailer';
import { escapeHtml, sanitiseHeader } from './validate.js';

/**
 * SMTP transport — Titan (GoDaddy) by default.
 *
 * SMTP_PASS is the mailbox password set in Titan webmail. No app password or
 * 2FA step is required, unlike Gmail.
 */
let transporter;

export function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP_USER and SMTP_PASS must be set — see server/.env.example');
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE ?? 'true') === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendEnquiry(data, meta = {}) {
  const to = process.env.TO_EMAIL || process.env.SMTP_USER;
  const name = sanitiseHeader(data.name);
  const subject = sanitiseHeader(data.subject);

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Subject', data.subject],
    ['Received', new Date().toISOString()],
    ['IP', meta.ip || 'unknown'],
  ];

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${data.message}\n`;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0E1726;max-width:640px">
      <h2 style="margin:0 0 4px;font-size:18px">New website enquiry</h2>
      <p style="margin:0 0 20px;color:#646D7A;font-size:13px">
        Sent from the Road Link Consultancy Services contact form
      </p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px 12px 8px 0;color:#646D7A;white-space:nowrap;border-bottom:1px solid #EAEDF1">${escapeHtml(k)}</td>
              <td style="padding:8px 0;border-bottom:1px solid #EAEDF1">${escapeHtml(v)}</td>
            </tr>`
          )
          .join('')}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px">Message</h3>
      <div style="white-space:pre-wrap;line-height:1.6;font-size:14px;padding:14px;background:#F7F9FB;border:1px solid #EAEDF1;border-radius:8px">${escapeHtml(
        data.message
      )}</div>
    </div>
  `;

  return getTransporter().sendMail({
    // Gmail rewrites From to the authenticated account anyway; keeping the
    // visitor's address on replyTo is what makes "Reply" work.
    from: `"RLCS Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: `"${name}" <${sanitiseHeader(data.email)}>`,
    subject: `[Website] ${subject} — ${name}`,
    text,
    html,
  });
}
