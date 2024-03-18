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
      accept: "application/vnd.github.html+json",
    },
  })

  // ! In order to keep right structure of paragraph, body_html is will directly implement in DOM
  // ! However, there's no evidence that github sanitized xss danger for us

  const { title, body_html, user, id, state } = res.data

  console.log(body_html)

  if (user === null) throw Error(`User return null when loading issue: ${id}`)

  return { title, body: body_html, user, id, state }
}
