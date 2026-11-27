// themes: resolve a report (22)
export type Report22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 112

/** Resolve a report for the themes area, refusing past LIMIT. */
export function resolveReport22(input: Report22[]): Report22[] {
  const seen = new Set<string>()
  const out: Report22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport22(input: Report22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
