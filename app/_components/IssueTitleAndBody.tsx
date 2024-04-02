import React from "react";
import { closeIssue } from "../_lib/server/issue/closeIssue";
import { getSingleIssueData } from "../_lib/server/issue/getSingleIssueData";
import DeleteBtn from "./client/DeleteBtn";
import IssueBody from "./user/IssueBody";
import AdminOnly from "./user/AdminOnly";
import Avatar from "./user/Avatar";
import { getTimeAgoLabel } from "../_lib/common/getTimeAgoLabel";
import LinkButton from "./LinkButton";

interface IssueTitleAndBodyProps {
  postNumber: number;
}

const IssueTitleAndBody = async ({ postNumber }: IssueTitleAndBodyProps) => {
  const data = await getSingleIssueData(postNumber);
  if (!data) return null;
  // user should be redirected before receive null data

  const {
    title,
    body_html,
    user: { login: author, avatar_url },
    state,
    updated_at,
    created_at,
  } = data;

  // ! Potential XSS attack may exist in body

  return (
    <>
      <div
        /*title*/ className="flex flex-col items-baseline gap-2 rounded-lg border border-primary px-2 py-1 dark:border-primary-d"
      >
        <div className="text-2xl font-bold">
          {title}
          <span className="text-md ml-2 font-semibold text-primary dark:text-primary-d">{`# ${postNumber}`}</span>
        </div>
        <div className="flex gap-2">
          <div className="text-primary before:content-['('] after:content-[')'] dark:text-primary-d">
            {state}
          </div>
          <Avatar
            className="flex items-baseline"
            avatarUrl={avatar_url}
            alt={`${author} Avatar`}
          />
          <div className="text-sm font-light text-primary dark:text-primary-d">
            {author}
            <span className="before:content-['_·_']">
              {getTimeAgoLabel(created_at, updated_at)}
            </span>
          </div>
        </div>
      </div>

      <div /*body*/ className="">
        <AdminOnly>
          <div className="right-3 top-2 float-right flex gap-2 px-4 py-2">
            <LinkButton href={`/issue-list/edit/${postNumber}`}>
              Edit
            </LinkButton>
            <DeleteBtn action={closeIssue} postNumber={postNumber} />
          </div>
        </AdminOnly>

        <IssueBody innerHTML={body_html} />
      </div>
    </>
  );
};

export default IssueTitleAndBody;
