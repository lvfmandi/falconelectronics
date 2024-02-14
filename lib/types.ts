import { ColorValue } from "@sanity/color-input";
import { Image, PortableTextBlock } from "sanity";

export type Brand = {
    _id: string;
    _type: string;
    name: string;
    slug: Slug;
    image: Image;
};

export interface Category {
    _id: string;
    _ref: string;
    _key: string;
    name: string;
    slug: { current: string };
    image: Image;
    description?: string;
    otherChildren: ChildCategory[];
}

export interface ChildCategory {
    _id: string;
    _ref?: string;
    _key: string;
    name: string;
    description?: string;
    slug: { current: string };
    parent?: ParentReference;
    otherChildren: ChildCategory[];
}

export type Color = {
    _key: string;
    _type: string;
    image: Image;
    name: string;
    sku: string;
    value: ColorValue[];
};

export type HighlightedSpecification = {
    _key: string;
    name: string;
    value: string;
};

export type ParentReference = {
    _weak: Boolean;
    _ref: string,
    _type: string
}

export interface Product {
    _id: string;
    _type: string;
    brand: Brand;
    categories: (Category | ChildCategory)[];
    description: PortableTextBlock;
    discountedPrice: number;
    highlightedSpecifications: HighlightedSpecification[];
    images: Image[];
    inventory?: Inventory;
    name: string;
    options?: (Color | Size)[];
    price: number;
    reviews?: Review[];
    sku: string;
    slug: Slug;
    specifications: Specification[];
    tags?: Tag[];
    variants?: Variant[];
    warranty: Tag;
}

export type Inventory = {
    quantity?: number;
    inStock?: boolean;
};

export type ObjectElement = {
    _key: string;
    variantName: string;
    variantPrice: number;
    variantDiscountedPrice: number;
    variantImage?: Image;
    sku: string;
};

export type Review = {
    _id: string;
    _type: string;
    name: string;
    email: string;
    rating: number;
    comment: string;
    published: boolean
}

export type Size = {
    _key: string;
    _type: string;
    name: string;
    sku: string;
    value: number;
};

export type Slug = {
    _type: string;
    current: string;
};

export type Specification = {
    _key: string;
    table: Table;
    title: string;
};

export type Table = {
    rows: Row[];
};

export type Tag = {
    _id: string;
    _type: string;
    _key?: string;
    name: string;
    slug: Slug;
}

export type Row = {
    _key: string;
    _type: string;
    cells: string[];
};

export type Variant = {
    _key: string;
    objects: ObjectElement[];
    variantTitle: string;
}