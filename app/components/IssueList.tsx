"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "../hook/useInfiniteScroll";
import Spinner from "./Spinner";

interface IssueListProps {
  firstPageData: React.JSX.Element[] | null;
  action: (pages: number) => Promise<React.JSX.Element[] | null>;
}

const IssueList = ({
  firstPageData,
  action: getIssueNodeList,
}: IssueListProps) => {
  const issueListRef = useRef<HTMLDivElement | null>(null);

  const pageRef = useRef(2);
  const [list, setList] = useState(firstPageData);
  const [isNoMoreData, setIsNoMoreData] = useState(firstPageData === null);

  const [isBottom, setIsBottom] = useInfiniteScroll(issueListRef);

  useEffect(() => {
    if (isBottom === false || isNoMoreData === true) return;

    async function pushData() {
      const newNodeList = await getIssueNodeList(pageRef.current);

      if (newNodeList === null) {
        setIsNoMoreData(true);
        return;
      }
      setList((prev) => [...prev!, ...newNodeList]);
      pageRef.current += 1;
      setIsBottom(false);
    }
    pushData();
  }, [isBottom, getIssueNodeList, isNoMoreData, setIsBottom]);

  return (
    <div
      className="container flex max-h-[300px] flex-col overflow-auto bg-primary dark:bg-primary-d"
      ref={issueListRef}
    >
      {isBottom && !isNoMoreData ? (
        <div className="sticky top-[50%] my-4 flex cursor-default items-center justify-center ">
          <Spinner className=" dark:fill-white" />
          Loading...
        </div>
      ) : null}

      {list}

      {isNoMoreData ? (
        <div className="my-4 flex justify-center">No More Data!</div>
      ) : null}
    </div>
  );
};

export default IssueList;
