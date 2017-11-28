var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LiveReloadPlugin = require("webpack-livereload-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var webpack = require("webpack");
var appExtractTextPlugin = new ExtractTextPlugin({
  filename: "app.css",
  disable: false,
  allChunks: true
});

//new UglifyJsPlugin({ sourceMap: false })
var baseConfig = {
  entry: {
    bundle: ["./src/index"]
  },
  output: {
    filename: "[name].js"
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true
  },
  plugins: [
    appExtractTextPlugin,
    new webpack.LoaderOptionsPlugin({
      options: {
        "if-loader": process.env.NODE_ENV === "production" ? "production" : "dev",
        debug: process.env.NODE_ENV !== "production"
      }
    }),
    new CopyWebpackPlugin([
      {from: "./index.html"}])
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              ["flow"],
              ["es2015", { loose: true, modules: false }],
              ["react"],
              ["stage-0"]
            ],
            plugins: [
              ["transform-object-rest-spread", "transform-class-properties"]
            ]
          }
        }, {
          loader: "if-loader"
        }]
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: appExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|ico|gif|png)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: "url-loader?limit=100000"
      }
    ]
  }
};
if (process.env.NODE_ENV === "production") {
  baseConfig.cache = false;
//  baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
//    compress: false,
//    sourceMap: false
//  }));
} else {
  baseConfig.plugins.push(new LiveReloadPlugin({
    port: 36010
  }));
  baseConfig.cache = true;
  baseConfig.devtool = "inline-source-map";
}
module.exports = baseConfig;
