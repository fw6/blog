import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import preload from "astro-preload";
import rome from "astro-rome";
import { defineConfig } from "astro/config";
import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
    server: {
        port: 5757,
        host: true,
    },
    site: "https://example.com",
    integrations: [preload(), compress(), rome(), mdx(), sitemap(), tailwind()],
    experimental: {
        assets: true,
    },
    markdown: {
        remarkPlugins: [
            remarkToc,
            rehypeAccessibleEmojis,
            () => (tree, { data }) => {
                const textOnPage = mdastToString(tree);
                const readingTime = getReadingTime(textOnPage);
                data.astro.frontmatter.minutesRead = readingTime.text;
            },
        ],
        shikiConfig: {
            theme: "dracula",
            wrap: true,
        },
    },
});
