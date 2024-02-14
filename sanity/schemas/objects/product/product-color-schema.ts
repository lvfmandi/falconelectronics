import { IoColorFilterOutline } from "react-icons/io5";
import { defineType } from "sanity";

export const productColor = defineType({
    name: "productColor",
    title: "Product Color",
    type: "object",
    icon: IoColorFilterOutline,
    fields: [
        {
            name: "name",
            title: "Color Name",
            type: "string",
            description: 'Be creative, a color like "space gray" would be 💣',
            validation: (Rule) => Rule.required(),
        },
        {
            name: "image",
            title: "Color Image",
            type: "image",
            description: 'Add a picture of the product in the color described',
            validation: (Rule) => Rule.required(),
        },
        {
            name: "value",
            title: "Color Values",
            type: "array",
            description:
                "⚠️ You can only add 2 colors max. Not more. It would be better if the second color is lighter than the first",
            of: [
                {
                    type: "color",
                },
            ],
            validation: (Rule) => Rule.required().max(2),
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
