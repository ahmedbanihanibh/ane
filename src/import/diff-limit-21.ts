// import: diff a limit (21)
export type Limit21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 313

/** Diff a limit for the import area, refusing past LIMIT. */
export function diffLimit21(input: Limit21[]): Limit21[] {
  const seen = new Set<string>()
  const out: Limit21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit21(input: Limit21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
