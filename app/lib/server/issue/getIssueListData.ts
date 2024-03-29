import { IssueContentData, SimpIssueData } from "@/app/ts/data/issueData";
import { getOctokit } from "../auth/getOctokit";
import { getStatusMessage } from "../github/getStatusMessage";
import { getRepoOrRedirect } from "../github/getRepository";

export async function getIssueListData(newPage: number, per_page: number = 10) {
  const octokit = await getOctokit();

  // Example:
  // https://github.com/kahon7586/dcard-git-oauth/issues

  const { repo, owner } = await getRepoOrRedirect();

  const res = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: owner,
    repo: repo,
    per_page: per_page,
    page: newPage,
  });

  const { data, status } = res;

  if (status !== 200)
    throw Error(getStatusMessage(status, getIssueListData.name));

  if (data.length === 0) return null;

  return data.map((issue) => {
    const { title, body, id, state, number, user, created_at, updated_at } =
      issue;

    if (user === null)
      throw Error("Author not found with this issue id: " + id);

    const contentData: IssueContentData = {
      title,
      body,
      id,
      state,
      number,
      created_at,
      updated_at,
    };

    return { content: contentData, user: user } as SimpIssueData;
  });
}
