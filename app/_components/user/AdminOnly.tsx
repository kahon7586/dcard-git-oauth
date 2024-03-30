import { getUserRole } from "@/app/_lib/server/auth/getCurrUser";
import React, { ReactNode } from "react";

interface AdminOnlyProps {
  children?: ReactNode;
}

const AdminOnly = async ({ children }: AdminOnlyProps) => {
  const userRole = await getUserRole();

  if (userRole === "user") return null;

  return <>{children}</>;
};

export default AdminOnly;
