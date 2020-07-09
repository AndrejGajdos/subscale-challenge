module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
	plugins: ['babel'],
	rules: {
		'react/prop-types': 0,
		'react/display-name': 0,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
