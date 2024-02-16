import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { Product } from "../types";

export async function ProductData(productId: string) {
    return await client.fetch(groq`*[_type == "product" && slug.current == "${productId}"][0] {
        ...,
        "tags": tags[]-> {..., name, slug},
        "categories": categories[]-> {..., name, slug, parent},
        "brand": brand-> {..., name, slug},
        "warranty": warranty-> {..., name, slug},
        "id": _id,
        "reviews": reviews[published == true]
    }`);
}

export async function ProductsInCategories(categories: string[], searchParams: any) {
    const { date, price, rating, tags, brands, warranties, search } = searchParams;
    const dateOrder = date ? `| order(_createdAt ${date})` : "";
    const priceOrder = price ? `| order(price ${price})` : "";
    const ratingOrder = rating ? `| order(rating ${rating})` : "";

    const order = `${dateOrder}${priceOrder}${ratingOrder}`;

    const productFilter = `_type == "product"`;
    const categoryFilter = categories.length ? `&& references(*[_type=="category" && slug.current in [${categories}]]._id)` : "";
    const tagFilter = tags
        ? `&& references(*[_type=="tag" && slug.current=="${tags}"]._id)`
        : "";
    const brandFilter = brands
        ? `&& references(*[_type=="brand" && slug.current=="${brands}"]._id)`
        : "";
    const warrantyFilter = warranties
        ? `&& references(*[_type=="warranty" && slug.current=="${warranties}"]._id)`
        : "";
    const searchFilter = search ? `&& name match "${search}"` : "";

    const filter = `${productFilter}${categoryFilter}${tagFilter}${brandFilter}${warrantyFilter}${searchFilter}`;

    const products = await client.fetch<Product[]>(
        groq`*[${filter}] ${order} {
            ...,
            "tags": tags[]-> {..., name, slug},
            "categories": categories[]-> {..., name, slug, parent},
            "brand": brand-> {..., name, slug},
            "warranty": warranty-> {..., name, slug},
            "id": _id,
            "reviews": reviews[published == true]
        }`
    );

    console.log({ products, categories });
    return products
}

export async function NotFoundProducts(title: string = "Not Found") {
    const { body } = await client.fetch(groq`*[_type == "page" && name == "${title}"][0] {
        body[]{
            ...,
            products[]->{
              ..., 
              "tags": tags[]-> {..., name, slug},
              "categories": categories[]-> {..., name, slug, parent},
              "brand": brand-> {..., name, slug},
              "warranty": warranty-> {..., name, slug},
              "id": _id,
            },
        }
    }`);

    console.log({ body });


    return body;
}
