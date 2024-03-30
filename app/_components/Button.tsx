import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        " rounded-md border border-primary px-2 py-1 hover:bg-primary-hover dark:border-primary-d  dark:hover:bg-primary-hover-d ",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
