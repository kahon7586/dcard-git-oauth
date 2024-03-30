import Image from "next/image";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  avatarUrl: string;
  alt: string;
  className?: string;
}
const Avatar = ({ avatarUrl, alt, className, ...props }: AvatarProps) => {
  return (
    <div
      className={twMerge(
        "relative size-5 flex-shrink-0 overflow-hidden object-cover",
        className,
      )}
      {...props}
    >
      <Image
        fill
        sizes="width: 1.5rem height:1.5rem"
        src={avatarUrl}
        alt={alt}
      />
    </div>
  );
};

export default Avatar;
