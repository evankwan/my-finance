import globals from "globals";
import eslintPluginVue from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"

const { base: vueBase, recommended: vueRecommended } = eslintPluginVue.configs

export default [
	{
		files: [
			"src/**/*.{js,vue}",
		],
		plugins: {
			"globals/browser": globals.browser,
			"plugin:vue/base": vueBase,
			"plugin:vue/vue3-recommended": vueRecommended,
		},
		// 	globals: globals.browser,
		// 	vue: eslintPluginVue,
		// },
		"languageOptions": {
			"parser": vueParser,
		},
		"rules": {
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

		}
	}
]