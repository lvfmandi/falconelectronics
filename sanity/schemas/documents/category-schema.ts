import { CgFolder } from "react-icons/cg";
import { defineField, defineType } from "sanity";

export const category = defineType({
    name: 'category',
    title: 'Categories',
    type: 'document',
    icon: CgFolder,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image'
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            description: 'These images should come from ionicons.com only'
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'parent',
            title: 'Parent Category',
            type: 'reference',
            weak: true,
            to: [{ type: 'category' }],
        })
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image'
        },
        prepare({ title, media }) {
            return {
                title,
                media: media ? media : CgFolder
            }
        },
    }
})