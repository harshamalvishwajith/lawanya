/**
 * All website copy lives here, taken from "website content company.docx" and
 * "Website Content Founder Story.docx". Edit text here — components only render it.
 *
 * Items marked SAMPLE are placeholders (project titles, partner names, social URLs)
 * to replace with real ones.
 */
import type { ImageKey } from "@/lib/images";

export const site = {
  name: "Lawanya Events & Digital",
  shortName: "Lawanya",
  descriptor: "An Independent Creative Studio",
  positioning: ["Building Brands.", "Producing Stories.", "Designing Experiences."],
  location: "Kandy, Sri Lanka",
  phone: { display: "+94 70 200 5762", href: "tel:+94702005762", whatsapp: "94702005762" },
  email: "lawanyaeventz@gmail.com",
  // SAMPLE: replace "#" with the real profile URLs.
  socials: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "YouTube", href: "#", icon: "youtube" },
    { label: "TikTok", href: "#", icon: "tiktok" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
  ],
} as const;

export type SocialIcon = (typeof site.socials)[number]["icon"];

export const navigation = [
  { label: "Studio", hash: "studio" },
  { label: "Divisions", hash: "divisions" },
  { label: "Work", hash: "work" },
  { label: "Process", hash: "process" },
  { label: "Founder", hash: "founder" },
  { label: "Insights", hash: "insights" },
] as const;

export const hero = {
  disciplines: ["Creative Studio", "Production House", "Event Design & Digital Experiences"],
  lines: [
    { lead: "Ideas become", key: "stories." },
    { lead: "Stories become", key: "experiences." },
    { lead: "Experiences become", key: "unforgettable." },
  ],
  intro:
    "Lawanya Events & Digital is an independent creative studio specializing in branding, cinematic production, digital storytelling, and experiential event design.",
  reel: [
    "wedding-couple",
    "concert-stage",
    "cinema-camera",
    "gala-dinner",
    "wedding-traditional",
    "film-set",
    "brand-activation",
    "music-video",
    "celebration",
    "tv-studio",
    "corporate-keynote",
    "studio-shoot",
    "destination-wedding",
    "clapperboard",
    "wedding-reception",
    "content-creation",
  ] satisfies readonly ImageKey[],
} as const;

export const promise = ["Stories That Inspire", "Experiences That Last", "Brands That Grow"] as const;

export const weCreate = {
  title: "We Create.",
  notJust: ["content.", "events.", "campaigns."],
  statement: "We create experiences that people remember.",
  lead: "Every project begins with understanding.",
  chain: ["Understanding", "Strategy", "Storytelling", "Experience"],
} as const;

export const whoWeAre = {
  theyAsk: "What do you need?",
  weAsk: "What story are we trying to tell?",
  behind: [
    { word: "brand", image: "brand-activation" },
    { word: "wedding", image: "wedding-couple" },
    { word: "campaign", image: "content-creation" },
    { word: "production", image: "film-set" },
  ] satisfies readonly { word: string; image: ImageKey }[],
  behindEnd: "there is a story waiting to be experienced.",
  studioLead: "Lawanya Events & Digital is a multidisciplinary creative studio bringing together",
  people: ["filmmakers", "marketers", "designers", "strategists", "event professionals", "storytellers"],
  studioEnd: "under one creative vision.",
  belief:
    "We believe meaningful brands are built through emotion, authenticity, and human connection.",
  values: ["Emotion", "Authenticity", "Human connection"],
  collage: ["wedding-reception", "film-set", "creative-team"] satisfies readonly ImageKey[],
} as const;

export const philosophy = {
  lines: [
    { subject: "Creativity", verb: "should have", object: "purpose." },
    { subject: "Marketing", verb: "should build", object: "relationships." },
    { subject: "Productions", verb: "should tell", object: "stories." },
    { subject: "Events", verb: "should create", object: "memories." },
    { subject: "Brands", verb: "should inspire", object: "people." },
  ],
  closing: "Everything we create begins with this belief.",
} as const;

export type Division = {
  id: "experiences" | "brands" | "stories";
  number: string;
  title: string;
  discipline: string;
  lead: string;
  body?: string;
  listLabel: string;
  items: readonly string[];
  closing?: string;
  image: ImageKey;
};

