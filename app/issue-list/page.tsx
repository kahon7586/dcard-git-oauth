import React from "react";
import IssueList from "../_components/IssueList";
import AdminOnly from "../_components/user/AdminOnly";
import { getIssueListData } from "../_lib/server/issue/getIssueListData";
import IssueItem from "../_components/IssueItem";
import LinkButton from "../_components/LinkButton";

const ISSUES_PER_LOAD = 10;

const page = async () => {
  async function getIssueList(pages: number) {
    "use server";
    return await getIssueListData(pages, ISSUES_PER_LOAD);
  }

  const firstPageData = await getIssueList(1);
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
        <IssueList firstPageData={firstPageData} action={getIssueList} />
      </div>
    </div>
  );
};

export default page;
