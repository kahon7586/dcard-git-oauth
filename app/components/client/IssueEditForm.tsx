"use client";

import { useAppendFormdata } from "@/app/hook/useAppendFormdata";
import { markdownParser } from "@/app/lib/server/markdown/markdownParser";
import React, { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import MarkdownTextArea from "./MarkdownTextArea";
import LinkButton from "../LinkButton";
import Button from "../Button";

interface IssueEditFormProp {
  editIssue: (
    prevState: FormState | null,
    formData: FormData,
  ) => Promise<FormState | null>;
  postNumber: string;
  markdownParser: (markdownStr: string) => Promise<string>;
  content: {
    title: string;
    body: string | undefined | null;
    number: number;
  };
}

export interface FormState {
  errorMessage: string | null;
  success: boolean;
}

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <Button className="rounded-md border px-2 py-1 " disabled={pending}>
      {pending ? "Sending..." : "Submit"}
    </Button>
  );
}

const IssueEditForm = ({
  editIssue,
  postNumber,
  content,
}: IssueEditFormProp) => {
  const [formState, submitAction] = useFormState(editIssue, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  useAppendFormdata(formRef, { number: postNumber }); //[[appendNumber]]

  return (
    <form action={submitAction} ref={formRef}>
      {formState?.errorMessage ? (
        <div className="flex w-fit rounded-lg border border-red-500 bg-red-100 px-2 py-1 text-red-500">
          {formState.errorMessage}
        </div>
      ) : null}

      {/* <--- Title ---> */}
      <section className="my-6 flex gap-4 text-xl font-bold">
        <label htmlFor="title">Title</label>
        <input
          className="block w-full max-w-[400px] rounded-sm border border-primary bg-primary px-2 text-xl text-primary dark:border-primary-d dark:bg-primary-d dark:text-primary-d "
          type="text"
          name="title"
          defaultValue={content.title}
        />
      </section>

      {/* <--- Body ---> */}
      <section className="flex flex-col gap-2 text-xl font-bold">
        <MarkdownTextArea
          markdownParser={markdownParser}
          defaultValue={content.body!}
        />
      </section>

      {/* <--- Footer ---> */}
      <section className="mt-6 flex justify-center gap-2">
        <LinkButton
          href={`/issue-list/issue/${postNumber}`}
          className="border-none"
        >
          Cancel
        </LinkButton>
        <SubmitBtn />
      </section>
    </form>
  );
};

export default IssueEditForm;