export const divisions: readonly Division[] = [
  {
    id: "experiences",
    number: "01",
    title: "Experiences",
    discipline: "Event Design & Production",
    lead: "We design and produce emotionally powerful experiences that stay with people long after the moment ends.",
    listLabel: "We specialize in",
    items: [
      "Weddings & Destination Weddings",
      "Corporate Events",
      "Brand Activations",
      "Award Ceremonies",
      "Conferences & Seminars",
      "Private Celebrations",
      "Press Events",
      "Live Experiences",
    ],
    closing: "Every detail is designed with intention. Every moment is crafted to be remembered.",
    image: "event-decor",
  },
  {
    id: "brands",
    number: "02",
    title: "Brands",
    discipline: "Marketing & Strategy",
    lead: "We help businesses evolve into brands people recognize, trust, and remember.",
    listLabel: "We focus on",
    items: [
      "Brand Strategy",
      "Creative Direction",
      "Digital Marketing",
      "Content Development",
      "Campaign Planning",
      "Brand Communication Systems",
    ],
    closing: "We connect strategy with storytelling to build lasting brand value.",
    image: "studio-shoot",
  },
  {
    id: "stories",
    number: "03",
    title: "Stories",
    discipline: "Film & Production",
    lead: "We believe visual storytelling has the power to shape perception and emotion.",
    body: "From cinematic commercials to documentaries, music videos, and branded content, we craft visuals that communicate meaning—not just visuals that look good.",
    listLabel: "We create",
    items: [
      "Commercial Films",
      "Brand Films",
      "Music Videos",
      "Documentaries",
      "Digital Campaign Content",
      "Social Media Visual Narratives",
    ],
    image: "cinema-camera",
  },
];

export const founder = {
  name: "Nisangi Lawanya Rammandala",
  firstName: "Nisangi",
  roles: [
    "Creative Director",
    "Television Host",
    "Media Academic",
    "Entertainment Marketer",
    "Producer",
    "Storyteller",
  ],
  summary:
    "A multidisciplinary creative professional combining cinematic thinking with strategic marketing to design meaningful experiences across media, branding, and live events.",
  bio: "With experience in film, television, academia, digital marketing, and event production, Nisangi leads Lawanya Events & Digital with a vision to merge storytelling and strategy into one creative ecosystem.",
  principleLead: "Every project is guided by one principle:",
  principle: "Create work that educates, inspires, and connects people.",
  honours: [
    { value: "First Class", label: "B.A. (Hons) Film & Television Studies" },
    { value: "60+", label: "Film analyses hosted on “Film Reading”, iTV" },
    { value: "Founder", label: "& Director, Lawanya Events & Digital" },
  ],
  portrait: "founder-portrait" satisfies ImageKey,
} as const;

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    lines: [
      "We begin by understanding your vision, audience, and objectives.",
      "This stage is about listening, learning, and uncovering opportunities.",
    ],
  },
  {
    number: "02",
    title: "Strategize",
    lines: [
      "We translate insights into creative and strategic direction.",
      "Every idea is shaped with purpose, research, and clarity.",
    ],
  },
  {
    number: "03",
    title: "Create",
    lines: [
      "We bring ideas to life through production, design, storytelling, and execution.",
      "This is where concepts become reality.",
    ],
  },
  {
    number: "04",
    title: "Launch",
    lines: [
      "We deliver with precision and impact, ensuring every project reaches its full potential and continues to grow beyond execution.",
    ],
  },
] as const;

export const projectCategories = [
  "Wedding Films",
  "Brand Campaigns",
  "Commercial Productions",
  "Corporate Events",
  "Digital Campaigns",
  "Television & Media Work",
  "Music Productions",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  title: string;
  category: ProjectCategory;
  meta: string;
  image: ImageKey;
  /** Grid footprint on large screens. */
  size: "wide" | "tall" | "regular";
};

// SAMPLE: replace with real projects (title, category, meta line and photo).
export const projects: readonly Project[] = [
  { title: "Vows by the Ocean", category: "Wedding Films", meta: "Destination wedding film", image: "destination-wedding", size: "wide" },
  { title: "Film Reading", category: "Television & Media Work", meta: "Cinema appreciation series · iTV", image: "tv-studio", size: "tall" },
  { title: "A Kandyan Wedding Story", category: "Wedding Films", meta: "Traditional wedding film", image: "wedding-traditional", size: "regular" },
  { title: "Immersive Launch Night", category: "Brand Campaigns", meta: "Experiential brand activation", image: "brand-activation", size: "regular" },
  { title: "Behind the Frame", category: "Commercial Productions", meta: "Television commercial", image: "film-set", size: "tall" },
  { title: "Annual Awards Gala", category: "Corporate Events", meta: "Award ceremony production", image: "gala-dinner", size: "wide" },
  { title: "Stories in Motion", category: "Digital Campaigns", meta: "Social-first content series", image: "content-creation", size: "tall" },
  { title: "Live Session", category: "Music Productions", meta: "Music video production", image: "music-video", size: "regular" },
  { title: "Leadership Summit", category: "Corporate Events", meta: "Conference & keynote stage", image: "corporate-keynote", size: "regular" },
];

