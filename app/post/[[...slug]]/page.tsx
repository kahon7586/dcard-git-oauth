import { getCode } from "@/app/utili/getCode"
import React from "react"

interface pageParams {
  params: {
    slug: string
  }
}

const page = async ({ params: { slug } }: pageParams) => {
  return (
    <>
      <div>My post is: {slug}</div>
      <div>{}</div>
    </>
  )
}

export default page
