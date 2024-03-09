import { NextRequest } from "next/server"
import { serialize } from "cookie"
import { Payload } from "@/app/components/Cookies"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  const { name, value }: Payload = await req.json()
  console.log(`POST received: ${name} ${value}`)

  const seralized = serialize(name, value, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 3 * 100000,
    sameSite: "strict",
    path: "/",
  })

  const response = {
    message: "Authenticated!",
  }

  const res = new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized, credentials: "same-origin" },
  })

  revalidatePath("/api/cookie/setHttpOnly")

  return res
}
