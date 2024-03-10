import IssueBody from "@/app/components/client/IssueBody"
import Avatar from "@/app/components/user/Avatar"
import { getSingleIssueData } from "@/app/lib/server/issue/getSingleIssueData"
import { markdownParser } from "@/app/lib/server/markdown/markdownParser"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import React from "react"

interface PageProps {
  params: Params
}

const page = async ({ params }: PageProps) => {
  const { postNumber } = params

  const res = await getSingleIssueData(postNumber[0])
  const { title, body, user, id, state } = res.data

  if (user === null) throw Error(`User return null when loading issue: ${id}`)

  const { login, avatar_url } = user

  const innerHTML = await markdownParser(body!)
  // innerHTML is sanitized by js-xss in markdownParser

  return (
    <div className="flex flex-col w-full px-4 py-2 gap-4">
      <div /*title*/ className="px-2 py-1 flex gap-2 items-baseline border rounded-lg">
        <div className="font-bold text-2xl">{title}</div>
        <div className="text-slate-600 before:content-['('] after:content-[')']">{state}</div>
        <Avatar
          className="flex items-baseline"
          avatarUrl={avatar_url}
          alt={`${login} Avatar`}
        />
        <div className="font-light text-sm text-gray-600">{login}</div>
      </div>

      <div /*body*/ className="px-6 py-4 border rounded-lg">
        <IssueBody innerHTML={innerHTML} />
      </div>
    </div>
  )
}

export default page
