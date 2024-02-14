import { defineType } from "sanity";
import { VscSymbolNamespace } from "react-icons/vsc";

export const brand = defineType({
    name: 'brand',
    title: 'Brands',
    type: 'document',
    icon: VscSymbolNamespace,
    fields: [
        {
            name: 'name',
            title: 'Brand Name',
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
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: (Rule) => Rule.required()
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
            media: 'image'
        },
        prepare({ title, media }) {
            return {
                title,
                media: media ? media : VscSymbolNamespace
            }
        },
    }
})