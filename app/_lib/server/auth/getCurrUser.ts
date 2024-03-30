import { auth } from "@/auth";

const DEFALUT_USER: {
  name: string;
  role: "user" | "admin";
  isLogin: boolean;
} = {
  name: "Anonymous",
  role: "user",
  isLogin: false,
};

export async function getCurrUser() {
  const session = await auth();
  if (session === null) {
    // if not login
    return DEFALUT_USER;
  }

  const { name, role } = session.user;
  return { name, role, isLogin: true };
}

export async function getUserRole() {
  const user = await getCurrUser();

  return user.role;
}

export async function getUserName() {
  const user = await getCurrUser();

  return user.name;
}
