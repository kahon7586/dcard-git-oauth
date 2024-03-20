import React from "react"
import { SimpIssueData } from "../ts/data/issueData"
import Avatar from "./user/Avatar"
import Link from "next/link"
import { getTimeAgoLabel } from "../lib/common/getTimeAgoLabel"

interface IssueItemProps {
  issueItem: SimpIssueData
}

const IssueItem = async ({ issueItem }: IssueItemProps) => {
  const {
    content: { title, state, number, created_at, updated_at },
    user,
  } = issueItem

  const { login: login, avatar_url: avatar_url } = user

  return (
    <Link
      href={`/issue-list/issue/${number}`}
      className="px-4 py-2 hover:bg-slate-400 hover:cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-baseline text-xl w-screen overflow-hidden">
          <div className="text-slate-600 before:content-['('] after:content-[')']">{state}</div>
          <div className="font-bold truncate">{title}</div>
          <Avatar
            className="flex-none"
            avatarUrl={avatar_url}
            alt={`${login} Avatar`}
          />
          <div className="font-light text-sm text-gray-600 text-nowrap">
            {login}
            <span className="before:content-['_·_']">{getTimeAgoLabel(created_at, updated_at)}</span>
          </div>
        </div>
        <div className="flex gap-2"></div>
      </div>
    </Link>
  )
}

export default IssueItem
