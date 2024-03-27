"use client";

import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import MarkdownTextArea from "./MarkdownTextArea";
import LinkButton from "../LinkButton";
import Button from "../Button";

interface IssuePostFormProp {
  actions: {
    postIssue: (
      prevState: FormState | null,
      formData: FormData,
    ) => Promise<FormState>;
    markdownParser: (markdownStr: string) => Promise<string>;
  };
}

export interface FormState {
  errorMessage: string | null;
  success: boolean;
}

function PostBtn() {
  const { pending } = useFormStatus();

  return (
    <Button className="rounded-md border px-2 py-1" disabled={pending}>
      {pending ? "Sending..." : "Submit"}
    </Button>
  );
}

const IssuePostForm = ({ actions }: IssuePostFormProp) => {
  const { postIssue, markdownParser } = actions;
  const [formState, submitAction] = useFormState(postIssue, null);

  return (
    <form action={submitAction}>
      {/* <--- error display ---> */}
      {formState?.errorMessage ? (
        <div className="flex w-fit rounded-lg border border-red-500 bg-red-100 px-2 py-1 text-red-500">
          {formState.errorMessage}
        </div>
      ) : null}

      {/* <--- form body ---> */}
      <section className="my-6 flex gap-4 text-xl font-bold">
        <label htmlFor="title">Title</label>
        <input
          className="block w-full max-w-[400px] rounded-sm border border-primary bg-primary px-2 text-xl text-primary dark:border-primary-d dark:bg-primary-d dark:text-primary-d "
          type="text"
          name="title"
          placeholder="Title..."
        />
      </section>

      <section className="flex flex-col gap-2 text-xl font-bold">
        <MarkdownTextArea markdownParser={markdownParser} />
      </section>

      <section className="mt-6 flex justify-center gap-2">
        <LinkButton href={`/issue-list`} className="border-none">
          Cancel
        </LinkButton>
        <PostBtn />
      </section>
    </form>
  );
};

export default IssuePostForm;
