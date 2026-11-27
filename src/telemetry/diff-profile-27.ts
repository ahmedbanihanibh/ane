// telemetry: diff a profile (27)
export type Profile27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 327

/** Diff a profile for the telemetry area, refusing past LIMIT. */
export function diffProfile27(input: Profile27[]): Profile27[] {
  const seen = new Set<string>()
  const out: Profile27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile27(input: Profile27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
