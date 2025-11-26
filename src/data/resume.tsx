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

interface DataType {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: string[];
  navbar: any[];
  contact: ContactType;
  work: any[];
  education: any[];
  projects: any[];
  resumeUrl:string;
}

export const DATA: DataType = {
  name: "Ali Sorathiya",
  initials: "AS",
  url: "", // Added for build fix
  location: "Gujarat, Junagadh, India",
  locationLink: "https://www.bknmu.edu.in/",
  description: "Full-stack web developer,<br />and tech enthusiast.",
  summary:
"I’m a MERN stack developer with a passion for building dynamic and responsive web applications. Lately, I’ve started exploring Java and Spring Boot to strengthen my backend skills and broaden my development expertise. I enjoy learning new technologies, solving problems, and building projects that combine creativity with functionality.",  avatarUrl: "/image11.jpg",
  skills: [
    "HTML",
    "CSS",
    "Javascript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "ShadcnUI",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Clerk",
    "Java",
    "JDBC","Git/GitHub",
    "Vercel",
    "Postman",
    "VS Code",
  ],
  resumeUrl: "/ali-resume.pdf",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },

    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "sorathiyaali97@gmail.com",
    tel: "+123456789",
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

  work: [
    {
      company: "Tech Solutions Inc.",
      href: "https://techsolutions.example.com",
      position: "Junior Web Developer",
    }
  ],
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
    dates: "2025",
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
      "MongoDB",
      "PreBuilt UI",
      "Gemini API"
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
    title: "MediConnect – AI-Powered Healthcare Platform",
    href: "https://medi-connect-ai-powered-healthcare.vercel.app/",
    dates: "2025",
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