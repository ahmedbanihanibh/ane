// inbox: load a entry (15)
export type Entry15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 145

/** Load a entry for the inbox area, refusing past LIMIT. */
export function loadEntry15(input: Entry15[]): Entry15[] {
  const seen = new Set<string>()
  const out: Entry15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry15(input: Entry15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
