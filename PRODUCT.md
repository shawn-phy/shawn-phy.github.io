# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, deployed to GitHub Pages from `shawn-phy/shawn-phy.github.io` through GitHub Actions. Chosen by Philip on 2026-11-17. It replaces the incumbent Jekyll + gulp site, which was a third-party "Neumorphism" template.

## Users

**Primary: hiring managers.** Engineering leads and recruiters evaluating Philip for a full-time role. They usually arrive from the link on his CV, often with the CV open beside the site. Their job is to decide quickly whether he is worth contacting. Success is that they email him or download the CV.

**Secondary: peers.** Fellow engineers from the CTF, embedded and open-source communities. They should find enough depth to respect the work.

## Product Purpose

The personal portfolio of Philip Shawn Oyuga. The previous site presented him as a "Student Engineer" and, in his words, is too basic and no longer reflects his skill level or the design taste he has acquired. The new site exists to show his current level of work and to be, in itself, evidence of that taste.

## Positioning

One engineer who works across the full range: firmware and hardware, through security, up to multi-agent ML. The breadth is the claim. It rests on work he has actually done at each layer:

- Firmware for STM32 and Raspberry Pi Pico, custom PCBs, robotics.
- A pentest of a production fintech product, and two CTF runner-up finishes.
- A multi-agent data-extraction architecture on which he is filing a patent.

## Operating Context

- The CV lists `shawn-phy.github.io`, so the site is read alongside the CV.
- The site is hosted on GitHub Pages under the `shawn-phy` handle, which is also his GitHub username.

## Capabilities and Constraints

- Static site. Content covers experience, projects, achievements, write-ups, contact and a CV download.
- Write-ups are authored as Markdown files.

**What may be published**

- The patent filing may be mentioned.
- The fintech pentest may be mentioned.
- Atomio may be named, as a company Philip co-founded.
- Other employer names stay off the site: Neverest, Wezeshanet and MCB are described by role and sector, never named.
- His phone number stays off the site. Email is the contact route.
- Referee names and phone numbers are never published.

**Open decisions**

- Whether the earlier internships named on the old site (Novek, Gearbox) may be named. Treat them as unnamed until Philip confirms.
- Which hardware photos, videos and write-ups will be supplied, and where they live.
- Which social links carry over. The old site linked GitHub, LinkedIn, Twitter, CodePen and DEV.
- Whether Google Analytics, present in the old layout, is kept.

## Brand Commitments

- Name: **Philip Shawn Oyuga**.
- Handle: `shawn-phy`, on GitHub and the domain.
- The old look (neumorphism cards, particle background, typing headline) is not a commitment.
- Styles and elements Philip said he likes, in his words (2026-11-17): Three.js, GSAP, kawaii, the Mochibop font, cartoon maximalism, illustration, playful, neobrutalism, fancy typography.
- Mochibop is a commercial face by Andrea Stuart (StuArt), sold on MyFonts in Regular and Bold. Philip chose a free, open-licensed stand-in with nearly the same playful character instead of licensing it. He also likes the look of Mochibop's own specimen pages.
- Illustrations: Philip generates them himself with another model, from the prompts in `design/illustration-prompts.md`. The generated images must not show AI tells. Until a slot has his image, the site shows a drawn stand-in.
- Confirmed by Philip on 2026-11-17: the images in `src/assets/illustrations/` are his. Each has a `.prompt.txt` sidecar recording how it was made. He first answered "Mine, still working", then confirmed "The set is final" the same day: three characters and four project figures.
- The three layers of his work (hardware, security, ML) are each a kawaii character.

## Evidence on Hand

- Current CV: `docs/Philip Oyuga – ML Engineer CV.pdf`. It is the source of truth for roles, projects, dates and achievements.
- Old content data: `_data/*.yml` and `_config.yml`. Stale; use only to cross-check.
- Philip says he has hardware photos or video, public code repositories and write-ups. None are in the repository yet.

**Facts the CV supports**

- BSc Electronics and Computer Engineering, JKUAT, 2020–2025.
- 1st runner-up, International Rungu CTF, 2022.
- 1st runner-up, National Cyberise CTF, 2022.
- 3rd place, National Science Fair regional division, 2018.
- IBM Quantum Machine Learning certification, advanced level, June 2025.

**Absences that must not be filled in**

- No portrait photo.
- No testimonials, client quotes, metrics or employer logos.

## Product Principles

1. **Show the range, prove each layer.** Every claim about firmware, security or ML points at something he actually built or did.
2. **Hiring manager first.** A reader with the CV in hand reaches the proof and the contact route without hunting.
3. **Depth for peers.** Code and write-ups are one step away, never summarised out of existence.
4. **Publish only what is cleared.** No employer names, no phone number, no referees, and no invented proof.
5. **The site is part of the evidence.** Its craft has to hold up to the same scrutiny as the work it shows.
