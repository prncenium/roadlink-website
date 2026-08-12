# Contact API

Receives the website contact form and emails it to
**info@roadlinkconsultancy.in**. No login, no database — one endpoint
that relays mail.

## 1. Mailbox

Sending goes through **Titan** (GoDaddy) using `info@roadlinkconsultancy.in`.
No app password or 2FA step — just the mailbox password you set in Titan
webmail. Host `smtp.titan.email`, port 465 (SSL).

## 2. Configure

```bash
cd server
cp .env.example .env
```

Fill in `SMTP_PASS` with the Titan mailbox password. Leave the rest as-is.

## 3. Verify the credentials before anything else

```bash
npm install
npm run check
```

Expected: `SMTP OK — credentials accepted by smtp.titan.email`.
If authentication fails, confirm the mailbox is active in GoDaddy and that the
password matches Titan webmail.

## 4. Run

```bash
npm run dev     # http://localhost:5000
```

Then start the site in another terminal (`npm run dev` in the project root).
Vite proxies `/api` to port 5000, so the form works with no extra config.

## Endpoints

| Method | Path             | Purpose                        |
| ------ | ---------------- | ------------------------------ |
| `GET`  | `/api/health`    | Liveness check                 |
| `POST` | `/api/enquiries` | Validate and email the enquiry |

`POST` returns `{ ok: true }`, or `400` with `{ errors: { field: message } }`,
or `429` when rate limited, or `502` if SMTP refused the message.

## Abuse controls

The endpoint is public, so these are what stop it becoming an open mail relay:

- **Rate limit** — 5 enquiries per IP per hour (`RATE_LIMIT_MAX`).
- **Honeypot** — the form renders a hidden `company` field. If it arrives
  filled, the API returns `200` and silently discards, so bots get no signal.
- **CORS allowlist** — only origins in `ALLOWED_ORIGINS` may post.
- **Server-side validation** — the client rules are re-checked here; the
  browser copy is only a convenience.
- **Header sanitising** — CR/LF stripped from any value used in a mail header,
  so a crafted name cannot inject extra recipients.

## Deploying

Any Node host works (Render, Railway, Fly, a VPS). Set the same env vars there,
and:

1. Add the live site to `ALLOWED_ORIGINS`, e.g.
   `https://roadlinkconsultancy.in`.
2. Set `VITE_API_BASE_URL` in the **frontend** build to the API's public URL,
   e.g. `https://api.roadlinkconsultancy.in`. Without it the frontend posts to
   its own origin, which only works if you reverse-proxy `/api` to this service.

Titan allows a few hundred messages/day, far above contact-form volume. If this
ever grows into bulk sending, move to a transactional provider — only
`mailer.js` would change.
