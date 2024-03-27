"use client";

import React from "react";
import { SimpIssueData } from "../ts/data/issueData";
import Avatar from "./user/Avatar";
import Link from "next/link";
import { getTimeAgoLabel } from "../lib/common/getTimeAgoLabel";

interface IssueItemProps {
  issueItem: SimpIssueData;
}

const IssueItem = ({ issueItem }: IssueItemProps) => {
  const {
    content: { title, state, number, created_at, updated_at },
    user,
  } = issueItem;

  const { login: login, avatar_url: avatar_url } = user;

  return (
    <Link
      href={`/issue-list/issue/${number}`}
      className="mr-2 px-4 py-2 hover:cursor-pointer hover:border-l-4 hover:border-secondary hover:bg-primary-hover dark:hover:bg-primary-hover-d"
    >
      <div className="flex items-center justify-between">
        <div className="flex w-screen items-baseline gap-2 overflow-hidden text-xl">
          <div className="text-primary before:content-['('] after:content-[')'] dark:text-primary-d">
            {state}
          </div>
          <div className="truncate font-bold">{title}</div>
          <Avatar
            className="flex-none"
            avatarUrl={avatar_url}
            alt={`${login} Avatar`}
          />
          <div className="text-nowrap text-sm font-light text-primary dark:text-primary-d">
            {login}
            <span className="before:content-['_·_']">
              {getTimeAgoLabel(created_at, updated_at)}
            </span>
          </div>
        </div>
        <div className="flex gap-2"></div>
      </div>
    </Link>
  );
};

export default IssueItem;
