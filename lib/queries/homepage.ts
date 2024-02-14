import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { TypedObject } from "sanity"

async function pageData(): Promise<TypedObject> {
    const { body } = await client.fetch(groq`*[_type == "page" && name == "Home"][0] {
        body[]{
            ...,
            primaryButton{
              ...,
              link->{..., "slug": slug.current}
            },
            secondaryButton{
              ...,
              link->{..., "slug": slug.current}
            },
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

    return body;
}

export const content = await pageData();