"use client";

import { HTMLAttributes, useState } from "react";
import Button from "../Button";

interface DeleteBtnProps extends HTMLAttributes<HTMLButtonElement> {
  action: (postNumber: number) => unknown;
  postNumber: number;
}

const DeleteBtn = ({ action, postNumber, ...props }: DeleteBtnProps) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClickDelete() {
    setIsLoading(true);

    try {
      await action(postNumber);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button onClick={handleClickDelete} {...props} disabled={isLoading}>
      Delete
    </Button>
  );
};

export default DeleteBtn;
