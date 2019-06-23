const path = require("path")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WorkerPlugin = require("worker-plugin")

const IS_DEV = process.env.NODE_ENV === "development"
const ANALYZE_BUNDLE = process.env.ANALYZE_BUNDLE === "true"

const plugins = [
  new HtmlWebpackPlugin({
    title: "Caching",
    template: "src/index.html"
  }),
  new CopyWebpackPlugin([
    { from: path.join("src", "static", "img", "favicon.ico") }
  ]),
  new WorkerPlugin()
]

if (!IS_DEV) plugins.push(new CleanWebpackPlugin())

if (ANALYZE_BUNDLE)
  plugins.push(new BundleAnalyzerPlugin({ generateStatsFile: true }))

module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: IS_DEV ? "[name].bundle.js" : "[name].[contenthash].js",
    umdNamedDefine: true,
    globalObject: "this"
  },
  mode: IS_DEV ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          "img-loader"
        ]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 12,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`
          }
        }
      }
    }
  },
  plugins,
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      path.join(__dirname, "src", "lib"),
      "node_modules"
    ],
    extensions: [".json", ".js", ".jsx"],
    mainFiles: ["index"]
  },
  devtool: IS_DEV ? "eval-source-map" : "source-map",
  devServer: {
    historyApiFallback: true,
    port: 3000,
    compress: false,
    contentBase: "./dist",
    inline: true,
    hot: true,
    open: false,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true
    }
  }
}
