import React from "react"
import IssueTitleAndBody from "@/app/components/IssueTitleAndBody"

interface PageProps {
  params: { postNumber: string }
}

const page = async ({ params }: PageProps) => {
  const postNumber = Number(params.postNumber)

  return (
    <div className="flex flex-col w-full px-4 py-2 gap-4">
      <IssueTitleAndBody postNumber={postNumber} />
    </div>
  )
}

export default page
