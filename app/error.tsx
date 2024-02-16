"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="container">
      <span>Error: {error.message}</span>
      <br />
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
