import React from "react"
import { SimpIssueData } from "../ts/data/issueData"
import IssueItem from "./IssueItem"

interface IssueListProps {
  issueList: SimpIssueData[] | null
}

const IssueList = ({ issueList }: IssueListProps) => {
  if (issueList === null) return <div> no data! </div>

  return (
    <div className="container flex flex-col bg-slate-300">
      {issueList.map((issue) => (
        <IssueItem
          issueItem={issue}
          key={issue.content.id}
        />
      ))}
    </div>
  )
}

export default IssueList
