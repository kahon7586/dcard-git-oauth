"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "../hook/useInfiniteScroll";
import Spinner from "./Spinner";

interface IssueListProps {
  firstPageData: React.JSX.Element[] | string | null;
  action: (pages: number) => Promise<React.JSX.Element[] | string | null>;
}

const IssueList = ({
  firstPageData,
  action: getIssueNodeList,
}: IssueListProps) => {
  const isErrorOccur = typeof firstPageData === "string";

  const issueListRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(2); // ref for next page number, start from 1

  const [list, setList] = useState(() => {
    if (isErrorOccur) return null;

    return firstPageData;
  });
  const [isNoMoreData, setIsNoMoreData] = useState(
    firstPageData === null || isErrorOccur,
  );

  const [error, setError] = useState(() => {
    if (isErrorOccur) {
      const errorMessage = firstPageData;
      return errorMessage;
    }
    return null;
  });

  const [isBottom, setIsBottom] = useInfiniteScroll(issueListRef);

  useEffect(() => {
    if (isBottom === false || isNoMoreData || isErrorOccur) return;

    async function pushData() {
      const data = await getIssueNodeList(pageRef.current);
      const isErrorOccur = typeof data === "string";
      if (isErrorOccur) {
        setIsNoMoreData(true);
        setError(data);
        return;
      }

      if (data === null) {
        setIsNoMoreData(true);
        return;
      }

      setList((prev) => [...prev!, ...data]);
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
      {isBottom && !isNoMoreData && !isErrorOccur ? (
        <div className="sticky top-[50%] my-4 flex cursor-default items-center justify-center ">
          <Spinner className=" dark:fill-white" />
          Loading...
        </div>
      ) : null}

      {list}

      <div className="my-4 flex justify-center">
        {isErrorOccur ? error : isNoMoreData ? "No More Data!" : null}
      </div>
    </div>
  );
};

export default IssueList;
