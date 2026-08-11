/** @type {import('tailwindcss').Config} */

/**
 * DESIGN TOKENS — single source of truth.
 * Modern civic-tech: ~90% blue + neutral, ~10% orange accent.
 * Flat solid fills, hairline borders, generous rhythm.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Authority blue — structure, headings, dark bands */
        primary: {
          DEFAULT: '#0F4C81',
          dark: '#0A3358',
          light: '#2A6FB0',
          50: '#F1F6FB',
          100: '#E2EDF7',
          200: '#C9DDEF',
        },
        /* The single hero accent — used deliberately, never decoratively.
           NOTE: `DEFAULT` is a FILL colour. #FF6B35 only reaches 2.76:1 against
           white, so it fails WCAG as text. Use `accent-ink` (5.04:1) whenever
           orange is the text colour on a light surface. */
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#E85A26',
          ink: '#C2410C', // orange TEXT on light backgrounds
          soft: '#FFF1EB',
        },
        /* Verified / inspection-passed states only.
           Same split: #10B981 is a fill, `verified-ink` (5.21:1) is the text. */
        verified: {
          DEFAULT: '#10B981',
          ink: '#047857',
          soft: '#ECFDF5',
        },
        /* Neutrals — this is where the modern feel lives */
        ink: '#0E1726',
        body: '#45505F',
        /* Spec'd as #8A94A3, but that is 3.07:1 on white and 2.91:1 on the
           surface band — it fails WCAG AA as small text, and `muted` carries
           reference codes, captions and meta labels throughout. #646D7A is the
           nearest tone that clears 4.5:1 on BOTH grounds (5.24 / 4.96).
           Revert this one value to #8A94A3 to restore the lighter look. */
        muted: '#646D7A',
        hairline: '#EAEDF1',
        surface: '#F7F9FB',
        'surface-2': '#EEF2F6',
      },

      fontFamily: {
        display: ['Space Grotesk', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      fontSize: {
        h1: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        h2: ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.028em' }],
        h3: ['1.375rem', { lineHeight: '1.28', letterSpacing: '-0.018em' }],
        h4: ['1.0625rem', { lineHeight: '1.4', letterSpacing: '-0.012em' }],
        // `body` is a COLOUR token — never add a `body` size token or
        // `.text-body` becomes ambiguous. Body copy uses `text-base`.
        base: ['1.0625rem', { lineHeight: '1.65' }],
        lead: ['clamp(1.0625rem, 1.5vw, 1.25rem)', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.55' }],
        eyebrow: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.12em' }],
        stat: ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },

      letterSpacing: {
        eyebrow: '0.12em',
      },

      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      boxShadow: {
        // Deliberately soft — no heavy drop shadows anywhere.
        xs: '0 1px 2px 0 rgb(14 23 38 / 0.04)',
        lift: '0 12px 32px -12px rgb(14 23 38 / 0.12)',
        nav: '0 1px 0 0 #EAEDF1',
      },

      maxWidth: {
        content: '1240px',
        prose: '68ch',
      },

      backgroundImage: {
        // The one permitted gradient: a soft blue glow behind the hero.
        'hero-glow':
          'radial-gradient(60% 55% at 72% 12%, rgb(42 111 176 / 0.13) 0%, rgb(42 111 176 / 0) 70%)',
        'dark-glow':
          'radial-gradient(55% 60% at 78% 10%, rgb(42 111 176 / 0.38) 0%, rgb(10 51 88 / 0) 72%)',
        // Faint dotted grid texture
        dots: 'radial-gradient(circle, #C9D3DF 1px, transparent 1px)',
        'dots-dark': 'radial-gradient(circle, rgb(255 255 255 / 0.14) 1px, transparent 1px)',
      },

      backgroundSize: {
        dots: '22px 22px',
      },

      keyframes: {
        'dash-flow': {
          to: { strokeDashoffset: '-64' },
        },
      },

      animation: {
        'dash-flow': 'dash-flow 2.4s linear infinite',
      },

      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      zIndex: {
        base: '10',
        sticky: '20',
        dropdown: '30',
        overlay: '50',
      },
    },
  },
  plugins: [],
};
