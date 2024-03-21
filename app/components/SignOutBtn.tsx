import React, { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import Button from "./Button"

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
      <Button
        className={className}
        type="submit"
        {...props}>
        {" "}
        Sign Out
      </Button>
    </form>
  )
}

export default SignOutBtn
