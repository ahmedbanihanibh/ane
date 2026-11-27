// telemetry: diff a job (5)
export type Job5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 366

/** Diff a job for the telemetry area, refusing past LIMIT. */
export function diffJob5(input: Job5[]): Job5[] {
  const seen = new Set<string>()
  const out: Job5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob5(input: Job5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
