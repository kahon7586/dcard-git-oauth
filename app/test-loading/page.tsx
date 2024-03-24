import React from "react"
import { wait } from "../lib/common/wait"

const page = async () => {
  await wait(2000 * 1000 * 99)

  return <div>test page</div>
}

export default page
