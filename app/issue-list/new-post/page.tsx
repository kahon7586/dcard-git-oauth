import IssuePostForm from "@/app/components/client/IssuePostform";
import { postIssue } from "@/app/lib/server/issue/postIssue";
import { markdownParser } from "@/app/lib/server/markdown/markdownParser";
import React from "react";

const page = () => {
  const actions = {
    postIssue,
    markdownParser,
  };

  return (
    <div className="container">
      <div className="flex justify-center text-3xl">New issue</div>
      <IssuePostForm actions={actions} />
    </div>
  );
};

export default page;
