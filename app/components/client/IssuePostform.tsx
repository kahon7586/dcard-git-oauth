"use client"

import Link from "next/link"
import React from "react"
import { useFormState, useFormStatus } from "react-dom"

interface IssuePostFormProp {
  postIssue: (prevState: FormState | null, formData: FormData) => Promise<FormState>
}

export interface FormState {
  errorMessage: string | null
  success: boolean
}

function PostBtn() {
  const { pending } = useFormStatus()

  return (
    <button
      className="border rounded-md px-2 py-1 bg-blue-400 hover:bg-blue-300 disabled:bg-gray-400"
      disabled={pending}>
      {pending ? "Sending..." : "Submit"}
    </button>
  )
}

const IssuePostForm = ({ postIssue }: IssuePostFormProp) => {
  const [formState, submitAction] = useFormState(postIssue, null)

  return (
    <form action={submitAction}>
      {
        formState?.errorMessage ? (
          <div className="flex w-fit px-2 py-1 border text-red-500 bg-red-100 border-red-500 rounded-lg">
            {formState.errorMessage}
          </div>
        ) : null
        // error display
      }

      <section className="font-bold text-xl gap-4 flex my-6">
        <label htmlFor="title">Title</label>
        <input
          className="block px-2 text-xl text-gray-700 w-full max-w-[400px]"
          type="text"
          name="title"
          placeholder="Title..."
        />
      </section>

      <section>
        <label htmlFor="body">Body</label>
        <textarea
          className="block text-gray-700 text-sm font-bold resize-none w-full h-[400px] px-2"
          name="body"
        />
      </section>

      <section className="flex gap-2 justify-center mt-6">
        <Link
          className="border rounded-md px-2 py-1 bg-slate-300 hover:bg-slate-200"
          href={`/issue-list`}>
          Cancel
        </Link>
        <PostBtn />
      </section>
    </form>
  )
}

export default IssuePostForm
