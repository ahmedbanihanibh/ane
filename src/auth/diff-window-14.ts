// auth: diff a window (14)
export type Window14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 184

/** Diff a window for the auth area, refusing past LIMIT. */
export function diffWindow14(input: Window14[]): Window14[] {
  const seen = new Set<string>()
  const out: Window14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow14(input: Window14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
