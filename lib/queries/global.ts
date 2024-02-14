import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity"
import { Brand, Tag } from "../types";

export async function FilterItems() {
    const filters = await client.fetch(groq`*[filter == true]`);
    const brands: Brand[] = filters.filter((brand: Brand) => brand._type === "brand");
    const tags: Tag[] = filters.filter((tag: Tag) => tag._type === "tag");
    const warranties: Tag[] = filters.filter((warranty: Tag) => warranty._type === "warranty");
    return { brands, tags, warranties }
}