export const projectsCopy = {
  intro: "A collection of our creative work across different disciplines.",
  closing: "Each project reflects our commitment to storytelling, detail, and emotional impact.",
} as const;

// SAMPLE: replace with real partner names/logos (drop SVGs in /public/partners and add a `logo` path).
export const partners = [
  { name: "Aurora", mark: "circle" },
  { name: "Monarch & Co.", mark: "diamond" },
  { name: "Lotus Hotels", mark: "petal" },
  { name: "Summit Bank", mark: "peak" },
  { name: "Nova Media", mark: "star" },
  { name: "Cascade Tea", mark: "wave" },
  { name: "Meridian", mark: "ring" },
  { name: "Harbor Labs", mark: "square" },
] as const;

export type PartnerMark = (typeof partners)[number]["mark"];

export const partnersCopy = {
  title: "Brands we have partnered with",
  body: "We are proud to have collaborated with businesses, entrepreneurs, and organizations across multiple industries to create meaningful experiences and impactful campaigns.",
} as const;

export const insights = {
  title: "A space where creativity meets knowledge.",
  body: "As a creative studio led by a media academic and practitioner, we explore ideas that shape modern storytelling.",
  closing: "This is where we share thinking, not just output.",
  topics: [
    { title: "Film & Cinematic Language", image: "cinema-camera" },
    { title: "Branding & Identity", image: "studio-shoot" },
    { title: "Advertising & Consumer Psychology", image: "creative-team" },
    { title: "Entertainment Marketing", image: "concert-stage" },
    { title: "Digital Media Trends", image: "content-creation" },
    { title: "Creative Strategy", image: "editing-suite" },
    { title: "Television & Media Culture", image: "tv-studio" },
    { title: "Research & Academic Insights", image: "lecture" },
  ] satisfies readonly { title: string; image: ImageKey }[],
  channel:
    "Coming soon: a YouTube learning platform on Film Studies, Entertainment Marketing, Brand Communication and Media Production.",
} as const;

export const callToAction = {
  title: "Let’s build something meaningful",
  body: "Whether you are building a brand, planning an event, launching a campaign, or producing a story—we would love to create it with you.",
  belief: "We believe every idea deserves to be told beautifully.",
} as const;

export const contact = {
  title: "Start your creative journey",
  subtitle: "Let’s bring your vision to life.",
  interests: [
    { value: "experiences", label: "Experiences — event design & production" },
    { value: "brands", label: "Brands — marketing & strategy" },
    { value: "stories", label: "Stories — film & production" },
    { value: "other", label: "Something else" },
  ],
} as const;

/* ───────────────────────────── Founder story page ───────────────────────────── */

