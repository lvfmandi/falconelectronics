import { defineField, defineType } from "sanity";
import { GoBrowser } from "react-icons/go";

export const page = defineType({
    name: 'page',
    title: 'Pages',
    type: 'document',
    icon: GoBrowser,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "body",
            title: "Body of Page",
            description: "⚡ This will contain all the pages content",
            type: "array",
            of: [
                { type: 'block' },
                { type: 'aboveTheFoldContentImage' },
                { type: 'gridCollection' },
                { type: 'carouselCollection' }
            ],
            validation: (Rule) => Rule.required()
        })
    ],
    preview: {
        select: {
            title: "name"
        },
        prepare({ title }) {
            return {
                title,
                media: GoBrowser,
            };
        },
    },
})