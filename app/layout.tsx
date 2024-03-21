import type { Metadata } from "next"
import "./globals.css"
import { auth, signOut } from "@/auth"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const userName = session?.user?.name
  const userRole = session?.user?.role

  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body>
        <header className="flex px-6 py-2 font-bold gap-6 text-xl">
          <Link href="/">Home</Link>
          <Link href="/issue-list">Issue List</Link>
        </header>
        {children}
        <div className="flex justify-center items-center gap-4 mt-4">
          {session ? `Name: ${userName}, Role: ${userRole}` : null}
          {session ? (
            <form
              action={async () => {
                "use server"
                await signOut()
              }}>
              <button
                className="border rounded-md py-1 px-2"
                type="submit">
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              className="border rounded-md py-1 px-2"
              href="/">
              Login
            </Link>
          )}
        </div>
      </body>
    </html>
  )
}
