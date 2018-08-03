const alias = require('./alias');

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

exports.addNativeAlias = function(config) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      // These aliases are already applied via Babel, except Babel only aliases
      // imports/requires in repo source
      alias
    }
  };
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
