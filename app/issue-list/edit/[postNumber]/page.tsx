import IssueEditForm from "@/app/_components/client/IssueEditForm";
import { editIssue } from "@/app/_lib/server/issue/editIssue";
import { getSingleIssueData } from "@/app/_lib/server/issue/getSingleIssueData";
import { markdownParser } from "@/app/_lib/server/markdown/markdownParser";
import React from "react";

interface pageProps {
  params: { postNumber: string };
}

const page = async ({ params }: pageProps) => {
  const postNumber = params.postNumber;

  const { title, body } = await getSingleIssueData(postNumber);

  return (
    <div className="container">
      <div className="flex justify-center text-3xl">
        Edit issue #{postNumber}
      </div>
      <IssueEditForm /* client component */
        content={{ title, body, number: Number(postNumber) }}
        editIssue={editIssue}
        postNumber={postNumber}
        markdownParser={markdownParser}
      />
    </div>
  );
};

export default page;
