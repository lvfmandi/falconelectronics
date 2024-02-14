// types
import { Review } from "@/lib/types";
import { HTMLAttributes } from "react";

// components
import ReactStars from "react-stars";

interface ProductReviewItemProps extends HTMLAttributes<HTMLDivElement> {
  review: Review;
}

export const ProductReviewItem = ({
  review,
  ...props
}: ProductReviewItemProps) => {
  const { rating, name, comment } = review;
  return (
    <div {...props} className={`${props.className} grid gap-2`}>
      <div className="flex gap-3 items-center">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white">
          {name.charAt(0).toUpperCase()}
        </span>
        <span className="capitalize">{name}</span>
      </div>
      <ReactStars value={rating} edit={false} />
      <small>{comment}</small>
    </div>
  );
};
