// alerts: compact a profile (3)
export type Profile3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 241

/** Compact a profile for the alerts area, refusing past LIMIT. */
export function compactProfile3(input: Profile3[]): Profile3[] {
  const seen = new Set<string>()
  const out: Profile3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile3(input: Profile3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
