# NRHIA — Road & Highway Inspection Portal

Front-end for a government/public-sector road construction inspection authority.
React 18 + Vite + React Router v6 + Tailwind CSS + Framer Motion + lucide-react.
Modern civic-tech visual system — see **Theming** below.

No backend yet — the project is structured so an Express/MERN API can be dropped in
behind it without restructuring the UI.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Routes

| Path       | Page       | Notes                                                   |
| ---------- | ---------- | ------------------------------------------------------- |
| `/`        | Home       | Hero, mandate, services, stats, process, coverage, CTA  |
| `/about`   | About Us   | Mission/vision, values, leadership grid, org, milestones |
| `/projects`| Projects   | Filterable, paginated register — no project imagery      |
| `/contact` | Contact Us | Validated enquiry form, office info, map placeholder     |
| `*`        | NotFound   | Also wired as the router `errorElement`                  |

All routes render inside `src/layouts/RootLayout.jsx`:
`<Header/> + <Navbar/> + <Outlet/> + <Footer/>`.

## Project structure

```
src/
├── App.jsx                 # createBrowserRouter route table
├── main.jsx                # RouterProvider mount
├── index.css               # Tailwind layers + base/component/utility primitives
├── layouts/
│   └── RootLayout.jsx      # Shared shell, scroll reset, skip link
├── components/
│   ├── Header.jsx          # Slim utility strip (thin accent line, contact, login)
│   ├── Navbar.jsx          # Sticky nav, frosted blur on scroll, mobile panel
│   ├── Footer.jsx          # Multi-column footer + newsletter
│   ├── Hero.jsx            # Big hero: headline + large road visual + stat strip
│   ├── ServicesStrip.jsx   # Bento grid of service cards
│   ├── StatsBand.jsx       # Dark band, mono count-up stats on hairlines
│   ├── ProcessRow.jsx      # 4 stages linked by an animated dashed road line
│   ├── CtaBand.jsx         # Closing CTA band
│   ├── PageHero.jsx        # Inner-page banner + breadcrumb
│   ├── ContactForm.jsx     # Controlled + validated enquiry form
│   ├── projects/           # /projects route components
│   │   ├── ProjectsHero.jsx    # Photo band + live figure strip
│   │   ├── ProjectFilters.jsx  # Status tabs, search, chips, selects
│   │   ├── ProjectCard.jsx     # Image-free card + title disclosure
│   │   └── Pagination.jsx      # Windowed pager with ellipses
│   └── ui/                 # Reusable primitives (see below)
├── data/                   # ALL editable content lives here
│   ├── site.js             # Org name, contact details, credentials
│   ├── nav.js              # Primary nav, utility links, login link
│   ├── services.js         # Service cards
│   ├── stats.js            # Count-up figures
│   ├── process.js          # Process steps
│   ├── about.js            # Mission/vision, values, leadership, milestones
│   ├── projects.js         # Project register + categories + derived filters
│   └── footer.js           # Footer columns, socials, legal, form subjects
└── assets/                 # (empty — no raster assets are used)
```

## UI primitives (`src/components/ui/`)

| Component         | Purpose                                                                    |
| ----------------- | -------------------------------------------------------------------------- |
| `Button`          | `primary` / `secondary` / `dark` / `onDark` / `ghost`; renders `Link`, `a` or `button` |
| `SectionHeading`  | Mono eyebrow → H2 → lead, with the keyword in accent (or underlined)         |
| `Card`            | Hairline border, rounded-2xl, soft hover lift, optional growing accent line  |
| `Section`         | Section rhythm + 1240px well + white/surface/dark banding, dotted texture   |
| `Badge`           | Understated pill chips (Govt Approved, ISO 9001, Live)                      |
| `Placeholder`     | Image slot: surface-2 box, hairline, thin line SVG + caption                |
| `PlaceholderArt`  | Line SVGs: road, cone, hardhat, bridge, clipboard, map, machine, avatar     |
| `HeroRoadArt`     | The large hero carriageway with an animated dashed centre line              |
| `Reveal`          | Fade/slide-up on scroll; `RevealGroup`/`RevealItem` stagger grid children   |
| `StatCounter`     | Large mono stat with rAF count-up triggered by `useInView`                  |
| `Field`           | Labelled input/select/textarea, `aria-invalid` + `role="alert"` errors      |
| `Logo`            | Inline SVG emblem + wordmark, light/dark tone                               |

## Projects register

`/projects` renders from `src/data/projects.js` — add or edit entries there and
the filters, counts, pagination and hero figures all follow.

- **Two statuses**: Completed (20) and Ongoing (18).
- **Five service lines**: Detail Design, Pre-Bid, Proof Consulting, DPR, Safety
  Consulting. Only Safety Consulting currently holds data; the other four render
  as disabled chips with a `0` count until entries are added.
- **No project imagery** by design. Cards lead with a short scannable name and
  keep the full official title (often 300+ characters) behind a disclosure
  toggle.
- **Filters**: status, keyword search, service line, state, delivery mode, sort.
- **Pagination**: 9 per page, windowed pager with ellipses.

### Filter state lives in the URL

Every refinement is written to the query string (`?status=ongoing&state=Bihar`),
so a filtered view is shareable and the back button steps through refinements.
Changing any filter clears `page` — otherwise you could land on an empty page.
Hand-edited URLs are validated against the known status/category ids on read.

### Source-data notes

