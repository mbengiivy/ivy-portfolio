# Ivy Mbengi — Portfolio

Single-page scrolling portfolio for Ivy Mbengi, Cloud Engineer and Solutions Architect
based in Nairobi, Kenya.

Built with React + Vite, CSS Modules, and Framer Motion. The layout is a dark
"vCard": a sticky profile card on the left, a floating nav pill, and the content as a
column of rounded panels that you scroll through.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script                   | What it does                        |
| ------------------------ | ----------------------------------- |
| `npm run dev`            | Dev server with hot reload          |
| `npm run build`          | Production build into `dist/`       |
| `npm run preview`        | Serve the built `dist/` locally     |
| `npm run cv:placeholder` | Regenerate the placeholder CV PDF   |

Requires Node 20.19+ or 22.12+ (Vite 8).

## Project structure

```
ivy-portfolio/
├── public/
│   ├── Ivy_Mbengi_CV.pdf        # Placeholder CV — replace with the real export
│   └── favicon.svg
├── scripts/
│   └── generate-cv-placeholder.mjs
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Sticky profile card: avatar, contacts, CV button
│   │   ├── Navbar.jsx           # Floating nav pill, active-section tracking
│   │   ├── Hero.jsx             # Gradient panel, typing subtitle, CTAs
│   │   ├── ParticleField.jsx    # Canvas node network behind the hero
│   │   ├── About.jsx            # Bio plus the "What I'm Doing" cards
│   │   ├── Experience.jsx       # Vertical timeline
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Reveal.jsx           # Shared scroll-reveal wrapper
│   │   └── SectionHeading.jsx   # Shared panel header
│   ├── data/
│   │   └── contactInfo.js       # Email, location, social URLs
│   ├── hooks/
│   │   └── useCvDownload.js     # Download + notification webhook
│   ├── styles/
│   │   ├── variables.css        # Colour themes and design tokens
│   │   └── global.css           # Reset, base typography, `.panel` card
│   ├── App.jsx                  # Two-column shell, hash deep-link handling
│   └── main.jsx
├── netlify.toml
└── vite.config.js
```

Every component owns a sibling `*.module.css` file, so styles stay scoped and there is
no global CSS to untangle. The one shared class is `.panel` in `global.css` — the
rounded card surface each section sits on.

## Colour themes

The palette lives in `src/styles/variables.css` as five **roles**, not five colour
names, so a whole theme swaps at once. Pick one on the `<html>` tag in `index.html`:

```html
<html lang="en" data-theme="violet">
```

| Theme    | Base      | Fill      | Emphasis  | Text      | Accent    |
| -------- | --------- | --------- | --------- | --------- | --------- |
| `violet` | `#1A1033` | `#7C3AED` | `#E6DCFF` | `#FBF8FF` | `#F2A1C0` |
| `azure`  | `#081429` | `#2563EB` | `#D6E6FF` | `#F6F9FF` | `#7DD3FC` |
| `teal`   | `#0B3954` | `#087E8B` | `#E5F4E3` | `#FFFFEF` | `#C5979D` |

The five roles:

- **Base** — page background and deep surfaces. Cards are translucent **Text** layered
  over it, which is how the panels read lighter without introducing extra colours.
- **Fill** — buttons, icon boxes, gradients. Never used for small text: it is the one
  role that doesn't clear 4.5:1 against the base in any theme.
- **Emphasis** — highlighted words and icon glyphs. Highest contrast after Text.
- **Text** — body copy and headings.
- **Accent** — dates, the active nav item, timeline dots.

Every text role clears WCAG AA against its base; most clear AAA.

Two files keep their own copy of the hexes and need a manual edit if you switch themes:
`public/favicon.svg` and `scripts/generate-cv-placeholder.mjs`. Both carry a comment
listing the alternates.

## Content you will want to edit

Each section keeps its content in a plain array at the top of its component file:

| What                      | Where                                        |
| ------------------------- | -------------------------------------------- |
| Hero subtitle             | `src/components/Hero.jsx` (`SUBTITLE`)       |
| Role chip, contact rows   | `src/components/Sidebar.jsx`                 |
| "What I'm Doing" cards    | `src/components/About.jsx` (`SERVICES`)      |
| Roles and dates           | `src/components/Experience.jsx` (`ROLES`)    |
| Projects and tech tags    | `src/components/Projects.jsx` (`PROJECTS`)   |
| Skill groups              | `src/components/Skills.jsx` (`SKILL_GROUPS`) |
| Certifications            | `src/components/Certifications.jsx`          |
| Email, location, socials  | `src/data/contactInfo.js`                     |

