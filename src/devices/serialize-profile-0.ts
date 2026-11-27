// devices: serialize a profile (0)
export type Profile0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 262

/** Serialize a profile for the devices area, refusing past LIMIT. */
export function serializeProfile0(input: Profile0[]): Profile0[] {
  const seen = new Set<string>()
  const out: Profile0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile0(input: Profile0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
