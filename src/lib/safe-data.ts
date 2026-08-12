/** Small helpers so missing portfolio data never crashes the UI. */

export function asArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

export function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function asNonEmptyString(value: unknown, fallback = ""): string {
  const text = asString(value, fallback).trim();
  return text || fallback;
}

export function splitWords(text: unknown): string[] {
  const normalized = asString(text).trim();
  if (!normalized) return [];
  return normalized.split(/\s+/).filter(Boolean);
}

export function pickRandom<T>(items: T[] | null | undefined, fallback: T): T {
  const list = asArray(items);
  if (list.length === 0) return fallback;
  const index = Math.floor(Math.random() * list.length);
  return list[index] ?? fallback;
}

export function moduloIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export function extractLinkedInHandle(url: unknown): string {
  const linkedin = asString(url);
  if (!linkedin) return "linkedin.com/in/profile";

  return (
    linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").trim() ||
    "linkedin.com/in/profile"
  );
}

export function isValidUrl(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export type TerminalCommand = {
  cmd: string;
  output: string;
};

export function normalizeTerminalCommands(
  commands: Array<{ cmd?: string; output?: string }> | null | undefined,
): TerminalCommand[] {
  return asArray(commands)
    .map((entry) => ({
      cmd: asString(entry?.cmd),
      output: asString(entry?.output),
    }))
    .filter((entry) => entry.cmd.length > 0 || entry.output.length > 0);
}
