const defaultTheme = require("tailwindcss/defaultTheme");
const daisyuiThemes = require("daisyui/src/theming/themes");
const tailwindcssColors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["LXGW WenKai Screen", ...defaultTheme.fontFamily.sans],
                mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
            },
            boxShadow: {
                default: `6px 6px 0 0 ${tailwindcssColors.fuchsia[600]}`,
                blur: `10px 10px 0 0 ${tailwindcssColors.fuchsia[500]}`,
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: [
            {
                dracula: {
                    ...daisyuiThemes["[data-theme=dracula]"],
                    primary: tailwindcssColors.fuchsia[400],
                    "primary-focus": tailwindcssColors.fuchsia[500],

                    ".floating-btn": {
                        "border-width": "4px",
                        "border-style": "solid",
                        "border-color": tailwindcssColors.fuchsia[200],
                        "box-shadow": `6px 6px 0 0 ${tailwindcssColors.fuchsia[400]}`,
                        transition: ".2s ease-in-out",
                    },
                    ".floating-btn:hover": {
                        "box-shadow": `10px 10px 0 0 ${tailwindcssColors.fuchsia[500]}`,
                        transform: "translateY(-0.5rem) translateX(-0.5rem)",
                    },
                },
                winter: {
                    ...daisyuiThemes["[data-theme=winter]"],
                    primary: tailwindcssColors.fuchsia[600],
                    "primary-focus": tailwindcssColors.fuchsia[500],

                    ".floating-btn": {
                        "border-color": tailwindcssColors.black,
                        "box-shadow": `6px 6px 0 0 ${tailwindcssColors.fuchsia[600]}`,
                    },
                },
            },
        ],
    },
};
