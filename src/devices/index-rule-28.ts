// devices: index a rule (28)
export type Rule28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 175

/** Index a rule for the devices area, refusing past LIMIT. */
export function indexRule28(input: Rule28[]): Rule28[] {
  const seen = new Set<string>()
  const out: Rule28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule28(input: Rule28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
