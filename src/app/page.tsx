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
import {
  Code2,
  Server,
  Database,
  Sparkles,
  Radio,
  Layout,
  Cloud,
  FileJson,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

// Small icon + accent colour per skill category — purely decorative,
// no external images, no network calls.
const CATEGORY_META: Record<string, { icon: LucideIcon; accent: string }> = {
  Languages: { icon: Code2, accent: "from-yellow-500/10 to-transparent" },
  Backend: { icon: Server, accent: "from-green-500/10 to-transparent" },
  "Databases & Caching": { icon: Database, accent: "from-blue-500/10 to-transparent" },
  "AI / Gen AI": { icon: Sparkles, accent: "from-purple-500/10 to-transparent" },
  Messaging: { icon: Radio, accent: "from-orange-500/10 to-transparent" },
  Frontend: { icon: Layout, accent: "from-cyan-500/10 to-transparent" },
  "DevOps & Cloud": { icon: Cloud, accent: "from-sky-500/10 to-transparent" },
  "API & Docs": { icon: FileJson, accent: "from-pink-500/10 to-transparent" },
  "Version Control": { icon: GitBranch, accent: "from-red-500/10 to-transparent" },
};

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
        <div className='flex min-h-0 flex-col gap-y-4'>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className='text-xl font-bold'>Skills</h2>
          </BlurFade>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {DATA.skills.map((group, groupId) => {
              const meta = CATEGORY_META[group.category];
              const Icon = meta?.icon ?? Code2;

              return (
                <BlurFade
                  key={group.category}
                  delay={BLUR_FADE_DELAY * 10 + groupId * 0.08}
                >
                  <div
                    className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br ${
                      meta?.accent ?? "from-muted/40 to-transparent"
                    } p-4 transition-all duration-300 hover:border-foreground/30 hover:shadow-md`}
                  >
                    <div className='flex items-center gap-2 mb-3'>
                      <div className='flex items-center justify-center size-7 rounded-md bg-foreground text-background shrink-0'>
                        <Icon className='size-4' />
                      </div>
                      <h3 className='text-sm font-semibold'>{group.category}</h3>
                    </div>

                    <div className='flex flex-wrap gap-1.5'>
                      {group.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant='secondary'
                          className='transition-transform duration-150 hover:scale-105 hover:bg-foreground hover:text-background'
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>
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