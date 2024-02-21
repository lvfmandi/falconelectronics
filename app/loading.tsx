import { NextImage } from "@/components/image";
import { cn } from "@/lib/utils";
import Logo from "@/public/frontlogo.svg";

export default function Loading() {
  return (
    <main className="container min-h-[60vh] grid items-center place-items-center font-inter">
      <div className="grid gap-4 place-items-center">
        <NextImage src={Logo} alt={"Loading Logo"} width={200} height={200} className="animate-pulse delay-150"/>
        <h5 className="font-light">
          Loading
          {[1, 2, 3].map((item) => (
            <span className={cn("animate-pulse", `delay-${item * 150}`)}>.</span>
          ))}
        </h5>
      </div>
    </main>
  );
}
