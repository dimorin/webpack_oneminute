const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackMode = process.env.NODE_ENV || 'development';
const plugins = [		
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
];
const files_js = {index:'main', sub1:'sub1', sub2:'sub2', header:null, nav:null};
const htmlPlugin = Object.keys(files_js).map(file => {
    return new HtmlWebpackPlugin({ 
        title: `${file}`,
        template: `./src/${file}.html`,
        filename:`${file}.html`,
        chunks:files_js[file]? [files_js[file]]:[],
        minify: process.env.NODE_ENV === 'production' ? {
            collapseWhitespace: true,
            removeComments: true,
        } : false
    })
});
plugins.push(...htmlPlugin);
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
            /* {
                test: /\.css$/i,
                use:[MiniCssExtractPlugin.loader, "css-loader"],
            }, */
            {
                test: /\.(scss|css)$/, //.css 확장자로 끝나는 모든 파일
                use: [
                  process.env.NODE_ENV === "production"
                    ? MiniCssExtractPlugin.loader
                    : "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
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
	plugins: plugins
};