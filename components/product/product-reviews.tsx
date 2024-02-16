"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import ReactStars from "react-stars";

// types
import { ProductChildrenProps } from "@/app/product/[slug]/page";
import { Review } from "@/lib/types";

// components
import { useToast } from "@/components/ui/use-toast";
import { Carousel } from "../carousel/carousel";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ProductReviewItem } from "./product-review-item";

export const ProductReviews = ({ product }: ProductChildrenProps) => {
  const { _id, reviews } = product;

  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [userCredentails, setUserCredentials] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const ratingForm = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const userCreds = JSON.parse(
      localStorage.getItem("userCredentials") as string
    );
    if (userCreds) setUserCredentials(userCreds);
  }, []);

  async function handleSubmitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reviewForm: typeof event.target = event.target;

    const formData = new FormData(reviewForm as HTMLFormElement);
    const name = userCredentails?.name || formData.get("name");
    const email = userCredentails?.email || formData.get("email");
    const rating = Number(formData.get("rating"));
    const comment = formData.get("comment");
    const remember = formData.get("remember");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (
      !(
        name &&
        email?.toString().match(emailRegex) !== null &&
        rating > 0 &&
        rating <= 5 &&
        comment
      )
    ) {
      toast({
        title: `Please fill in all the fields`,
        description: `Fill in the fields to continue`,
        variant: "destructive",
      });
      return;
    }

    const newReview = { _id, name, email, rating, comment };
    var response;

    try {
      response = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify(newReview),
      });
      const responseData = await response.json();

      // save data to localStorage if needed
      if (remember == "on") {
        localStorage.setItem(
          "userCredentials",
          JSON.stringify({ name, email })
        );
        setUserCredentials(
          JSON.parse(localStorage.getItem("userCredentials") as string)
        );
      }

      // reset form and rating
      const currentForm = ratingForm.current as HTMLFormElement;
      currentForm.reset();
      setRating(0);

      // show that the data has been sent
      toast({
        title: responseData.title,
        description: responseData.message,
        variant: responseData.variant,
      });
    } catch (error: any) {
      toast({
        title: `Error, this could be an error on our side`,
        description: "Please contact admin on the contact page",
        variant: "destructive",
      });
    }
  }

  const ratingsArray =
    reviews && reviews.length ? reviews.map((item) => item.rating) : [];

  const averageRating =
    reviews && ratingsArray.length
      ? Math.round(
          (ratingsArray.reduce((a, b) => a + b, 0) / reviews.length) * 100
        ) / 100
      : 0;

  return (
    <div className="grid gap-6">
      <div className="grid gap-8 xl:gap-0 md:grid-cols-2 xl:grid-cols-3">
        <div className="xl:px-7 grid gap-1 content-start">
          <p className="font-semibold text-gray-500">User Reviews</p>
          <div className="">
            <span className="text-5xl font-bold">{averageRating}</span>
            <span>out of 5</span>
          </div>
          {reviews?.length ? (
            <div className="flex items-center h-fit">
              <span className="text-yellow-400 text-md lg:text-xl h-fit">
                ★
              </span>
              <span>
                {reviews?.length === 1
                  ? "1 rating"
                  : `${reviews.length} reviews`}
              </span>
            </div>
          ) : (
            <span>No ratings</span>
          )}
        </div>
        <div className="xl:px-7 xl:border-x">
          <p className="font-semibold text-gray-500">Rating Statistics</p>
          {[5, 4, 3, 2, 1].map((num) => {
            const sectionRatingArray = ratingsArray.filter((rating) =>
              rating > 1
                ? rating >= num && rating < num + 1
                : rating <= num && rating >= num + 0.5
            );
            return (
              <div className="flex items-center" key={num}>
                <span>{num}</span>
                <span className="text-yellow-400 text-xl">★</span>
                <Progress
                  value={
                    sectionRatingArray.length
                      ? (sectionRatingArray.length / ratingsArray.length) * 100
                      : 0
                  }
                />
                <span>({sectionRatingArray.length})</span>
              </div>
            );
          })}
        </div>
        <div className="xl:px-7 content-start md:col-span-2 xl:col-span-1 space-y-4">
          <p className="font-semibold text-gray-500">Write a review</p>
          <form
            id="reviewForm"
            name="reviewForm"
            className="space-y-4"
            onSubmit={handleSubmitReview}
            ref={ratingForm}
          >
            {userCredentails ? (
              <p className="font-medium">Review as {userCredentails.name}</p>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="name">Add your name</label>
                  <Input
                    placeholder="Jane Doe"
                    id="name"
                    name="name"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Add your email</label>
                  <Input
                    placeholder="janedoe@email.com"
                    id="email"
                    name="email"
                    autoComplete="off"
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <span>Add your rating</span>
              <ReactStars
                size={32}
                value={rating}
                onChange={(value) => setRating(value)}
              />
              <input type="hidden" id="rating" name="rating" value={rating} />
            </div>
            <div className="space-y-2">
              <label htmlFor="comment">Add your comment</label>
              <Textarea id="comment" name="comment" />
            </div>
            {!userCredentails && (
              <div className="flex items-start space-x-2">
                <Checkbox id="remember" name="remember" className="mt-1" />
                <label htmlFor="remember">
                  <p className="font-medium">Remember me</p>
                  <span>
                    Save my name and email in the browser for next time
                  </span>
                </label>
              </div>
            )}
            <Button className="w-full">Add Review</Button>
            {userCredentails && (
              <span className="flex justify-end">
                <Button
                  variant="link"
                  className="w-fit"
                  onClick={() => {
                    localStorage.removeItem("userCredentials");
                    setUserCredentials(null);
                  }}
                >
                  Forget my credentials
                </Button>
              </span>
            )}
          </form>
        </div>
      </div>
      <div className="max-w-fill overflow-hidden space-y-3">
        <h5 className="font-light">Reviews on {product.name}</h5>
        {reviews?.length ? (
          <Carousel
            items={reviews}
            carousel={{
              breakPoints: {
                1024: {
                  slidesPerView: reviews.length < 2 ? reviews.length : 2,
                },
                1280: {
                  slidesPerView: reviews.length < 3 ? reviews.length : 3,
                },
              },
              loop: false,
              pagination: true,
            }}
          >
            {(item: Review, index: number) => (
              <ProductReviewItem
                style={{
                  borderRightWidth: `${reviews.length - 1 ? "1px" : "0"}`,
                }}
                className="p-6"
                review={item}
                key={item._id}
              />
            )}
          </Carousel>
        ) : (
          <>
            <h6 className="font-light">No Reviews</h6>
            <span>Add a review</span>
          </>
        )}
      </div>
    </div>
  );
};
