import { FormState } from "@/app/components/client/IssueEditForm"
import { getOctokit } from "../auth/getOctokit"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { checkValidation } from "./checkValidation"
import { getStatusMessage } from "../github/getStatusMessage"

// Action for sending form to edit issue

export async function editIssue(prevState: FormState | null, formData: FormData): Promise<FormState> {
  "use server"

  let initialState = {
    errorMessage: "",
    success: false,
  }

  const title = formData.get("title") as string | null
  const body = formData.get("body") as string | null

  const { validation, reason } = checkValidation(title, body)
  if (!validation) return { ...initialState, errorMessage: reason }

  const number = formData.get("number") as string | null
  // number is appended by eventListener in edit form //[[@appendNumber]]

  const octokit = await getOctokit()
  const { status }: { status: number } = await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    repo: process.env.REPO!,
    owner: process.env.OWNER!,
    issue_number: Number(number),
    title: title,
    body: body,
  })

  if (status === 200) {
    revalidatePath("/issue-list/issue/[postNumber]", "page")
    // clear cache before return to issue page
    redirect(`/issue-list/issue/${number}`)
  }

  // <--- Failed --->
  const message = getStatusMessage(status, editIssue.name)
  return {
    ...initialState,
    errorMessage: message,
  }
}
