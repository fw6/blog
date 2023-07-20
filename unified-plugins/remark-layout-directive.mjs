import { h } from "hastscript";
import { visit } from "unist-util-visit";

/**
 * @typedef {import('mdast').Root} Root
 */

/**
 * 多列布局
 *
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<void[], Root>}
 */
export function remarkLayoutDirective() {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type === "leafDirective" || node.type === "containerDirective") {
                if (node.name !== "column") return;

                node.data ||= {};
                const data = node.data;
                const {
                    width = "auto",
                    count = "2",
                    gap = "normal",
                    rule = "medium none currentcolor",
                    ...attributes
                } = node.attributes;

                data.hName = "div";
                data.hProperties = h("div", {
                    ...attributes,
                    class: "columns-wrapper",
                    style: `columns: ${count} ${width};column-gap: ${gap};column-rule: ${rule};break-inside: avoid;`,
                }).properties;
            }
        });
    };
}
