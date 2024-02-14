import { defineType } from "sanity";
import { TfiMedall } from "react-icons/tfi";


export const warranty = defineType({
    name: 'warranty',
    title: 'Warranties',
    type: 'document',
    icon: TfiMedall,
    fields: [
        {
            name: 'name',
            title: 'Warranty Name',
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
                media: TfiMedall
            }
        },
    }
})