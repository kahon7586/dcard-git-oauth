import Link from "next/link"
import { getCodePath } from "./lib/server/auth/getCode"

export default function Home() {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <Link href={getCodePath()}>Get code</Link>
    </div>
  )
}
