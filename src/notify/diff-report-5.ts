// notify: diff a report (5)
export type Report5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 359

/** Diff a report for the notify area, refusing past LIMIT. */
export function diffReport5(input: Report5[]): Report5[] {
  const seen = new Set<string>()
  const out: Report5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport5(input: Report5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
