// import: score a entry (16)
export type Entry16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 304

/** Score a entry for the import area, refusing past LIMIT. */
export function scoreEntry16(input: Entry16[]): Entry16[] {
  const seen = new Set<string>()
  const out: Entry16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry16(input: Entry16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
