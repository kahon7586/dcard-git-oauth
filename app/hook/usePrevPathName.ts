"use client";

import { usePathname } from "next/navigation";

const usePrevPathName = () => {
  const pathSegment = usePathname().split("/");
  pathSegment.pop();

  return pathSegment.join("/");
};

export default usePrevPathName;
