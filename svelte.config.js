import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import path from 'path';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	// preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$docs: path.resolve('./src/docs')
		},
	},
	

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
