import React, { ButtonHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: ReactNode
}

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        " hover:bg-primary-hover dark:hover:bg-primary-hover-d border border-primary dark:border-primary-d rounded-md px-2 py-1",
        className
      )}
      {...props}>
      {children}
    </button>
  )
}

export default Button
