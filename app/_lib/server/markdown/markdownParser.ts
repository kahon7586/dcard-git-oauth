"use server";

import xss from "xss";
import { getOctokit } from "../auth/getOctokit";

/*
// Currently innerHTML is being called from github rest api.
// However, there's no evidence that github sanitized xss danger for us
//So this markdownParser is reserved for future needed.
 */

/*
 * This parser is currently used in markdown preview
 */

export async function markdownParser(markdownStr: string) {
  const octokit = await getOctokit();

  const res = await octokit.request("POST /markdown", {
    text: markdownStr,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const unsanitizedInnerHTML: string = res.data;

  //// const sanitizedInnerHTML = xssSanitizer(unsanitizedInnerHTML)
  // * Use xssSanitizer will destory some some syntax, like: task list

  return unsanitizedInnerHTML;
}

// function xssSanitizer(unsanitizedString: string) {
//   return xss(unsanitizedString)
// }
