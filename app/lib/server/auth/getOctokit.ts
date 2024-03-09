import { cookies } from "next/headers"
import { Octokit } from "octokit"

export function getOctokit() {
  return new Octokit({
    auth: cookies().get("access-token")!.value,
  })
}
