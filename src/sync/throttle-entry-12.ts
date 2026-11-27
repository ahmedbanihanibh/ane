// sync: throttle a entry (12)
export type Entry12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 67

/** Throttle a entry for the sync area, refusing past LIMIT. */
export function throttleEntry12(input: Entry12[]): Entry12[] {
  const seen = new Set<string>()
  const out: Entry12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry12(input: Entry12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
