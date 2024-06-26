"use server";

import { getOctokit } from "../auth/getOctokit";
import { revalidatePath } from "next/cache";
import { getRepoOrRedirect } from "../github/getRepository";
import { errorHandler } from "../github/errorHandler";
import { toIssueList } from "../nextjs/redirectTo";

export async function closeIssue(postNumber: number) {
  const octokit = await getOctokit();

  const repoValue = await getRepoOrRedirect();
  if (repoValue === undefined) return null;

  const { repo, owner } = repoValue;

  try {
    await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
      owner: owner,
      repo: repo,
      issue_number: postNumber,
      state: "closed",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (err) {
    errorHandler(err);
  }

  revalidatePath("/issue-list");
  await toIssueList();
  return;

  // * It is intended design that redirect behavior should be after try-catch block.
  // * see:https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
}
