exports.addUrlLoader = function(config) {
  return addLoader(config, {
    test: /\.mp3$/,
    use: [
      {
        loader: 'url-loader'
      }
    ]
  });
};

function addLoader(config, loader) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [...config.module.rules, loader]
    }
  };
}
