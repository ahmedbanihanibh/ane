// storage: load a entry (33)
export type Entry33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 364

/** Load a entry for the storage area, refusing past LIMIT. */
export function loadEntry33(input: Entry33[]): Entry33[] {
  const seen = new Set<string>()
  const out: Entry33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry33(input: Entry33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
