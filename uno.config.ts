import extractorSvelte from "@unocss/extractor-svelte";
import { colors, presetMini } from "@unocss/preset-mini";
import {
    defineConfig,
    presetIcons,
    presetTypography,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";

export default defineConfig({
    shortcuts: [
        {
            "i-logo": "i-logos-astro w-6em h-6em transform transition-800",
        },
    ],
    extractors: [extractorSvelte()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    presets: [
        presetMini({
            dark: {
                light: "[data-theme='winter']",
                dark: "[data-theme='dracula']",
            },
        }),
        presetIcons({
            extraProperties: {
                display: "inline-block",
                "vertical-align": "middle",
            },
            collections: {
                mdi: () =>
                    import("@iconify-json/mdi/icons.json").then(
                        (i) => i.default,
                    ),
            },
        }),
        presetTypography(),
    ],
    extendTheme: (theme) => {
        // @ts-expect-error
        if (theme.fontFamily) {
            if (theme.fontFamily.sans) {
                theme.fontFamily.sans = [
                    "LXGW WenKai Screen",
                    ...theme.fontFamily.sans,
                ];
            }

            if (theme.fontFamily.mono) {
                theme.fontFamily.mono = [
                    "IBM Plex Mono",
                    ...theme.fontFamily.mono,
                ];
            }
        }

        // @ts-expect-error
        if (theme.boxShadow) {
            // @ts-expect-error
            theme.boxShadow.default = `6px 6px 0 0 ${colors.fuchsia[600]}`;
            // @ts-expect-error
            theme.boxShadow.blur = `10px 10px 0 0 ${colors.fuchsia[500]}`;
        }

        return theme;
    },
});
