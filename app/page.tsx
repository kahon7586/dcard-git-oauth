import LoginCard from "./components/user/LoginCard"
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function page() {
  const session = await auth()
  let user = session?.user?.name

  if (user) redirect("/issue-list")

  return (
    <div className="min-h-[90vh] flex flex-col gap-10 justify-center items-center">
      <LoginCard
        role="admin"
        action={async () => {
          "use server"
          await signIn("github")
        }}
      />
    </div>
  )
}
