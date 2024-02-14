// documents - these can be added from sanity
import { page } from "./documents/page-schema";
import { category } from "./documents/category-schema";
import { product } from "./documents/product-schema";
import { brand } from "./documents/brand-schema";
import { tag } from "./documents/tag-schema";
import { warranty } from "./documents/warranty-schema";
import { order } from "./documents/orders-schema";

// objects - these can be added from sanity but within documents
import { productColor } from "./objects/product/product-color-schema";
import { productSize } from "./objects/product/product-size-schema";

// previews - these are complex objects that are sections of pages in the site [abovethefolds, carousels, grids, etc]
import { aboveTheFoldContentImage } from "./preview/atf-content-image";
import { instagram } from "./preview/instagram-schema";
import { youtube } from "./preview/youtube-schema";
import { gridCollection } from "./preview/grid-collection";
import { carouselCollection } from "./preview/carousel-collection";

export const schemaTypes = [
    aboveTheFoldContentImage, brand, carouselCollection, category, gridCollection, instagram, order, page, product, productColor, productSize, tag, warranty, youtube
];