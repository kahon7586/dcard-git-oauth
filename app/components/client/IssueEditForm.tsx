"use client"

import { useAppendFormdata } from "@/app/hook/useAppendFormdata"
import { markdownParser } from "@/app/lib/server/markdown/markdownParser"
import React, { useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"
import MarkdownTextArea from "./MarkdownTextArea"
import LinkButton from "../LinkButton"
import Button from "../Button"

interface IssueEditFormProp {
  editIssue: (prevState: FormState | null, formData: FormData) => Promise<FormState>
  postNumber: string
  markdownParser: (markdownStr: string) => Promise<string>
  content: {
    title: string
    body: string | undefined | null
    number: number
  }
}

export interface FormState {
  errorMessage: string | null
  success: boolean
}

function SubmitBtn() {
  const { pending } = useFormStatus()

  return (
    <Button
      className="border rounded-md px-2 py-1 "
      disabled={pending}>
      {pending ? "Sending..." : "Submit"}
    </Button>
  )
}

const IssueEditForm = ({ editIssue, postNumber, content }: IssueEditFormProp) => {
  const [formState, submitAction] = useFormState(editIssue, null)
  const formRef = useRef<HTMLFormElement | null>(null)
  useAppendFormdata(formRef, { number: postNumber }) //[[appendNumber]]

  return (
    <form
      action={submitAction}
      ref={formRef}>
      {formState?.errorMessage ? (
        <div className="flex w-fit px-2 py-1 border text-red-500 bg-red-100 border-red-500 rounded-lg">
          {formState.errorMessage}
        </div>
      ) : null}

      {/* <--- Title ---> */}
      <section className="font-bold text-xl gap-4 flex my-6">
        <label htmlFor="title">Title</label>
        <input
          className="block px-2 text-xl text-primary dark:text-primary-d bg-primary dark:bg-primary-d border-primary dark:border-primary-d rounded-sm border w-full max-w-[400px] "
          type="text"
          name="title"
          defaultValue={content.title}
        />
      </section>

      {/* <--- Body ---> */}
      <section className="flex flex-col font-bold text-xl gap-2">
        <MarkdownTextArea
          markdownParser={markdownParser}
          defaultValue={content.body!}
        />
      </section>

      {/* <--- Footer ---> */}
      <section className="flex gap-2 justify-center mt-6">
        <LinkButton
          href={`/issue-list/issue/${postNumber}`}
          className="border-none">
          Cancel
        </LinkButton>
        <SubmitBtn />
      </section>
    </form>
  )
}

export default IssueEditForm
