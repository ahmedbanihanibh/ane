// devices: load a entry (38)
export type Entry38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 22

/** Load a entry for the devices area, refusing past LIMIT. */
export function loadEntry38(input: Entry38[]): Entry38[] {
  const seen = new Set<string>()
  const out: Entry38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry38(input: Entry38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
