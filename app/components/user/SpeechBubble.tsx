import React from "react";
import "./SpeechBubble.css";
import Avatar from "./Avatar";
import { SimpCommentData } from "@/app/ts/data/commentData";
import { getTimeAgoLabel } from "@/app/lib/common/getTimeAgoLabel";

interface SpeechBubbleProps {
  data: SimpCommentData;
}

const SpeechBubble = ({ data }: SpeechBubbleProps) => {
  const {
    content: { body, updated_at, created_at },
    user: { login, avatar_url },
  } = data;

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Avatar
        className="mt-3.5 hidden size-8 md:block"
        avatarUrl={avatar_url}
        alt={`${login} avatar`}
      />

      <div className="speech-bubble  flex-col md:flex">
        <div className="mt-2 flex">
          <div className="mr-2 flex font-bold after:content-[':']">
            {login}
            <Avatar
              className="mx-2 block size-6 rounded-full md:hidden"
              avatarUrl={avatar_url}
              alt={`${login} avatar`}
            />
          </div>
          <div className="text-primary dark:text-primary-d">
            {getTimeAgoLabel(created_at, updated_at)}
          </div>
        </div>

        <div
          className="markdown-body border-none first:mt-4"
          dangerouslySetInnerHTML={{ __html: body ?? "" }}
        ></div>
      </div>
    </div>
  );
};

export default SpeechBubble;
