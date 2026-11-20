---
name: Philip Shawn Oyuga
description: An engineer documented like a component, printed as a pop-art toy-catalogue datasheet.
colors:
  ink: "#17130f"
  stock: "#fffbf0"
  yuzu: "#ffd23f"
  yuzu-deep: "#f2b90f"
  yuzu-soft: "#fff0b3"
  matcha: "#6fd08c"
  matcha-deep: "#45b56a"
  ichigo: "#ff6b9a"
  ichigo-deep: "#f0447c"
  ramune: "#5cc8f5"
  ramune-deep: "#2fb0e8"
  ramune-ground: "#dff4fd"
  sakura: "#ffe3ec"
  sakura-deep: "#ffc2d6"
  blush: "#ff8fb0"
typography:
  display:
    fontFamily: "DynaPuff Variable, ui-rounded, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.1rem + 6.2vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: "0.035em"
  headline:
    fontFamily: "DynaPuff Variable, ui-rounded, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "DynaPuff Variable, ui-rounded, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.25rem + 1.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  title-sm:
    fontFamily: "DynaPuff Variable, ui-rounded, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 700
    lineHeight: 1.08
  lede:
    fontFamily: "Zen Maru Gothic, ui-rounded, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 700
    lineHeight: 1.45
  body:
    fontFamily: "Zen Maru Gothic, ui-rounded, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: "M PLUS Code Latin Variable, ui-monospace, SF Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0"
    fontFeature: "tnum"
  sfx:
    fontFamily: "Mochiy Pop One, DynaPuff Variable, sans-serif"
    fontSize: "clamp(2.4rem, 1.4rem + 3vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
rounded:
  comic: "4px"
  sm: "10px"
  md: "16px"
  lg: "26px"
  clay: "34px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  band: "clamp(4.5rem, 9vw, 7.5rem)"
  wrap: "78rem"
  line: "2.5px"
components:
  button-clay:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.pill}"
    padding: "0.6em 0.65em 0.6em 1.3em"
    height: "48px"
  button-clay-yuzu:
    backgroundColor: "{colors.yuzu}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
  button-clay-big:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "60px"
  sticker-card:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "1.1rem 1.4rem 1.3rem"
  clay-card:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.clay}"
    padding: "1.1rem 1.3rem 1.3rem"
  table-head:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.label}"
    padding: "0.55rem 1.3rem"
  comic-panel:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.comic}"
    padding: "3.1rem 1.4rem 1.6rem"
  caption-box:
    backgroundColor: "{colors.yuzu}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0.35rem 0.8rem"
  fig-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.1em 0.55em"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 0.7em"
    height: "44px"
  nav-link-hover:
    backgroundColor: "{colors.yuzu}"
---

# Design System: Philip Shawn Oyuga

## Overview

**Creative North Star: "The Pop-Art Toy Datasheet"**

The page documents one engineer the way a part is documented: features, block diagram, pinout, typical applications, revision history. Every datasheet convention survives (figure numbers, numbered callouts, parameter tables, an ink head row), but the whole sheet is printed as a 1960s pop-art toy catalogue in mochi flavours. Three clay characters, one per layer of the work (hardware, security, machine learning), carry the story: stacked, exploded, explained, regrouped.

The world is built from three materials that each keep their own job. **Pop-art print** is the documentation layer: ink-outlined stickers with Ben-Day halftone shadows, comic panels, caption boxes, speech balloons, extruded lettering. **Clay** is the touchable layer: buttons, toolkit chips, the About card, the ML graph nodes and the 3D characters, all soft pressed surfaces lit from above. **Decora** is the ornament layer: small clay electronic charms (LED, resistor, capacitor) clipped onto the edge of a card. Sections are joined by halftone seams in the colour of the section above, so a mix of materials still reads as one printed object.

