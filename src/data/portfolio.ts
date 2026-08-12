export const personal = {
  name: "Mohan Sai Pujari",
  firstName: "Mohan",
  role: "Software Development Engineer",
  tagline: "Building scalable backend systems that power millions",
  summary:
    "Backend Engineer with 4+ years of experience designing and building scalable, distributed systems using Java, Go, Scala, and Python. Experienced in microservices, cloud-native applications, real-time event-driven systems, ETL pipelines, inventory platforms, and high-volume data processing.",
  email: "mohansai.pujari@gmail.com",
  phone: "+91 9703183308",
  location: "Bangalore, India",
  yearsOfExperience: "4+",
  company: "Recro (BigBasket)",
  domain: "Quick Commerce",
  links: {
    github: "https://github.com/mohansai-pujari",
    linkedin: "https://linkedin.com/in/mohansai-pujari",
    leetcode: "https://leetcode.com/u/mohansai_pujari",
    email: "mailto:mohansai.pujari@gmail.com",
    whatsapp: "https://wa.me/919703183308",
    instagram: "https://www.instagram.com/mohansai_pujari/",
  },
};

/** Local file: public/Mohan Sai Pujari_CV.pdf. Optional remoteUrl falls back to local if unreachable. */
export const resumeConfig = {
  fileName: "Mohan Sai Pujari_CV.pdf",
  /** Paste a public Google Drive (or other) link here. Leave empty to serve local file only. */
  remoteUrl:
    "https://drive.google.com/file/d/1bsBAoKZ26sU2J1_iVgl1p2TnaqaV8rjY/view?usp=sharing",
};

export const rotatingHighlights = [
  "4+ years of backend engineering experience",
  "Building scalable backend systems",
  "Crafting distributed microservices",
    "Quick Commerce & fulfillment platforms",
  "IoT pipelines processing millions of events",
];

export const experience = [
  {
    company: "Recro (BigBasket)",
    role: "Senior Software Engineer (Backend)",
    domain: "Quick Commerce",
    location: "Bangalore, India",
    period: "Nov 2025 — Jul 2026",
    highlights: [
      "Engineered backend services for BigBasket's high-scale Checkout Platform using Go, Java, Kafka, React.js, and Aerospike — checkout validations, fulfillment routing, and event-driven services.",
      "Implemented fraud controls for voucher abuse and fake account creation — device-ID tracking, rate limiting, and blocking to prevent abusive order patterns.",
      "Developed AI-assisted homepage banners and widgets using Cursor for a seamless user experience.",
      "Built a centralized Python and Frappe Helpdesk platform with SLA tracking and workflow automation, supporting 100K tickets/day while cutting third-party costs by 60%.",
      "Designed scalable Go-based microservices for Warehouse Management System workflows — inventory movement, rack-level stock tracking, and order orchestration across fulfillment networks.",
    ],
    tech: ["Go", "Java", "Kafka", "Aerospike", "Python", "Frappe", "React.js"],
  },
  {
    company: "Reliance Jio Platforms Ltd.",
    role: "Software Development Engineer II (Backend)",
    domain: "IoT",
    location: "Bangalore, India",
    period: "Jul 2022 — Nov 2025",
    highlights: [
      "Engineered scalable event-driven services using Java, Scala, Kafka, Cassandra, Redis, Spring Boot, and Elasticsearch — processing millions of IoT events daily.",
      "Architected a customized customer onboarding platform — configurable UI, device-specific data views, and independent report generation per customer.",
      "Built customizable notification and alert flows enabling users to set thresholds and analytics-based triggers for proactive monitoring.",
      "Reduced query latency from 70 ms to 10 ms and report generation time from 2 hours to 10 minutes through query and pipeline redesign.",
      "Architected a Scala-based analytics and reporting engine consuming IoT data from Cassandra, aggregating from Elasticsearch, with scheduled reports exported to AWS S3.",
    ],
    tech: ["Java", "Scala", "Kafka", "Cassandra", "Redis", "Spring Boot", "Elasticsearch", "AWS"],
  },
];

export const skillCategories = [
  {
    title: "Languages",
    skills: ["Java", "Scala", "Python", "Go", "SQL"],
    icon: "code",
  },
  {
    title: "Frameworks & Architecture",
    skills: ["Spring Boot", "JPA", "Spark", "REST APIs", "Microservices", "Kafka", "Frappe"],
    icon: "layers",
  },
  {
    title: "Databases & Caching",
    skills: ["MySQL", "MariaDB", "MongoDB", "Cassandra", "Elasticsearch", "Redis", "Aerospike"],
    icon: "database",
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "EC2", "S3", "RDS", "CloudWatch"],
    icon: "cloud",
  },
  {
    title: "Core & Tools",
    skills: ["System Design", "Distributed Systems", "ETL Pipelines", "Git", "Jenkins", "Cursor"],
    icon: "cpu",
  },
];

