import Link from "next/link";
import React from "react";
import ThemeToggler from "./client/ThemeToggler";
import HamburgerMenu from "./client/HamburgerMenu";

const Header = () => {
  return (
    <header className="flex items-start justify-between gap-6 px-6 py-2 text-xl font-bold shadow-md shadow-primary-hover dark:shadow-md dark:shadow-primary-hover-d">
      <HamburgerMenu />

      <ThemeToggler />
    </header>
  );
};

export default Header;
