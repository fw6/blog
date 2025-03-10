import { z } from "astro:content";

export const blogSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    draft: z.optional(z.boolean()).nullable(),
    pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
    updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),

    tags: z
        .array(z.string())
        .or(z.string())
        .optional()
        .transform((val) => {
            if (typeof val === "string") {
                return val.split(" ").map((tag) => tag.trim());
            }
            return val;
        })
        .default(["writings"]),
    postSlug: z.string().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;
