import { IoResize } from "react-icons/io5";
import { defineType } from "sanity";

export const productSize = defineType({
    name: "productSize",
    title: "Product Size",
    type: "object",
    icon: IoResize,
    fields: [
        {
            name: "name",
            title: "Size Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "value",
            title: "Size Values",
            type: "number",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "sku",
            title: "Size SKU",
            type: "string",
            description: "⚠️ Do not seperate the words with a hyphen (-) ⚠️. Use capital letters. Black Titanium can be represented as BlckTtnm and Black can be represented as Blck",
            validation: (Rule) => Rule.required(),
        }
    ],
});