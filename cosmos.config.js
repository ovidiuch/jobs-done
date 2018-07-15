module.exports = {
  globalImports: ['src/global.js'],
  webpack: addUrlLoader
};

function addUrlLoader(config) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.mp3$/,
          use: [
            {
              loader: 'url-loader'
            }
          ]
        }
      ]
    }
  };
}
