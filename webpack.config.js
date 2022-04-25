const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackMode = process.env.NODE_ENV || 'development';

module.exports = {
	mode: webpackMode,
    // 각 html에 필요한 entry 파일
	entry: {
		main: './src/js/main.js',
        sub1: './src/js/sub1.js',
        sub2: './src/js/sub2.js',
	},
	output: {
		path: path.resolve('./dist/'),
		filename: './js/[name].min.js', // entry에 선언된 객체의 각 프로퍼티가 [name]과 치환되어 파일이 생성
	},
	// es5로 빌드 해야 할 경우 주석 제거
	// 단, 이거 설정하면 webpack-dev-server 3번대 버전에서 live reloading 동작 안함
	// target: ['web', 'es5'],
	devServer: {
		liveReload: true
	},
	optimization: {
		minimizer: webpackMode === 'production' ? [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true
					}
				}
			})
		] : [],
		splitChunks: {
			chunks: 'all'
		}
	},
	module: {
		rules: [
            {
                test: /\.css$/i,
                use:[MiniCssExtractPlugin.loader, "css-loader"],
            },
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ // HTML을 동적으로 생성, 따로 분리하여 번들한 js 파일을 자동으로 추가해준다.
            title: 'webpack main',
			template: './src/index.html',
            filename:'index.html',
            excludeChunks:['sub1','sub2'], // excludeChunks를 제외한 나머지 entry를 묶으라
			minify: process.env.NODE_ENV === 'production' ? {
				collapseWhitespace: true,
				removeComments: true,
			} : false
		}),
        new HtmlWebpackPlugin({ // HTML을 동적으로 생성, 따로 분리하여 번들한 js 파일을 자동으로 추가해준다.
            title: 'webpack sub1',
			template: './src/sub1.html',
            filename:'sub1.html',
            chunks:['sub1'], // 번들된 파일 중에 어떤 것을 html 파일에 포함시킬 건지
			minify: process.env.NODE_ENV === 'production' ? {
				collapseWhitespace: true,
				removeComments: true,
			} : false
		}),
        new HtmlWebpackPlugin({ // HTML을 동적으로 생성, 따로 분리하여 번들한 js 파일을 자동으로 추가해준다.
            title: 'webpack sub2',
			template: './src/sub2.html',
            filename:'sub2.html',
            chunks:['sub2'], // 번들된 파일 중에 어떤 것을 html 파일에 포함시킬 건지
			minify: process.env.NODE_ENV === 'production' ? {
				collapseWhitespace: true,
				removeComments: true,
			} : false
		}),
        new MiniCssExtractPlugin({
            filename:"./css/[name].css",
        }),
		new CleanWebpackPlugin(),
		// CopyWebpackPlugin: 그대로 복사할 파일들을 설정하는 플러그인
		// 아래 patterns에 설정한 파일/폴더는 빌드 시 dist 폴더에 자동으로 생성됩니다.
		// patterns에 설정한 경로에 해당 파일이 없으면 에러가 발생합니다.
		// 사용하는 파일이나 폴더 이름이 다르다면 변경해주세요.
		// 그대로 사용할 파일들이 없다면 CopyWebpackPlugin을 통째로 주석 처리 해주세요.
		new CopyWebpackPlugin({
			patterns: [
				//{ from: "./src/css", to: "./css" },
				{ from: "./src/img", to: "./img" },
			],
		})
	]
};