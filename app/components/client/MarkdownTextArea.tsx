"use client"

import React, { TextareaHTMLAttributes, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import Button from "../Button"

interface MarkdownTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  markdownParser: (markdownStr: string) => Promise<string>
  defaultValue?: string | number | readonly string[] | undefined
}

const MarkdownTextArea = ({
  markdownParser,
  defaultValue = "",
  name = "body",
  className,
  ...props
}: MarkdownTextAreaProps) => {
  const [isPreview, setIsPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [previewHTML, setPreviewHTML] = useState("")

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
    <>
      <div className="flex w-fit gap-2 items-center">
        <label htmlFor="body">Body</label>
        <Button
          className="border px-2 rounded-md py-1 disabled:cursor-wait disabled:text-primary dark:disabled:text-primary-d"
          onClick={handleClickPreview}
          type="button"
          disabled={isLoading}>
          {isLoading ? "loading..." : isPreview ? "edit" : "preview"}
        </Button>
      </div>

      {/* <--- Markdown preview ---> */}

      <div
        className={`${
          isPreview ? "block" : "hidden"
        } markdown-body text-primary dark:text-primary-d text-sm font-bold resize-none w-full px-2 py-1`}
        dangerouslySetInnerHTML={{ __html: previewHTML }}></div>

      {/* <--- Markdown editor ---> */}

      <textarea
        className={twMerge(
          `${
            isPreview ? "hidden" : "block"
          } text-primary dark:text-primary-d bg-primary dark:bg-primary-d border-primary dark:border-primary-d border text-sm font-bold resize-none w-full h-[400px] px-2 py-1 rounded-md`,
          className
        )}
        name={name}
        defaultValue={defaultValue}
        ref={editorRef}
        {...props}
      />
    </>
  )
}

export default MarkdownTextArea
