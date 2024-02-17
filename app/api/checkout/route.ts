import { v4 } from "uuid";

import { Product } from "@/lib/types";
import { Item } from "react-use-cart";
import { sanityClient } from "@/lib/sanity";

type ValidationRule = {
    regex: RegExp;
    message: string;
};


export async function POST(req: Request) {
    const body = await req.json();
    const { data } = body;
    const { firstName, lastName, email, telephone, county, constituency, ward, streetAddress, cart } = data;
    const errors: string[] = [];

    // comfirming cart's integrity
    const cartTotalPrice = cart.items.reduce((total: number, item: Product & Item) => total + (item?.itemTotal || item.price), 0);
    cartTotalPrice === cart.cartTotal || errors.push('The cart shouldnt be interfered with')

    const validations: Record<string, ValidationRule> = {
        firstName: {
            regex: /^[a-zA-Z]{3,}$/,
            message: 'The first name must have a length of at least 3 characters.',
        },
        lastName: {
            regex: /^[a-zA-Z]{3,}$/,
            message: 'The last name must have a length of at least 3 characters.',
        },
        email: {
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address.',
        },
        telephone: {
            regex: /^07\d{8}$/,
            message: 'The phone number must be in the format 0712345678.',
        },
    };

    for (const field in validations) {
        if (Object.prototype.hasOwnProperty.call(validations, field)) {
            const { regex, message } = validations[field];
            if (!regex.test(data[field].trim())) {
                errors.push(message);
            }
        }
    }


    // throwing an error if there are errors
    if (errors.length > 0) return Response.json({ message: "The data given is inconsistent, contact admin" }, { status: 500 })

    const authURL = process.env.NEXT_PUBLIC_AUTH_URL as string;
    const consumerKey = process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_KEY;
    const secretKey = process.env.NEXT_PUBLIC_PESAPAL_SECRET_KEY;

    // getting authentication rights from PESAPAL
    const authentication = await fetch(authURL, {
        method: "POST",
        body: JSON.stringify({
            consumer_key: consumerKey,
            consumer_secret: secretKey
        }),
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }
    });

    const authData = await authentication.json();
    const submitOrderRequestURL = process.env.NEXT_PUBLIC_PESAPAL_SOR_URL as string;
    const ID = v4();

    // submitting the order
    const SOR = await fetch(submitOrderRequestURL, {
        method: "POST",
        body: JSON.stringify({
            id: ID,
            currency: 'KES',
            amount: cart.cartTotal,
            description: `This is a cart of ${ID}`,
            callback_url: process.env.NEXT_PUBLIC_RESPONSE_URL,
            notification_id: process.env.NEXT_PUBLIC_IPN_ID,
            billing_address: {
                email_address: email.trim(),
                phone_number: telephone.trim(),
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                country: 'Kenya',
                country_code: 'KE',
                state: county,
                city: constituency,
                line_1: ward,
                line_2: streetAddress,
                postal_code: '00100'
            }
        }),
        headers: {
            "Authorization": `Bearer ${authData.token}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }
    })
    const SORData = await SOR.json();

    const order = {
        _id: SORData.order_tracking_id,
        _type: "order",
        name: `${firstName} ${lastName}`,
        email,
        telephone,
        county,
        constituency,
        ward,
        streetAddress,
        products: cart.items.map(({ categories, brand, warranty, tags, ...rest }: Product) => ({
            ...rest,
            categories: categories.map(category => ({ _ref: category._id, _key: category._key, _type: "reference" })),
            brand: { _ref: brand._id, _type: "reference" },
            warranty: warranty ? { _ref: warranty._id, _type: "reference" } : null,
            tags: (tags || []).map(tag => ({ _ref: tag._id, _key: tag?._key, _type: "reference" }))
        })),
        amount: cart.cartTotal,
        paymentStatus: "UNPAID",
        paymentDate: ""
    };


    // saving the data to the database
    try {
        await sanityClient.createIfNotExists(order, { autoGenerateArrayKeys: true });
        return Response.json(SORData, { status: 200 });
    } catch (error) {
        console.log({ error });
        return Response.json({ message: error }, { status: 500 })
    }
}