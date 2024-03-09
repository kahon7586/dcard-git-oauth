import React from "react"
import { getData } from "../lib/server/data/getData"
import IssueList from "../components/IssueList"
import { getOctokit } from "../lib/server/auth/getOctokit"

const page = async () => {
  const octokit = getOctokit()

  // Example:
  // https://github.com/kahon7586/dcard-git-oauth/issues

  const res = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: process.env.OWNER!,
    repo: process.env.REPO!,
    per_page: 2,
  })
  const issueListData = getData(res.data)

  return (
    <>
      <IssueList issueList={issueListData} />
    </>
  )
}

export default page
