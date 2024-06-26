import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={twMerge(
        "fill-text-primary dark:fill-text-primary-d mr-2 h-[25px] w-[25px] p-[1px]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="0.75s"
            values="0 12 12;360 12 12"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default Spinner;
