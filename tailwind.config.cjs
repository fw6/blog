module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte}"],
    theme: {
        extend: {},
        screens: {
            sm: "640px",
        },
        fontFamily: {
            mono: ["IBM Plex Mono", "monospace"],
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: ["dracula", "winter"],
    },
};
