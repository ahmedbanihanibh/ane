// billing: throttle a limit (20)
export type Limit20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 458

/** Throttle a limit for the billing area, refusing past LIMIT. */
export function throttleLimit20(input: Limit20[]): Limit20[] {
  const seen = new Set<string>()
  const out: Limit20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit20(input: Limit20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
