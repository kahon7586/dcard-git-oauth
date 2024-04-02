import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import ThemeToggler from "./client/ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-6 px-6 py-2 text-xl font-bold shadow-md shadow-primary-hover dark:shadow-md dark:shadow-primary-hover-d">
      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/set-repository">Repo</Link>
        <Link href="/issue-list">Issue List</Link>
        <Link href="/test-loading">Loading</Link>
        <Link href="/test-error">Error</Link>
      </div>

      <ThemeToggler />
    </header>
  );
};

export default Header;
