// Facts on this site come from the CV in docs/. Publishing rules are in PRODUCT.md:
// Atomio, its confirmed client websites and Seniorpark may be named; other employers,
// phone numbers and referees stay private.

export type LayerId = 'hardware' | 'security' | 'ml';

export const site = {
  name: 'Philip Shawn Oyuga',
  title: 'Philip Shawn Oyuga: firmware, security and machine learning',
  description:
    'Portfolio of Philip Shawn Oyuga, an engineer who works from firmware and hardware, through security, up to multi-agent machine learning.',
  url: 'https://shawn-phy.github.io',
  email: 'philipoyuga14@gmail.com',
  github: 'https://github.com/shawn-phy',
  linkedin: 'https://www.linkedin.com/in/shawn-philip-31361a210',
  // Download links appear when this file exists in public/ at build time.
  cvUrl: '/Philip-Oyuga-CV.pdf',
};

export const features: { tone: LayerId | 'yuzu'; text: string }[] = [
  { tone: 'hardware', text: 'Firmware written for STM32 and Raspberry Pi Pico' },
  { tone: 'security', text: 'Pentested a production fintech product' },
  { tone: 'security', text: 'Runner-up in two capture-the-flag competitions' },
  { tone: 'ml', text: 'Filing a patent on a multi-agent data-extraction architecture' },
  { tone: 'yuzu', text: 'BSc Electronics and Computer Engineering, JKUAT, 2025' },
];

export interface Entry {
  title: string;
  when: string;
  text: string;
  also?: LayerId;
  projectId?: string;
}

export interface Layer {
  id: LayerId;
  name: string;
  title: string;
  claim: string;
  callout: string;
  tools: string[];
  entries: Entry[];
}

export const layerNames: Record<LayerId, string> = {
  hardware: 'Hardware',
  security: 'Security',
  ml: 'Machine learning',
};

// Entries in every layer are sorted by start date, most recent first.
export const layers: Layer[] = [
  {
    id: 'hardware',
    name: 'Hardware',
    title: 'Hardware and low-level systems',
    claim: 'Firmware, boards and the low-level code underneath everything else.',
    callout: 'firmware, boards, robots',
    tools: ['C', 'C++', 'STM32', 'Raspberry Pi Pico', 'Mbed OS', 'PCB design', 'JUCE'],
    entries: [
      {
        title: 'Smart greenhouse',
        projectId: 'smart-greenhouse',
        when: 'Jan – May 2025',
        text: 'A final-year team project for tomato monitoring and disease identification. I built the IoT network and contributed to parts of the ML pipeline.',
        also: 'ml',
      },
      {
        title: 'RoboDojo competition robot',
        when: 'Jun – Aug 2024',
        text: 'A robot that finds its way through a maze and collects objects, built in a team of four.',
      },
      {
        title: 'Autonomous 4WD car',
        projectId: 'autonomous-car',
        when: 'Feb – Apr 2024',
        text: 'A four-wheel-drive robot that avoids obstacles and locates its target, running on a Raspberry Pi Pico.',
      },
      {
        title: 'Smart home system',
        when: 'Sep – Dec 2023',
        text: 'A custom PCB and its firmware, in a team of four.',
      },
      {
        title: 'Docker from scratch in C',
        when: 'Aug – Dec 2023',
        text: 'Containers built from Linux pipes, child processes and syscalls.',
      },
      {
        title: 'I2C driver for the STM32F429ZI',
        when: 'Jul – Oct 2023',
        text: 'Firmware for the VL53L0X time-of-flight sensor, running on Mbed OS.',
      },
      {
        title: 'Audio filter plugin',
        when: 'Apr 2022 – now',
        text: 'A filter plugin for FL Studio, built with the JUCE framework. In progress.',
      },
      {
        title: 'Media server from a 24-year-old PC',
        when: 'Dec 2021 – Jan 2022',
        text: 'Legacy hardware put back to work as an Emby media server.',
      },
    ],
  },
  {
    id: 'security',
    name: 'Security',
    title: 'Security',
    claim: 'Breaking systems on purpose: pentests, exploits and capture-the-flag.',
    callout: 'pentests, exploits, CTFs',
    tools: ['Rust', 'Bash', 'Networking', 'Pentesting', 'Exploit development'],
    entries: [
      {
        title: 'Fintech pentest',
        when: 'Sep 2025 – now',
        text: 'Pentesting a production fintech product as part of my current role.',
      },
      {
        title: 'Notepad exploit in Rust',
        when: 'May 2024 – now',
        text: 'An exploit written in Rust. In progress.',
      },
      {
        title: 'International Rungu CTF',
        when: '2022',
        text: 'First runner-up.',
      },
      {
        title: 'National Cyberise CTF',
        when: '2022',
        text: 'First runner-up.',
      },
    ],
  },
  {
    id: 'ml',
    name: 'ML',
    title: 'Machine learning',
    claim: 'Models and agents that do real work, from a Jetson Nano to multi-agent pipelines.',
    callout: 'agents, vision, quantum',
    tools: ['Python', 'TensorFlow', 'OpenCV', 'Jetson Nano', 'OpenTelemetry', 'Quantum circuits'],
    entries: [
      {
        title: 'Synthetic datasets with qGANs',
        when: 'Jun – Aug 2026',
        text: 'Classical autoencoders combined with variational quantum circuits to generate images.',
      },
      {
        title: 'Multi-agent extraction',
        projectId: 'multi-agent-extraction',
        when: 'Sep 2025 – now',
        text: 'A multi-agent workflow that pulls healthcare facilities out of state licensing websites. I am filing a patent on the architecture.',
      },
      {
        title: 'Monitoring for AI workloads',
        when: 'Sep 2025 – now',
        text: 'One OpenTelemetry setup that watches every AI workload.',
      },
      {
        title: 'Tennis match live analysis',
        when: 'Mar 2024 – Apr 2025',
        text: 'Real-time match analysis with OpenCV and TensorFlow, deployed on a Jetson Nano.',
        also: 'hardware',
      },
      {
        title: 'SeAn',
        when: 'Jun – Aug 2022',
        text: 'Sentiment analysis for WhatsApp chat exports.',
      },
    ],
  },
];

