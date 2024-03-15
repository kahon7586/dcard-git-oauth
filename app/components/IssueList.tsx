"use client"

import React, { ReactNode, useEffect, useRef, useState } from "react"
import { useInfiniteScroll } from "../hook/useInfiniteScroll"

interface IssueListProps {
  issueNodeList: ReactNode[] | null
  action: (pages: number) => Promise<React.JSX.Element[] | null>
}

const IssueList = ({ issueNodeList, action: getMoreData }: IssueListProps) => {
  const issueListRef = useRef<HTMLDivElement | null>(null)

  const [page, setPage] = useState(2)
  const [list, setList] = useState(issueNodeList ?? [])

  const [isBottom, setIsBottom] = useInfiniteScroll(issueListRef)

  useEffect(() => {
    if (isBottom === false) return

    async function pushData() {
      const newNodeList = await getMoreData(page)

      console.log(`newNodeList: ${newNodeList}`)

      if (newNodeList === null) return

      setList((prev) => [...prev, ...newNodeList])
      setPage((prev) => prev + 1) // fix for no new data but still increase
      setIsBottom(false)
    }

    pushData()
  }, [isBottom])

  if (issueNodeList === null) return <div> no issue data! </div>

  return (
    <div
      className="container flex flex-col bg-slate-300 max-h-[300px] overflow-auto"
      ref={issueListRef}>
      {list}
    </div>
  )
}

export default IssueList
