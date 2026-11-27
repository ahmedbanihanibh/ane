// import: diff a window (25)
export type Window25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 490

/** Diff a window for the import area, refusing past LIMIT. */
export function diffWindow25(input: Window25[]): Window25[] {
  const seen = new Set<string>()
  const out: Window25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow25(input: Window25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
