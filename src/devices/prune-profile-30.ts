// devices: prune a profile (30)
export type Profile30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 425

/** Prune a profile for the devices area, refusing past LIMIT. */
export function pruneProfile30(input: Profile30[]): Profile30[] {
  const seen = new Set<string>()
  const out: Profile30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile30(input: Profile30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
