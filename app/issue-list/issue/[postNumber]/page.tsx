import IssueBody from "@/app/components/client/IssueBody"
import Avatar from "@/app/components/user/Avatar"
import { getSingleIssueData } from "@/app/lib/server/issue/getSingleIssueData"
import { markdownParser } from "@/app/lib/server/markdown/markdownParser"
import Link from "next/link"
import React from "react"
import AdminOnly from "@/app/components/user/AdminOnly"
import { revalidatePath } from "next/cache"

interface PageProps {
  params: { postNumber: string }
}

const page = async ({ params }: PageProps) => {
  const postNumber = params.postNumber

  const {
    title,
    body,
    user: { login: author, avatar_url },
    state,
  } = await getSingleIssueData(postNumber)

  // fix this when body empty
  const innerHTML_sanitized = await markdownParser(body!)
  // innerHTML is sanitized by js-xss in markdownParser

  return (
    <div className="flex flex-col w-full px-4 py-2 gap-4">
      <div /*title*/ className="px-2 py-1 flex gap-2 items-baseline border rounded-lg">
        <div className="font-bold text-2xl">{title}</div>
        <div className="text-slate-600 before:content-['('] after:content-[')']">{state}</div>
        <Avatar
          className="flex items-baseline"
          avatarUrl={avatar_url}
          alt={`${author} Avatar`}
        />
        <div className="font-light text-sm text-gray-600">{author}</div>
      </div>

      <div /*body*/ className="relative px-6 py-4 border rounded-lg">
        <AdminOnly>
          <Link
            className="absolute hover:bg-slate-200 border rounded-md px-2 py-1 right-3 top-2"
            href={`/issue-list/edit/${postNumber}`}>
            Edit
          </Link>
        </AdminOnly>

        <IssueBody sanitized_innerHTML={innerHTML_sanitized} />
      </div>
    </div>
  )
}

export default page
