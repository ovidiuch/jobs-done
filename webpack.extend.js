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
      alias: {
        'react-native$': 'react-native-web',
        'react-native-svg': 'svgs'
      }
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
