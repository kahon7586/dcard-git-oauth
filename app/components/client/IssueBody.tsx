"use client"

import React from "react"
import "github-markdown-css"
import "./IssueBody.css"

interface IssueBodyProps {
  innerHTML: string | undefined
}

const IssueBody = ({ innerHTML }: IssueBodyProps) => {
  return (
    <div
      className="markdown-body px-4 py-2 border rounded-lg min-h-[3rem]"
      dangerouslySetInnerHTML={{ __html: innerHTML ?? "No description provided." }}></div>
  )
}

//test // test2

export default IssueBody
