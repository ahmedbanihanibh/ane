import { addDays, isBefore } from "date-fns";
import { z } from "zod";

/** A due window: a start date and a length in days, validated at the edge. */
export const dueWindowSchema = z.object({ start: z.coerce.date(), days: z.number().int().min(1).max(365) });
export type DueWindow = z.infer<typeof dueWindowSchema>;

/** Whether `at` falls before the window closes. */
export function isWithinDueWindow(window: DueWindow, at: Date): boolean {
  return isBefore(at, addDays(window.start, window.days));
}
