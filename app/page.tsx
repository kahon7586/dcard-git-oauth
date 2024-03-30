import LoginCard from "./_components/user/LoginCard";
import { auth, signIn } from "@/auth";
import { getRepository } from "./_lib/server/github/getRepository";
import { toSetRepository } from "./_lib/server/nextjs/redirectTo";

export default async function page() {
  const session = await auth();
  let user = session?.user?.name;

  if (user && (await getRepository()) === null) {
    toSetRepository();
  }
  if (user) return null;

  return (
    <div className="absolute-center flex-col gap-10 ">
      <LoginCard
        role="admin"
        action={async () => {
          "use server";
          await signIn("github");
        }}
      />
    </div>
  );
}
