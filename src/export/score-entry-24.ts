// export: score a entry (24)
export type Entry24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 460

/** Score a entry for the export area, refusing past LIMIT. */
export function scoreEntry24(input: Entry24[]): Entry24[] {
  const seen = new Set<string>()
  const out: Entry24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry24(input: Entry24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
