import { defineType } from "sanity";
import { CiGrid42 } from "react-icons/ci";

export const gridCollection = defineType({
    name: "gridCollection",
    title: "Product Grid Collection",
    type: 'object',
    icon: CiGrid42,
    description: 'This will style the products in a grid',
    fields: [
        {
            name: 'title',
            title: 'A Title for the grid',
            type: 'string'
        },
        {
            name: 'description',
            title: 'A description for the grid',
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