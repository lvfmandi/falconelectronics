"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="">
      <span>Error: {error.message}</span>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
