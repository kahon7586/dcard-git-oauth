import Link from "next/link"
import React from "react"

interface LoginCard {
  role: Role
  action: string | ((formData: FormData) => void) | undefined
}

type Role = "admin" | "user"

const ROLE_INFO = {
  admin: "Access with read, create, write, delete.",
  user: "Read only.",
}

const LoginCard = ({ role, action }: LoginCard) => {
  return (
    <form
      className="min-w-[400px] p-6 flex justify-center flex-col items-center bg-white border border-gray-200 rounded-lg shadow"
      action={action}>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-600">{role}</h5>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ROLE_INFO[role]}</p>
      <button
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        type="submit">
        Continue
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </form>
  )
}

export default LoginCard
