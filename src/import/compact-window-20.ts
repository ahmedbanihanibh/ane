// import: compact a window (20)
export type Window20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 261

/** Compact a window for the import area, refusing past LIMIT. */
export function compactWindow20(input: Window20[]): Window20[] {
  const seen = new Set<string>()
  const out: Window20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow20(input: Window20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
