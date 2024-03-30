import { ResCommentData, SimpCommentData } from "@/app/_ts/data/commentData";
import { getOctokit } from "../auth/getOctokit";
import { getRepoOrRedirect } from "../github/getRepository";
import { errorHandler } from "../github/errorHandler";

export async function getIssueComments(postNumber: number) {
  const octokit = await getOctokit();

  const { repo, owner } = await getRepoOrRedirect();
  if (repo === undefined || owner === undefined) return null;

  try {
    const res = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: owner,
        repo: repo,
        issue_number: postNumber,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          accept: "application/vnd.github.html+json",
        },
      },
    );

    const { data: dataList } = res;

    if (dataList.length === 0) return null;

    return dataList.map((data: ResCommentData) => {
      const { id, updated_at, created_at, body_html: body, user } = data;

      if (user === null)
        throw Error("Author not found with this comment id: " + id);

      const contentData = { id, updated_at, created_at, body };

      return { content: contentData, user: user } as SimpCommentData;
    });
  } catch (err) {
    errorHandler(err);
  }
}
