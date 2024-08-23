import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				"primary": "var(--primary)",
				"secondary": "var(--secondary)",
				"accent": "var(--accent)",
				"background": "var(--background)",
				"base-100": "#fff"
			}
		}
	},
	plugins: [flowbitePlugin]
};

export default config;