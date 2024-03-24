import Image from "next/image"
import React from "react"
import peppoDance from "@/app/asset/PeepoDance.gif"
import crumbCat from "@/app/asset/crumb-cat.gif"
import rainbowParrot from "@/app/asset/rainbowParrot.gif"

const PeppoDance = () => {
  return (
    <Image
      src={peppoDance}
      alt="loading animation"
      width={50}
      height={70}
      unoptimized
    />
  )
}

const CrumbCat = () => {
  return (
    <Image
      className="rounded-full overflow-hidden flex-grow-0 h-fit"
      src={crumbCat}
      alt="loading animation"
      width={50}
      height={50}
      unoptimized
    />
  )
}

const RainbowParrot = () => {
  return (
    <Image
      className="overflow-hidden h-fit"
      src={rainbowParrot}
      alt="loading animation"
      width={50}
      height={50}
      unoptimized
    />
  )
}

function getRandonIcon() {
  const number = Math.floor(Math.random() * 3)
  switch (number) {
    case 0:
      return <PeppoDance />

    case 1:
      return <CrumbCat />

    case 2:
      return <RainbowParrot />

    default:
      return <PeppoDance />
  }
}

const Loading = () => {
  const LoadingIcon = getRandonIcon()

  return (
    <div className="relative flex flex-grow gap-4 justify-center items-center">
      <h1 className="text-5xl">Loading...</h1>
      {LoadingIcon}
    </div>
  )
}

export default Loading