Density follows meaning, not a template. Hardware is a dense table, security is a comic page, ML is a full-width hub-and-spoke graph, the flagship projects are four distinct application-note compositions, experience is a revision table. Motion is physical and deliberate: things fall, land, squash once and settle. The build rejects the dark terminal portfolio, the card grid with tag pills, the neobrutalist block-shadow look and decorative motion with no meaning.

**Key Characteristics:**
- Mochi palette at page scale: every band is a full-bleed ground in one flavour, patterned in its own dots or traces.
- One warm ink (#17130f) for every outline, rule, table head and number; never pure black.
- Three materials with separate jobs: print documents, clay is touched, decora decorates.
- Datasheet devices (Fig. N tags, numbered callouts, parameter tables) structure every piece of proof.
- One scroll story with 3D clay characters; every landing is a fall and a single squash.

## Colors

A saturated mochi-flavour palette on cream paper, held together by one warm ink.

### Primary
- **Yuzu Yellow** (yuzu): the home ground. Hero and closing bands, the clay "Email Philip" button in the header, comic caption boxes, the Pins chip body, the halftone shadow under every sticker on the dark Applications band. Its deep variant (yuzu-deep) prints the hero's Ben-Day dot field; yuzu-soft rules the ledger lines and grid on paper sections.

### Secondary
- **Matcha Green** (matcha): the hardware layer. Hardware band ground, with matcha-deep circuit traces as its pattern. Hardware dots, pins and plates.
- **Ichigo Strawberry** (ichigo): the security layer. Security band ground under ichigo-deep Ben-Day dots; the hero name's extrusion; the ドン！ sound effect; the text selection colour.
- **Ramune Blue** (ramune): the machine-learning layer. ML dots and plates, the closing headline's extrusion. The ML band itself sits on the paler **Ramune Ground** (ramune-ground) so the clay graph nodes read against it, with ramune-deep for the dotted learning path.

### Tertiary
- **Sakura Pink** (sakura): the About band, the one section that is Philip's own voice, dotted in sakura-deep.
- **Blush Pink** (blush): cheeks only, on the characters and in the illustrations.

### Neutral
- **Warm Ink** (ink): text, every outline, table head rows, Fig. tags, callout numbers, the Applications band ground and the footer.
- **Cream Stock** (stock): paper. Header, sticker faces, clay surfaces, comic panels, the Pins and History grounds, text on ink.

### Named Rules
**The One Flavour Per Layer Rule.** Hardware is matcha, security is ichigo, ML is ramune, and the tone travels with the work: a dot, a pin, a plate or a toolkit chip in a layer's colour means that layer, everywhere on the page. Yuzu belongs to Philip as a whole, never to one layer.

**The Warm Ink Rule.** Every line, rule, outline and dark ground is ink (#17130f). Pure black and grey borders do not exist in this world.

**The Seam Rule.** Two sections never meet at a hard edge. The upper section's colour dissolves into the next through a halftone seam, and the seam is always in the previous section's colour.

## Typography

**Display Font:** DynaPuff (with ui-rounded, Arial Rounded MT Bold)
**Body Font:** Zen Maru Gothic (with ui-rounded, system-ui)
**Label/Mono Font:** M PLUS Code Latin (with ui-monospace, SF Mono)

**Character:** A puffy, toy-like display face over a rounded Japanese-Latin sans that stays calm at reading sizes, with a rounded monospace for anything that is data. Display weight is always 700; body runs at 500 with 700 and 900 for emphasis.

### Hierarchy
- **Display** (700, clamp 2.6rem to 5.25rem, 1.14): the two extruded headlines only, the hero name and the closing "Email Philip" headline.
- **Headline** (700, clamp 2.2rem to 3.75rem, 1.08): section headings, set on a bouncing baseline. Also the lead comic panel title and the application-note titles (the car note runs its title at display size because the object is small).
- **Title** (700, clamp 1.6rem to 2.25rem, 1.2): the hero line, comic panel titles, the lead ML node.
- **Title Small** (700, 1.3125rem): card titles (Features, Built with), ML node titles, History row labels, the speech balloon.
- **Lede** (700, 1.3125rem, 1.45, max 34rem): one claim under each section heading.
- **Body** (500, 1.0625rem, 1.6): reading text, held to 40 to 62ch inside tables and cards. Table row titles and parameter names go to 900 in the body face, not to the display face.
- **Label** (500 to 700, 0.875rem, tabular numerals): dates, Fig. tags, callout numbers, table head rows. Anything that is a value or an index.
- **Sound effect** (Mochiy Pop One 400, clamp 2.4rem to 4.2rem): reserved for the single ドン！ in the manga burst.

### Named Rules
**The Bouncing Baseline Rule.** Section headings are set letter by letter on a fixed tilt and lift pattern (about ±3deg, ±3px), so the display voice wobbles like printed toy lettering while staying still. The pattern is fixed, never random.

**The Two Extrusions Rule.** Pop-art extrusion (cream fill, 8px ink stroke, a six-step stepped shadow in a layer colour finished with two ink steps) is used on exactly two headlines: the hero name in ichigo and the closing headline in ramune. Every other heading is flat ink.

**The Data Face Rule.** If it is a date, a number, a figure index or a table head, it is set in M PLUS Code with tabular numerals. Prose never uses the data face.

## Layout

A single long page on a 78rem wrap with a fluid gutter (clamp 1rem to 3rem). Every section is a full-bleed band with the same vertical padding (clamp 4.5rem to 7.5rem) and its own stacking context, so halftone shadows print on that band's ground. The hero splits 13 to 11 across the grid: copy left, the character stack in a square stage right with its caption labels in a column joined by dotted leader lines.

Each section sets its own density. The hardware and security bands run a 4 to 8 split with the character and its clay toolkit in a sticky column, alternating sides from band to band. The ML band drops the side column for a full-width graph (48rem tall) with the character at the hub. Application notes are laid on a 12-column grid with a different composition for each project: wide figure with the table clipped over its corner, oversized title above figure and table side by side, a stock card laid over the product figure, and a centred axis with the table resting on the figure.

Selected projects follow the hero, before About, layers, tools and experience. Layer entries link back to selected projects instead of repeating their summaries. The hero introduction uses the body face at lede size and 1.5 line-height, leaving the name as the expressive focal point.

Breakpoints are content-led: 56rem collapses the hero and the bands to one column, 60rem stacks application notes as heading, figure, table, and 36 to 48rem turns tables into stacked blocks. The ML graph uses a two-column flow below 70rem of available container width and a single column below 40rem. Below 56rem, section links occupy a second header row. Scroll padding follows the measured header height.

## Elevation & Depth

Depth is printed, not lit, except where something is meant to be touched. Documentation surfaces (stickers, tables, figure plates) cast a Ben-Day halftone shadow: a dot field offset down and right, fading in from the top-left corner along a diagonal mask, so the shadow reads as ink on paper. Clay surfaces carry the only soft light: an inner highlight on top, an inner shade at the bottom and a diffuse drop below, all mixed from the surface's own colour. Comic panels are flat, with a halftone corner fade inside them instead of a shadow.

### Shadow Vocabulary
- **Halftone print shadow** (`radial-gradient(circle, var(--shade, var(--ink)) 2.3px, transparent 2.8px) 0 0 / 6px 6px`, offset 16px 16px, masked `linear-gradient(135deg, transparent 18%, #000 62%)`): under every sticker. Ink on light grounds; yuzu on the ink Applications band.
- **Clay surface** (`inset 0 5px 6px rgb(255 255 255 / 0.75), inset 0 -10px 18px color-mix(in oklab, var(--clay-bg), var(--ink) 12%), 0 24px 40px -18px color-mix(in oklab, var(--clay-bg), var(--ink) 55%), 0 6px 10px -4px color-mix(in oklab, var(--clay-bg), var(--ink) 28%)`): cards and ML nodes.
- **Clay button** (`inset 0 3px 2px rgb(255 255 255 / 0.75), inset 0 -5px 8px color-mix(in oklab, var(--clay-bg), var(--ink) 16%), 0 14px 22px -10px color-mix(in oklab, var(--clay-bg), var(--ink) 60%), 0 3px 5px -1px color-mix(in oklab, var(--clay-bg), var(--ink) 30%)`): buttons, deepening on hover and pressing inward on active.
- **Charm drop** (`drop-shadow(0 6px 6px rgb(23 19 15 / 0.22))`): decora charms only.

### Named Rules
**The Printed Shadow Rule.** A documentation surface's shadow is made of dots, never a solid block. The offset dot field is the pop-art version of the datasheet card; a solid offset slab is the neobrutalist look this world replaced.

**The Clay Is Touchable Rule.** Soft light and squash belong to clay: things you press (buttons), things you read as objects (toolkit, About card, ML nodes) and the characters. Print surfaces never get gradients or soft drops.

## Shapes

Three corner families, one per material. Print stickers and tables round at 26px (lg), with the table head row's corners following the sticker inside the line. Clay rounds further, at 34px for surfaces and full pills for buttons and chips. Comic devices are nearly square: panels at 4px, caption boxes at 3px and sharing the panel's outer borders, speech balloons as ellipses (50% / 46%) with a two-triangle tail. Outlines are a single 2.5px ink line; comic panels and balloons use 3px; table rules and data dots use 2px. Circles mark indices and tones: layer dots (0.85em), numbered callouts, revision numbers and medal places.

## Components

### Buttons
Clay pills that squash when pressed.
- **Shape:** full pill (999px), 48px minimum height; 60px for the hero and closing calls; 44px in the header.
- **Primary:** cream clay with ink DynaPuff label at 700 and an ink circle holding a cream arrow at the end. In the header the clay is yuzu.
- **Hover / Focus:** lifts 3px on the spring curve with a deeper drop, and the arrow nudges 3px right. Active presses down 2px and squashes to 0.97 by 0.94 with the shadow turned inward. Focus is a 3px ink outline at 4px offset (yuzu on ink grounds).
- **Plain:** the same clay without the arrow circle.

### Chips
- **Toolkit chips:** small clay pills tinted with the layer tone mixed 35% toward white, with an inner highlight and shade. No outline.
- **Interest tags:** flat print pills with a 2px ink outline, cycling yuzu, matcha, ramune.

### Cards / Containers
- **Sticker (print):** cream face, 2.5px ink outline, 26px corners, halftone print shadow. Holds Features, tables and figure plates. A decora charm may be clipped to its top edge.
- **Clay card:** cream clay, 34px corners, clay surface shadow, no outline. Holds the toolkit, About, the ML nodes and History's other characteristics.
- **Comic panel:** cream, 3px ink border, 4px corners, a yuzu caption box with the date in the top-left corner and an ichigo Ben-Day fade from one corner. Panels tile on a 12-column comic grid with 14px gutters.

### Navigation
A sticky cream bar whose lower edge is a fringe of cream dots instead of a rule. The name sits left in DynaPuff; section links are bold body-face pills (44px) that fill yuzu on hover; the yuzu clay email button sits right. Below 56rem, Projects, Layers, Experience and Contact remain visible in a second row. The name can wrap at narrow widths.

### Datasheet Table
The shared table construction: ink head row in the data face with cream text, body rows divided by 2px ink rules, round outer corners from the sticker around it. Dates sit in a fixed column in the data face; row titles and parameter names go bold in the body face. On narrow screens rows become stacked blocks.

### Figure Plate
A sticker whose top is a stage in the layer's tone, holding the supplied illustration at 70% scale with numbered callouts: ink circles with cream data-face numbers, joined by 2.4px ink lines to cream-filled anchor rings on the art. Below it, a legend opens with an ink "Fig. N" pill and repeats each numbered point. Characters can perch in the stage's lower-left corner: hardware on the car, ML on the agents and the greenhouse. On a proof deck the perch belongs to the deck, so the character stands on whichever card is on top.

### Decora Charm
Small clay electronic parts (an ichigo LED, a resistor banded in the layer colours, a ramune capacitor), clipped at a tilt (7 to 14 degrees) across the top edge of a card. One charm per card at most; purely decorative.

### Halftone Seam
A band the height of the section padding, in the previous section's colour, masked by a repeating halftone edge so the colour breaks into dots. The seam settles into place as it scrolls in.

### Character Stack and Motion
The three clay characters (rendered in 3D, with drawn stand-ins and the supplied illustrations as fallbacks) are the page's signature. The hero stack separates under a dolly zoom with a manga focus-line burst and ドン！. After the hero, each character visits its stations in page order (any project perches, its layer band, then the closing crew), riding each one out of view as the page scrolls on. Between stations it travels hidden behind the sticky masthead, and it drops out from under the masthead into the next station only once no text remains between the two: a thrown arc from the side it came from, then one squash on landing. The crew lands bottom first, as the stack did in the opening. Hero callouts remain visible whenever they contain keyboard focus, including during the exploded view. Characters blink on irregular rhythms and turn their gaze toward the cursor; dragging the stack turns it and an elastic spring returns it to face the reader.

Text effects run once, on first view, and each is tied to meaning: the hardware heading powers on like LEDs in stepped flicker, the security heading decrypts out of hex bytes, the ML heading generates token by token behind a caret, dates roll like a split-flap board, and the closing headline waves once as the characters land.

**The Fall And Squash Rule.** Every landing is a fall on an accelerating curve followed by exactly one squash (about 1.12 by 0.85) that settles on expo-out. No bounce series, no idle sway, no left-right wobble.

**The Elastic Is For Drag Rule.** Elastic easing appears only on the stack's drag spring-back. Pointer feedback (button lift, callout nudge, pin probe, letter squish) and the closing wave use the shorter overshoot spring; everything else settles on expo-out.

**The Rest Rule.** Under reduced motion nothing moves: no smooth scrolling, no 3D scene, no text effects. The drawn characters and every final state are shown at rest.

## Do's and Don'ts

### Do:
- **Do** give every section a full-bleed flavour ground with its own pattern, and join it to the previous section with a halftone seam in the previous section's colour.
- **Do** mark layer membership with the layer's flavour (matcha hardware, ichigo security, ramune ML) on a dot, chip, pin or plate.
- **Do** outline print surfaces in a single ink line (2.5px) and shade them with offset Ben-Day dots.
- **Do** keep clay for what is pressed or held: buttons, toolkit chips, cards read as objects, nodes and characters.
- **Do** document proof with datasheet devices: Fig. N pills, numbered callouts, parameter tables with an ink head row.
- **Do** set dates, figure numbers and values in the data face with tabular numerals.
- **Do** let each section choose its own density and composition when its subject calls for it.
- **Do** tie every animation to an intention: a fall and one squash for landings, a text effect for what the words mean.

### Don't:
- **Don't** use solid offset block shadows; the dotted print shadow is the only cast shadow on print surfaces.
- **Don't** use pure black or grey for lines and dark grounds; ink (#17130f) is the only dark.
- **Don't** extrude any headline other than the hero name and the closing headline.
- **Don't** use Mochiy Pop One for anything but the manga sound effect.
- **Don't** add idle sway, looping wobble or bounce series to characters or type.
- **Don't** use elastic easing outside the drag spring-back.
- **Don't** set proof as a uniform card grid with tag pills.
- **Don't** put labels above headings; a section opens with its heading and one lede.
