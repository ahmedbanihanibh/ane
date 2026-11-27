// themes: prune a batch (33)
export type Batch33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 54

/** Prune a batch for the themes area, refusing past LIMIT. */
export function pruneBatch33(input: Batch33[]): Batch33[] {
  const seen = new Set<string>()
  const out: Batch33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBatch33(input: Batch33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
