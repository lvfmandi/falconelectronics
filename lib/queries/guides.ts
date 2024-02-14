import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { TypedObject } from "sanity";

const noData = {
    _key: "nodata",
    _type: "block",
    children: [
        {
            _key: "span",
            _type: "span",
            marks: [],
            text: "No data"
        }
    ],
    markDefs: [],
    style: "normal"
}

export const TermsContent = async (): Promise<TypedObject> => {
    const { body } = await client.fetch(groq`*[_type == "page" && name == "Terms and Condition"][0] {
        body[]
    }`) || {
        body: [noData]
    };

    return body;
}

export const ShippingContent = async (): Promise<TypedObject> => {
    const { body } = await client.fetch(groq`*[_type == "page" && name == "Shipping Policy"][0] {
        body[]
    }`) || {
        body: [noData]
    };

    return body;
}

export const PrivacyContent = async (): Promise<TypedObject> => {
    const { body } = await client.fetch(groq`*[_type == "page" && name == "Privacy Policy"][0] {
        body[]
    }`) || {
        body: [noData]
    };

    return body;
}