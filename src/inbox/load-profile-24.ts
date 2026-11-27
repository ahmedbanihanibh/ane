// inbox: load a profile (24)
export type Profile24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 53

/** Load a profile for the inbox area, refusing past LIMIT. */
export function loadProfile24(input: Profile24[]): Profile24[] {
  const seen = new Set<string>()
  const out: Profile24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile24(input: Profile24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
