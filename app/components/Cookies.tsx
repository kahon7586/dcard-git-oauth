"use client"

import React, { useEffect } from "react"
import { setHttpOnlyCookie } from "../lib/client/setHttpOnlyCookie"
import { useRouter } from "next/navigation"

export interface Payload {
  name: string
  value: string
}

interface CookiesProps {
  payload: Payload
}

const Cookies = ({ payload }: CookiesProps) => {
  const router = useRouter()

  useEffect(() => {
    async function setCookies() {
      await setHttpOnlyCookie(payload)
      router.push("/home")
    }
    setCookies()
  })

  return <></>
}

export default Cookies
