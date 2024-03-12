"use client"

import React, { useLayoutEffect, useRef } from "react"

interface IssueBodyProps {
  sanitized_innerHTML: string
}

const IssueBody = ({ sanitized_innerHTML }: IssueBodyProps) => {
  /////////////////////////////////////////////////////////

  // MAKE SURE innerHTML IS SANITIZED FROM XSS ATTACK!! ///

  /////////////////////////////////////////////////////////

  return (
    <div
      className="markdown"
      dangerouslySetInnerHTML={{ __html: sanitized_innerHTML }}></div>
  )
}

export default IssueBody
