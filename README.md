# Meeting Cost Calculator — CalWizz

A free meeting cost calculator tool that shows teams the true cost of their meetings, including hidden prep time. Built as a lead magnet for [CalWizz](https://calwizz.com), a calendar analytics SaaS.

**Live at:** [calwizz.com/calculator](https://calwizz.com/calculator)

## Features

- **Real-time calculation** — costs update instantly as you adjust inputs
- **Hidden cost awareness** — includes prep time that most companies overlook
- **Shareable URLs** — params encoded in URL for easy sharing (`?a=5&s=150000&d=60&f=weekly&p=10`)
- **Fun comparisons** — "That's equivalent to X MacBook Pros" shock factor
- **Animated counters** — smooth counting-up animation on all numbers
- **Mobile-first responsive** — works great on any screen size
- **Zero dependencies** — vanilla HTML/CSS/JS, no build step
- **SEO optimized** — meta tags, OG tags, Schema.org markup
- **Accessible** — keyboard navigation, ARIA labels, reduced-motion support

## Agent Startup

This repository participates in the local Brain + Workspace + Operating-System + Software Factory ecosystem.

Before meaningful work, run:

```sh
/Users/adamroberts/Projects/Operating-System/conductor/agent-context.sh
```

For proposed ideas or tasks, run intake first:

```sh
/Users/adamroberts/Projects/Operating-System/conductor/idea-intake.sh --task "Describe the proposed work"
```

Read [AGENTS.md](AGENTS.md) and [docs/assistant-startup.md](docs/assistant-startup.md) before planning or implementing.

## Files

```
meeting-calculator/
├── index.html    # Main page with SEO, OG tags, Schema.org
├── styles.css    # All styles, mobile-first responsive
├── script.js     # Calculator logic, animations, URL sharing
└── README.md     # This file
```

## Deploy to Cloudflare Pages

### Option 1: Direct Upload (Simplest)

1. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. Click **"Create a project"** → **"Direct Upload"**
3. Name: `meeting-calculator` (or `calwizz-calculator`)
4. Drag and drop the `meeting-calculator/` folder contents
5. Deploy!

### Option 2: Git Integration

1. Push this folder to a GitHub/GitLab repo
2. In Cloudflare Pages, connect the repo
3. Build settings:
   - **Build command:** (leave empty — no build step)
   - **Build output directory:** `/` (or the path to this folder)
4. Deploy!

### Option 3: Wrangler CLI

```bash
# Install wrangler if you haven't
npm install -g wrangler

# Login
wrangler login

# Deploy
cd meeting-calculator
wrangler pages deploy . --project-name=meeting-calculator
```

### Custom Domain (calwizz.com/calculator)

If deploying as part of the main CalWizz site:
- Place these files in a `/calculator` subdirectory of your main site
- Or set up a Cloudflare Pages route/redirect

If standalone:
1. In Cloudflare Pages project settings → Custom domains
2. Add `calculator.calwizz.com` or configure as a path on the main domain

## URL Parameters

The calculator supports shareable URLs with pre-filled values:

| Param | Description | Default | Range |
|-------|-------------|---------|-------|
| `a` | Attendees | 5 | 2-50 |
| `s` | Annual salary ($) | 150000 | 20000-1000000 |
| `d` | Duration (minutes) | 30 | 15, 25, 30, 45, 60, 90 |
| `f` | Frequency | weekly | once, daily, weekly, biweekly, monthly |
| `p` | Prep time (minutes) | 5 | 0, 5, 10, 15, 30 |

**Example:** `?a=10&s=180000&d=60&f=daily&p=15`

## Formula

```
Hourly Rate = Annual Salary / 2,080 (working hours/year)
Cost per Meeting = (Hourly Rate × (Duration + Prep) / 60) × Attendees
Monthly Cost = Cost per Meeting × meetings/month
Annual Cost = Cost per Meeting × meetings/year
Hours per Year = ((Duration + Prep) / 60) × Attendees × meetings/year
```

## OG Image

The `og:image` / `twitter:image` meta tags point to `/calculator/og-image.png`. The
rendered asset is committed at the repo root (`og-image.png`, 1200×630) alongside its
source (`og-image.html`), so it deploys automatically at the same path as `index.html`.

To regenerate after a brand/copy change, render the HTML source with headless Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 \
  --screenshot="$(pwd)/og-image.png" \
  "file://$(pwd)/og-image.html"
```

(Any headless Chrome/Chromium build works — swap the binary path as needed. Verify
output with `sips -g pixelWidth -g pixelHeight og-image.png`, expect 1200x630.)

## Customization

- **Brand colors** are CSS custom properties in `:root` — easy to change
- **Salary presets** can be adjusted in `index.html` (the preset buttons)
- **Comparisons** are in the `comparisons` array in `script.js`
- **Frequency options** are easy to extend in both HTML and JS

## License

© CalWizz. All rights reserved.
