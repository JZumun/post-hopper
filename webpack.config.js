const webpack = require("webpack");
const path = require("path");

module.exports = {
	entry: {
		"post-hopper": ["./src/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		library: "PostHopper"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
	]
};
