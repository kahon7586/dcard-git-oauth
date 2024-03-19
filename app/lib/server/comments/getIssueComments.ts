import { getOctokit } from "../auth/getOctokit"
import { getStatusMessage } from "../github/getStatusMessage"

export async function getIssueComments(postNumber: number) {
  const octokit = await getOctokit()

  const res = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner: process.env.OWNER!,
    repo: process.env.REPO!,
    issue_number: postNumber,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  const { data, status } = res

  console.log(data)
  getStatusMessage(status, getIssueComments.name)

  return data
}
