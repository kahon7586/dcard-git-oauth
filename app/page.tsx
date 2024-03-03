import Link from "next/link"
import { getCodePath } from "./utili/getCode"

export default function Home() {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <Link href={getCodePath()}>Get code</Link>
    </div>
  )
}