Project cards ship with `href: '#'` placeholders — swap those for live demo or GitHub
URLs in `src/components/Projects.jsx`.

## Download CV button

There are two Download CV buttons — one in the sidebar (visible at any scroll position)
and one in the hero. Both call `useCvDownload`, which does two things:

1. Downloads `public/Ivy_Mbengi_CV.pdf`.
2. Fires a fire-and-forget `POST` to a webhook so you get notified:

```json
{
  "timestamp": "2026-10-02T09:12:44.102Z",
  "userAgent": "Mozilla/5.0 ...",
  "referrer": "https://linkedin.com/"
}
```

The download never waits on the notification — if the webhook is unreachable, the file
still downloads.

### Wiring up the notification

While the webhook URL is unset or still the placeholder, the request is skipped so the
console stays clean. To switch it on:

1. Create the endpoint. A [Make.com](https://www.make.com/) or
   [Zapier](https://zapier.com/) webhook trigger is the fastest route — point it at a
   "send me an email" or "post to Slack" action. An AWS Lambda function URL that calls
   SES works too.
2. Locally: copy `.env.example` to `.env` and set your URL.

   ```bash
   cp .env.example .env
   # VITE_CV_WEBHOOK_URL=https://hook.eu2.make.com/your-id
   ```

3. On Netlify: add `VITE_CV_WEBHOOK_URL` under **Site configuration → Environment
   variables**, then redeploy.

Vite inlines `VITE_*` variables into the client bundle at build time, so treat this URL
as public. Keep the endpoint write-only — it should accept a POST and nothing else.

### Prefer EmailJS instead?

Swap the `fetch` call in `src/hooks/useCvDownload.js` for an
[EmailJS](https://www.emailjs.com/) `emailjs.send(serviceId, templateId, params, publicKey)`
call after installing `@emailjs/browser`. Same tradeoff applies: the credentials ship in
the bundle, so use EmailJS's domain allow-list.

### Replacing the CV

Drop your real PDF at `public/Ivy_Mbengi_CV.pdf`, keeping the file name so both buttons
keep working. `npm run cv:placeholder` regenerates the stand-in if you need it back.

## Contact form

The form is styled but intentionally not wired to a backend; submitting shows a note
pointing visitors at the email address. To make it live, the lightest option on Netlify
is [Netlify Forms](https://docs.netlify.com/forms/setup/): add `data-netlify="true"` and
a `name` to the `<form>` in `src/components/Contact.jsx`, then remove the
`event.preventDefault()` in `handleSubmit`.

## Deploying to Netlify

`netlify.toml` already sets the build command, publish directory, SPA redirect, and
cache headers.

**From the Netlify UI:** connect the repository and accept the detected settings
(`npm run build`, publish `dist`).

**From the CLI:**

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

If this project sits in a subdirectory of your repository, set the **base directory** to
`ivy-portfolio` in Netlify's build settings.

## Accessibility and motion

- Semantic landmarks (`nav`, `main`, `aside`, `section`, `footer`) with labelled sections.
- A skip link to `#main`, visible on keyboard focus.
- Visible focus rings on every interactive element.
- The hero's typing animation is hidden from assistive tech; the full subtitle is exposed
  once as screen-reader text, so nothing is announced mid-type.
- Deep links work: `App.jsx` scrolls to the hash after mount, since the browser resolves
  it before React has rendered the sections.
- `prefers-reduced-motion` is respected throughout: scroll reveals render in their final
  state, the typing effect resolves instantly, and the particle canvas draws one static
  frame instead of animating.
- The particle canvas also pauses when scrolled out of view or when the tab is hidden.

## Credits

The layout takes visual cues from the widely used
[vCard personal portfolio](https://github.com/codewithsadee/vcard-personal-portfolio)
pattern by codewithsadee — the sticky profile card, nav pill, and panel-card treatment.
All components and styles here are written from scratch; no code was copied.
