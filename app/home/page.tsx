import React from "react"
import IssueList from "../components/IssueList"
import Link from "next/link"
import AdminOnly from "../components/user/AdminOnly"
import { revalidatePath } from "next/cache"

const page = async () => {
  //WIP: fix the problem when user return back page, the list data is not updated.

  return (
    <div className="flex flex-col w-full items-end">
      <AdminOnly>
        <Link
          className="mb-1 px-2 py-1 border rounded-md w-fit"
          href="/home/new-post">
          Post
        </Link>
      </AdminOnly>
      <IssueList />
    </div>
  )
}

export default page
