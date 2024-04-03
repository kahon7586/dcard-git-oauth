"use client";
import { useEffect } from "react";

// Error components must be Client Components
// Nextjs only show generic error message in production mode.

export default function Error({
  error,
  reset,
  // reset function will try to re-render the Error boundary's contents.
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { message, digest } = error;

  useEffect(() => {
    console.log(message);
  });

  return (
    <div className="absolute-center flex-col  text-center">
      <div className="space-y-1">
        <h1 className="text-[6rem]">Oops...</h1>
        <h2 className="text-[2.5rem]">Something went wrong!</h2>
        <div className="space-y-2">
          <p>
            {"If this error keep showing, contact us with this digest code: " +
              digest}
          </p>
        </div>
      </div>
      <div className="my-8 space-y-2">
        <p className="text-[1.3rem]">Before we deal with it... </p>
        <p className="my-2 text-[2rem]">
          🦈<span className="italic">: Mr.Shark is here!</span>
        </p>

        <p>He will be with you until we fix the problem!</p>
      </div>
    </div>
  );
}
