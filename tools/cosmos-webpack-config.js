import { getCosmosConfig } from 'react-cosmos-config';
import getDefaultWebpackConfig from 'react-cosmos/dist/server/web/webpack/default-webpack-config';
const { addNativeAlias } = require('./webpack.extend');

export function getAppWebpackConfig({ path, mode }) {
  // NOTE: This is an experiment to see what would a Cosmos API for building
  // an app bundle would look like
  const { rootPath, globalImports } = getCosmosConfig();
  let webpackConfig = {
    ...getDefaultWebpackConfig(rootPath),
    mode,
    devtool: false,
    entry: [...globalImports, require.resolve('../App.main')],
    output: {
      path,
      filename: 'main.js',
      publicPath: '/'
    }
  };

  // XXX: Omit HtmlWebpackPlugin used in renderer build
  webpackConfig = {
    ...webpackConfig,
    plugins: webpackConfig.plugins.filter(
      p => !isPluginType(p, 'HtmlWebpackPlugin')
    )
  };

  // TODO: Minimization is disabled in renderer build
  webpackConfig = {
    ...webpackConfig,
    optimization: { minimize: true }
  };

  return addNativeAlias(webpackConfig);
}

function isPluginType(plugin, constructorName) {
  return plugin.constructor && plugin.constructor.name === constructorName;
}
