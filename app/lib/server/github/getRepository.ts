import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getRepository() {
  const cookieList = cookies();

  const repo = cookieList.get("repo")?.value;
  const owner = cookieList.get("owner")?.value;

  if (repo === undefined || owner === undefined) return null;

  return { repo, owner };
}
