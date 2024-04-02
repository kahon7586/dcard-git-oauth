"use client";

import React, { ButtonHTMLAttributes } from "react";
import Button from "./Button";

interface SignOutBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: (arg?: unknown) => unknown;
  className?: string;
}

const SignOutBtn = ({ action, className, ...props }: SignOutBtnProps) => {
  return (
    <Button className={className} onClick={async () => action()} {...props}>
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
