// themes: score a entry (13)
export type Entry13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 309

/** Score a entry for the themes area, refusing past LIMIT. */
export function scoreEntry13(input: Entry13[]): Entry13[] {
  const seen = new Set<string>()
  const out: Entry13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry13(input: Entry13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
