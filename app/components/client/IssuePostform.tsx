"use client"

import Link from "next/link"
import React from "react"
import { useFormState, useFormStatus } from "react-dom"
import MarkdownTextArea from "./MarkdownTextArea"
import LinkButton from "../LinkButton"
import Button from "../Button"

interface IssuePostFormProp {
  actions: {
    postIssue: (prevState: FormState | null, formData: FormData) => Promise<FormState>
    markdownParser: (markdownStr: string) => Promise<string>
  }
}

export interface FormState {
  errorMessage: string | null
  success: boolean
}

function PostBtn() {
  const { pending } = useFormStatus()

  return (
    <Button
      className="border rounded-md px-2 py-1 bg-blue-400 hover:bg-blue-300 disabled:bg-gray-400"
      disabled={pending}>
      {pending ? "Sending..." : "Submit"}
    </Button>
  )
}

const IssuePostForm = ({ actions }: IssuePostFormProp) => {
  const { postIssue, markdownParser } = actions
  const [formState, submitAction] = useFormState(postIssue, null)

  return (
    <form action={submitAction}>
      {/* <--- error display ---> */}
      {formState?.errorMessage ? (
        <div className="flex w-fit px-2 py-1 border text-red-500 bg-red-100 border-red-500 rounded-lg">
          {formState.errorMessage}
        </div>
      ) : null}

      {/* <--- form body ---> */}
      <section className="font-bold text-xl gap-4 flex my-6">
        <label htmlFor="title">Title</label>
        <input
          className="block px-2 text-xl text-primary dark:text-primary-d rounded-sm bg-primary dark:bg-primary-d border-white border w-full max-w-[400px]"
          type="text"
          name="title"
          placeholder="Title..."
        />
      </section>

      <section className="flex flex-col font-bold text-xl gap-2">
        <MarkdownTextArea markdownParser={markdownParser} />
      </section>

      <section className="flex gap-2 justify-center mt-6">
        <LinkButton
          href={`/issue-list`}
          className="border-none">
          Cancel
        </LinkButton>
        <PostBtn />
      </section>
    </form>
  )
}

export default IssuePostForm
