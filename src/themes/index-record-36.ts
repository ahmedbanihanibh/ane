// themes: index a record (36)
export type Record36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 23

/** Index a record for the themes area, refusing past LIMIT. */
export function indexRecord36(input: Record36[]): Record36[] {
  const seen = new Set<string>()
  const out: Record36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord36(input: Record36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
