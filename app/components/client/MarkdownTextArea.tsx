"use client";

import React, { TextareaHTMLAttributes, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";

interface MarkdownTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  markdownParser: (markdownStr: string) => Promise<string>;
  defaultValue?: string | number | readonly string[] | undefined;
}

const MarkdownTextArea = ({
  markdownParser,
  defaultValue = "",
  name = "body",
  className,
  ...props
}: MarkdownTextAreaProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");

  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  async function handleClickPreview() {
    // Preview -> edit
    if (isPreview) {
      setIsPreview(false);
      return;
    }

    // Edit -> Preview
    const editor = editorRef.current!;
    const currMarkdown = editor.value;

    try {
      setIsLoading(true);
      const markdonwHTML = await markdownParser(currMarkdown); //! unsanitized
      setPreviewHTML(markdonwHTML);
    } catch (err) {
      console.log(err);
    } finally {
      setIsPreview(true);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex w-fit items-center gap-2">
        <label htmlFor="body">Body</label>
        <Button
          className="rounded-md border px-2 py-1 disabled:cursor-wait disabled:text-primary dark:disabled:text-primary-d"
          onClick={handleClickPreview}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? "loading..." : isPreview ? "edit" : "preview"}
        </Button>
      </div>

      {/* <--- Markdown preview ---> */}

      <div
        className={`${
          isPreview ? "block" : "hidden"
        } markdown-body w-full resize-none px-2 py-1 text-sm font-bold text-primary dark:text-primary-d`}
        dangerouslySetInnerHTML={{ __html: previewHTML }}
      ></div>

      {/* <--- Markdown editor ---> */}

      <textarea
        className={twMerge(
          `${
            isPreview ? "hidden" : "block"
          } h-[400px] w-full resize-none rounded-md border border-primary bg-primary px-2 py-1 text-sm font-bold text-primary dark:border-primary-d dark:bg-primary-d dark:text-primary-d`,
          className,
        )}
        name={name}
        defaultValue={defaultValue}
        ref={editorRef}
        {...props}
      />
    </>
  );
};

export default MarkdownTextArea;
