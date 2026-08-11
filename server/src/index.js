import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { validateEnquiry } from './validate.js';
import { sendEnquiry } from './mailer.js';

const app = express();
const PORT = Number(process.env.PORT || 5000);

// Behind a proxy (Render, Railway, nginx) req.ip is the proxy without this.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(express.json({ limit: '32kb' }));

/* CORS — allow only the sites that should be able to post here. */
const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin and curl/server-to-server requests have no Origin header.
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin ${origin} is not allowed`));
    },
    methods: ['POST', 'GET', 'OPTIONS'],
  })
);

/* There is no login on this endpoint, so throttling is the only thing standing
   between the form and an open mail relay. */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: Number(process.env.RATE_LIMIT_MAX || 5),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: 'Too many enquiries from this address. Please try again later.',
  },
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'roadlink-contact-api', time: new Date().toISOString() });
});

app.post('/api/enquiries', limiter, async (req, res) => {
  // Honeypot: the form renders a hidden field real users never fill in.
  if (req.body?.company) {
    // Answer 200 so a bot cannot tell it was rejected.
    return res.status(200).json({ ok: true });
  }

  const { valid, errors, data } = validateEnquiry(req.body);
  if (!valid) {
    return res.status(400).json({ ok: false, errors });
  }

  try {
    await sendEnquiry(data, { ip: req.ip });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[enquiries] send failed:', err.message);
    return res.status(502).json({
      ok: false,
      error: 'The message could not be sent right now. Please email us directly.',
    });
  }
});

app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[error]', err.message);
  res.status(500).json({ ok: false, error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`contact API listening on http://localhost:${PORT}`);
  console.log(`  mail to:  ${process.env.TO_EMAIL || process.env.SMTP_USER || '(not configured)'}`);
  console.log(`  origins:  ${allowed.join(', ')}`);
});
