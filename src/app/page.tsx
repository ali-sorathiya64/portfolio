import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

// Maps skill name -> simple-icons slug + brand color.
// If a skill isn't in this map (or the icon fails to load), it just falls
// back to plain text — nothing breaks.
const SKILL_ICONS: Record<string, { slug: string; color: string }> = {
  JavaScript: { slug: "javascript", color: "F7DF1E" },
  TypeScript: { slug: "typescript", color: "3178C6" },
  Java: { slug: "openjdk", color: "ED8B00" },
  "Node.js": { slug: "nodedotjs", color: "339933" },
  "Express.js": { slug: "express", color: "808080" },
  NestJS: { slug: "nestjs", color: "E0234E" },
  "Spring Boot": { slug: "springboot", color: "6DB33F" },
  "Spring Security": { slug: "springsecurity", color: "6DB33F" },
  MongoDB: { slug: "mongodb", color: "47A248" },
  PostgreSQL: { slug: "postgresql", color: "4169E1" },
  "Neon DB": { slug: "neon", color: "00E599" },
  Redis: { slug: "redis", color: "DC382D" },
  Pinecone: { slug: "pinecone", color: "1C17FF" },
  RabbitMQ: { slug: "rabbitmq", color: "FF6600" },
  "React.js": { slug: "react", color: "61DAFB" },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4" },
  "Shadcn/UI": { slug: "shadcnui", color: "808080" },
  Clerk: { slug: "clerk", color: "6C47FF" },
  Docker: { slug: "docker", color: "2496ED" },
  "GitHub Actions": { slug: "githubactions", color: "2088FF" },
  "AWS (Basics)": { slug: "amazonaws", color: "FF9900" },
  Vercel: { slug: "vercel", color: "808080" },
  Render: { slug: "render", color: "46E3B7" },
  Swagger: { slug: "swagger", color: "85EA2D" },
  Postman: { slug: "postman", color: "FF6C37" },
  Git: { slug: "git", color: "F05032" },
  GitHub: { slug: "github", color: "808080" },
};

function SkillBadge({ skill }: { skill: string }) {
  const icon = SKILL_ICONS[skill];

  return (
    <Badge className="flex items-center gap-1.5 py-1.5 px-2.5">
      {icon && (
        <img
          src={`https://cdn.simpleicons.org/${icon.slug}/${icon.color}`}
          alt=""
          className="size-3.5 shrink-0"
          loading="lazy"
          onError={(e) => {
            // if the icon 404s for any reason, just hide it — text still shows
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      {skill}
    </Badge>
  );
}

export default function Page() {
  return (
    <main className='flex flex-col min-h-[100dvh] space-y-10'>
      <section id='hero'>
        <div className='mx-auto w-full max-w-2xl space-y-8'>
          <div className='gap-2 flex justify-between'>
            <div className='flex-col flex flex-1 space-y-1.5'>
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />

              <BlurFadeText
                className='max-w-[600px] md:text-xl'
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />

              {/* Download Resume Button */}
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <a href={DATA.resumeUrl} download>
                  <Button className='mt-4'>Download Resume</Button>
                </a>
              </BlurFade>
            </div>

            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className='size-28 border'>
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id='about'>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className='text-xl font-bold'>About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className='prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert'>
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      <section id='skills'>
        <div className='flex min-h-0 flex-col gap-y-5'>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className='text-xl font-bold'>Skills</h2>
          </BlurFade>

          {DATA.skills.map((group, groupId) => (
            <div key={group.category} className='flex flex-col gap-y-2'>
              <BlurFade delay={BLUR_FADE_DELAY * 10 + groupId * 0.1}>
                <h3 className='text-sm font-semibold text-muted-foreground'>
                  {group.category}
                </h3>
              </BlurFade>
              <div className='flex flex-wrap gap-1.5'>
                {group.items.map((skill, id) => (
                  <BlurFade
                    key={skill}
                    delay={BLUR_FADE_DELAY * 10 + groupId * 0.1 + id * 0.03}
                  >
                    <SkillBadge skill={skill} />
                  </BlurFade>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id='projects'>
        <div className='space-y-12 w-full py-12'>
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm'>
                  My Projects
                </div>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Check out my latest work
                </h2>
                <p className='text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto'>
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id='education'>
        <div className='flex min-h-0 flex-col gap-y-3'>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className='text-xl font-bold'>Education</h2>
          </BlurFade>

          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id='contact'>
        <div className='grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12'>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className='space-y-3'>
              <div className='inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm'>
                Contact
              </div>

              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Get in Touch
              </h2>

              <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Want to chat? Feel free to reach out to me anytime via{" "}
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className='text-blue-500 hover:underline'
                >
                  Email
                </a>
                .
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}