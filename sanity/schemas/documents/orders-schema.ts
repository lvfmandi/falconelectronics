import { defineField, defineType } from "sanity";
import { BsTruck } from "react-icons/bs";

export const order = defineType({
    name: 'order',
    title: 'Orders',
    type: 'document',
    icon: BsTruck,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string'
        }),
        defineField({
            name: 'telephone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'county',
            title: 'County',
            type: 'string',
        }),
        defineField({
            name: 'constituency',
            title: 'Constituency',
            type: 'string',
        }),
        defineField({
            name: 'ward',
            title: 'Ward',
            type: 'string',
        }),
        defineField({
            name: 'streetAddress',
            title: 'StreetAddress',
            type: 'string',
        }),
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [{ type: "product" }],
        }),
        defineField({
            name: 'amount',
            title: 'Amount Paid',
            type: 'number',
        }),
        defineField({
            name: 'paymentStatus',
            title: 'Payment Status',
            type: 'string',
        }),
        defineField({
            name: 'paymentDate',
            title: 'Date of Payment',
            type: 'string',
        })
    ]
})