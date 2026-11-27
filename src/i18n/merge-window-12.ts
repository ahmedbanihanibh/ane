// i18n: merge a window (12)
export type Window12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 40

/** Merge a window for the i18n area, refusing past LIMIT. */
export function mergeWindow12(input: Window12[]): Window12[] {
  const seen = new Set<string>()
  const out: Window12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow12(input: Window12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
