// themes: throttle a window (23)
export type Window23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 110

/** Throttle a window for the themes area, refusing past LIMIT. */
export function throttleWindow23(input: Window23[]): Window23[] {
  const seen = new Set<string>()
  const out: Window23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow23(input: Window23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
