import React from "react"
import IssueTitleAndBody from "@/app/components/IssueTitleAndBody"
import IssueComments from "@/app/components/IssueComments"

interface PageProps {
  params: { postNumber: string }
}

const page = async ({ params }: PageProps) => {
  const postNumber = Number(params.postNumber)

  return (
    <div className="flex flex-col w-full px-4 py-2 gap-4">
      <IssueTitleAndBody postNumber={postNumber} />
      <IssueComments postNumber={postNumber} />
    </div>
  )
}

export default page
