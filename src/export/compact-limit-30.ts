// export: compact a limit (30)
export type Limit30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 439

/** Compact a limit for the export area, refusing past LIMIT. */
export function compactLimit30(input: Limit30[]): Limit30[] {
  const seen = new Set<string>()
  const out: Limit30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit30(input: Limit30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
