import { defineType } from "sanity";
import { GoTag } from "react-icons/go";

export const tag = defineType({
    name: 'tag',
    title: 'Tags',
    type: 'document',
    icon: GoTag,
    fields: [
        {
            name: 'name',
            title: 'Tag Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'filter',
            title: 'Is this a filter?',
            type: 'boolean',
        }
    ],
    preview: {
        select: {
            title: 'name',
        },
        prepare({ title }) {
            return {
                title,
                media: GoTag
            }
        },
    }
})