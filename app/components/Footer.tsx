import { auth, signOut } from "@/auth";
import React from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";
import { getRepository } from "../lib/server/github/getRepository";

const UserInfo = async ({}) => {
  const session = await auth();
  const userName = session?.user?.name;
  const userRole = session?.user?.role;

  async function signOutAction() {
    "use server";
    await signOut();
  }

  return (
    <form action={signOutAction}>
      <div className="flex flex-col items-center gap-2">
        {`Name: ${userName ?? "Anonymous"}, Role: ${userRole ?? "user"}`}
        <div>
          {session ? (
            <Button className="rounded-md border px-2 py-1" type="submit">
              Sign Out
            </Button>
          ) : (
            <LinkButton className="rounded-md border px-2 py-1" href="/">
              Login
            </LinkButton>
          )}
        </div>
      </div>
    </form>
  );
};

const Footer = async () => {
  const currRepo = await getRepository();

  return (
    <footer className="flex-grow-1 flex flex-col items-center justify-center gap-4 py-4 [&:nth-child(2)]:flex-grow">
      <UserInfo />
      {currRepo
        ? `Repo: ${currRepo.repo}, Owner: ${currRepo.owner}`
        : "Repository not specified!"}
    </footer>
  );
};

export default Footer;
