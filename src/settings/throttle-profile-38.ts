// settings: throttle a profile (38)
export type Profile38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 456

/** Throttle a profile for the settings area, refusing past LIMIT. */
export function throttleProfile38(input: Profile38[]): Profile38[] {
  const seen = new Set<string>()
  const out: Profile38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile38(input: Profile38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
