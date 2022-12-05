const config = {
	content: 
	[
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	

	theme: {
		extend: {
			
				colors: {
				  'mtc': '#890c58',
			
			},
		}
	},

	plugins: [
	require('@skeletonlabs/skeleton/tailwind/theme.cjs'),
	require('@tailwindcss/forms'),
	],
	
};

module.exports = config;
