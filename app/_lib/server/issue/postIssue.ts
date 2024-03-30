import { FormState } from "@/app/_components/client/IssueEditForm";
import { getOctokit } from "../auth/getOctokit";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkValidation } from "./checkValidation";
import { getRepoOrRedirect } from "../github/getRepository";
import { errorConverter } from "../github/errorConverter";

// Action for sending form to post issue

export async function postIssue(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState | null> {
  "use server";

  let initialState = {
    errorMessage: "",
    success: false,
  };

  const title = formData.get("title") as string | null;
  const body = formData.get("body") as string | null;

  const { validation, reason } = checkValidation(title, body);
  if (!validation) return { ...initialState, errorMessage: reason };

  const octokit = await getOctokit();

  const { repo, owner } = await getRepoOrRedirect();

  console.log(`get repo:${repo}, owner:${owner}`);

  let isRedirect = true;

  try {
    await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      title: title!,
      body: body!,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (err) {
    const message = errorConverter(err);
    isRedirect = false;
    return {
      ...initialState,
      errorMessage: message,
    };
  }

  if (isRedirect) {
    revalidatePath("/issue-list");
    // clear cache for latest data
    redirect("/issue-list");

    // * It is intended design that redirect behavior should be after try-catch block.
    // * see:https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
  }

  return prevState;
}
