import { FormState } from "@/app/components/client/IssueEditForm"
import { getOctokit } from "../auth/getOctokit"
import { revalidatePath } from "next/cache"

// Action for sending form to edit issue

export async function editIssue(prevState: FormState | null, formData: FormData): Promise<FormState> {
  "use server"

  let initialState = {
    errorMessage: "",
    success: false,
  }

  const title = formData.get("title") as string | null
  const body = formData.get("body") as string | null

  const number = formData.get("number") as string | null
  // number is appended by eventListener in edit form

  if (title === null) return { ...initialState, errorMessage: "FormData did not include title value!" }
  if (title.trim() === "") return { ...initialState, errorMessage: "Please choose a title!" }
  // handle empty input value

  const octokit = await getOctokit()
  const { status }: { status: number } = await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    repo: process.env.REPO!,
    owner: process.env.OWNER!,
    issue_number: Number(number),
    title: title,
    body: body,
  })

  switch (status) {
    case 200:
      revalidatePath(`/issue-list/issue/${number}`)
      // clear cache before return to issue page
      // return behavior is in //[[@redirectAfterEdit]]
      return {
        errorMessage: "",
        success: true,
      }
    case 301:
      return {
        ...initialState,
        errorMessage: "301: This issue was moved permanently.",
      }
    case 403:
      return {
        ...initialState,
        errorMessage: "403: You don't have permission to edit this issue, check your authorization and try again.",
      }
    case 404:
      return {
        ...initialState,
        errorMessage: "404: This issue is not found.",
      }
    case 410:
      return {
        ...initialState,
        errorMessage: "410: This issue was gone.",
      }
    case 422:
      return {
        ...initialState,
        errorMessage: "422: Validation failed, or the endpoint has been spammed.",
      }
    case 503:
      return {
        ...initialState,
        errorMessage: "503: Github service unavailable, try again later.",
      }
    default:
      return {
        ...initialState,
        errorMessage: `Unrecognized status: ${status}`,
      }
  }
}
