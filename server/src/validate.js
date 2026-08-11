/**
 * Server-side validation. Mirrors src/components/ContactForm.jsx — the client
 * rules are a convenience, these are the ones that actually gate the mail.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const SUBJECTS = [
  'Request a site inspection',
  'Quality audit enquiry',
  'Material testing booking',
  'Report a road defect',
  'Tender / procurement query',
  'Right to Information (RTI)',
  'Other',
];

export function validateEnquiry(body = {}) {
  const errors = {};
  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  const name = str(body.name);
  if (!name) errors.name = 'Enter your full name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 80) errors.name = 'Name must be 80 characters or fewer.';

  const email = str(body.email);
  if (!email) errors.email = 'Enter an email address so we can reply.';
  else if (!EMAIL.test(email)) errors.email = 'Enter a valid email address.';
  else if (email.length > 160) errors.email = 'Email address is too long.';

  const phone = str(body.phone);
  const digits = phone.replace(/[^\d]/g, '');
  if (!phone) errors.phone = 'Enter a contact phone number.';
  else if (digits.length < 10 || digits.length > 13)
    errors.phone = 'Enter a valid phone number with 10 to 13 digits.';

  const subject = str(body.subject);
  if (!subject) errors.subject = 'Select the subject of your enquiry.';
  else if (!SUBJECTS.includes(subject)) errors.subject = 'Unrecognised subject.';

  const message = str(body.message);
  if (!message) errors.message = 'Describe your enquiry.';
  else if (message.length < 20) errors.message = 'Message must be at least 20 characters.';
  else if (message.length > 1500) errors.message = 'Message must be 1500 characters or fewer.';

  return {
    errors,
    valid: Object.keys(errors).length === 0,
    data: { name, email, phone, subject, message },
  };
}

/** Strip anything that could inject extra SMTP headers via a field value. */
export const sanitiseHeader = (value) => String(value).replace(/[\r\n]+/g, ' ').trim();

/** Minimal HTML escaping for the mail body. */
export const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
