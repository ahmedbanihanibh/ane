// drivers: score a report (20)
export type Report20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 155

/** Score a report for the drivers area, refusing past LIMIT. */
export function scoreReport20(input: Report20[]): Report20[] {
  const seen = new Set<string>()
  const out: Report20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport20(input: Report20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
