"use client"

import { useAppendFormdata } from "@/app/hook/useAppendFormdata"
import { markdownParser } from "@/app/lib/server/markdown/markdownParser"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

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

  const [isPreview, setIsPreview] = useState(false)
  const [previewHTML, setPreviewHTML] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const editorRef = useRef<HTMLTextAreaElement | null>(null)

  async function handleClickPreview() {
    // Preview -> edit
    if (isPreview) {
      setIsPreview(false)
      return
    }

    // Edit -> Preview
    const editor = editorRef.current!
    const currMarkdown = editor.value

    try {
      setIsLoading(true)
      const markdonwHTML = await markdownParser(currMarkdown) //! unsanitized
      setPreviewHTML(markdonwHTML)
    } catch (err) {
      console.log(err)
    } finally {
      setIsPreview(true)
      setIsLoading(false)
    }
  }

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

      <section className="flex flex-col font-bold text-xl gap-2">
        <div className="flex w-fit gap-2 items-center">
          <label htmlFor="body">Body</label>
          <button
            className="border px-2 rounded-md bg-slate-300 hover:bg-slate-200 disabled:bg-gray-300 disabled:cursor-wait disabled:text-gray-500"
            onClick={handleClickPreview}
            type="button"
            disabled={isLoading}>
            {isLoading ? "loading..." : isPreview ? "edit" : "preview"}
          </button>
        </div>

        {/* <--- Markdown preview ---> */}
        <div
          className={`${
            isPreview ? null : "hidden"
          } markdown-body block text-gray-700 text-sm font-bold resize-none w-full px-2 py-1`}
          dangerouslySetInnerHTML={{ __html: previewHTML }}></div>

        {/* <--- Markdown editor ---> */}
        <textarea
          className={`${
            isPreview ? "hidden" : null
          } block text-gray-700 text-sm font-bold resize-none w-full h-[400px] px-2 py-1`}
          name="body"
          defaultValue={content.body ?? ""}
          ref={editorRef}
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
