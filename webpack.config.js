const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: `${__dirname}/dist`,
		chunkFilename: '[id].[chunkhash].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jsx|js)$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								targets: 'defaults',
							}],
							'@babel/preset-react',
						],
						plugins: ['@babel/proposal-class-properties'],
					},
				}],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	devServer: {
		static: './dist',
		historyApiFallback: true,
   	hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
	],
	optimization: {
		runtimeChunk: 'single',
	},
};