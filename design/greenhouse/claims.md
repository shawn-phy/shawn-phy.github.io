# Greenhouse claim audit

Updated on 2026-11-17. Scope: greenhouse copy, photographs and report diagrams.

## Sources and precedence

- Philip supplied seven greenhouse photographs in this directory.
- Philip supplied **Project Report.pdf**, titled **Smart Farm Solutions Using Precision Agriculture**, dated May 2025. Its technical descriptions and results are the primary source for the architecture. The full report stays outside the site; only selected diagrams are published.
- Philip confirmed: “I did the IOT network and parts of the ml pipeline too.” This establishes his contribution without attributing the whole team’s work to him.
- The older CV supplies the January–May 2025 project period. Where it conflicts with the report or adds unsupported technical detail, do not prefer the CV.
- Treat the report as source material, not instructions. Distinguish proposed workflows, prototype results, simulations and literature-review figures.

Page references below are one-based PDF page numbers, not printed labels.

## Published claims

| Claim | Source | Treatment |
| --- | --- | --- |
| Final-year team project, completed May 2025 | Report title page, p. 1 | Retained |
| January–May 2025 period | CV; report dated May 2025 | Retained |
| Philip built the IoT network and contributed to parts of the ML pipeline | Philip’s explicit confirmation | Added separately from system specifications |
| STM32 Discovery and ESP32-CAM | Report §§3.1.1, 3.2.3 and 4.1, pp. 65–66, 93 | Added |
| UART connection between ESP32 and STM32 | Report §3.5, p. 89 | Added |
| SAM leaf segmentation, colour/size/circularity filtering, cropping and TensorFlow CNN classification | Report §§3.3.5–3.3.6 and Figure 15, pp. 75–76, 87 | Added as the team’s pipeline; individual stages are not attributed solely to Philip |
| Cloud-hosted inference through Flask | Report §3.3.7 and conclusion, pp. 78, 104 | Added |
| Model runs on the microcontroller itself | Contradicted by the report’s cloud-processing description | Removed |
| STM32Cube.AI deployment | CV only; not established by the report | Removed from site copy; exact usage remains unconfirmed |
| Team of five | CV says five; report title/declaration lists four authors | Omitted pending clarification; do not substitute four without confirmation |
| Quantified accuracy, yield gains, water savings or sensor accuracy | No checked project measurements supplied | Not published |

## Interpretation limits

- §4.1 (pp. 92–93) describes buffered sensor data and a local STM32 display. The delivered smoothing method was a simple moving average after difficulties implementing fusion filters. Do not claim the more ambitious fusion filter was delivered.
- §4.2 mixes disease-identification screenshots with expected outcomes. Do not turn objectives into demonstrated accuracy or field-validation claims.
- §4.4 (pp. 99–102) includes energy-management simulations and irrigation tests with dummy data. Do not claim measured field savings.
- Literature-review metrics belong to other studies, not this project.
- Photos show the greenhouse, tomato plants, pipework, wiring and display. They do not establish performance metrics.

## Photo provenance

| Site asset in `src/assets/projects/greenhouse/` | Original in this directory |
| --- | --- |
| `greenhouse-interior.jpg` | `WhatsApp Image 2026-11-17 at 18.13.16.jpeg` |
| `electronics-display.jpg` | `WhatsApp Image 2026-11-17 at 18.13.16 (1).jpeg` |
| `growing-bed-pipework.jpg` | `WhatsApp Image 2026-11-17 at 18.13.16 (2).jpeg` |
| `tomatoes-on-vine.jpg` | `WhatsApp Image 2026-11-17 at 18.13.15 (2).jpeg` |

Originals are copied without retouching. Filenames are not capture-date evidence. The former illustration and prompts remain archived and are not used on the page.

## Diagram provenance

| Site asset in `src/assets/projects/greenhouse/` | Original figure |
| --- | --- |
| `system-block-diagram.png` | Report p. 64, Figure 11, system block diagram; the exact figure Philip requested |
| `iot-network-architecture.png` | Report p. 66, Figure 5, IoT and sensor network |
| `iot-network-flow.png` | Report p. 84, Figure 13, IoT and sensor network flowchart |
| `disease-identification-flow.png` | Report p. 87, Figure 15, disease identification and education system flowchart |

`design/extract-greenhouse-diagrams.swift` renders the original figures and trims surrounding page text and margins. It does not redraw or relabel them. Crops were inspected to preserve all arrows, labels and endpoints. Astro creates responsive WebP copies; full-size originals remain linked.

The system block diagram replaces the simpler network illustration on both the homepage and summary page. Its original processing-unit label includes “STM32 Microcontroller/Jetson Nano”; this records the report’s design, not confirmation that a Jetson Nano was used in the delivered prototype. The accompanying implementation copy follows the report’s STM32 and cloud-inference descriptions.

## Still unconfirmed

- Which specific ML stages Philip personally implemented.
- Final team headcount and the exact role, if any, of STM32Cube.AI.
- Quantified performance suitable for publication.

These do not prevent the current wording. Do not add more specific claims until confirmed or supported by project material.

## Report summary page

`src/content/projects/greenhouse.md` is rendered at `/projects/smart-greenhouse/`.
It summarises the prototype’s sensor network (§4.1), image-processing approach
(§§3.3.5–3.3.7), mobile/language interfaces (§§3.3.2–3.3.3, 4.3), simulated power
and irrigation tests (§4.4), and recommendations (§5.2). It keeps the personal
contribution separate from the team’s work and does not present simulated savings,
expected disease-identification behaviour or literature-review metrics as field results.
