"use client"

import React, { useLayoutEffect, useRef } from "react"

interface IssueBodyProps {
  innerHTML: string
}

const IssueBody = ({ innerHTML }: IssueBodyProps) => {
  const bodyRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const body = bodyRef.current
    if (body === null) throw Error("bodyRef should not being null!")
    body.innerHTML = innerHTML
  }, [])

  return (
    <div
      className="markdown"
      ref={bodyRef}></div>
  )
}

export default IssueBody
