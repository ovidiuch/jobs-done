const alias = require('./alias');

exports.addNativeAlias = function(config) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      // These aliases are already applied via Babel, except that the Babel
      // webpack loader only transforms source code (excluding node_modules)
      alias
    }
  };
};

exports.compileReactRouter = function(config) {
  return addRule(config, {
    test: /\.js$/,
    include: /react-router-native/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        // XXX: Why does react-router-native require babel-polyfill and the
        // rest of the app doesn't?
        options: require('../.babelrc.js')
      }
    ]
  });
};

function addRule(config, rule) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [...config.module.rules, rule]
    }
  };
}
