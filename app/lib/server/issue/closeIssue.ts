"use server";

import { redirect } from "next/navigation";
import { getOctokit } from "../auth/getOctokit";
import { revalidatePath } from "next/cache";
import { getRepoOrRedirect } from "../github/getRepository";
import { errorHandler } from "../github/errorHandler";

export async function closeIssue(postNumber: number) {
  const octokit = await getOctokit();

  const { repo, owner } = await getRepoOrRedirect();

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

    revalidatePath("/issue-list");
    redirect("/issue-list");
  } catch (err) {
    errorHandler(err);
  }
}
