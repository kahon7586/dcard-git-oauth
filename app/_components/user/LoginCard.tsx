import React from "react";
import Button from "../Button";

interface LoginCard {
  role: Role;
  action: string | ((formData: FormData) => void) | undefined;
}

type Role = "admin" | "user";

const ROLE_INFO = {
  admin: "Access with read, create, write, delete.",
  user: "Read only.",
};

const LoginCard = ({ role, action }: LoginCard) => {
  return (
    <form
      className="flex min-w-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-primary p-6 shadow dark:bg-primary-d"
      action={action}
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary dark:text-primary-d">
        {role}
      </h5>

      <p className="mb-3 font-normal text-primary dark:text-primary-d ">
        {ROLE_INFO[role]}
      </p>
      <Button
        className="inline-flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium "
        type="submit"
      >
        Continue
        <svg
          className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Button>
    </form>
  );
};

export default LoginCard;
