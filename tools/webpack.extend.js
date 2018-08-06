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
