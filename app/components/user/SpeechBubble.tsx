import React from "react"
import "./SpeechBubble.css"
import Avatar from "./Avatar"
import { SimpCommentData } from "@/app/ts/data/commentData"
import { getTimeAgoLabel } from "@/app/lib/common/getTimeAgoLabel"

interface SpeechBubbleProps {
  data: SimpCommentData
}

const SpeechBubble = ({ data }: SpeechBubbleProps) => {
  const {
    content: { body, updated_at, created_at },
    user: { login, avatar_url },
  } = data

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Avatar
        className="mt-3.5 size-8 hidden md:block"
        avatarUrl={avatar_url}
        alt={`${login} avatar`}
      />

      <div className="speech-bubble markdown-body flex-col md:flex">
        <div className="flex ">
          <div className="after:content-[':'] font-bold flex mr-2">
            {login}
            <Avatar
              className="mx-2 block md:hidden rounded-full size-6"
              avatarUrl={avatar_url}
              alt={`${login} avatar`}
            />
          </div>
          <div className="text-gray-500">{getTimeAgoLabel(created_at, updated_at)}</div>
        </div>

        <div
          className="first:mt-4"
          dangerouslySetInnerHTML={{ __html: body ?? "" }}></div>
      </div>
    </div>
  )
}

export default SpeechBubble
