import { getOctokit } from "../auth/getOctokit"

export async function getSingleIssueData(postID: string | number) {
  if (typeof postID === "string") postID = Number(postID)

  const octokit = getOctokit()

  console.log(process.env.OWNER, process.env.REPO, postID)

  return octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: process.env.OWNER!,
    repo: process.env.REPO!,
    issue_number: 2,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
}
