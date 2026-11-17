---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface brief: home page

## Scope and mode

The whole home page of the portfolio, one long page. Visitor mode: Experience. The work itself leads from the first viewport.

## Audience and job

- A hiring manager with the CV open beside the page, deciding whether to email Philip.
- A fellow engineer checking whether the work has depth.
- Action: email Philip. A CV download appears only once a public CV without phone numbers and referees exists.

## Content and constraints

- Source of truth: the CV in `docs/`. Facts only; no invented metrics, quotes or links.
- What leads: the range itself, as three stacked clay characters.
- Flagships: the 4WD Raspberry Pi Pico car, Atomio, the multi-agent extraction work, the AI smart greenhouse.
- Publishing rules are in PRODUCT.md. Atomio is named; other employers are not.
- About is written by Philip in `src/content/about.md`. It publishes only when he sets `draft: false`.
- Figure illustrations arrive later from Philip; every one has a slot and a stand-in until then.

## Brief pinned by Philip (2026-11-17, second round)

These override the earlier neobrutalist rendering:

- Fancy, fine-grained scroll animation between sections: scene movement and camera effects with GSAP.
- Less neobrutalism. Move toward decora or pop art, still technical.
- Claymorphism is welcome. Sections may mix styles when the need calls for it, as long as the transitions are smooth and adjacent styles agree.
- Each section may set its own layout density, when that serves its meaning.
- Text micro-animations in specific places.
- Every animation needs an intention; no generic sway or left-right wobble.
- No AI tells anywhere, including images and SVG.
- References: Awwwards and Dribbble-level craft.

## Memorable moment

The three clay characters stand stacked in the hero. Scrolling takes them apart into an exploded view under a dolly zoom. Each one then drops into its own section, and all three regroup at the close.

## Unresolved

- The display face is DynaPuff, a free stand-in for Mochibop.
- Repo and write-up links for each project.
- Social links beyond GitHub and LinkedIn, and whether analytics is kept.

## Direction contract

**THESIS.** Philip is documented like a component, and the datasheet is printed as a pop-art toy catalogue. Three clay characters carry the story: assembled, exploded, explained, reassembled. It refuses the dark terminal portfolio, the card grid with tag pills, the neobrutalist block-shadow look, and decorative motion with no meaning.

**OWN-WORLD.** Mochi palette at page scale: yuzu, matcha, ichigo, ramune and sakura grounds, stock paper and warm ink. There are three materials. Pop-art print gives ink-outlined cards with Ben-Day halftone shadows, comic captions and speech bubbles. Clay gives soft pressed surfaces for buttons, toolkit chips, the About card, the ML nodes and the 3D characters. Decora gives small clay electronic charms (LED, resistor, capacitor) clipped onto cards. Halftone seams in the previous section's colour join every section to the next. Type is DynaPuff for display, with pop-art extrusion on the two headlines. Zen Maru Gothic sets the reading text and M PLUS Code the data.

**STORY.** In the first viewport the visitor understands that one engineer covers three layers. Scrolling takes the stack apart. Each layer then proves itself at its own density: hardware as a dense datasheet table, security as a comic page of cases, ML as a clay graph along a learning path. The flagship notes show depth, the experience log gives the roles, and the three characters regroup beside "Email Philip".

**FIRST VIEWPORT.** Yuzu halftone ground at 1440 by 900. A stock header with a dotted fringe holds the name, section links and a clay "Email Philip" button. The left 13 of 24 columns hold the pop-art extruded name, the part line, a Features card with an LED charm, and the email button. The right 11 hold the clay stack in the left two-thirds of a square stage, with comic caption labels in a column joined to each character by dotted leader lines. On a phone the stack sits directly under the headline.

**FORM.** The Datasheet (position 1 on the ordered list, Philip's pick on the decision page), re-rendered to Philip's pinned brief above. Seed key e0772f0f. Signature interaction: a scroll-driven exploded view with a dolly zoom, then characters that fly to and land in their sections. Drag turns the stack and it springs back to face you; clicking a character sends you to its layer. Motion grammar: physical drops and squash-and-stretch landings, blinking and cursor gaze instead of idle sway. Text effects are tied to meaning: the hardware heading powers on, security decrypts, ML generates and dates flip. Lenis drives the smooth scrolling. Everything rests under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
