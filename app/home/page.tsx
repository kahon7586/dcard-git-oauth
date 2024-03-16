import React from "react"
import IssueList from "../components/IssueList"
import Link from "next/link"
import AdminOnly from "../components/user/AdminOnly"
import { getIssueListData } from "../lib/server/issue/getIssueListData"
import { extractIssueListData } from "../lib/server/data/extractIssueListData"
import IssueItem from "../components/IssueItem"

const ISSUES_PER_LOAD = 10

const page = async () => {
  //WIP: fix the problem when user return back page, the list data is not updated.

  async function getIssueNodeList(pages: number) {
    "use server"
    const rawData = await getIssueListData(pages, ISSUES_PER_LOAD)
    const issueListData = extractIssueListData(rawData)

    return issueListData
      ? issueListData.map((issue) => (
          <IssueItem
            issueItem={issue}
            key={issue.content.id}
          />
        ))
      : null
  }

  const firstPageData = await getIssueNodeList(1)
  // Note that fetch data first rather than in client side(<IssueList/>)
  // could lead to better UX

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
        firstPageData={firstPageData}
        action={getIssueNodeList}
      />
    </div>
  )
}

export default page
