import { apiVersion, projectId, dataset } from "@/sanity/env";
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion,
    token: process.env.NEXT_PUBLIC_POSTING_DATA_TOKEN,
})