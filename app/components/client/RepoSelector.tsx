"use client";

import React from "react";

interface RepoSelectorProps {
  setRepository: any;
}

const RepoSelector = ({ setRepository }: RepoSelectorProps) => {
  return (
    <form
      className="mt-4 flex max-w-[100px] flex-col items-center justify-center gap-4 whitespace-nowrap"
      action={setRepository}
    >
      Enter your repository
      <label htmlFor="owner">Owner</label>
      <input
        className="rounded-md border border-primary bg-secondary px-2 dark:border-primary-d dark:bg-secondary-d"
        name="owner"
      />
      <label htmlFor="repo">Repo</label>
      <input
        className="rounded-md border border-primary bg-secondary px-2 dark:border-primary-d dark:bg-secondary-d"
        name="repo"
      />
      <button type="submit">Enter</button>
    </form>
  );
};

export default RepoSelector;
