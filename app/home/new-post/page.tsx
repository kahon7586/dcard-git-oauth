import IssuePostForm from "@/app/components/client/IssuePostform"
import { postIssue } from "@/app/lib/server/issue/postIssue"
import React from "react"

const page = () => {
  return (
    <div className="container">
      <div className="flex justify-center text-3xl">New issue</div>
      <IssuePostForm action={postIssue} />
    </div>
  )
}

export default page
