import path from "path";
import url from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizer from "css-minimizer-webpack-plugin";
import TerserWebpack from "terser-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

// https://webpack.js.org/configuration/mode/#mode-none
export default (env, options) => {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "public", "index.html"),
  });
  const esLintPlugin = new ESLintPlugin({ extensions: ["ts", "tsx"] });
  // https://webpack.js.org/configuration/mode/#mode-none
  const devMode = options.mode !== "production";
  const styleLoader = devMode ? "style-loader" : MiniCssExtractPlugin.loader;
  const plugins = [];
  plugins.push(htmlWebpackPlugin);
  plugins.push(esLintPlugin);
  if (!devMode) {
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    plugins.push(
      new MiniCssExtractPlugin({ filename: `main.${new Date().getTime()}.css` })
    );
  }

  return {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      clean: true,
      // https://teratail.com/questions/258274
      publicPath: "/",
      path: path.join(__dirname, "build"),
      filename: `main.${new Date().getTime()}.js`,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/react"],
                // https://cpoint-lab.co.jp/article/202107/20491/
                plugins: ["@babel/plugin-transform-runtime"],
              },
            },
            {
              loader: "ts-loader",
              options: { configFile: path.join(__dirname, "tsconfig.json") },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [styleLoader, "css-loader", "sass-loader"],
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
      ],
    },
    devtool: "source-map",
    devServer: {
      open: true,
      static: { directory: path.join(__dirname, "public") },
      port: 3000,
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      alias: { "@": path.join(__dirname, "src") },
    },
    target: "web",
    stats: "normal",
    optimization: {
      // https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
      minimizer: [new TerserWebpack(), new CssMinimizer()],
    },
    plugins,
  };
};