export const story = {
  titles: [
    "Television Host",
    "Lecturer",
    "Entertainment Marketing Specialist",
    "Creative Producer",
    "Founder, Lawanya Events & Digital",
  ],
  statement:
    "Transforming ideas into high-impact experiences through the intersection of media, strategic marketing, and cinematic storytelling.",
  stats: [
    { value: "3.76", label: "GPA — First-Class Honours, Film & Television Studies" },
    { value: "60+", label: "Analytical film reviews on “Film Reading”" },
    { value: "3", label: "Creative divisions — Experiences, Brands and Stories — under one studio" },
  ],
  chapters: [
    {
      id: "profile",
      title: "Executive Profile",
      paragraphs: [
        "Nisangi Lawanya Rammandala is a distinguished media professional, academic, and marketing strategist whose career seamlessly bridges the gap between creative artistry and corporate strategy. With an established portfolio spanning television hosting, university-level lecturing, brand consultation, and creative production, Nisangi has built a reputation for driving impactful communication across Sri Lanka’s media and business landscapes.",
      ],
      image: "podcast-mic",
    },
    {
      id: "foundations",
      title: "Early Foundations & Academic Excellence",
      paragraphs: [
        "Born in the historic city of Kandy, Nisangi’s trajectory into mass communication began during her secondary education at Pushpadana Girls’ College. She discovered her passion for public engagement early as a radio presenter for Kandurata FM, a foundational experience that sharpened the elite communication skills that define her professional identity today.",
        "Driven by a profound interest in the mechanics of visual storytelling, she pursued higher education at the University of Kelaniya, graduating with a Bachelor of Arts (Honours) Degree in Film and Television Studies with First-Class Honours (GPA 3.76). To complement her creative foundations with commercial acumen, she obtained a Diploma in Multimedia and is currently reading for a Master of Business Management (Marketing) at the University of Kelaniya—allowing her to infuse cutting-edge marketing frameworks into creative media productions.",
      ],
      image: "kandy",
    },
    {
      id: "broadcasting",
      title: "Media, Broadcasting & Creative Production",
      paragraphs: [
        "As a prominent television personality, Nisangi is the host of “Film Reading” on iTV (PEO TV Channel 125), a flagship program dedicated to cinema appreciation and media education. Across more than 60 analytical reviews, she deconstructs complex film theory, visual narrative structures, and technical cinematography for a national audience.",
        "Her broader broadcasting portfolio includes hosting for Liyasi TV, leading corporate podcasts, freelance presentation, and serving as an elite compere for high-profile corporate and public events.",
      ],
      image: "tv-studio",
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship & Digital Strategy",
      paragraphs: [
        "As the Founder and Director of Lawanya Events & Digital, Nisangi leads a dynamic team of young creatives to deliver bespoke event management, end-to-end digital marketing, and premium media production solutions.",
        "By integrating cinematic narrative techniques with data-driven marketing strategies, the agency helps brands, corporations, and individuals articulate their unique stories with commercial clarity and emotional resonance.",
      ],
      image: "creative-team",
    },
    {
      id: "vision",
      title: "Educational Philanthropy & Vision",
      paragraphs: [
        "Deeply committed to the progress of Sri Lanka’s creative industries, Nisangi serves as an Assistant Lecturer, channeling her industry experience back into academia. A proud product of the nation’s free education system, she views mentorship as a profound societal responsibility.",
      ],
      quote:
        "I have been privileged to learn through a system built by society. Consequently, I am dedicated to returning that value—democratizing knowledge, cultivating opportunities, and empowering the next generation of creative leaders.",
      after:
        "This ethos drives her upcoming digital educational platform on YouTube, designed to provide accessible, practical insights into Film Studies, Entertainment Marketing, Brand Communication, and Media Production for aspiring professionals.",
      image: "lecture",
    },
  ] satisfies {
    id: string;
    title: string;
    paragraphs: string[];
    quote?: string;
    after?: string;
    image: ImageKey;
  }[],
  journey: [
    { place: "Kandy", detail: "Born in the historic hill capital" },
    { place: "Pushpadana Girls’ College", detail: "Where the path into mass communication began" },
    { place: "Kandurata FM", detail: "Radio presenter — the first microphone" },
    { place: "University of Kelaniya", detail: "B.A. (Hons) Film & Television Studies, First Class" },
    { place: "Wijeya Graphics", detail: "Diploma in Multimedia" },
    { place: "iTV · “Film Reading”", detail: "Host of a flagship cinema-appreciation programme" },
    { place: "Lawanya Events & Digital", detail: "Founder & Director" },
    { place: "Academia", detail: "Assistant Lecturer · reading for an MBM (Marketing)" },
    { place: "YouTube", detail: "An educational platform for aspiring creatives — upcoming" },
  ],
  coreExpertise: [
    {
      area: "Broadcasting & Media",
      skills: ["Television Presenting", "Voice Architecture & Narration", "Scriptwriting", "Creative Direction"],
    },
    {
      area: "Strategy & Marketing",
      skills: ["Entertainment Marketing", "Digital Growth Strategy", "Brand Communication", "Content Ecosystem Design"],
    },
    {
      area: "Events & Education",
      skills: ["Corporate Event Architecture", "Higher Education Instruction", "Workshop Facilitation", "Public Speaking"],
    },
  ],
  areasOfExpertise: [
    "Television Presenting",
    "Event Hosting & Moderation",
    "Film & Television Studies",
    "Entertainment Marketing",
    "Digital Marketing Strategy",
    "Brand Communication",
    "Voice Over & Narration",
    "Script Writing",
    "Creative Production",
    "Media Education & Training",
    "Event Planning & Management",
    "Content Creation & Storytelling",
  ],
  credentials: [
    { short: "MBM", badge: "Reading", title: "Master of Business Management (Marketing)", detail: "Reading · University of Kelaniya" },
    { short: "B.A.", badge: "First Class", title: "B.A. (Hons) in Film and Television Studies", detail: "First Class (GPA 3.76) · University of Kelaniya" },
    { short: "Dip.", badge: "Multimedia", title: "Diploma in Multimedia", detail: "Wijeya Graphics, Sri Lanka" },
  ],
} as const;
