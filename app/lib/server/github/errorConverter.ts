import { GithubError } from "@/app/ts/data/issueData";

// * This function is created for formState, so it simply return message, not throwing error.

export function errorConverter(err: unknown | any) {
  console.log(err);
  const errRes = err as GithubError;
  const {
    status,
    response: {
      data: { message },
    },
  } = errRes;

  return `${status.toString()} ${message}`;
}
