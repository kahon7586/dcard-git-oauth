import {
  GithubError,
  IssueContentData,
  SimpIssueData,
} from "@/app/_ts/data/issueData";
import { getOctokit } from "../auth/getOctokit";
import { getRepoOrRedirect } from "../github/getRepository";

export async function getIssueListData(
  newPage: number,
  per_page: number = 10,
): Promise<{
  message: string;
  data: SimpIssueData[] | undefined | null;
}> {
  const octokit = await getOctokit();

  // Example:
  // https://github.com/kahon7586/dcard-git-oauth/issues

  const repoValue = await getRepoOrRedirect();
  if (repoValue === undefined)
    return { message: "Repository is not specified!", data: undefined };

  const { repo, owner } = repoValue;

  try {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      per_page: per_page,
      page: newPage,
    });

    if (data.length === 0)
      return { message: "No issue in this repo!", data: null };

    const dataList = data.map((issue) => {
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

    return { message: "Success.", data: dataList };
  } catch (err: unknown) {
    console.log(err);
    const errRes = err as GithubError;

    const {
      status,
      response: {
        data: { message, documentation_url },
      },
    } = errRes;

    if (status === 404) {
      return { message: "Repository not found!", data: undefined };
      // Usually not found should be the most common case because the repo and owner is specified initailly by user, so it is specially handled
    }

    throw Error(`${status.toString()} ${message}, see: ${documentation_url}`);
  }
}
