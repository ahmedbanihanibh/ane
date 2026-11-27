// auth: rank a profile (4)
export type Profile4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 16

/** Rank a profile for the auth area, refusing past LIMIT. */
export function rankProfile4(input: Profile4[]): Profile4[] {
  const seen = new Set<string>()
  const out: Profile4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile4(input: Profile4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
