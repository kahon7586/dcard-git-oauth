"use client"; // Error components must be Client Components

export default function Error({
  error,
  reset,
  // reset function will try to re-render the Error boundary's contents.
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { message, digest } = error;

  return (
    <div className="absolute-center flex-col  text-center">
      <div className="space-y-1">
        <h1 className="text-[6rem]">Oops...</h1>
        <h2 className="text-[2.5rem]">Something went wrong!</h2>
        <div className="space-y-2">
          <p>{"Error message: " + message}</p>
          <p>{"Digest: " + digest}</p>
        </div>
      </div>
      <div className="my-8 space-y-2">
        <p className="text-[1.3rem]">
          <span className="text-[2rem]">🦈</span>: But don't worry!
          <span className="italic"> Mr.Shark is here!</span>
        </p>
        <p>He will be with you until we fix the problem!</p>
      </div>
    </div>
  );
}
