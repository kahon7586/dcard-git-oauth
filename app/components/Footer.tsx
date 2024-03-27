import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import React from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";

const Footer = async () => {
  const session = await auth();
  const userName = session?.user?.name;
  const userRole = session?.user?.role;

  return (
    <footer className="flex-grow-1 flex items-center justify-center gap-4 py-4 [&:nth-child(2)]:flex-grow">
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <div className="flex flex-col items-center gap-2">
            {`Name: ${userName}, Role: ${userRole}`}
            <div>
              <Button className="rounded-md border px-2 py-1" type="submit">
                Sign Out
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-2">
          {'Name: Anonymous, Role: "user"'}
          <div>
            <LinkButton className="rounded-md border px-2 py-1" href="/">
              Login
            </LinkButton>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
