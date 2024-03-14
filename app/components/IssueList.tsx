import React from "react"
import IssueItem from "./IssueItem"
import { getIssueListData } from "../lib/server/issue/getIssueListData"
import { extractIssueListData } from "../lib/server/data/extractIssueListData"

const IssueList = async () => {
  const rawData = await getIssueListData()
  const issueListData = extractIssueListData(rawData)

  if (issueListData === null) return <div> no data! </div>

  return (
    <div className="container flex flex-col bg-slate-300">
      {issueListData.map((issue) => (
        <IssueItem
          issueItem={issue}
          key={issue.content.id}
        />
      ))}
    </div>
  )
}

export default IssueList
