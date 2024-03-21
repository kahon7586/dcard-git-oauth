"use server"

import { redirect } from "next/navigation"
import { getOctokit } from "../auth/getOctokit"
import { getStatusMessage } from "../github/getStatusMessage"
import { revalidatePath } from "next/cache"

export async function closeIssue(postNumber: number) {
  const octokit = await getOctokit()

  const res = await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: process.env.OWNER!,
    repo: process.env.REPO!,
    issue_number: postNumber,
    state: "closed",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  const { status } = res as { data: unknown; status: number }

  if (status === 200) {
    revalidatePath("/issue-list")
    redirect("/issue-list")
  }

  throw Error(getStatusMessage(status, closeIssue.name))
}
