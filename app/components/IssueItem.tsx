import React from "react"
import { SimpIssueData } from "../ts/data/issueData"
import Avatar from "./user/Avatar"
import Link from "next/link"

interface IssueItemProps {
  issueItem: SimpIssueData
}

const IssueItem = async ({ issueItem }: IssueItemProps) => {
  const {
    content: { title, state, number },
    user,
  } = issueItem
  if (user === null) return

  const { login: login, avatar_url: avatar_url } = user

  return (
    <Link
      href={`/issue-list/issue/${number}`}
      className="px-4 py-2 hover:bg-slate-400 hover:cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-baseline text-xl ">
          <div className="text-slate-600 before:content-['('] after:content-[')']">{state}</div>
          <div className="font-bold ">{title}</div>
          <Avatar
            avatarUrl={avatar_url}
            alt={`${login} Avatar`}
          />
          <div className="font-light text-sm text-gray-600">{login}</div>
        </div>
        <div className="flex gap-2"></div>
      </div>
    </Link>
  )
}

export default IssueItem
