# Contact API

Receives the website contact form and emails it to
**roadlinkconsultancyservices@gmail.com**. No login, no database — one endpoint
that relays mail.

## 1. Create a Google App Password

Gmail rejects plain-password SMTP, so you need a 16-character App Password.

1. The Gmail account must have **2-Step Verification** on:
   <https://myaccount.google.com/signinoptions/two-step-verification>
2. Create the password: <https://myaccount.google.com/apppasswords>
3. Name it anything (e.g. "Website contact form") and copy the 16 characters.

That password is equivalent to account access for mail — treat it like a
credential, never commit it, and revoke it from the same page if it leaks.

## 2. Configure

```bash
cd server
cp .env.example .env
```

Fill in `SMTP_PASS` with the App Password (spaces removed). Leave the rest as-is
for local work.

## 3. Verify the credentials before anything else

```bash
npm install
npm run check
```

Expected: `SMTP OK — credentials accepted by smtp.gmail.com`.
If it prints `535-5.7.8 BadCredentials`, `SMTP_PASS` is still the account
password rather than an App Password.

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
   `https://roadlinkconsultancy.com`.
2. Set `VITE_API_BASE_URL` in the **frontend** build to the API's public URL,
   e.g. `https://api.roadlinkconsultancy.com`. Without it the frontend posts to
   its own origin, which only works if you reverse-proxy `/api` to this service.

Gmail SMTP allows roughly 500 messages/day. That is far above contact-form
volume, but if this ever grows into bulk sending, move to a transactional
provider (Resend, SES, Postmark) — only `mailer.js` would change.
