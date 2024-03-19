"use client"

import React from "react"
// import "./IssueBody.css"

interface IssueBodyProps {
  sanitized_innerHTML: string
}

const IssueBody = ({ sanitized_innerHTML }: IssueBodyProps) => {
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: sanitized_innerHTML }}></div>
  )
}

//test

export default IssueBody
