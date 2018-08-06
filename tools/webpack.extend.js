const alias = require('./alias');

exports.addNativeAlias = function(config) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      // These aliases are already applied via Babel, except Babel only compiles
      // source code (excluding node_modules)
      alias
    }
  };
};
