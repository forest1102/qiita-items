const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/robots.ts',
	target: 'node',
	devtool: 'inline-source-map',
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: ['node_modules'],
	},

	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'lib'),
		publicPath: './',
		libraryTarget: 'commonjs'
	},
	node: {
		__dirname: false,
	},
}
