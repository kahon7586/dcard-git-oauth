import {
  GithubError,
  IssueContentData,
  SimpIssueData,
} from "@/app/ts/data/issueData";
import { getOctokit } from "../auth/getOctokit";
import { getRepoOrRedirect } from "../github/getRepository";

export async function getIssueListData(newPage: number, per_page: number = 10) {
  const octokit = await getOctokit();

  // Example:
  // https://github.com/kahon7586/dcard-git-oauth/issues

  const { repo, owner } = await getRepoOrRedirect();

  try {
    const res = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      per_page: per_page,
      page: newPage,
    });

    const { data } = res;

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
  } catch (err: unknown) {
    console.log(err);
    const errRes = err as GithubError;

    const {
      status,
      response: {
        data: { message, documentation_url },
      },
    } = errRes;

    if (status === 404) return message;
    // Usually not found should be the most common case, so it is specially handled

    throw Error(`${status.toString()} ${message}, see: ${documentation_url}`);
  }
}
