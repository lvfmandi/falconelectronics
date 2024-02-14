import { Size } from "@/lib/types";

export interface SizeDisplayProps {
  size: Size;
}

export const SizeDisplay = ({ size }: SizeDisplayProps) => {
  const { name, value } = size;
  return (
    <div className=" grid grid-cols-2 divide-x">
      <span className="p-2">{name}</span>
      <span className="p-2">{value}</span>
    </div>
  );
};
