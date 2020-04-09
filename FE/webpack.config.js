const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.html'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/ts/main.ts', './src/css/main.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, 'src/ts')],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import'),
                require('tailwindcss'),
                require('autoprefixer'),
                // purgecss,
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'] },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  devServer: {
    host: '127.0.0.1',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    inline: true,
    port: 9000,
    open: true,
  },
};
