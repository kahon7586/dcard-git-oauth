"use client";

import React from "react";
import { SimpIssueData } from "../_ts/data/issueData";
import Avatar from "./user/Avatar";
import Link from "next/link";
import { getTimeAgoLabel } from "../_lib/common/getTimeAgoLabel";

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
      <div className="flex w-full items-baseline gap-2 overflow-hidden text-xl">
        {/* <--- State ---> */}
        <div className=" text-primary before:content-['('] after:content-[')'] dark:text-primary-d">
          {state}
        </div>

        {/* <--- Title ---> */}
        <div className="basis-[100%] truncate font-bold">{title}</div>

        {/* <--- Avatar ---> */}
        <Avatar
          className="hidden flex-none md:flex"
          avatarUrl={avatar_url}
          alt={`${login} Avatar`}
        />

        {/* <--- login and time label ---> */}
        <div className="hidden text-nowrap text-sm  font-light text-primary md:flex dark:text-primary-d">
          {login}
          <span className="before:content-['_·_']">
            {getTimeAgoLabel(created_at, updated_at)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default IssueItem;
