const alias = require('../alias');

exports.addNativeAlias = function(config) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      // .web.js files can their .js counterpart in the web build
      extensions: ['.web.js', '.js'],
      // These aliases are already applied via Babel, except that the Babel
      // webpack loader only transforms source code and not node_modules
      alias
    }
  };
};
