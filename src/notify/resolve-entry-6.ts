// notify: resolve a entry (6)
export type Entry6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 222

/** Resolve a entry for the notify area, refusing past LIMIT. */
export function resolveEntry6(input: Entry6[]): Entry6[] {
  const seen = new Set<string>()
  const out: Entry6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry6(input: Entry6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
