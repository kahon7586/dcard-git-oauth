import IssueEditForm from "@/app/components/client/IssueEditForm"
import { editIssue } from "@/app/lib/server/issue/editIssue"
import React from "react"

interface EditProps {
  postNumber: string
  content: { title: string; body: string | undefined | null }
}

const Edit = async ({ postNumber, content }: EditProps) => {
  return (
    <div className="container">
      <div className="flex justify-center text-3xl">Edit issue #{postNumber}</div>
      <IssueEditForm
        content={content}
        action={editIssue}
        postNumber={postNumber}
      />
    </div>
  )
}

export default Edit
