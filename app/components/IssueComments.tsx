import React from "react";
import { getIssueComments } from "../lib/server/comments/getIssueComments";
import SpeechBubble from "./user/SpeechBubble";

interface IssueCommentsProps {
  postNumber: number;
}

const IssueComments = async ({ postNumber }: IssueCommentsProps) => {
  const dataList = await getIssueComments(postNumber);

  if (dataList === null) return null;

  return dataList.map((data) => (
    <SpeechBubble data={data} key={data.content.id} />
  ));
};

export default IssueComments;
