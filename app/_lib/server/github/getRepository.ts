import { cookies } from "next/headers";
import { toSetRepository } from "../nextjs/redirectTo";

export async function getRepository() {
  const cookieList = cookies();

  const repo = cookieList.get("repo")?.value;
  const owner = cookieList.get("owner")?.value;

  return { repo, owner };
}

export async function getRepoOrRedirect() {
  const { repo, owner } = await getRepository();

  if (repo === undefined || owner === undefined) {
    toSetRepository();
  }

  return { repo, owner };
}
