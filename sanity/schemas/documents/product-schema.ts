import { defineArrayMember, defineType } from "sanity";
import { TfiPackage } from "react-icons/tfi";
import { VscSymbolNamespace } from "react-icons/vsc";
import { GoCodeReview } from "react-icons/go";

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    icon: TfiPackage,
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 100,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: "sku",
            title: "SKU",
            type: "string",
            description: "⚠️ Do not seperate the words with a hyphen (-) ⚠️. Use capital letters. Black Titanium can be represented as BlckTtnm and Black can be represented as Blck",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        },
        {
            name: "discountedPrice",
            title: "Discounted Price",
            type: "number",
        },
        {
            name: "highlightedSpecifications",
            title: "Highlighted Specifications",
            type: "array",
            description:
                "☝️These will be at the top of the product page, they should be in key/value pairs",
            of: [
                {
                    type: "object",
                    icon: VscSymbolNamespace,
                    fields: [
                        {
                            name: "name",
                            title: "Specification Name",
                            type: "string",
                        },
                        {
                            name: "value",
                            title: "Specification Value",
                            type: "string",
                        },
                    ],
                },
            ],
        },
        {
            name: "description",
            title: "Description",
            type: "array",
            of: [
                defineArrayMember({ type: "block" }),
                defineArrayMember({ type: "image" }),
                defineArrayMember({ type: "instagram" }),
                defineArrayMember({ type: "youtube" }),
            ],
            validation: (Rule) => Rule.required(),
        },
        {
            name: "specifications",
            title: "Specifications",
            type: "array",
            description:
                "👇 These will be at the bottom of the product page in the specifications tab",
            of: [
                {
                    type: "object",
                    icon: VscSymbolNamespace,
                    fields: [
                        {
                            name: "title",
                            title: "Title",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "table",
                            title: "Table",
                            type: "table",
                            validation: (Rule) => Rule.required(),
                        }
                    ],
                },
            ],
        },
        {
            name: "images",
            title: "Images",
            type: "array",
            description: "Add at least 2 images for the product to be in correct view",
            of: [{ type: "image" }],
            validation: (Rule) => Rule.required().min(2)
        },
        {
            name: "variants",
            title: "Variants",
            type: "array",
            description: "Things that may cause a difference in price, like: {32GB, 64GB}",
            validation: (Rule) => Rule.max(1),
            of: [
                {
                    type: "object",
                    icon: VscSymbolNamespace,
                    fields: [
                        {
                            name: "variantTitle",
                            title: "Variant Title",
                            type: "string",
                            description: "eg: storage, RAM",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "objects",
                            title: "Variant Objects",
                            description: "eg: 32gb object, 64gb object",
                            type: "array",
                            validation: (Rule) => Rule.required(),
                            of: [
                                {
                                    type: 'object',
                                    icon: VscSymbolNamespace,
                                    fields: [
                                        {
                                            name: "variantName",
                                            title: "Variant Name",
                                            type: "string",
                                            description: 'eg: 32GB, 64GB',
                                            validation: (Rule) => Rule.required(),
                                        },
                                        {
                                            name: "variantPrice",
                                            title: "Variant Price",
                                            type: "number",
                                            validation: (Rule) => Rule.required(),

                                        },
                                        {
                                            name: "variantDiscountedPrice",
                                            title: "Variant Discounted Price",
                                            type: "number",
                                        },
                                        {
                                            name: "variantImage",
                                            title: "Variant Image",
                                            type: "image",
                                        },
                                        {
                                            name: "sku",
                                            title: "Variant SKU",
                                            type: "string",
                                            description: "⚠️ Do not seperate the words with a hyphen (-) ⚠️. Use capital letters. Black Titanium can be represented as BlckTtnm and Black can be represented as Blck",
                                            validation: (Rule) => Rule.required(),
                                        }
                                    ]
                                }
                            ]
                        },
                    ],
                },
            ],
        },
        {
            name: "options",
            title: "Product Options",
            description: '{colors and sizes}',
            type: "array",
            of: [{ type: "productColor" }, { type: "productSize" }],
        },
        {
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
            validation: (Rule) => Rule.required().min(2).max(2)
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "reference", to: { type: "tag" } }],
        },
        {
            name: "inventory",
            title: "Inventory",
            type: "object",
            fields: [
                {
                    name: "quantity",
                    title: "Quantity",
                    type: "number",
                    validation: (Rule) => Rule.min(0),
                },
                {
                    name: "inStock",
                    title: "In Stock",
                    type: "boolean",
                },
            ],
        },
        {
            name: "brand",
            title: "Brand",
            type: "reference",
            to: [{ type: "brand" }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: "warranty",
            title: "Warranty",
            type: "reference",
            to: [{ type: "warranty" }],
        },
        {
            name: "reviews",
            title: "Reviews",
            type: "array",
            of: [
                {
                    name: "review",
                    type: "object",
                    icon: GoCodeReview,
                    fields: [
                        {
                            name: "name",
                            title: "Customer Name",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "rating",
                            title: "Rating",
                            type: "number",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "comment",
                            title: "Comment",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "email",
                            title: "Customer Email",
                            type: "string",
                            validation: (Rule) => Rule.required().email(),
                        },
                        {
                            name: "published",
                            title: "Published",
                            type: "boolean",
                            initialValue: false
                        },
                    ],
                    preview: {
                        select: { comment: "comment" },
                        prepare({ comment }) {
                            return { title: comment }
                        },
                    }
                },
            ],
        },
        {
            name: "id",
            title: "ID",
            type: "string",
            description: "⚠️ Don't add content here, it will be added automatcally ⚠️"
        },
        {
            name: "itemTotal",
            title: "Item Total in Amount",
            type: "number",
            description: "⚠️ Don't add content here, it will be added automatcally. It is added once the user purchases ⚠️"
        },
        {
            name: "quantity",
            title: "Quantity",
            type: "number",
            description: "⚠️ Don't add content here, it will be added automatcally ⚠️"
        },
    ],
    preview: {
        select: {
            title: "name",
            price: "price",
            discountedPrice: "discountedPrice",
            images: 'images'
        },
        prepare({ title, price, discountedPrice, images }) {
            return {
                title,
                subtitle: discountedPrice ? `KES ${Number(discountedPrice).toLocaleString('en-US')}` : `KES ${Number(price).toLocaleString('en-US')}`,
                media: images ? images[0] : TfiPackage,
            };
        },
    },
});