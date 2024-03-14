import React, { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface SignOutBtnProps extends HTMLAttributes<HTMLButtonElement> {
  action: (arg?: unknown) => unknown
  className?: string
}

const SignOutBtn = ({ action, className, ...props }: SignOutBtnProps) => {
  return (
    <form
      action={async () => {
        "use server"
        await action()
      }}>
      <button
        className={twMerge("border rounded-md py-1 px-2", className)}
        type="submit"
        {...props}>
        {" "}
        Sign Out
      </button>
    </form>
  )
}

export default SignOutBtn
