// ─────────────────────────────────────────────────────────────────────────
// Portfolio content for Kabir Batra.
// Verify the GitHub / LinkedIn handles below; they are best guesses.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  initials: "KB",
  name: "Kabir Batra",
  role: "Senior Software Engineer",
  location: "Gurugram, India",
  email: "imkabirbatra@gmail.com",
  phone: "+91 86054 06561",
  resumeUrl: "/resume.pdf",
  available: true,
  views: 448,
  tagline: [
    "Senior Software Engineer with 4+ years building everything from full-stack SaaS/B2C products to large-scale e-commerce platforms.",
    "Specializing in React, Next.js, TypeScript, and scalable micro-frontend/microservices architecture.",
    "Beyond the core stack, I’ve worked across product design, game development, 3D animations, graphic design, and built AI/ML projects long before LLMs were cool.",
  ],
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/kabirbatra03", icon: "github" },
  { label: "X", href: "https://x.com/KabirBatra_", icon: "x" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kabir-batra-b60004129/",
    icon: "linkedin",
  },
  { label: "Mail", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "Phone", href: "tel:+918605406561", icon: "phone" },
] as const;

export type Project = {
  name: string;
  date: string;
  description: string;
  stack: string[];
  hue: number; // amber-family hue for the generated preview tile
  image?: string;
  live?: string;
  paper?: string;
  researchGate?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    name: "Intelligent Negotiation Bot",
    date: "2021",
    description:
      "Built a machine-learning chatbot trained on the Craigslist Bargain Dataset to help sellers negotiate with buyers. The system uses three models: sentiment analysis for incoming messages and intent detection with chat context, dynamic price bidding/counter-bidding for offer settlement, and product-context reasoning to weigh pros and cons. The bot is initialized with product details and a target selling range (for example, $70-$100).",
    stack: ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "GitLab"],
    hue: 210,
    paper: "https://ieeexplore.ieee.org/document/9908710/",
    researchGate:
      "https://www.researchgate.net/publication/364518185_Intelligent_Negotiation_Bot_using_Machine_Learning_Techniques",
    repo: "https://github.com/kabirbatra03/Intelligent-Negotiation-Bot",
  },
  {
    name: "HeartyyFresh - E-commerce Platform",
    date: "2022",
    description:
      "Built a e-commerce platform for Indian groceries in the US. Implemented cart management, Stripe payments, on demand ISR to scale 10,000+ dynamic product pages, SEO, and personalized user journeys while optimizing code and caching content to reach a 95+ Lighthouse performance score. ",
    stack: ["Next.js", "Firebase", "Stripe"],
    hue: 95,
    image: "/projects/heartyyfresh.png",
    live: "https://www.heartyyfresh.com/",
  },
  {
    name: "Coupons app",
    date: "2023",
    description:
      "Built an light weight PWA where shoppers scan shelf barcodes or QR codes to discover offers in real time and combine multiple coupons at checkout counter. Added offline-first service worker support for saved coupons, carts, and offer history, plus personalized deal recommendations and proxy-based microservices for enterprise campaign/coupons management and distribution workflows.",
    stack: ["React.js", "AWS Lambda", "AWS API Gateway", "AWS DynamoDB", "AWS S3"],
    hue: 52,
  },
  {
    name: "Internal Component Library",
    date: "2025",
    description:
      "Part of team building a component library and internal design system using composite patterns, shipping WCAG-compliant reusable components with theming, multilingual and localization support that improved consistency and sped up delivery across teams.",
    stack: ["React.js", "TypeScript", "Radix UI", "Shadcn UI", "Storybook", "Chromatic"],
    hue: 268,
  },
  {
    name: "Ticketing & automation platform",
    date: "2024",
    description:
      "Built a ticketing and workflow automation platform for internal operations. Delivered a modular ReactFlow drag-and-drop experience for cross-microservice automations, a custom Kanban system, scheduling views with React Big Calendar, RBAC-based collaboration, enterprise branding controls, and WCAG-compliant accessibility in a scalable micro-frontend architecture.",
    stack: ["React.js", "ReactFlow", "React Big Calendar"],
    hue: 34,
  },
  {
    name: "Expense Tracker",
    date: "2020",
    description:
      "Built a full stack website in PHP to track day-to-day expenses and manage personal finances, helping users understand spending patterns and plan limits accordingly. Implemented PHPMailer-based email services with Gmail SMTP configuration for transactional messaging in the project setup.",
    stack: ["PHP", "jQuery", "Ajax", "MySQL", "PHPMailer", "Apache Server"],
    hue: 18,
    image: "/projects/expense-tracker.png",
    repo: "https://github.com/kabirbatra03/Expense-Tracker",
  },
];

