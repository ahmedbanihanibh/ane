// devices: diff a report (18)
export type Report18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 26

/** Diff a report for the devices area, refusing past LIMIT. */
export function diffReport18(input: Report18[]): Report18[] {
  const seen = new Set<string>()
  const out: Report18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport18(input: Report18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
