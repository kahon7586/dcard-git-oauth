"use client";

import Link from "next/link";
import React, { useState } from "react";
import Button from "../Button";
import { GiHamburgerMenu } from "react-icons/gi";

const HamburgerMenu = () => {
  const [isToggle, setIsToggle] = useState(false);

  function handleClickMenu() {
    setIsToggle((prev) => !prev);
  }

  return (
    <div onClick={handleClickMenu}>
      <Button className="border-none  md:hidden">
        <GiHamburgerMenu />
      </Button>
      <div
        className={`${isToggle ? "block space-y-1 px-2" : "hidden"} gap-6 md:flex`}
      >
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
    </div>
  );
};

export default HamburgerMenu;
