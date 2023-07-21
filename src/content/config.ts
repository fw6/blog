import { defineCollection } from "astro:content";
import { blogSchema } from "./_schema";

const blog = defineCollection({
    schema: blogSchema,
});

export const collections = { blog };
