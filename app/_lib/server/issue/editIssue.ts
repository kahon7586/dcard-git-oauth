import { FormState } from "@/app/_components/client/IssueEditForm";
import { getOctokit } from "../auth/getOctokit";
import { revalidatePath } from "next/cache";
import { checkValidation } from "./checkValidation";
import { getRepoOrRedirect } from "../github/getRepository";
import { errorConverter } from "../github/errorConverter";
import { toIssue } from "../nextjs/redirectTo";

// Action for sending form to edit issue

export async function editIssue(
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

  const number = formData.get("number") as string | null;
  if (!number)
    return {
      ...initialState,
      errorMessage: "Post number is undefined, check your form data!",
    };
  // number is appended by eventListener in edit form //[[@appendNumber]]

  const octokit = await getOctokit();

  const repoValue = await getRepoOrRedirect();
  if (repoValue === undefined) return null;

  const { repo, owner } = repoValue;

  let isRedirect = true;

  try {
    await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
      repo: repo,
      owner: owner,
      issue_number: Number(number),
      title: title,
      body: body,
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
    revalidatePath("/issue-list/issue/[postNumber]", "page");
    // clear cache before return to issue page
    toIssue(number);

    // * It is intended design that redirect behavior should be after try-catch block.
    // * see:https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
  }

  return prevState;
}
