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

The `og:image` meta tag points to `/calculator/og-image.png`. Create a 1200×630 image with:
- CalWizz branding (green #2d5a3d background)
- "Meeting Cost Calculator" headline
- "How much do your meetings REALLY cost?"
- CalWizz logo

## Customization

- **Brand colors** are CSS custom properties in `:root` — easy to change
- **Salary presets** can be adjusted in `index.html` (the preset buttons)
- **Comparisons** are in the `comparisons` array in `script.js`
- **Frequency options** are easy to extend in both HTML and JS

## License

© CalWizz. All rights reserved.
