import Link from "next/link"
import React from "react"
import { closeIssue } from "../lib/server/issue/closeIssue"
import { getSingleIssueData } from "../lib/server/issue/getSingleIssueData"
import DeleteBtn from "./DeleteBtn"
import IssueBody from "./client/IssueBody"
import AdminOnly from "./user/AdminOnly"
import Avatar from "./user/Avatar"
import { getTimeAgoLabel } from "../lib/server/comments/getTimeAgoLabel"

interface IssueTitleAndBodyProps {
  postNumber: number
}

const IssueTitleAndBody = async ({ postNumber }: IssueTitleAndBodyProps) => {
  const {
    title,
    body_html,
    user: { login: author, avatar_url },
    state,
    updated_at,
    created_at,
  } = await getSingleIssueData(postNumber)

  // ! Potential XSS attack may exist in body

  return (
    <>
      <div /*title*/ className="px-2 py-1 flex flex-col gap-2 items-baseline border rounded-lg">
        <div className="font-bold text-2xl">
          {title}
          <span className="ml-2 font-semibold text-md text-gray-500">{`# ${postNumber}`}</span>
        </div>
        <div className="flex gap-2">
          <div className="text-slate-600 before:content-['('] after:content-[')']">{state}</div>
          <Avatar
            className="flex items-baseline"
            avatarUrl={avatar_url}
            alt={`${author} Avatar`}
          />
          <div className="font-light text-sm text-gray-600">
            {author}
            <span className="before:content-['_·_']">{getTimeAgoLabel(created_at, updated_at)}</span>
          </div>
        </div>
      </div>

      <div /*body*/ className="">
        <AdminOnly>
          <div className="float-right px-4 py-2 flex right-3 top-2 gap-2">
            <Link
              className="bg-slate-300 hover:bg-slate-200 border rounded-md px-2 py-1 "
              href={`/issue-list/edit/${postNumber}`}>
              Edit
            </Link>
            <DeleteBtn
              className="bg-slate-300 hover:bg-slate-200 border rounded-md px-2 py-1 "
              action={closeIssue}
              postNumber={postNumber}
            />
          </div>
        </AdminOnly>

        <IssueBody innerHTML={body_html} />
      </div>
    </>
  )
}

export default IssueTitleAndBody