export type Experience = {
  company: string;
  role: string;
  type: string;
  period: string;
  summary: string;
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Radiansys Technologies",
    role: "Senior Software Engineer - Frontend",
    type: "Full-time · Gurugram",
    period: "07.2024 → Present",
    summary:
      "- Delivered 20+ complex web applications within strict timelines using React.js, Next.js, AWS, Vercel, and Firebase.\n- Co-led frontend architecture through complex platform migrations, designing a custom Webpack Module Federation setup with shared PostCSS layers to isolate styles across micro-frontends, reducing Tailwind CSS bundle sizes by 10x and eliminating style cascade conflicts.\n- Architected a highly scalable component library using Radix UI, Shadcn UI, and Base UI, enforcing strict WCAG accessibility, branding consistency, and multilingual localization.\n- Mentored and led an agile team of 5 engineers to deliver a high-performance drag-and-drop form builder integrated into text editors and dashboard widgets, with a dynamic rendering engine driven by compressed JSON schemas stored in AWS S3.\n- Built and deployed scalable asynchronous microservices on AWS Lambda, API Gateway, and DynamoDB, using AWS SQS queues and cron-driven workers to process, aggregate, and cache large-scale data migrations while securing endpoints with RBAC.\n- Streamlined code quality by establishing strict PR review guidelines, maintaining Storybook isolation environments, and automating visual regression workflows with Chromatic and unit test suites.\n",
    stack: ["React", "Next.js", "Module Federation", "AWS", "Storybook", "Vercel"],
  },
  {
    company: "Radiansys Technologies",
    role: "Software Engineer",
    type: "Full-time · Gurugram",
    period: "07.2022 → 06.2024",
    summary:
      "- Engineered a high-traffic grocery e-commerce platform from the ground up using Next.js, boosting organic search visibility with on-demand SSR and automated sitemap generation for 10,000+ dynamic product pages.\n- Eliminated cumulative layout shift (CLS) and reduced initial page load time through advanced image optimization pipelines, client-side caching with React Query, and strategic code-splitting, achieving a 95+ Lighthouse performance score.\n- Developed a dynamic workflow builder that enables operators to create and manage automations across internal platform microservices, built with a flowchart-based ReactFlow interface and deployed as a micro-frontend for modularity.\n- Built a Progressive Web App (PWA) for U.S. supermarket chains with offline access, in-app barcode scanning via service workers, cart-based recommendations, and QR code generation.\n- Led a team of developers to build a ticketing platform with a custom Kanban board bridging task management and live support operations, implementing RBAC, customizable branding, and accessibility compliance.",
    stack: ["Next.js", "React Query", "ReactFlow", "PWA"],
  },
  {
    company: "63 Moons Technologies",
    role: "Full Stack Development Intern",
    type: "Internship · Mumbai",
    period: "01.2022 → 06.2022",
    summary:
      "Implemented full-stack solutions aligned with project requirements using Express.js, React.js, and REST APIs. Contributed to debugging and testing workflows with Jest, documented backend APIs and deployment processes, and collaborated on scalable feature rollouts across web applications.",
    stack: ["Express.js", "Node.js", "React.js", "REST", "Jest"],
  },
  {
    company: "TouchType.ai",
    role: "Web Development Intern",
    type: "Internship · Mumbai",
    period: "02.2021 → 09.2021",
    summary:
      "Built interactive gamified typing-learning modules at TouchType.ai, guiding users through correct finger placement and keyboard posture with letter-by-letter practice flows. Developed animated web-based game scoreboards and gamification workflows using GSAP, Vanilla JavaScript, and CSS. Also engineered personalized user dashboards with React.js, FusionCharts, and Firebase for real-time progress tracking and engagement.",
    stack: ["JavaScript", "GSAP", "React.js", "FusionCharts", "Firebase", "CSS"],
  },
];