Four entries in the supplied Completed list were exact duplicates (NH-354E
Abohar, NH-254 Mudaki, NH-325 Balotra, NH-154 Pathankot) — 24 supplied, 20
unique. Record `SC/C/14` is a Detailed Project Report commission but was
supplied under Safety Consulting and is left there; move its `category` to
`'dpr'` if it belongs in that service line.

## Theming

Everything is token-driven through `tailwind.config.js`. Change the palette,
type scale, radii or shadows there and the whole site follows.

| Token         | Value     | Role                                   |
| ------------- | --------- | -------------------------------------- |
| `primary`     | `#0F4C81` | Authority blue — structure, dark bands |
| `primary-dark`| `#0A3358` | Hero visual, CTA panel                 |
| `primary-light`| `#2A6FB0`| Glow, contour lines                    |
| `accent`      | `#FF6B35` | Accent **fill** — buttons, dots, bars  |
| `accent-hover`| `#E85A26` | Accent hover                           |
| `accent-ink`  | `#C2410C` | Accent **text** on light (5.04:1)      |
| `verified`    | `#10B981` | Verified **fill**                      |
| `verified-ink`| `#047857` | Verified **text** on light (5.21:1)    |
| `ink`         | `#0E1726` | Headings                               |
| `body`        | `#45505F` | Body copy (**colour token only**)      |
| `muted`       | `#646D7A` | Captions, meta (see note)              |
| `hairline`    | `#EAEDF1` | 1px borders                            |
| `surface`     | `#F7F9FB` | Alternating band                       |
| `surface-2`   | `#EEF2F6` | Placeholder fill                       |

Roughly 90% blue + neutral, 10% orange. Flat solid fills; the only gradients are
the soft `hero-glow` / `dark-glow` radials.

> `body` is a colour token, so there is intentionally **no** `body` font-size token.
> Use `text-base` (1.0625rem / 1.65) for body copy sizing.

> `muted` was specified as `#8A94A3`, which measures 3.07:1 on white and 2.91:1
> on the surface band — failing AA for the reference codes, captions and meta
> labels it carries. It is set to `#646D7A` (5.24 / 4.96). Revert that one value
> in `tailwind.config.js` to restore the lighter tone.

Fonts are loaded in `index.html`: **Space Grotesk** (`font-display`) for headings,
**Inter** (`font-sans`) for body/UI, **IBM Plex Mono** (`font-mono`) for stats,
eyebrows and other data-ish labels.

## Images

Two real assets plus inline-SVG placeholders for every slot not yet shot.

| Asset | Where | Notes |
| ----- | ----- | ----- |
| `hero-background.webp` | Hero backdrop | Decorative — `alt=""` + `aria-hidden` |
| `hero-inspection.webp` | Hero visual, Projects hero | Meaningful — descriptive `alt` |
| `services-background.webp` | Services section ground | Decorative, via `<Section bgImage>` |
| `service-site-inspection.webp` | SVC-01 card | Meaningful — `imageAlt` in services.js |
| `service-progress-reports.webp` | SVC-04 card | Meaningful — `imageAlt` in services.js |

`<Section bgImage={…} />` renders decorative section artwork behind the content
with a `bgScrim` overlay (default `bg-white/55`). The scrim exists because image
generators reliably return linework darker than a readable background allows —
it pulls the art back into the light band without regenerating. Lower it to
`bg-white/40` for more presence, raise it if text starts to struggle.

Originals live in `src/assets/source/` (git-ignored, not needed to build).
Regenerate the optimised WebP with:

```bash
npm run images
```

`scripts/optimize-images.mjs` resizes and encodes WebP per the `targets` map in
that script. The five source PNGs go from **28.8 MB to 396 KB (−98.6%)**.

Every remaining image slot is a `<Placeholder/>`: a surface-2 box at the right
aspect ratio with a thin line SVG and a caption naming the pixel size expected.
Swap one for an `<img>` at the same ratio when you have the photo.

### Contrast rule

`#FF6B35` is only **2.76:1** on white — it fails WCAG as text at any size. The
palette therefore splits fill from text: use `accent`/`verified` for fills and
`accent-ink`/`verified-ink` whenever the colour is the text itself. The same
applies to icons that carry meaning; purely decorative `aria-hidden` icons keep
the bright fill.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `address`), one `h1` per page
- Skip-to-content link, focus moved to `main` on route change, scroll reset
- Visible `focus-visible` rings everywhere, with an inverted ring on dark bands
- Icon-only controls carry `aria-label`; decorative SVGs are `aria-hidden`
- Form: `label`/`for`, `aria-invalid`, `aria-describedby`, `role="alert"` errors, focusable error summary
- Count-up digits are `aria-hidden` with the final value in a `sr-only` span
- Minimum 44×44px touch targets; `prefers-reduced-motion` disables all motion

## Backend

The contact form posts to a small Express service in [`server/`](server/) that
emails enquiries to roadlinkconsultancyservices@gmail.com. No login, no
database. Setup — including the required Google App Password — is in
[server/README.md](server/README.md).

```bash
cd server && npm install && cp .env.example .env   # add SMTP_PASS
npm run check                                       # verify credentials
npm run dev                                         # port 5000
```

Vite proxies `/api` → `localhost:5000`, so `npm run dev` in the project root
just works. In production set `VITE_API_BASE_URL` to the deployed API URL.

Still front-end only: the footer newsletter (`src/components/Footer.jsx`) logs
to the console — add `POST /api/subscribers` when you want it live.
