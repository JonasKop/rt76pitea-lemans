<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Lemans 24 Ölars Site Instructions

## Project

- This repository is the local Next.js, TypeScript, and Tailwind CSS website for `Lemans 24 Ölars`, an event hosted by Round Table 76 in Piteå, Sweden.
- The site is a single-page event site. Keep it simple, polished, and fast.
- The page must work well on both phones and desktop computers. Build mobile-first, then add desktop refinements.
- The site language is Swedish.
- Registration CTA links to: `https://docs.google.com/forms/d/e/1FAIpQLSci596qJ1BtjNeecqEjl-AekyKJiq3F-Q1NWBm0ccW-Ip9MAQ/viewform`

## Event Facts

- Event name: `Lemans 24 Ölars`
- Date: Friday and Saturday, `21-22 augusti 2026`
- Place: `Pite Havsbad`
- The place CTA should link to the supplied Google Maps URL for Pite Havsbad. The in-page map may use OpenStreetMap/Leaflet because it is free, simple, and does not need an API key.
- Contact email: `lemans24olars@gmail.com`
- Facebook group from the form: `https://www.facebook.com/groups/469674375735453`
- Friday: `18:00 Pre party`
- Saturday: brunch, shared bus to the gokart track at Pite Havsbad, racing, lunch, dinner, party, and shared bus into town nightlife.
- Official RT meeting is held at Pite Havsbad before the race.
- After the race there is access to shower, sauna, and changing rooms. Tell guests to bring a towel.
- Guests will be outside in a party tent and should dress for the weather.
- Payment details currently shown in the form: Friday and Saturday `1990 kr`, Saturday only `1495 kr`, Swish `123-233 38 96`.

## Tone And Audience

- Audience: mostly men around 20-40, often with good to very good financial situation, Round Table network, guests travelling from Sweden and abroad.
- Tone: premium ridiculous brotherhood, dark British pub, brass, mahogany, beer, motorsport endurance, go-kart racing, RT tradition, and self-important humor with a wink.
- It should feel like an event with `RT76 Sverige klassikerstatus`, not a generic party page.
- Keep the copy confident, Swedish, and compact. Do not over-explain.

## Visual Direction

- Core palette: dark near-black, deep pub green, mahogany, brass, and warm gold.
- Use elegant serif display typography for headlines and crisp sans-serif text for practical details.
- Use visual references from the supplied images: Round Table atmosphere, British pub, leather, brass, medals, helmets, racing posters, beer glasses, and cinematic warm light.
- Use generated or locally stored assets when needed. Avoid uncertain external image licensing.
- Official assets are stored as optimized WebP files in `public/images/official/`.
- Preserve the generated hero asset at `public/images/lemans-pub-hero.webp` unless replacing it with a clearly better event asset.
- Gallery/event archive photos should live in `public/images/gallery/` as optimized WebP files with stable names like `lemans-archive-01.webp`. Render them with `next/image`, responsive `sizes`, and lazy loading.
- Do not use raw screenshots as large standalone website visuals; they look like pasted documents and break the premium event tone. Convert their information into designed, accessible text blocks instead.

## UX Requirements

- The first viewport should immediately communicate the event name, date, place, and registration action.
- Always include a clear registration button linking to the Google Form.
- Keep practical details easy to scan on mobile.
- Use responsive image sizing and stable layout dimensions to prevent content jumping.
- External links should use `target="_blank"` and `rel="noopener noreferrer"`.
- Prefer accessible text over image-only information.
