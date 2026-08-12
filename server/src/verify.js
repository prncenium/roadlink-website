import 'dotenv/config';
import { getTransporter } from './mailer.js';

/** `npm run check` — proves the SMTP credentials work before wiring the form. */
try {
  await getTransporter().verify();
  console.log('SMTP OK — credentials accepted by', process.env.SMTP_HOST || 'smtp.titan.email');
  console.log('mail will be delivered to:', process.env.TO_EMAIL || process.env.SMTP_USER);
} catch (err) {
  console.error('SMTP FAILED:', err.message);
  console.error('\nMost common cause: SMTP_PASS is the account password, not a');
  console.error('16-character Google App Password. See server/README.md.');
  process.exit(1);
}
