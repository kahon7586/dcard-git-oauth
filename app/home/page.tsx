import React from "react"
import IssueList from "../components/IssueList"
import Link from "next/link"
import AdminOnly from "../components/user/AdminOnly"
import { getIssueListData } from "../lib/server/issue/getIssueListData"
import { extractIssueListData } from "../lib/server/data/extractIssueListData"
import IssueItem from "../components/IssueItem"

const page = async () => {
  //WIP: fix the problem when user return back page, the list data is not updated.

  const rawData = await getIssueListData(1, 10)
  const issueListData = extractIssueListData(rawData)
  const nodeList = issueListData
    ? issueListData.map((issue) => (
        <IssueItem
          issueItem={issue}
          key={issue.content.id}
        />
      ))
    : null

  async function getMoreData(pages: number) {
    "use server"
    const rawData = await getIssueListData(pages, 10)
    const issueListData = extractIssueListData(rawData)
    console.log(`curr page: ${pages}`)

    return issueListData
      ? issueListData.map((issue) => (
          <IssueItem
            issueItem={issue}
            key={issue.content.id}
          />
        ))
      : null
  }

  // WIP: package these data fetching

  return (
    <div className="flex flex-col w-full items-end">
      <AdminOnly>
        <Link
          className="mb-1 px-2 py-1 border rounded-md w-fit"
          href="/home/new-post">
          Post
        </Link>
      </AdminOnly>
      <IssueList
        issueNodeList={nodeList}
        action={getMoreData}
      />
    </div>
  )
}

export default page
