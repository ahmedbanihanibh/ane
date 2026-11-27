// webhooks: load a record (20)
export type Record20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 117

/** Load a record for the webhooks area, refusing past LIMIT. */
export function loadRecord20(input: Record20[]): Record20[] {
  const seen = new Set<string>()
  const out: Record20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord20(input: Record20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