// A numbered callout on a flagship figure. The anchor is in the figure's own
// 320-unit-wide coordinates, measured on Philip's final illustrations; the marker is
// in the plate's 320 × 220 stage, where the figure is drawn at 70% scale in the middle.
// If a figure is replaced, re-measure its anchors.
export interface Callout {
  n: number;
  text: string;
  anchor: [number, number];
  marker: [number, number];
}

export interface Spec {
  label: string;
  value?: string;
  layers?: LayerId[];
}

export interface Flagship {
  id: string;
  figure: 'car' | 'atomio' | 'agents' | 'greenhouse';
  tone: LayerId | 'yuzu';
  title: string;
  summary: string;
  contribution?: string;
  writeupUrl?: string;
  callouts: Callout[];
  specs: Spec[];
}

export const flagships: Flagship[] = [
  {
    id: 'multi-agent-extraction',
    figure: 'agents',
    tone: 'ml',
    title: 'Multi-agent extraction',
    summary:
      'A multi-agent workflow that extracts healthcare facility records from state licensing websites for Seniorpark.',
    callouts: [
      { n: 1, text: 'Agents hand the work along', anchor: [106, 114], marker: [122, 206] },
      { n: 2, text: 'Facility records come out', anchor: [183, 146], marker: [244, 202] },
      { n: 3, text: 'The architecture under patent filing', anchor: [160, 56], marker: [206, 16] },
    ],
    specs: [
      { label: 'Dates', value: 'Sep 2025 – now' },
      { label: 'Layer', layers: ['ml'] },
      { label: 'Tested by', value: 'Automation tests on the scraper' },
      { label: 'Monitored by', value: 'OpenTelemetry' },
      { label: 'Status', value: 'Patent filing under way' },
    ],
  },
  {
    id: 'autonomous-car',
    figure: 'car',
    tone: 'hardware',
    title: 'Autonomous 4WD car',
    summary: 'A small four-wheel-drive robot that avoids obstacles and finds its target.',
    callouts: [
      { n: 1, text: 'Raspberry Pi Pico controller', anchor: [183, 52], marker: [232, 12] },
      { n: 2, text: 'Obstacle sensing', anchor: [152, 115], marker: [100, 12] },
      { n: 3, text: 'Four-wheel drive', anchor: [234, 153], marker: [290, 200] },
    ],
    specs: [
      { label: 'Dates', value: 'Feb – Apr 2024' },
      { label: 'Layer', layers: ['hardware'] },
      { label: 'Controller', value: 'Raspberry Pi Pico' },
      { label: 'Drive', value: 'Four-wheel drive' },
      { label: 'Does', value: 'Avoids obstacles and locates its target' },
    ],
  },
  {
    id: 'atomio',
    figure: 'atomio',
    tone: 'yuzu',
    title: 'Atomio',
    summary: 'A software company I co-founded. We built construction-management software and client websites, including Laxmi Group and SafeHarbor Consulting.',
    callouts: [
      { n: 1, text: 'Construction-management software', anchor: [197, 112], marker: [294, 116] },
      { n: 2, text: 'Websites for clients', anchor: [69, 29], marker: [160, 12] },
    ],
    specs: [
      { label: 'Dates', value: '2024 – Jan 2026' },
      { label: 'Role', value: 'Co-founder' },
      { label: 'Backend', value: 'C#, on servers I configured' },
      { label: 'Client websites', value: 'Laxmi Group and SafeHarbor Consulting' },
    ],
  },
  {
    id: 'smart-greenhouse',
    figure: 'greenhouse',
    tone: 'hardware',
    title: 'Smart greenhouse',
    summary: 'A final-year team project combining greenhouse sensor monitoring with tomato-leaf disease identification.',
    contribution: 'I built the IoT network and contributed to parts of the ML pipeline.',
    writeupUrl: '/projects/smart-greenhouse/',
    callouts: [
      { n: 1, text: 'STM32 Discovery and ESP32-CAM', anchor: [165, 149], marker: [286, 204] },
      { n: 2, text: 'Sensor-monitored greenhouse', anchor: [79, 117], marker: [24, 40] },
    ],
    specs: [
      { label: 'Dates', value: 'Jan – May 2025' },
      { label: 'Layers', layers: ['hardware', 'ml'] },
      { label: 'Hardware', value: 'STM32 Discovery and ESP32-CAM, connected over UART' },
      { label: 'ML pipeline', value: 'SAM leaf segmentation and TensorFlow CNN disease classification' },
      { label: 'Inference', value: 'Cloud-hosted, served through Flask' },
      { label: 'Context', value: 'Final-year team project' },
    ],
  },
];

