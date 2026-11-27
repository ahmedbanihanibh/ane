// export: load a record (31)
export type Record31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 233

/** Load a record for the export area, refusing past LIMIT. */
export function loadRecord31(input: Record31[]): Record31[] {
  const seen = new Set<string>()
  const out: Record31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord31(input: Record31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
