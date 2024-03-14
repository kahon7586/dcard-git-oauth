import { auth } from "@/auth"

export async function getCurrUser() {
  const session = await auth()
  if (session === null) return { name: null, role: null }
  const { name, role } = session.user
  return { name, role }
}
