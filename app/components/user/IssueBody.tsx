"use client";

import React from "react";

interface IssueBodyProps {
  innerHTML: string | undefined;
}

const IssueBody = ({ innerHTML }: IssueBodyProps) => {
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: innerHTML ?? "No description provided.",
      }}
    ></div>
  );
};

export default IssueBody;
