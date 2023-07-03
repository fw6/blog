import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        draft: z.optional(z.boolean()),
        // Transform string to Date object
        pubDate: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val)),
        updatedDate: z
            .string()
            .optional()
            .transform((str) => (str ? new Date(str) : undefined)),
        heroImage: z.string().optional(),

        tags: z.array(z.string()).default(["writings"]),
    }),
});

export const collections = { blog };
