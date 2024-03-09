import Image from "next/image"
import React from "react"

interface AvatarProps {
  avatarUrl: string
  alt: string
}

const Avatar = ({ avatarUrl, alt }: AvatarProps) => {
  return (
    <div className="size-5 relative">
      <Image
        fill
        src={avatarUrl}
        alt={alt}
      />
    </div>
  )
}

export default Avatar
