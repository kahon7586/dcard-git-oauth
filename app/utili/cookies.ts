"use server"

import { cookies } from "next/headers"

// interface StoreTokenRequest {
//   token: string
//   // refresh_token: string
// }

export async function storeAccessToken(value: string) {
  cookies().set({
    name: "accessToken",
    value: value,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  })

  // cookies().set({
  //     name: "refreshToken",
  //     value: request.refresh_token,
  //     httpOnly: true,
  //     sameSite: "strict",
  //     secure: true,
  // })
}

export async function getAccessToken() {
  return cookies().get("accessToken")?.value
}
