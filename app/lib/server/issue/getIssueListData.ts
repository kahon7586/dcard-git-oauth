import { getOctokit } from "../auth/getOctokit"

export async function getIssueListData() {
  const octokit = await getOctokit()

  // Example:
  // https://github.com/kahon7586/dcard-git-oauth/issues

  const res = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: process.env.OWNER!,
    repo: process.env.REPO!,
    per_page: 10,
  })

  return res.data
}
