// themes: diff a channel (18)
export type Channel18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 469

/** Diff a channel for the themes area, refusing past LIMIT. */
export function diffChannel18(input: Channel18[]): Channel18[] {
  const seen = new Set<string>()
  const out: Channel18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel18(input: Channel18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
