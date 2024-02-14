import Link from "next/link";

// importing components
import { Button } from "../ui/button";

// importing resources
import { NextImage } from "../image";
import { Image } from "sanity";
import { ColorValue } from "@sanity/color-input";
import { urlForImage } from "@/sanity/lib/image";

interface AboveTheFoldProps {
  content: {
    title: string;
    paragraph: string;
    image: Image;
    backgroundImage: Image;
    primaryButton: { name: string; link: string };
    secondaryButton: { name: string; link: string };
    color: ColorValue;
  };
}

export const AboveTheFold = ({ content }: AboveTheFoldProps) => {
  const {
    title,
    paragraph,
    primaryButton,
    secondaryButton,
    image,
    backgroundImage,
    color,
  } = content;
  return (
    <div className="relative flex items-center min-h-[65vh]">
      <div
        className={`container flex gap-10 flex-col-reverse lg:grid lg:grid-cols-[2fr_1fr] place-items-center lg:place-items-start lg:items-center py-12 text-center lg:text-left text-background`}
      >
        <div className="grid gap-7 justify-items-center lg:justify-items-start max-w-[600px]">
          <h1 className="xl:text-6xl">{title}</h1>
          <p className="text-lg font-light">{paragraph}</p>
          <div className="grid sm:flex gap-2 justify-center w-[100%] lg:justify-start">
            <Link href={primaryButton.link}>
              <Button variant={"default"}>{primaryButton.name}</Button>
            </Link>
            <Link href={secondaryButton.link}>
              <Button variant={"link"} className="text-background">
                {secondaryButton.name}
              </Button>
            </Link>
          </div>
        </div>
        {!backgroundImage && (
          <NextImage
            src={urlForImage(image).url()}
            alt="Hero side image"
            width={400}
            height={400}
            className="max-w-[400px] max-h-[400px]"
          />
        )}
      </div>
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background: backgroundImage
            ? `url(${urlForImage(backgroundImage).url()})`
            : color
            ? color.hex
            : "#FF0000ce",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};
