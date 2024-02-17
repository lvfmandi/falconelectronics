"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="container font-inter min-h-[70vh] grid place-items-center justify-items-center">
      <div className="grid gap-4 justify-items-center">
        <h4 className="font-light">An error occured</h4>
        <p>Try again or navigate to the home page</p>
        <div className="flex gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Link
            className={`${cn(buttonVariants({ variant: "secondary" }))}`}
            href={"/"}
          >
            Go back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
