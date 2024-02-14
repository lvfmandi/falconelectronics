import Image from "next/image";
import { toBase64, shimmer } from "@/lib/image";
import { ImageProps } from "next/dist/shared/lib/get-img-props";

export function NextImage(props: ImageProps) {
  return (
    <Image
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(Number(props.width) || 1, Number(props.height) || 1)
      )}`}
      {...props}
    />
  );
}
