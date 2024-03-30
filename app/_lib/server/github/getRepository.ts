import { cookies } from "next/headers";
import { toSetRepository } from "../nextjs/redirectTo";

export async function getRepository() {
  const cookieList = cookies();

  const repo = cookieList.get("repo")?.value;
  const owner = cookieList.get("owner")?.value;

  if (repo === undefined || owner === undefined) return undefined;

  return { repo, owner };
}

export async function getRepoOrRedirect() {
  const repoValues = await getRepository();

  if (repoValues === undefined) {
    toSetRepository();
    return undefined;
  }

  return { repo: repoValues.repo, owner: repoValues.owner };
}