export const projects = [
  {
    title: "Document Processing & Data Ingestion",
    description:
      "Dockerized Streamlit app extracting structured data from PDF/Excel documents, generating Gemini-powered LLM summaries, and persisting outputs in MongoDB.",
    tech: ["Python", "MongoDB", "Docker", "Streamlit", "Gemini"],
    period: "Feb 2025 — Apr 2025",
    featured: true,
    github: null,
  },
  {
    title: "RAG Chatbot",
    description:
      "Streamlit-based RAG chatbot to interact with text documents and web content using LLM-powered retrieval.",
    tech: ["Python", "Streamlit", "LLM", "RAG"],
    github: "https://github.com/mohansai-pujari/rag-chatbot",
  },
  {
    title: "SocialMediaLite",
    description:
      "Real-time social media analytics using Java, Apache Ignite, and Kafka. Metrics are computed at the Ignite layer with Spring Boot APIs.",
    tech: ["Java", "Apache Ignite", "Kafka", "Spring Boot"],
    github: "https://github.com/mohansai-pujari/SocialMediaLite",
  },
  {
    title: "Movie Ticket Booking Service",
    description: "Backend service for movie ticket booking with scalable architecture patterns.",
    tech: ["Java", "Spring Boot", "Microservices"],
    github: "https://github.com/mohansai-pujari/movie-ticket-booking-service",
  },
  {
    title: "Usage-Based Billing Service",
    description: "Usage-based billing service handling metering, aggregation, and billing workflows.",
    tech: ["Java", "Spring Boot", "REST APIs"],
    github: "https://github.com/mohansai-pujari/usage-billing-service",
  },
  {
    title: "CSV HDFS Ingestion",
    description: "Scala-Spark data ingestion pipeline for processing CSV files into HDFS.",
    tech: ["Scala", "Spark", "HDFS"],
    github: "https://github.com/mohansai-pujari/csv-hdfs-ingestion",
  },
];

export const education = {
  institution: "National Institute of Technology, Calicut",
  institutionUrl: "https://nitc.ac.in/",
  degree: "Bachelor of Technology",
  field: "Electronics and Communication Engineering",
  period: "Aug 2018 — May 2022",
  cgpa: "6.79",
};

export const collegeActivities = [
  {
    org: "Team Aerounwired",
    subtitle: "Aeromodelling Club, NIT Calicut",
    roles: ["Member"],
    period: "2019 — 2022",
    description:
      "Part of NITC's aeromodelling club — designing, building, and flying planes, drones, and model rockets through workshops, projects, and competitions.",
    links: [
      { label: "Website", href: "https://www.aerounwired.org/" },
      { label: "Instagram", href: "https://www.instagram.com/club_aerounwired/" },
    ],
  },
  {
    org: "ECE Association",
    subtitle: "Department Association, NIT Calicut",
    roles: ["Member", "Event Coordinator"],
    period: "2019 — 2022",
    description:
      "Active member since 2019 and event coordinator since 2020, organizing department events, technical sessions, and student engagement activities.",
    links: [
      { label: "NIT Calicut", href: "https://nitc.ac.in/" },
      { label: "Instagram", href: "https://www.instagram.com/ecea_nitc/" },
    ],
  },
  {
    org: "Media Committee",
    subtitle: "NIT Calicut",
    roles: ["Member", "Photographer"],
    period: "2019 — 2022",
    description:
      "Captured campus events and institute moments as a committee photographer, supporting visual documentation across college activities.",
    links: [{ label: "NIT Calicut", href: "https://nitc.ac.in/" }],
  },
  {
    org: "Club Ignite",
    subtitle: "NIT Calicut",
    roles: ["Member"],
    period: "2021 — 2022",
    description:
      "Contributed to Club Ignite initiatives fostering innovation, entrepreneurship, and student-led projects on campus.",
    links: [{ label: "NIT Calicut", href: "https://nitc.ac.in/" }],
  },
];

export const professionalAchievements = [
  {
    title: "Employee of the Month",
    org: "BigBasket",
    date: "Jan 2026",
    detail: "Recognized for cutting costs by 90% through engineering excellence.",
    expandedDetail: [
      "Centralized helpdesk platform supporting 100K tickets/day",
      "Reduced third-party tooling costs by 60%",
      "Shipped scalable Go microservices for warehouse and checkout workflows",
    ],
  },
  {
    title: "A* Performance Rating",
    org: "Jio Platforms",
    date: "2025 — 2026",
    detail: "Consistently top-tier performance ratings across tenure.",
    expandedDetail: [
      "Highest performance band in consecutive review cycles",
      "Led IoT event pipelines processing millions of events daily",
      "Cut query latency from 70 ms to 10 ms through system redesign",
    ],
  },
  {
    title: "Beyond the Call of Duty",
    org: "Jio Platforms",
    date: "Jul 2025",
    detail: "Awarded for exceptional contributions beyond role expectations.",
    expandedDetail: [
      "Architected a Scala analytics engine across Cassandra and Elasticsearch",
      "Reduced report generation time from 2 hours to 10 minutes",
      "Owned end-to-end delivery beyond core team responsibilities",
    ],
  },
];

export const experienceSkillBubbles = [
  "Java",
  "Python",
  "Scala",
  "Go",
  "Microservices",
  "Kafka",
  "Distributed Systems",
  "MySQL",
  "NoSQL",
  "AWS",
];

export const stats = [
  { label: "Years of Experience", value: "4+" },
  { label: "Jio Platforms · Jul 2025", value: "Beyond the Call of Duty", longValue: true },
  { label: "IoT Events / Day", value: "Millions" },
  { label: "Tickets / Day", value: "100K" },
  { label: "Latency Reduction", value: "85%" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export const terminalCommands = [
  { cmd: "whoami", output: "mohan-sai-pujari" },
  { cmd: "cat role.txt", output: "Senior Backend Engineer @ BigBasket" },
  { cmd: "ls skills/", output: "java  go  scala  python  kafka  kubernetes" },
  { cmd: "echo $PASSION", output: "Building systems that scale." },
];
