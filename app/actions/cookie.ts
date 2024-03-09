"use server"

import { cookies } from "next/headers"

export async function setCookies(name: string, value: string) {
  const cookieStore = cookies()
  cookieStore.set(name, value)
  console.log(`cookie(${name}) is set: ${value}`)
}

export async function getCookies(name: string) {
  const cookieStore = cookies()
  console.log(`Cookie (${name}) is ${cookieStore.get(name)?.value} `)
}
