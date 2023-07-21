import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "@consts";

export async function get(context) {
    const posts = await getCollection("blog", ({ data }) => data.draft !== true);

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: posts.map((post) => ({
            ...post.data,
            link: `${import.meta.env.BASE_URL}${post.data.tags.includes("notes") ? "notes" : "writings"}/${post.slug}/`,
        })),
    });
}
