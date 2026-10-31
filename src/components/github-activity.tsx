"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icons";

interface GithubActivityProps {
  username: string;
}

const YEAR = new Date().getFullYear();
const INITIAL_MONTH = 5;

const theme = {
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

function monthFraction(month: number) {
  const start = new Date(YEAR, 0, 1).getTime();
  const target = new Date(YEAR, month, 1).getTime();
  const end = new Date(YEAR + 1, 0, 1).getTime();
  return (target - start) / (end - start);
}

const JUMPS = [
  { label: "Jan", month: 0 },
  { label: "Jul", month: 6 },
  { label: "Now", month: -1 },
];

export function GithubActivity({ username }: GithubActivityProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const didInitialScroll = useRef(false);
  const { resolvedTheme } = useTheme();

  // hydration mismatch se bachne ke liye
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const colorScheme = resolvedTheme === "light" ? "light" : "dark";

  const scrollToMonth = useCallback((month: number, smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    const left =
      month === -1
        ? el.scrollWidth
        : Math.max(0, monthFraction(month) * el.scrollWidth - 24);
    el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  }, []);

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
  }, [scrollToMonth, mounted]);

  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      {/* header */}
      <div className='flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3'>
        <a
          href={`https://github.com/${username}`}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-green-500'
        >
          <Icons.github className='size-4' />
          @{username}
          <ArrowUpRight className='size-3.5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-500' />
        </a>

        <div className='flex items-center gap-1 rounded-md border border-border bg-muted p-0.5'>
          {JUMPS.map((jump) => (
            <button
              key={jump.label}
              type='button'
              onClick={() => scrollToMonth(jump.month)}
              className='rounded px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-background hover:text-green-500'
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
          className='overflow-x-auto px-4 py-4 [scrollbar-width:thin]'
        >
          <div ref={contentRef} className='min-w-max pr-2 text-muted-foreground'>
            {mounted && (
              <GitHubCalendar
                username={username}
                year={YEAR}
                theme={theme}
                colorScheme={colorScheme}
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
                style={{
                  color: colorScheme === "dark" ? "#a1a1aa" : "#52525b",
                }}
              />
            )}
          </div>
        </div>

        {/* edge fades */}
        <div className='pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-card to-transparent' />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-card to-transparent' />
      </div>

      {/* footer */}
      <div className='flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[11px] text-muted-foreground'>
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