// importing resources
import { Icons } from "../icons";

// components
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import React, { PropsWithChildren, ReactNode } from "react";

type BreakPointsType = {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
};

type Carousel = {
  breakPoints?: BreakPointsType;
  loop: boolean;
  pagination: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
};

interface CarouselProps {
  carousel: Carousel;
  items: any[];
  children: (item: any, index:number) => ReactNode;
}

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "../ui/button";

export const Carousel = ({ carousel, items, children }: CarouselProps) => {
  const { breakPoints, loop, pagination, slidesPerView, spaceBetween } =
    carousel;

  return (
    <Swiper
      className={`border relative group`}
      slidesPerView={slidesPerView || 1}
      breakpoints={breakPoints || {}}
      spaceBetween={spaceBetween || 0}
      loop={loop}
      pagination={{ clickable: pagination }}
      navigation={{
        nextEl: ".button-next-slide",
        prevEl: ".button-prev-slide",
      }}
      modules={[Pagination, Navigation]}
    >
      {items.map((item, index) => {
        return (
          <SwiperSlide key={item._id || item._key}>
            {children(item, index)}
          </SwiperSlide>
        );
      })}
      <Button
        className="absolute top-[50%] left-2 z-10 button-prev-slide rounded-full bg-gray-950/30 hover:bg-gray-950/30 scale-0 group-hover:scale-100"
        size={"icon"}
        variant={"secondary"}
      >
        <Icons.leftChevron color="white" />
      </Button>
      <Button
        className="absolute top-[50%] right-2 z-10 button-next-slide rounded-full bg-gray-950/30 hover:bg-gray-950/30 scale-0 group-hover:scale-100"
        size={"icon"}
        variant={"secondary"}
      >
        <Icons.rightChevron color="white" />
      </Button>
    </Swiper>
  );
};
