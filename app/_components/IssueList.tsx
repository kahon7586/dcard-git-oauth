"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "../_hook/useInfiniteScroll";
import Spinner from "./Spinner";
import { SimpIssueData } from "../_ts/data/issueData";
import IssueItem from "./IssueItem";

function dataToItemList(data: SimpIssueData[]) {
  return data.map((issue) => (
    <IssueItem issueItem={issue} key={issue.content.id} />
  ));
}

interface IssueListProps {
  firstPageData: {
    message: string;
    data: SimpIssueData[] | undefined | null;
  };
  action: (
    pages: number,
  ) => Promise<{ message: string; data: SimpIssueData[] | undefined | null }>;
}

const IssueList = ({ firstPageData, action: getIssueList }: IssueListProps) => {
  const { message, data } = firstPageData;

  const issueListRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(2); // ref for next page number, start from 1

  const [list, setList] = useState(() => {
    if (!data) return null;

    return dataToItemList(data);
  });

  const [isNoMoreData, setIsNoMoreData] = useState(!data);

  const [error, setError] = useState(() => {
    if (isNoMoreData) {
      return message;
    }
    return null;
  });

  const [isBottom, setIsBottom] = useInfiniteScroll(issueListRef);

  useEffect(() => {
    if (isBottom === false || isNoMoreData) return;

    async function pushData() {
      const { message, data: newData } = await getIssueList(pageRef.current);

      if (!newData) {
        setIsNoMoreData(true);
        setError("No more data!");
        return;
      }

      setList((prev) => {
        const prevData = prev!;

        const newDataList = dataToItemList(newData);

        return [...prevData, ...newDataList];
      });
      pageRef.current += 1;
      setIsBottom(false);
    }
    pushData();
  }, [isBottom, getIssueList, isNoMoreData, setIsBottom]);

  return (
    <div
      className="container flex max-h-[300px] flex-col overflow-auto bg-primary dark:bg-primary-d"
      ref={issueListRef}
    >
      {isBottom && !isNoMoreData ? (
        <div className="sticky top-[50%] my-4 flex cursor-default items-center justify-center ">
          <Spinner />
          Loading...
        </div>
      ) : null}

      {list}

      {error ? <div className="my-4 flex justify-center">{error}</div> : null}
    </div>
  );
};

export default IssueList;
