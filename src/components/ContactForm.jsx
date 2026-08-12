import { useRef, useState } from 'react';
import { Send, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import Field from '@/components/ui/Field';
import Button from '@/components/ui/Button';
import { enquirySubjects } from '@/data/footer';
import { site } from '@/data/site';

// Dev goes through the Vite proxy; production sets VITE_API_BASE_URL.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

/** Client-side validation — mirror these rules on the API when it is added. */
function validate(values) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = 'Enter your full name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 80) errors.name = 'Name must be 80 characters or fewer.';

  const email = values.email.trim();
  if (!email) errors.email = 'Enter an email address so we can reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = 'Enter a valid email address, for example name@department.gov.';

  const phone = values.phone.trim();
  const digits = phone.replace(/[^\d]/g, '');
  if (!phone) errors.phone = 'Enter a contact phone number.';
  else if (digits.length < 10 || digits.length > 13)
    errors.phone = 'Enter a valid phone number with 10 to 13 digits.';

  if (!values.subject) errors.subject = 'Select the subject of your enquiry.';

  const message = values.message.trim();
  if (!message) errors.message = 'Describe your enquiry so it can be routed correctly.';
  else if (message.length < 20)
    errors.message = `Add a little more detail — at least 20 characters (currently ${message.length}).`;
  else if (message.length > 1500) errors.message = 'Message must be 1500 characters or fewer.';

  return errors;
}

/**
 * Contact enquiry form — controlled inputs, validation on blur and submit,
 * explicit submitting state and a success panel.
 *
 * No backend yet: the payload is logged to the console, ready for an
 * Express/MERN endpoint to consume.
 */
export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [sendError, setSendError] = useState(null);
  const summaryRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear an error as soon as the field becomes valid again.
    if (errors[name]) {
      const next = validate({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: next[name] }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const next = validate(values);
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus('submitting');
    setSendError(null);

    const payload = {
      ...Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()])),
      company: '', // honeypot — bots fill this, people never see it
    };

    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        // The API re-validates; surface its field errors if it sent any.
        if (body.errors) {
          setErrors(body.errors);
          setStatus('idle');
          requestAnimationFrame(() => summaryRef.current?.focus());
          return;
        }
        throw new Error(body.error || `Request failed (${res.status})`);
      }

      setStatus('success');
      setValues(INITIAL);
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus('idle');
      setSendError(
        err.message === 'Failed to fetch'
          ? 'Could not reach the server. Check your connection and try again.'
          : err.message
      );
    }
  };

  const errorList = Object.entries(errors).filter(([, message]) => Boolean(message));
  const showSummary = errorList.length > 0 && Object.keys(touched).length > 0;

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-6 rounded-2xl border border-verified/25 bg-verified-soft p-8 md:p-10"
      >
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-verified text-white">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>

        <div>
          <h3 className="text-h2 text-ink">Enquiry registered</h3>
          <p className="measure mt-4 text-body">
            Your enquiry has been recorded and an acknowledgement with a reference number has been
            queued to your email address. Cases raised on a working day are routed to the relevant
            circle office within one business day.
          </p>
          <p className="mt-4 text-small text-muted">
            A copy has been delivered to {site.contact.email}.
          </p>
        </div>

        <Button variant="secondary" size="md" onClick={() => setStatus('idle')}>
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-heading" className="relative">
      <h3 id="contact-form-heading" className="text-h2 text-ink">
        Send an enquiry
      </h3>
      <p className="measure mt-4 text-body">
        Fields marked <span className="text-accent-ink">*</span> are required. Do not include
        confidential personal data in the message field.
      </p>

      {showSummary && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-8 rounded-2xl border border-accent/30 bg-accent-soft p-5
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <p className="flex items-center gap-2 text-small font-medium text-accent-ink">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            {errorList.length} {errorList.length === 1 ? 'field needs' : 'fields need'} your
            attention
          </p>
          <ul className="mt-2.5 flex list-disc flex-col gap-1 pl-5 text-small text-body">
            {errorList.map(([field, message]) => (
              <li key={field}>
                <a
                  href={`#contact-${field}`}
                  className="rounded underline underline-offset-2 hover:text-accent-ink"
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sendError && (
        <div
          role="alert"
          className="mt-8 flex items-start gap-2.5 rounded-2xl border border-accent/30 bg-accent-soft p-5 text-small text-accent-ink"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            {sendError} You can also email us directly at{' '}
            <a href={site.contact.emailHref} className="font-medium underline underline-offset-2">
              {site.contact.email}
            </a>{' '}
            or{' '}
            <a href={site.contact.emailAltHref} className="font-medium underline underline-offset-2">
              {site.contact.emailAlt}
            </a>
            .
          </span>
        </div>
      )}

      {/* Honeypot — hidden from people, catches naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company (leave blank)</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label="Full name"
          required
          autoComplete="name"
          placeholder="e.g. R. Sharma"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : undefined}
        />

        <Field
          id="contact-email"
          name="email"
          type="email"
          label="Email address"
          required
          autoComplete="email"
          placeholder="name@department.gov"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
        />

        <Field
          id="contact-phone"
          name="phone"
          type="tel"
          label="Phone number"
          required
          autoComplete="tel"
          placeholder="+91 98765 43210"
          hint="Include the country code for international numbers."
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone ? errors.phone : undefined}
        />

        <Field
          id="contact-subject"
          name="subject"
          as="select"
          label="Subject"
          required
          options={enquirySubjects}
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.subject ? errors.subject : undefined}
        />

        <Field
          id="contact-message"
          name="message"
          as="textarea"
          label="Message"
          required
          rows={7}
          placeholder="Describe the road section, package number or defect location as precisely as possible."
          hint={`${values.message.trim().length} / 1500 characters`}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.message ? errors.message : undefined}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-9 flex flex-col gap-5 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-muted">
          By submitting you consent to your details being held for case correspondence.
        </p>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          className="shrink-0"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Submit enquiry
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
