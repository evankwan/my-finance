import vitestGlobals from "eslint-plugin-vitest-globals";
import globals from "globals";

export default [
	"eslint:recommended",
	{
		"languageOptions": {
			"globals": {
				...globals.browser,
				"vi": "readonly",
				"describe": "readonly",
				"it": "readonly",
				"expect": "readonly",
				"afterEach": "readonly",
				"beforeEach": "readonly",
			}
		},
		"plugins": {
			"plugin:vitest-globals/recommended": vitestGlobals,
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
			"no-param-reassign": "error"
		}
	}
]