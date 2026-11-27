// webhooks: validate a window (30)
export type Window30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 145

/** Validate a window for the webhooks area, refusing past LIMIT. */
export function validateWindow30(input: Window30[]): Window30[] {
  const seen = new Set<string>()
  const out: Window30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow30(input: Window30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
