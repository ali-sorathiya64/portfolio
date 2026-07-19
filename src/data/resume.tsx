import { Icons, IconProps } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";

type CustomIcon = (props: IconProps) => JSX.Element;

interface SocialLink {
  name: string;
  url: string;
  icon: CustomIcon;
  navbar: boolean;
}

interface ContactType {
  email: string;
  tel: string;
  social: Record<string, SocialLink>;
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface DataType {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: SkillCategory[];
  navbar: any[];
  contact: ContactType;
  work: any[];
  education: any[];
  projects: any[];
  resumeUrl: string;
}

export const DATA: DataType = {
  name: "Ali Sorathiya",
  initials: "AS",
  url: "",
  location: "Gujarat, Junagadh, India",
  locationLink: "https://www.bknmu.edu.in/",
  description: "Backend Developer | Node.js, Nest.js, Spring Boot, LLMs & RAG",
  summary:
    "Backend Developer with experience in JavaScript/TypeScript, Node.js, Express.js, NestJS, Spring Boot, PostgreSQL, and MongoDB. I enjoy building REST APIs, authentication systems, backend applications, and working with databases. Familiar with React for integrating backend services and building full-stack applications, and have used AI-assisted workflows to accelerate frontend development. Currently exploring Generative AI technologies, including LLMs, RAG pipelines, vector databases, and AI-powered applications. Experienced with Docker, GitHub Actions, and CI/CD workflows through hands-on projects, while continuously improving my backend development skills.",
  avatarUrl: "/mine2.jpg",
  skills: [
    {
      category: "Languages",
      items: ["C", "JavaScript", "TypeScript", "Java","SQL"],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "NestJS",
        "Spring Boot",
        "Spring Data JPA",
        "Spring Security",
        "DTO",
      ],
    },
    {
      category: "Databases & Caching",
      items: ["MongoDB", "PostgreSQL", "Neon DB", "Redis", "Vector DB", "Pinecone"],
    },
    {
      category: "AI / Gen AI",
      items: ["Gen AI", "RAG", "LangChain", "LLM integration", "Claude"],
    },
    {
      category: "Messaging",
      items: ["RabbitMQ"],
    },
    {
      category: "Frontend",
      items: ["React.js", "Tailwind CSS", "Shadcn/UI", "Framer Motion", "Clerk"],
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "GitHub Actions", "CI/CD", "AWS (Basics)", "Vercel", "Render"],
    },
    {
      category: "API & Docs",
      items: ["Swagger", "Postman"],
    },
    {
      category: "Version Control",
      items: ["Git", "GitHub"],
    },
  ],
  resumeUrl: "/as_resume.pdf",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "sorathiyaali97@gmail.com",
    tel: "7990363513",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/ali-sorathiya64",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ali-sorathiya-882b22397/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/ali_sorathiya",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "sorathiyaali97@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [],
  education: [
    {
      school: "BKNMU",
      href: "https://www.bknmu.edu.in/",
      degree: "Bachelor of computer application",
      logoUrl: "/logo0.png",
      start: "July 2023",
      end: "March 2026",
    },
  ],
  projects: [
    {
      title: "QuickAi – AI Content Creation Platform",
      href: "https://quick-ai-studio-saas.vercel.app/",
      dates: "2026",
      active: true,
      description:
        "QuickAi is a powerful AI-driven content creation platform that enables users to write articles, generate images, remove backgrounds/objects, and summarize documents in seconds. It includes features like AI Article Writer, Blog Title Generator, Image Generation, Resume Review, Background/Object Removal, and more. The platform also provides testimonials, pricing plans, and newsletter subscription to create a complete SaaS experience.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Cloudinary",
        "Clerk",
        "PostgreSQL",
        "Neon DB",
        "PreBuilt UI",
        "Gemini API",
      ],
      links: [
        {
          type: "Link",
          href: "https://quick-ai-studio-saas.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/ali-sorathiya64/multi-ai-SaaS-app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/quick.png",
    },
    {
      title: "TripAI – AI-Powered Travel Itinerary Generator",
      href: "https://travel-itinerary-generator-ai.vercel.app/",
      dates: "2026",
      active: true,
      description:
        "A MERN-based app that lets users upload travel booking documents (flight tickets, hotel bookings) and automatically generates a structured AI-powered itinerary using OCR + LLM extraction. Includes JWT auth with OTP verification, drag-and-drop document upload, OCR (Tesseract.js) + PDF parsing, AI itinerary generation via OpenRouter, shareable public itinerary links, and client-side PDF export.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Auth",
        "Tesseract.js",
        "Cloudinary",
        "OpenRouter",
      ],
      links: [
        {
          type: "Link",
          href: "https://travel-itinerary-generator-ai.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/ali-sorathiya64/ai-travel-itinerary-generator/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/dashboard.jpg",
    },
    {
      title: "AI Resume Reviewer Agent",
      dates: "2026",
      active: true,
      description:
        "A backend RAG (Retrieval-Augmented Generation) service that analyzes resumes and generates recruiter-style feedback instead of a plain summary. Converts resume content into vector embeddings, performs semantic search over Pinecone to retrieve relevant context, then sends it to Google Gemini for detailed evaluation — including ATS optimization suggestions, technical skill analysis, strengths/weaknesses breakdown, and auto-generated interview questions.",
      technologies: [
        "TypeScript",
        "Node.js",
        "Google Gemini API",
        "Langchain",
        "Pinecone",
        "RAG",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ali-sorathiya64/YOUR_REPO_NAME",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/workflow.jpg",
    },
    {
      title: "Fitness Tracker – Spring Boot Monolith",
      dates: "2026",
      active: true,
      description:
        "A Spring Boot monolith backend for tracking fitness activities and generating personalized recommendations. Includes user authentication with Spring Security, activity logging (type, duration, calories burned), a recommendation engine tied to logged activities, and PostgreSQL (Neon DB) persistence via Spring Data JPA. Dockerized with Swagger-documented REST endpoints.",
      technologies: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "Spring Data JPA",
        "PostgreSQL",
        "Neon Db",
        "Docker",
        "Swagger",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/ali-sorathiya64/YOUR_REPO_NAME",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/swagger-api.jpg",
    },
    {
      title: "MediConnect – AI-Powered Healthcare Platform",
      href: "https://medi-connect-ai-powered-healthcare.vercel.app/",
      dates: "2026",
      active: true,
      description:
        "MediConnect is an advanced healthcare platform designed to simplify access to medical services with AI-powered health insights, patient portals, and real-time hospital search. The system offers 24/7 support, predictive analytics, secure data handling, appointment management, and direct communication with healthcare providers. Built to scale from small clinics to large hospitals, MediConnect delivers a modern, user-friendly healthcare experience for both patients and professionals.",
      technologies: [
        "Next.js",
        "Supabase",
        "Tailwind CSS",
        "Gemini API",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Link",
          href: "https://medi-connect-ai-powered-healthcare.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/ali-sorathiya64/MediConnect-AI-Powered-Healthcare-Platform",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/secondproject.png",
    },
    {
      title: "Real-Time Chat Application",
      href: "https://full-stack-chat-app-i7co.onrender.com/",
      dates: "2025",
      active: true,
      description:
        "A modern, fast and secure real-time chat application featuring one-to-one messaging, group chats, online presence, typing indicators, message editing, and media sharing. Built with a scalable architecture and real-time updates using WebSockets, the app delivers a seamless, WhatsApp-like messaging experience. It also includes authentication, user profiles, read receipts, and a clean, mobile-friendly UI to ensure smooth communication across all devices.",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Cloudinary",
        "Tailwind CSS",
        "Daisi UI",
        "JWT Auth",
      ],
      links: [
        {
          type: "Link",
          href: "https://full-stack-chat-app-i7co.onrender.com/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/ali-sorathiya64/Full_stack_chat_app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/3.jpg",
    },
  ],
};