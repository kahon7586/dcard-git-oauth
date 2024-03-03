import { ReadonlyURLSearchParams } from "next/navigation"

type SearchParams = { [key: string]: string | string[] | undefined }

interface PageParams {
  searchParams?: SearchParams
}

interface TokenParams {
  client_id: string
  client_secret: string
  code: string
}

function createSearchParams(params: SearchParams) {}

async function getToken(newSearchParams: TokenParams) {
  const prefix = "https://github.com/login/oauth/access_token?"
  Object() // finish iteration for url segment
}

const Auth = async ({ searchParams }: PageParams) => {
  const code = searchParams?.code

  const newSearchParams = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code,
  }

  // const res = fetch()
  return <div className="absolute-center">Waiting for redirection...</div>
}

export default Auth
