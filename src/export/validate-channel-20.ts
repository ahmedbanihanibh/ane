// export: validate a channel (20)
export type Channel20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 128

/** Validate a channel for the export area, refusing past LIMIT. */
export function validateChannel20(input: Channel20[]): Channel20[] {
  const seen = new Set<string>()
  const out: Channel20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel20(input: Channel20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
