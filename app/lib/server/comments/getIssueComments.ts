import { ResCommentData, SimpCommentData } from "@/app/ts/data/commentData"
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
      accept: "application/vnd.github.html+json",
    },
  })

  const { data: dataList, status } = res

  getStatusMessage(status, getIssueComments.name)

  if (dataList.length === 0) return null

  return dataList.map((data: ResCommentData) => {
    const { id, updated_at, created_at, body_html: body, user } = data

    if (user === null) throw Error("Author not found with this comment id: " + id)

    const contentData = { id, updated_at, created_at, body }

    return { content: contentData, user: user } as SimpCommentData
  })
}
