const { addUrlLoader, addNativeAlias } = require('./webpack.extend');

module.exports = {
  webpack: config => addNativeAlias(addUrlLoader(config))
};
