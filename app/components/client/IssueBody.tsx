"use client"

import React from "react"
import "github-markdown-css"
import "./IssueBody.css"

interface IssueBodyProps {
  sanitized_innerHTML: string
}

const IssueBody = ({ sanitized_innerHTML }: IssueBodyProps) => {
  return (
    <div
      className="markdown-body px-4 py-2  border rounded-lg"
      dangerouslySetInnerHTML={{ __html: sanitized_innerHTML }}></div>
  )
}

//test // test2

export default IssueBody
