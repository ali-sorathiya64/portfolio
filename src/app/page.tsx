import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import { TerminalWhoami } from "@/components/terminal-whoami";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className='flex flex-col min-h-[100dvh] space-y-10'>
      <section id='hero'>
        <div className='mx-auto w-full max-w-2xl space-y-6'>
          <div className='flex items-center gap-4'>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className='size-14 border shrink-0'>
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>

            <div className='space-y-1'>
              <BlurFadeText
                delay={BLUR_FADE_DELAY * 2}
                className='text-3xl font-bold tracking-tighter sm:text-4xl'
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <div className='flex items-center gap-1.5 font-mono text-xs text-zinc-500'>
                  <span className='relative flex size-2'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
                    <span className='relative inline-flex size-2 rounded-full bg-green-500' />
                  </span>
                  open to backend / full-stack roles
                </div>
              </BlurFade>
            </div>
          </div>

          <BlurFadeText
            className='max-w-[560px] text-pretty text-muted-foreground md:text-lg'
            delay={BLUR_FADE_DELAY * 4}
            text={DATA.description}
          />

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className='flex flex-wrap gap-2'>
              <a href={DATA.resumeUrl} download>
                <Button className='gap-1.5 rounded-md'>
                  <Download className='size-3.5' />
                  Download Resume
                </Button>
              </a>
              <a href={`mailto:${DATA.contact.email}`}>
                <Button variant='outline' className='gap-1.5 rounded-md'>
                  <Mail className='size-3.5' />
                  Get in touch
                </Button>
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <TerminalWhoami />
          </BlurFade>
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

      <section id='work'>
        <div className='flex min-h-0 flex-col gap-y-3'>
          <BlurFade delay={BLUR_FADE_DELAY * 6.5}>
            <h2 className='text-xl font-bold'>Experience</h2>
          </BlurFade>

          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 7 + id * 0.05}
            >
              <ResumeCard
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id='skills'>
        <div className='flex min-h-0 flex-col gap-y-4'>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className='text-xl font-bold'>Tech Stack</h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 9.3}>
            <p className='max-w-[560px] text-sm text-muted-foreground'>
              Structured the way a request moves through a backend system — core services first, then data, AI, and infra underneath.
            </p>
          </BlurFade>

          <div className='relative flex flex-col'>
            {DATA.skills.map((group, groupId) => (
              <BlurFade
                key={group.category}
                delay={BLUR_FADE_DELAY * 10 + groupId * 0.08}
              >
                <div className='relative flex gap-4 pb-6 last:pb-0'>
                  {/* connector rail */}
                  <div className='flex flex-col items-center'>
                    <span className='flex size-2.5 shrink-0 rounded-full border-2 border-green-500 bg-background' />
                    {groupId !== DATA.skills.length - 1 && (
                      <span className='w-px flex-1 bg-zinc-800' />
                    )}
                  </div>

                  <div className='flex-1 pb-1'>
                    <div className='mb-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500'>
                      {group.category}
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className='rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-green-500/60 hover:text-green-400'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
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