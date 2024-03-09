"use server"

export async function sendCode(code: string) {
  const res = await fetch("http://localhost:3000/api/auth/token/setCookie", {
    next: { revalidate: 0 },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
    }),
  })

  return res
}
