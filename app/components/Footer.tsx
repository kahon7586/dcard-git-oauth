import { auth } from "@/auth"
import { signOut } from "next-auth/react"
import React from "react"
import Button from "./Button"
import LinkButton from "./LinkButton"

const Footer = async () => {
  const session = await auth()
  const userName = session?.user?.name
  const userRole = session?.user?.role

  return (
    <footer className="flex flex-grow-1 [&:nth-child(2)]:flex-grow justify-center items-center gap-4 py-4">
      {session ? (
        <form
          action={async () => {
            "use server"
            await signOut()
          }}>
          <div className="flex flex-col gap-2 items-center">
            {`Name: ${userName}, Role: ${userRole}`}
            <div>
              <Button
                className="border rounded-md py-1 px-2"
                type="submit">
                Sign Out
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          {'Name: Anonymous, Role: "user"'}
          <div>
            <LinkButton
              className="border rounded-md py-1 px-2"
              href="/">
              Login
            </LinkButton>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
