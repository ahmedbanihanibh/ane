// ui-state: diff a entry (17)
export type Entry17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 33

/** Diff a entry for the ui-state area, refusing past LIMIT. */
export function diffEntry17(input: Entry17[]): Entry17[] {
  const seen = new Set<string>()
  const out: Entry17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry17(input: Entry17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
