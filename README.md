# SAK Landing Page

A React + Bun + Tailwind CSS + shadcn/ui landing page for **SAK — Solana Agent Kernel**. The page recreates the provided dark futuristic security platform reference design with neon-green visual language, scroll-triggered motion, animated device visuals, terminal logs, roadmap, team section, CTA, and footer.

## Tech Stack

- **Bun** runtime and dev server
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components
- **Framer Motion** for page and scroll animations
- **Lucide React** icons

## Project Highlights

- Dark cybersecurity-inspired landing page based on `dev-asset/sak-image.jpeg`
- Animated hero section with SVG security device, floating particles, scan lines, and live terminal log
- Scroll reveal animations across sections
- Infinite trusted-partner marquee
- Old security vs SAK security comparison section
- Three pillars section with animated Guardian dashboard mockup
- Stack-position / how-it-works section
- Live demo preview section with three-panel dashboard simulation
- Animated roadmap timeline
- Team cards, CTA section, newsletter footer
- All landing page text is stored in one JSON file

## Content Management

All editable landing page text lives in:

```txt
src/content.json
```

Update this file to change:

- Navbar labels
- Hero copy and stats
- Terminal logs
- Trusted logos
- Security comparison copy
- Pillar cards
- Roadmap milestones
- Team members
- CTA text
- Footer links and newsletter text

## Main Files

```txt
src/App.tsx
src/content.json
src/index.css
src/components/landing/
├── Navbar.tsx
├── HeroSection.tsx
├── TrustedBySection.tsx
├── SecuritySection.tsx
├── PillarsSection.tsx
├── HowItWorksSection.tsx
├── DemoPreviewSection.tsx
├── RoadmapSection.tsx
├── TeamSection.tsx
├── CTASection.tsx
└── Footer.tsx
```

## Getting Started

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun dev
```

Open the app at:

```txt
http://localhost:3000
```

## Production

Build the app:

```bash
bun run build
```

Run production server:

```bash
bun start
```

## Notes

- The design is implemented as a responsive single-page landing page.
- Motion effects are built with Framer Motion and CSS keyframes.
- The page uses a dark-first visual system with Space Mono and Inter fonts.
