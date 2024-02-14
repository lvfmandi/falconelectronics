import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";
import { v4 } from "uuid";

export async function POST(req: Request) {
  const review = await req.json();
  const { _id, rating, comment, name, email } = review;
  try {
    await sanityClient
      .patch(_id)
      .setIfMissing({ reviews: [] })
      .insert("after", "reviews[-1]", [
        { _id: v4(), _type: "review", rating, comment, name, email },
      ])
      .commit({
        autoGenerateArrayKeys: true,
      });

    return NextResponse.json({
      title: 'Success',
      message: "Your review has been sent successfully",
      variant: "default",
    });
  } catch (error: any) {
    console.error("Error processing review:", error.message);
    return NextResponse.json({
      title: 'Error',
      message: "An error occurred while processing your request.",
      variant: "destructive",
    });
  }
}
