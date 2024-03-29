import { FormState } from "@/app/components/client/IssueEditForm";
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
): Promise<FormState> {
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

    revalidatePath("/issue-list");
    // clear cache for latest data
    redirect("/issue-list");
  } catch (err) {
    const message = errorConverter(err);

    return {
      ...initialState,
      errorMessage: message,
    };
  }
}
