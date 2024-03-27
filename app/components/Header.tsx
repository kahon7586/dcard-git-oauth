import dynamic from "next/dynamic"
import Link from "next/link"
import React from "react"
import Spinner from "./Spinner"

const Header = () => {
  const ThemeToggler = dynamic(() => import("@/app/components/client/ThemeToggler"), {
    ssr: false,
    loading: () => <Spinner className="fill-black" />,
  })

  return (
    <header className="flex px-6 py-2 font-bold gap-6 text-xl justify-between items-center shadow-md shadow-primary-hover dark:shadow-md dark:shadow-primary-hover-d">
      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/issue-list">Issue List</Link>
        <Link href="/test-loading">Loading</Link>
        <Link href="/test-error">Error</Link>
      </div>

      <ThemeToggler />
    </header>
  )
}

export default Header
