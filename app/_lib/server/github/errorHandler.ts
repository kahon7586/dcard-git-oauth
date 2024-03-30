import { GithubError } from "@/app/_ts/data/issueData";

export function errorHandler(err: unknown | any) {
  console.log(err);
  const errRes = err as GithubError;

  const {
    status,
    response: {
      data: { message, documentation_url },
    },
  } = errRes;

  throw Error(`${status.toString()} ${message}, see: ${documentation_url}`);
}
