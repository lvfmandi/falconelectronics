import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Category, ChildCategory } from "../types";

export async function getCategories(parentId = null): Promise<Category[]> {
    const query = groq`*[_type == "category" && parent._ref == $parentId]`;

    const categories = await client.fetch(query, { parentId });

    // Recursively fetch children for each category
    for (const category of categories) {
        category.otherChildren = await getCategories(category._id);
    }

    return categories;
}

export async function getProductCategories(
    category: ChildCategory,
    categories: (ChildCategory | Category)[]
) {
    const parentCategory = await client.fetch(
        `*[_type == "category" && _id == "${category.parent?._ref}"][0]`
    );
    if (parentCategory == null) return categories;
    return await getProductCategories(parentCategory, [...categories, parentCategory]);
}

export async function CategoryBySlug(slug: string) {
    return client.fetch<Category>(
        groq`*[slug.current == "${slug}"][0]`
    );
}

// Fetch all children categories recursively and memoize them
export const ChildrenCategories = async (id: string): Promise<Category[]> => {
    const childrenCategories = await client.fetch<Category[]>(
        groq`*[parent._ref == "${id}"]`
    );

    const childCategoriesPromises = childrenCategories.map(
        async (childCategory) => {
            return [
                childCategory,
                ...(await ChildrenCategories(childCategory._id)),
            ];
        }
    );

    return (await Promise.all(childCategoriesPromises)).flat();
};