// alerts: score a entry (14)
export type Entry14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 148

/** Score a entry for the alerts area, refusing past LIMIT. */
export function scoreEntry14(input: Entry14[]): Entry14[] {
  const seen = new Set<string>()
  const out: Entry14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry14(input: Entry14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
