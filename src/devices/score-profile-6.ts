// devices: score a profile (6)
export type Profile6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 248

/** Score a profile for the devices area, refusing past LIMIT. */
export function scoreProfile6(input: Profile6[]): Profile6[] {
  const seen = new Set<string>()
  const out: Profile6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile6(input: Profile6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
