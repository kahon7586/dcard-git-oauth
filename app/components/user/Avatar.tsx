import Image from "next/image"
import React, { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  avatarUrl: string
  alt: string
  className?: string
}
const Avatar = ({ avatarUrl, alt, className, ...props }: AvatarProps) => {
  return (
    <div
      className={twMerge("size-5 relative", className)}
      {...props}>
      <Image
        fill
        src={avatarUrl}
        alt={alt}
      />
    </div>
  )
}

export default Avatar
