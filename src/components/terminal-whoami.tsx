"use client";

import { useEffect, useState, type ReactNode } from "react";

const COMMAND = "curl https://ali.dev/api/v1/whoami";

const RESPONSE_LINES = [
  "{",
  '  "name": "Ali Sorathiya",',
  '  "role": "Backend Developer",',
  '  "stack": ["Node.js", "Nest.js", "Spring Boot", "PostgreSQL"],',
  '  "focus": "LLMs, RAG pipelines, vector search",',
  '  "based_in": "Gujarat, India",',
  '  "shipped_projects": 7',
  "}",
];

function renderValue(raw: string): ReactNode {
  const trailingComma = raw.endsWith(",");
  const value = trailingComma ? raw.slice(0, -1) : raw;
  let node: ReactNode;

  if (value.startsWith('"')) {
    node = <span className="text-amber-300">{value}</span>;
  } else if (value.startsWith("[")) {
    node = <span className="text-emerald-400">{value}</span>;
  } else if (/^\d+$/.test(value)) {
    node = <span className="text-purple-400">{value}</span>;
  } else {
    node = <span className="text-zinc-300">{value}</span>;
  }

  return (
    <>
      {node}
      {trailingComma && <span className="text-zinc-500">,</span>}
    </>
  );
}

function highlightLine(line: string, key: number) {
  if (line.trim() === "{" || line.trim() === "}") {
    return (
      <div key={key} className="text-zinc-500">
        {line}
      </div>
    );
  }

  const keyMatch = line.match(/^(\s*)"([a-zA-Z_]+)":\s*(.*)$/);
  if (!keyMatch) {
    return (
      <div key={key} className="text-zinc-500">
        {line}
      </div>
    );
  }

  const [, indent, propertyKey, rest] = keyMatch;
  return (
    <div key={key}>
      <span>{indent}</span>
      <span className="text-sky-400">&quot;{propertyKey}&quot;</span>
      <span className="text-zinc-500">: </span>
      {renderValue(rest)}
    </div>
  );
}

export function TerminalWhoami() {
  const [typedCommand, setTypedCommand] = useState("");
  const [commandDone, setCommandDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  // type out the command character by character
  useEffect(() => {
    if (typedCommand.length < COMMAND.length) {
      const t = setTimeout(() => {
        setTypedCommand(COMMAND.slice(0, typedCommand.length + 1));
      }, 32);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCommandDone(true), 300);
    return () => clearTimeout(t);
  }, [typedCommand]);

  // stream the JSON response line by line once the command finishes
  useEffect(() => {
    if (!commandDone || visibleLines >= RESPONSE_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 90);
    return () => clearTimeout(t);
  }, [commandDone, visibleLines]);

  const responseComplete = visibleLines >= RESPONSE_LINES.length;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-500" />
        <span className="size-2.5 rounded-full bg-yellow-500" />
        <span className="size-2.5 rounded-full bg-green-500" />
        <span className="ml-3 font-mono text-xs text-zinc-500">
          ali@portfolio: ~
        </span>
      </div>

      <div className="px-4 py-4 font-mono text-[13px] leading-relaxed">
        <div>
          <span className="text-zinc-600">$</span>{" "}
          <span className="text-green-400">{typedCommand}</span>
          {!commandDone && (
            <span className="animate-pulse text-zinc-300">▍</span>
          )}
        </div>

        {commandDone && (
          <div className="mt-2">
            {RESPONSE_LINES.slice(0, visibleLines).map((line, i) =>
              highlightLine(line, i)
            )}
            {responseComplete && (
              <div className="mt-1 flex items-center gap-1.5 text-zinc-600">
                <span>$</span>
                <span className="animate-pulse">▍</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}