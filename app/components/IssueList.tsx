"use client"

import React, { useEffect, useRef, useState } from "react"
import { useInfiniteScroll } from "../hook/useInfiniteScroll"
import Spinner from "./Spinner"

interface IssueListProps {
  firstPageData: React.JSX.Element[] | null
  action: (pages: number) => Promise<React.JSX.Element[] | null>
}

const IssueList = ({ firstPageData, action: getIssueNodeList }: IssueListProps) => {
  const issueListRef = useRef<HTMLDivElement | null>(null)

  const pageRef = useRef(2)
  const [list, setList] = useState(firstPageData)
  const [isNoMoreData, setIsNoMoreData] = useState(firstPageData === null)

  const [isBottom, setIsBottom] = useInfiniteScroll(issueListRef)

  useEffect(() => {
    if (isBottom === false || isNoMoreData === true) return

    async function pushData() {
      const newNodeList = await getIssueNodeList(pageRef.current)

      if (newNodeList === null) {
        setIsNoMoreData(true)
        return
      }
      setList((prev) => [...prev!, ...newNodeList])
      pageRef.current += 1
      setIsBottom(false)
    }

    pushData()
  }, [isBottom])

  return (
    <div
      className="container flex flex-col  bg-slate-300 max-h-[300px] overflow-auto"
      ref={issueListRef}>
      {list}
      {isNoMoreData ? (
        <div className="flex justify-center my-4">No More Data!</div>
      ) : (
        <div className="flex justify-center items-center my-4">
          <Spinner />
          Loading...
        </div>
      )}
    </div>
  )
}

export default IssueList
