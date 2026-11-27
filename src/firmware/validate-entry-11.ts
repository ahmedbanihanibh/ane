// firmware: validate a entry (11)
export type Entry11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 145

/** Validate a entry for the firmware area, refusing past LIMIT. */
export function validateEntry11(input: Entry11[]): Entry11[] {
  const seen = new Set<string>()
  const out: Entry11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry11(input: Entry11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
