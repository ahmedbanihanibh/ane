// telemetry: diff a entry (22)
export type Entry22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 65

/** Diff a entry for the telemetry area, refusing past LIMIT. */
export function diffEntry22(input: Entry22[]): Entry22[] {
  const seen = new Set<string>()
  const out: Entry22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry22(input: Entry22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
