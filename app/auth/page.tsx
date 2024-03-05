import { redirect } from "next/navigation"
import { getToken } from "../utili/getToken"
import { storeAccessToken } from "../utili/cookies"
import { Octokit } from "octokit"

type SearchParams = { [key: string]: string | undefined }

interface PageParams {
  searchParams?: SearchParams
}

const Auth = async ({ searchParams }: PageParams) => {
  const code = searchParams?.code
  // get code from redirected URL
  if (code === undefined) return

  const token = await getToken(code)
  const octokit = new Octokit({
    auth: token,
  })

  return <div className="absolute-center">Waiting for redirection...</div>
}

export default Auth
