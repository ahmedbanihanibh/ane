// auth: rank a window (39)
export type Window39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 126

/** Rank a window for the auth area, refusing past LIMIT. */
export function rankWindow39(input: Window39[]): Window39[] {
  const seen = new Set<string>()
  const out: Window39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow39(input: Window39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
