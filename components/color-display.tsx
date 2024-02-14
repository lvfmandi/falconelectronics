// types
import { Color } from "@/lib/types";
import { Button } from "./ui/button";

export interface ColorDisplayProps {
  color: Color;
}

export const ColorDisplay = ({ color }: ColorDisplayProps) => {
  const { name, value } = color;

  return (
    <Button
      size={"icon"}
      className="relative w-[28px] h-[28px] rounded-full"
      style={{
        background: value[0].hex,
        boxShadow: "inset 0px 1px 2px 0px rgba(0,0,0,.25)",
      }}
    >
      {value.length > 1 && (
        <span
          className="h-[50%] absolute inset-0 top-auto rounded-bl-full rounded-br-full"
          style={{
            background: value[1].hex,
          }}
        ></span>
      )}
    </Button>
  );
};
