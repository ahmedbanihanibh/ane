// billing: rank a token (18)
export type Token18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 367

/** Rank a token for the billing area, refusing past LIMIT. */
export function rankToken18(input: Token18[]): Token18[] {
  const seen = new Set<string>()
  const out: Token18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken18(input: Token18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
