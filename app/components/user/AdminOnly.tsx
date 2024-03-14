import { adminList } from "@/app/data/admin"
import { getCurrUser } from "@/app/lib/server/auth/getCurrUser"
import React, { ReactNode } from "react"

interface AdminOnlyProps {
  children?: ReactNode
}

const AdminOnly = async ({ children }: AdminOnlyProps) => {
  const { name, role } = await getCurrUser()

  if (!(name && role === "admin")) return null

  return <>{children}</>
}

export default AdminOnly
