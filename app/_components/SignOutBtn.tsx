import React, { HTMLAttributes } from "react";
import Button from "./Button";

interface SignOutBtnProps extends HTMLAttributes<HTMLButtonElement> {
  action: (arg?: unknown) => unknown;
  className?: string;
}

const SignOutBtn = ({ action, className, ...props }: SignOutBtnProps) => {
  return (
    <Button className={className} type="submit" onClick={action} {...props}>
      {" "}
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
