// sessions: load a record (38)
export type Record38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 360

/** Load a record for the sessions area, refusing past LIMIT. */
export function loadRecord38(input: Record38[]): Record38[] {
  const seen = new Set<string>()
  const out: Record38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord38(input: Record38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
