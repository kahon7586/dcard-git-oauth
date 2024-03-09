export function getCodePath() {
  const prefix = "https://github.com/login/oauth/authorize?"
  const client_id = process.env.CLIENT_ID
  console.log(prefix + `client_id=${client_id}`)
  return prefix + `client_id=${client_id}`
}

export async function getCode() {
  const res = await fetch(getCodePath())
  const data = await res.json()
  return data
}
