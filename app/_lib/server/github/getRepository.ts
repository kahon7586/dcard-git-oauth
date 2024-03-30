import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getRepository() {
  const cookieList = cookies();

  const repo = cookieList.get("repo")?.value;
  const owner = cookieList.get("owner")?.value;

  if (repo === undefined || owner === undefined) return null;

  return { repo, owner };
}

export async function getRepoOrRedirect() {
  const result = await getRepository();

  if (result === null) {
    redirect("/set-repository");
  }

  const { repo, owner } = result;

  return { repo, owner };
}
