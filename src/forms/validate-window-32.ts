// forms: validate a window (32)
export type Window32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 245

/** Validate a window for the forms area, refusing past LIMIT. */
export function validateWindow32(input: Window32[]): Window32[] {
  const seen = new Set<string>()
  const out: Window32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow32(input: Window32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
