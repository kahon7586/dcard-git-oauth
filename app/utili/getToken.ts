interface TokenProps {
  access_token: string
  token_type: string
  scope: string
}

function getTokenURL(code: string) {
  const prefix = "https://github.com/login/oauth/access_token?"
  const params = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`
  console.log(prefix + params)
  return prefix + params
}

export async function getToken(code: string) {
  try {
    const res = await fetch(getTokenURL(code), {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
    const data: TokenProps = await res.json()
    console.log(data)
    return data.access_token
  } catch (err) {
    console.log(err)
    throw Error("error when getting token.")
  }
}
