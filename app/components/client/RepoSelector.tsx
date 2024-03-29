"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface RepoSelectorProps {
  setRepository: (formData: FormData) => Promise<void>;
}

const RepoSelector = ({ setRepository }: RepoSelectorProps) => {
  const router = useRouter();

  async function submitAction(formData: FormData) {
    await setRepository(formData);
    router.push("/issue-list");

    // * The reason why not redirect in server action is the process of data fetching(get repo from cookie => call REST API) somehow not only depend on server but also client cookie. If redirect in server action, then the client cookie will not being set, which leading error when calling more data.

    // ? However the reason why the client cookie is included needs to be clarified
  }

  return (
    <form
      className="mt-4 flex max-w-[100px] flex-col items-center justify-center gap-4 whitespace-nowrap"
      action={submitAction}
    >
      Enter your repository
      <label htmlFor="owner">Owner</label>
      <input
        className="rounded-md border border-primary bg-secondary px-2 dark:border-primary-d dark:bg-secondary-d"
        name="owner"
        defaultValue="nextauthjs"
      />
      <label htmlFor="repo">Repo</label>
      <input
        className="rounded-md border border-primary bg-secondary px-2 dark:border-primary-d dark:bg-secondary-d"
        name="repo"
        defaultValue="next-auth"
      />
      <button type="submit">Enter</button>
    </form>
  );
};

export default RepoSelector;