export const education = {
  degree: "B.E. Information Technology",
  school: "Ramrao Adik Institute of Technology",
  period: "2018 → 2022",
  detail: "CGPA 7.75 / 10 · Mumbai",
};

export type Publication = {
  title: string;
  description: string;
  links: { label: string; href: string; icon: "file" | "github" }[];
};

export const publications: Publication[] = [
  {
    title: "Intelligent Negotiation Bot",
    description:
      "A machine-learning bot for business negotiations, designed to engage customers and reach a win-win outcome for both parties. In this research, we proposed a three-layer architecture where the bot is initially provided with product descriptions and target selling ranges to understand product context and weigh pros and cons. The second layer focuses on intent classification and sentiment analysis throughout buyer–seller conversations, allowing the system to understand negotiation tone, buyer interest, and buyer's bargaining power. The third layer handles dynamic price bidding and counter-bidding strategies for offer settlement, adapting negotiation behavior based on contextual reasoning.\n\nThe framework was developed using Python, Scikit-learn, TensorFlow, and NLTK, where multiple machine learning algorithms including KNN, SVM, NN, and ANN were evaluated across different layers of the system, and the models with the best accuracy and performance metrics were selected for deployment",
    links: [
      {
        label: "IEEE",
        href: "https://ieeexplore.ieee.org/document/9908710/",
        icon: "file",
      },
      {
        label: "ResearchGate",
        href: "https://www.researchgate.net/publication/364518185_Intelligent_Negotiation_Bot_using_Machine_Learning_Techniques",
        icon: "file",
      },
      {
        label: "Semantic Scholar",
        href: "https://www.semanticscholar.org/paper/Intelligent-Negotiation-Bot-using-Machine-Learning-Batra-Nair/43e558c408fef659631573c1cbbf81f58decf5df",
        icon: "file",
      },
      {
        label: "Scribd",
        href: "https://www.scribd.com/document/758936789/Intelligent-Negotiation-Bot-using-Machine-Learning-Techniques-2",
        icon: "file",
      },
      {
        label: "Source",
        href: "https://github.com/kabirbatra03/Intelligent-Negotiation-Bot",
        icon: "github",
      },
    ],
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  platform: "Coursera" | "Udemy";
  date: string;
};

export const certificates: Certificate[] = [
  {
    title: "Advanced React",
    issuer: "Meta Inc.",
    platform: "Coursera",
    date: "03/2023",
  },
  {
    title: "Machine Learning",
    issuer: "Stanford University",
    platform: "Coursera",
    date: "06/2021",
  },
  {
    title: "Introduction to Data Science",
    issuer: "University of Michigan",
    platform: "Coursera",
    date: "03/2021",
  },
  {
    title: "MERN Stack Front to Back",
    issuer: "Brad Traversy",
    platform: "Udemy",
    date: "01/2021",
  },
];

export const awards = [
  {
    title: "Excellence in Team Leadership",
    org: "Radiansys Technologies",
    year: "2025",
  },
  {
    title: "Outstanding Performer Award",
    org: "Radiansys Technologies",
    year: "2024",
  },
  {
    title: "Outstanding Performer Award",
    org: "Radiansys Technologies",
    year: "2023",
  },
  {
    title: "Outstanding Performer Award",
    org: "Radiansys Technologies",
    year: "2022",
  },
];

export const quote = "Start ugly. Finish legendary.";

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];
