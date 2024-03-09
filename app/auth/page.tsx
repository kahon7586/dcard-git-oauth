import { redirect } from "next/navigation"
import Cookies from "../components/Cookies"
import { getToken } from "../lib/server/auth/getToken"

type SearchParams = { [key: string]: string | undefined }

interface PageParams {
  searchParams?: SearchParams
}

const Auth = async ({ searchParams }: PageParams) => {
  const code = searchParams?.code
  // get code from redirected URL
  if (code === undefined) {
    redirect("http://localhost:3000/")
  }
  console.log(`code: ${code}`)

  const token = await getToken(code)

  return (
    <>
      <div className="absolute-center">Waiting for redirection...</div>
      <Cookies payload={{ name: "access-token", value: token }} />
    </>
  )
}

export default Auth
