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

const BLUR_FADE_DELAY = 0.04;

// Categories with fewer skills than this just look repetitive/odd when
// marquee'd (you only ever see the same 2-3 names loop past). Below this
// threshold we render a plain static row instead of scrolling it.
const MIN_ITEMS_FOR_MARQUEE = 5;
// Seconds of scroll time per chip — keeps visual speed consistent across
// rows regardless of how many skills a category has.
const SECONDS_PER_CHIP = 2.2;

function buildMarqueeItems(items: string[]) {
  // duplicate the list so translateX(-50%) loops seamlessly
  const full = [...items, ...items];
  const duration = Math.round(items.length * SECONDS_PER_CHIP);
  return { full, duration };
}

function SkillChip({ skill }: { skill: string }) {
  return (
    <span className='shrink-0 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-200 transition-colors hover:border-green-400 hover:text-green-400'>
      {skill}
    </span>
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
        <div className='flex min-h-0 flex-col gap-y-4'>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className='text-xl font-bold'>Skills</h2>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
            <div className='rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-lg'>
              {/* fake terminal titlebar */}
              <div className='flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900'>
                <span className='size-2.5 rounded-full bg-red-500' />
                <span className='size-2.5 rounded-full bg-yellow-500' />
                <span className='size-2.5 rounded-full bg-green-500' />
                <span className='ml-3 text-xs font-mono text-zinc-500'>
                  {DATA.name.toLowerCase().replace(" ", "-")}@portfolio: ~/skills
                </span>
              </div>

              <div className='px-4 pt-4 pb-2 font-mono text-xs'>
                <span className='text-zinc-600'>$</span>{" "}
                <span className='text-green-400'>cat ./stack --all</span>
              </div>

              <div className='flex flex-col gap-4 pb-6 pt-2'>
                {DATA.skills.map((group, groupId) => {
                  const isMarquee = group.items.length >= MIN_ITEMS_FOR_MARQUEE;

                  return (
                    <div key={group.category} className='flex flex-col gap-1.5'>
                      <div className='px-4 font-mono text-[11px] uppercase tracking-wider text-zinc-500'>
                        // {group.category}
                      </div>

                      {isMarquee ? (
                        (() => {
                          const direction = groupId % 2 === 0 ? "marquee-left" : "marquee-right";
                          const { full, duration } = buildMarqueeItems(group.items);

                          return (
                            <div
                              className='relative overflow-hidden'
                              style={{
                                WebkitMaskImage:
                                  "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
                                maskImage:
                                  "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
                              }}
                            >
                              <div
                                className='marquee-row flex w-max gap-2 px-4'
                                style={{
                                  animationName: direction,
                                  animationDuration: `${duration}s`,
                                  animationTimingFunction: "linear",
                                  animationIterationCount: "infinite",
                                }}
                              >
                                {full.map((skill, i) => (
                                  <SkillChip key={`${skill}-${i}`} skill={skill} />
                                ))}
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className='flex flex-wrap gap-2 px-4'>
                          {group.items.map((skill) => (
                            <SkillChip key={skill} skill={skill} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className='px-4 pb-4 font-mono text-xs text-zinc-600'>
                <span className='text-zinc-600'>$</span>{" "}
                <span className='animate-pulse'>▍</span>
              </div>
            </div>
          </BlurFade>
        </div>

        <style>{`
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .marquee-row:hover {
            animation-play-state: paused;
          }
        `}</style>
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