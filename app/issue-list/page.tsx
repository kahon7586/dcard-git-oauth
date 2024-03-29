import React from "react";
import IssueList from "../components/IssueList";
import AdminOnly from "../components/user/AdminOnly";
import { getIssueListData } from "../lib/server/issue/getIssueListData";
import IssueItem from "../components/IssueItem";
import LinkButton from "../components/LinkButton";

const ISSUES_PER_LOAD = 10;

const page = async () => {
  async function getIssueNodeList(pages: number) {
    "use server";
    const issueListData = await getIssueListData(pages, ISSUES_PER_LOAD);

    return issueListData
      ? issueListData.map((issue) => (
          <IssueItem issueItem={issue} key={issue.content.id} />
        ))
      : null;
  }

  const firstPageData = await getIssueNodeList(1);
  /*
   * Note that fetch data first rather than in client side(<IssueList/>)
   * could lead to better UX
   */
  return (
    <div className="flex w-full flex-col items-end gap-2 px-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-[1.8rem] font-bold">Issue-List</p>
        <AdminOnly>
          <LinkButton className="w-fit" href="/issue-list/new-post">
            Post
          </LinkButton>
        </AdminOnly>
      </div>

      <hr className="w-full border-t border-zinc-400" />

      <div className="w-full">
        <IssueList firstPageData={firstPageData} action={getIssueNodeList} />
      </div>
    </div>
  );
};

export default page;
