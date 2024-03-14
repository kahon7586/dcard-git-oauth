import { FormState } from "@/app/components/client/IssueEditForm"
import { getOctokit } from "../auth/getOctokit"
import { revalidatePath } from "next/cache"

// Action for sending form to post issue

export async function postIssue(prevState: FormState | null, formData: FormData): Promise<FormState> {
  "use server"

  let initialState = {
    errorMessage: "",
    success: false,
  }

  const title = formData.get("title") as string | null
  const body = formData.get("body") as string | undefined

  if (title === null) return { ...initialState, errorMessage: "FormData did not include title value!" }
  if (title.trim() === "") return { ...initialState, errorMessage: "Please choose a title!" }
  // handle empty input value

  const octokit = await getOctokit()
  const { status }: { status: number } = await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: process.env.OWNER!,
    repo: process.env.REPO!,
    title: title,
    body: body,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  switch (status) {
    case 201:
      revalidatePath("/home")
      // clear cache for latest data
      return {
        errorMessage: "",
        success: true,
      }
    case 400:
      return {
        ...initialState,
        errorMessage: "400: Bad request.",
      }
    case 403:
      return {
        ...initialState,
        errorMessage: "403: You don't have permission to post issue, check your authorization and try again.",
      }
    case 404:
      return {
        ...initialState,
        errorMessage: "404: This repo is not found.",
      }
    case 410:
      return {
        ...initialState,
        errorMessage: "410: Post issue is now allowed in this repos.",
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
