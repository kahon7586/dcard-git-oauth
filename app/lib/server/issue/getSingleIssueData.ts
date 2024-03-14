import { getOctokit } from "../auth/getOctokit"

export async function getSingleIssueData(postID: string | number) {
  if (typeof postID === "string") postID = Number(postID)

  const octokit = await getOctokit()

  const res = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: process.env.OWNER!,
    repo: process.env.REPO!,
    issue_number: postID,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  const { title, body, user, id, state } = res.data

  if (user === null) throw Error(`User return null when loading issue: ${id}`)

  return { title, body, user, id, state }
}
