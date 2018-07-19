const { addUrlLoader } = require('./webpack.extend');

module.exports = {
  globalImports: ['./global.js'],
  webpack: config => addUrlLoader(config)
};