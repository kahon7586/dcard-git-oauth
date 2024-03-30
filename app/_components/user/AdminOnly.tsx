import { adminList } from "@/app/_data/admin";
import { getCurrUser } from "@/app/_lib/server/auth/getCurrUser";
import React, { ReactNode } from "react";

interface AdminOnlyProps {
  children?: ReactNode;
}

const AdminOnly = async ({ children }: AdminOnlyProps) => {
  const { name, role } = await getCurrUser();

  if (!(name && role === "admin")) return null;

  return <>{children}</>;
};

export default AdminOnly;
