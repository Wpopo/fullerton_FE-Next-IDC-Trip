// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { ANALYZE } = process.env;
const path = require('path');
const webpack = require('webpack');
const withOffline = require('next-offline');

const nextConfig = {
  dontAutoRegisterSw: true,
  devSwSrc: './sw/service-worke.js',

  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      Components: path.resolve(__dirname, 'components/'),
      Styled: path.resolve(__dirname, 'styled/'),
      Lib: path.resolve(__dirname, 'lib/')
    };
    return config;
  }
};

module.exports = withOffline(nextConfig);
