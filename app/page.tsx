import LoginCard from "./components/user/LoginCard"
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function page() {
  const session = await auth()
  let user = session?.user?.name

  if (user) return null

  return (
    <div className="absolute-center flex-col gap-10 ">
      <LoginCard
        role="admin"
        action={async () => {
          "use server"
          await signIn("github")
          redirect("/issue-list")
        }}
      />
    </div>
  )
}
