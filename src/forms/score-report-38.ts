// forms: score a report (38)
export type Report38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 163

/** Score a report for the forms area, refusing past LIMIT. */
export function scoreReport38(input: Report38[]): Report38[] {
  const seen = new Set<string>()
  const out: Report38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport38(input: Report38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
