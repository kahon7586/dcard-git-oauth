import LoginCard from "./_components/user/LoginCard";
import { signIn } from "@/auth";
import { getCurrUser } from "./_lib/server/auth/getCurrUser";
import Link from "next/link";

export default async function page() {
  let user = await getCurrUser();

  if (user.isLogin)
    return (
      <div className="absolute-center flex-col">
        <Link className="mt-10 text-xl underline" href="/issue-list">
          Continue as admin
        </Link>
      </div>
    );

  return (
    <div className="absolute-center flex-col">
      <LoginCard
        role="admin"
        action={async () => {
          "use server";
          await signIn("github");
        }}
      />

      <Link className="mt-10 text-xl underline" href="/issue-list">
        Continue as user
      </Link>
    </div>
  );
}