export const pins = {
  left: ['C', 'C++', 'Rust', 'Bash', 'STM32', 'Raspberry Pi Pico', 'Jetson Nano', 'Mbed OS'],
  right: ['Python', 'TypeScript', 'C#', 'TensorFlow', 'OpenCV', 'OpenTelemetry', 'GraphQL', 'React'],
};

// Roles as a datasheet revision history, newest first.
export interface Revision {
  rev: string;
  when: string;
  role: string;
  change: string;
}

export const revisions: Revision[] = [
  {
    rev: 'D',
    when: 'Sep 2025 – now',
    role: 'ML and cybersecurity engineer, Nairobi',
    change: 'Multi-agent extraction, a fintech pentest and monitoring for AI workloads.',
  },
  {
    rev: 'C',
    when: '2024 – Jan 2026',
    role: 'Co-founder, Atomio Technologies',
    change: 'Construction-management software, client websites and a C# backend.',
  },
  {
    rev: 'B',
    when: 'Aug 2024 – Apr 2025',
    role: 'Junior engineer',
    change: 'Moved a PHP monolith to TypeScript microservices and wrapped RouterOS for payments.',
  },
  {
    rev: 'A',
    when: 'May – Jul 2024',
    role: 'Software developer intern',
    change: 'A multithreaded financial-statement parser and a C# event system with a GraphQL API.',
  },
];

export const medals: { place: string; title: string; detail: string; tone: LayerId | 'yuzu' }[] = [
  { place: '2nd', title: 'International Rungu CTF', detail: '2022', tone: 'security' },
  { place: '2nd', title: 'National Cyberise CTF', detail: '2023', tone: 'security' },
  { place: '3rd', title: 'National Science Fair, regional', detail: '2018', tone: 'hardware' },
];

export const education: { what: string; when: string }[] = [
  { what: 'BSc Electronics and Computer Engineering, JKUAT', when: '2020 – 2025' },
];

export const certificates: { what: string; when: string }[] = [
  { what: 'Quantum Machine Learning, advanced level, IBM', when: '2025' },
  { what: 'International Mathematics Olympiad, participation', when: '2018' },
];

export const interests = ['Chess', 'CTF competitions', 'DIY builds', 'Cycling', 'Music production'];
