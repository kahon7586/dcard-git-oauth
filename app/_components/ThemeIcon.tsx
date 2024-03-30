import React from "react";
import { IconBaseProps, IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ThemeIconProps extends IconBaseProps {
  Icon: IconType;
}

const ThemeIcon = ({ Icon, className, ...props }: ThemeIconProps) => {
  return (
    <div className="rounded-full p-1 hover:bg-primary-hover dark:bg-primary-d hover:dark:bg-primary-hover-d">
      <Icon
        className={twMerge(
          "h-full flex-shrink-0 flex-grow-0 cursor-pointer",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default ThemeIcon;
