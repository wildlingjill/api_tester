module.exports = {

	"parser": "babel-eslint",

	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"spaced-comment": [
			"error",
			"always",
			{ "exceptions":
				["-", "+"]
			}
		],
		"brace-style": [
			"error",
			"1tbs"
		],
		"curly": [
			"error",
			"all"
		],
		"eqeqeq": [
			"error",
			"smart"
		],
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"no-var": "warn",
		"no-unreachable": "error",
		"block-scoped-var": "error",
		"no-eq-null": "error",
		"require-await": "error",
		"no-use-before-define": "error",
		"callback-return": "error",
		"no-console": "off",
		"no-octal": "off",
	}
};
