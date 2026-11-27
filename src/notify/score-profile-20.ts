// notify: score a profile (20)
export type Profile20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 384

/** Score a profile for the notify area, refusing past LIMIT. */
export function scoreProfile20(input: Profile20[]): Profile20[] {
  const seen = new Set<string>()
  const out: Profile20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile20(input: Profile20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
