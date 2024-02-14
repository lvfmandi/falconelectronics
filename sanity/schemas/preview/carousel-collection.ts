import { defineType } from "sanity";
import { BiCarousel } from "react-icons/bi";

export const carouselCollection = defineType({
    name: "carouselCollection",
    title: "Product Carousel Collection",
    type: 'object',
    icon: BiCarousel,
    description: 'This will style the products in a carousel format 🎠',
    fields: [
        {
            name: 'title',
            title: 'A Title for the carousel',
            type: 'string'
        },
        {
            name: 'description',
            title: 'A description for the carousel',
            type: 'string'
        },
        {
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'product' }
                    ]
                }
            ]
        }
    ]
})