// inbox: resolve a entry (35)
export type Entry35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 255

/** Resolve a entry for the inbox area, refusing past LIMIT. */
export function resolveEntry35(input: Entry35[]): Entry35[] {
  const seen = new Set<string>()
  const out: Entry35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry35(input: Entry35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
