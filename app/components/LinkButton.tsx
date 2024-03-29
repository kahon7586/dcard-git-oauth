import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LinkButtonProps extends LinkProps {
  className?: string;
  children: ReactNode;
}

const LinkButton = ({ className, children, ...props }: LinkButtonProps) => {
  return (
    <Link
      className={twMerge(
        "rounded-md border border-primary px-2 py-1 hover:bg-primary-hover dark:border-primary-d dark:hover:bg-primary-hover-d",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
