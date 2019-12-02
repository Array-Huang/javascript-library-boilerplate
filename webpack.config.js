const webpack = require('webpack');
const mode = require('yargs').argv.mode;
const libraryTarget = require('yargs').argv['output-library-target'];
const pkg = require('./package.json');

const libraryName = 'micro-schema-validator';

const banner = `
${pkg.name}
${pkg.description}\n
@version v${pkg.version}
@homepage ${pkg.homepage}
@repository ${pkg.repository.url}\n
(c) 2019 Array-Huang
Released under the MIT License.
hash: [hash]
`;

const plugins = [new webpack.BannerPlugin(banner)];

module.exports = {
  entry: `${__dirname}/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/${libraryTarget === 'umd' ? 'dist' : 'lib'}`,
    filename: mode === 'development' ? `${libraryName}.js` : `${libraryName}.min.js`,
    library: 'MicroSchemaValidator',
    libraryTarget: libraryTarget || 'umd',
    globalObject: "(typeof self !== 'undefined' ? self : this)", // TODO Hack (for Webpack 4+) to enable create UMD build which can be required by Node without throwing error for window being undefined (https://github.com/webpack/webpack/issues/6522)
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: plugins
};
