import Link, { LinkProps } from "next/link"
import React, { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface LinkButtonProps extends LinkProps {
  className?: string
  children: ReactNode
}

const LinkButton = ({ className, children, ...props }: LinkButtonProps) => {
  return (
    <Link
      className={twMerge(
        "hover:bg-primary-hover dark:hover:bg-primary-hover-d border border-primary dark:border-primary-d rounded-md px-2 py-1",
        className
      )}
      {...props}>
      {children}
    </Link>
  )
}

export default LinkButton
