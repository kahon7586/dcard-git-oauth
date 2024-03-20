import { timeFormatter } from "./timeFormatter"

export function getTimeAgoLabel(created_at: Date | string, updated_at: Date | string) {
  if (typeof created_at === "string") created_at = new Date(created_at)
  if (typeof updated_at === "string") updated_at = new Date(updated_at)

  const prefix = updated_at > created_at ? "edited at " : "posted at "

  const timeAgo = timeFormatter(updated_at)

  return prefix + timeAgo
}
