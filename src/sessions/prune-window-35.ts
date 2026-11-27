// sessions: prune a window (35)
export type Window35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 52

/** Prune a window for the sessions area, refusing past LIMIT. */
export function pruneWindow35(input: Window35[]): Window35[] {
  const seen = new Set<string>()
  const out: Window35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow35(input: Window35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
