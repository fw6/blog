import type { CollectionEntry } from "astro:content";
import { slugifyAll } from "./slugify";

export const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
    posts.filter((post) => slugifyAll(post.data.tags).includes(tag));
