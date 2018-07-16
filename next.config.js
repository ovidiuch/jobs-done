const { addUrlLoader } = require('./webpack.extend');

module.exports = {
  webpack: config => addUrlLoader(config)
};
