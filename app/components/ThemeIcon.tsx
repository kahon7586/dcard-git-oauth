import React from "react"
import { IconBaseProps, IconType } from "react-icons"
import { twMerge } from "tailwind-merge"

interface ThemeIconProps extends IconBaseProps {
  Icon: IconType
}

const ThemeIcon = ({ Icon, className, ...props }: ThemeIconProps) => {
  return (
    <div className="p-1 hover:bg-primary-hover dark:bg-primary-d hover:dark:bg-primary-hover-d rounded-full">
      <Icon
        className={twMerge("size-6 flex-shrink-0 flex-grow-0 cursor-pointer", className)}
        {...props}
      />
    </div>
  )
}

export default ThemeIcon
