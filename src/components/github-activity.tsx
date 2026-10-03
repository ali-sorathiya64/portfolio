"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { ArrowUpRight } from "lucide-react";
import { Icons } from "@/components/icons";

interface GithubActivityProps {
  username: string;
}

const YEAR = new Date().getFullYear();

// 0 = Jan, 5 = Jun. Graph first-view me is month se start hoga.
// User left scroll karke Jan tak ja sakta hai.
const INITIAL_MONTH = 5;

const theme = {
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

// month ka approximate horizontal position (0 - 1) ginta hai
function monthFraction(month: number) {
  const start = new Date(YEAR, 0, 1).getTime();
  const target = new Date(YEAR, month, 1).getTime();
  const end = new Date(YEAR + 1, 0, 1).getTime();
  return (target - start) / (end - start);
}

const JUMPS = [
  { label: "Jan", month: 0 },
  { label: "Jun", month: 5 },
  { label: "Now", month: -1 },
];

export function GithubActivity({ username }: GithubActivityProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const didInitialScroll = useRef(false);

  const scrollToMonth = useCallback((month: number, smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    const left =
      month === -1
        ? el.scrollWidth
        : Math.max(0, monthFraction(month) * el.scrollWidth - 24);
    el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Calendar data async load hota hai, isliye width badalne par ek baar
  // initial scroll karte hain (user ko disturb nahi karte baad me).
  useEffect(() => {
    const content = contentRef.current;
    const el = scrollRef.current;
    if (!content || !el) return;

    const observer = new ResizeObserver(() => {
      if (didInitialScroll.current) return;
      if (el.scrollWidth > el.clientWidth + 10) {
        scrollToMonth(INITIAL_MONTH, false);
        didInitialScroll.current = true;
      }
    });

    observer.observe(content);
    return () => observer.disconnect();
  }, [scrollToMonth]);

  return (
    <div className='overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 to-zinc-900/30'>
      {/* header */}
      <div className='flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 px-4 py-3'>
        <a
          href={`https://github.com/${username}`}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex items-center gap-2 text-sm font-medium text-zinc-200 transition-colors hover:text-green-400'
        >
          <Icons.github className='size-4' />
          @{username}
          <ArrowUpRight className='size-3.5 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-400' />
        </a>

        <div className='flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-950/60 p-0.5'>
          {JUMPS.map((jump) => (
            <button
              key={jump.label}
              type='button'
              onClick={() => scrollToMonth(jump.month)}
              className='rounded px-2 py-0.5 font-mono text-[11px] text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-green-400'
            >
              {jump.label}
            </button>
          ))}
        </div>
      </div>

      {/* graph */}
      <div className='relative'>
        <div
          ref={scrollRef}
          className='overflow-x-auto px-4 py-4 [scrollbar-color:#27272a_transparent] [scrollbar-width:thin]'
        >
          {/* min-w-max: graph kabhi squeeze nahi hoga, scroll hi hoga */}
          <div ref={contentRef} className='min-w-max pr-2'>
            <GitHubCalendar
              username={username}
              year={YEAR}
              theme={theme}
              colorScheme='dark'
              blockSize={12}
              blockMargin={4}
              blockRadius={3}
              fontSize={12}
              showWeekdayLabels
              labels={{
                totalCount: `{{count}} contributions in ${YEAR}`,
              }}
              renderBlock={(block, activity) =>
                React.cloneElement(block, {
                  children: (
                    <title>{`${activity.count} contributions on ${activity.date}`}</title>
                  ),
                })
              }
              style={{ color: "#a1a1aa" }}
            />
          </div>
        </div>

        {/* edge fades: hint dete hain ki side me aur content hai */}
        <div className='pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-zinc-900/90 to-transparent' />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-zinc-900/90 to-transparent' />
      </div>

      {/* footer */}
      <div className='flex items-center justify-between border-t border-zinc-800/80 px-4 py-2 font-mono text-[11px] text-zinc-500'>
        <span>Jan – Dec {YEAR}</span>
        <span className='flex items-center gap-1.5'>
          <span className='relative flex size-1.5'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
            <span className='relative inline-flex size-1.5 rounded-full bg-green-500' />
          </span>
          live from GitHub
        </span>
      </div>
    </div>
  );
}