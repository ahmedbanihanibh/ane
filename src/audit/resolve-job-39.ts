// audit: resolve a job (39)
export type Job39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 41

/** Resolve a job for the audit area, refusing past LIMIT. */
export function resolveJob39(input: Job39[]): Job39[] {
  const seen = new Set<string>()
  const out: Job39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob39(input: Job39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
