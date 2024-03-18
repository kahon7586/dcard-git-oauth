"use client"

import { useAppendFormdata } from "@/app/hook/useAppendFormdata"
import Link from "next/link"
import React, { useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

interface IssueEditFormProp {
  editIssue: (prevState: FormState | null, formData: FormData) => Promise<FormState>
  postNumber: string
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
    <button
      className="border rounded-md px-2 py-1 bg-blue-400 hover:bg-blue-300 disabled:bg-gray-400"
      disabled={pending}>
      {pending ? "Sending..." : "Submit"}
    </button>
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

      <section className="font-bold text-xl gap-4 flex my-6">
        <label htmlFor="title">Title</label>
        <input
          className="block px-2 text-xl text-gray-700 w-full max-w-[400px]"
          type="text"
          name="title"
          defaultValue={content.title}
        />
      </section>
      <section>
        <label htmlFor="body">Body</label>
        <textarea
          className="block text-gray-700 text-sm font-bold resize-none w-full h-[400px] px-2"
          name="body"
          defaultValue={content.body ?? ""}
        />
      </section>

      <section className="flex gap-2 justify-center mt-6">
        <Link
          className="border rounded-md px-2 py-1 bg-slate-300 hover:bg-slate-200"
          href={`/issue-list/issue/${postNumber}`}>
          Cancel
        </Link>
        <SubmitBtn />
      </section>
    </form>
  )
}

export default IssueEditForm
