import { auth } from "@/auth";
import { Octokit } from "octokit";

export async function getOctokit() {
  const session = await auth();
  const token = session?.user?.accessToken;

  return new Octokit({
    auth: token,
  });
}
