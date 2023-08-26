import { FlatCompat } from "@eslint/eslintrc"
import path from "path";
import { fileURLToPath } from "url";

import globals from "globals"
import vue from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname })

const { base: vueBase, "vue3-recommended": vueRecommended, } = vue.configs

export default [
	{
		ignores: ["node_modules", "coverage", "dist"],
	},
	...compat.plugins("vue"),
	...compat.extends("plugin:vue/vue3-strongly-recommended"),
	{
		files: [
			"src/**/*.{js,vue}",
		],
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: vueParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
		rules: {
			"array-bracket-spacing": 2,
			"arrow-spacing": 2,
			"block-spacing": 2,
			"indent": [
				"error",
				"tab"
			],
			"no-duplicate-imports": "error",
			"no-multi-spaces": 2,
			"no-param-reassign": "error",
			"vue/singleline-html-element-content-newline": ["error", {
				"ignoreWhenNoAttributes": true,
				"ignoreWhenEmpty": true,
				"ignores": ["pre", "textarea"]
			}],
			"vue/multi-word-component-names": "off",
		}
	}
]