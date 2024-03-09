import { cookies } from "next/headers"
import { Octokit } from "octokit"
import xss from "xss"

export async function markdownParser(markdownStr: string) {
  const token = cookies().get("access-token")
  // console.log(token)

  const octokit = new Octokit({
    auth: token?.value,
  })

  const res = await octokit.request("POST /markdown", {
    text: markdownStr,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  const unsanitizedInnerHTML: string = res.data

  const sanitizedInnerHTML = xssSanitizer(unsanitizedInnerHTML)

  return sanitizedInnerHTML
}

function xssSanitizer(unsanitizedString: string) {
  return xss(unsanitizedString)
}
