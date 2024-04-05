import Link from "next/link";
import React from "react";
import ThemeToggler from "./client/ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-6 px-6 py-2 text-xl font-bold shadow-md shadow-primary-hover dark:shadow-md dark:shadow-primary-hover-d">
      <div className="block gap-6 md:flex">
        <Link className="block" href="/">
          Home
        </Link>
        <Link className="block" href="/set-repository">
          Repo
        </Link>
        <Link className="block" href="/issue-list">
          Issue List
        </Link>
        <Link className="block" href="/test-loading">
          Loading
        </Link>
        <Link className="block" href="/test-error">
          Error
        </Link>
      </div>

      <ThemeToggler />
    </header>
  );
};

export default Header;
