import { getCosmosConfig } from 'react-cosmos-config';
import getDefaultWebpackConfig from 'react-cosmos/dist/server/web/webpack/default-webpack-config';
const { addUrlLoader, addNativeAlias } = require('./webpack.extend');

export function getAppWebpackConfig({ path, mode }) {
  // XXX: Extend Cosmos' default webpack config to use the App component as the
  // entry point.
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

  return addUrlLoader(addNativeAlias(webpackConfig));
}

function isPluginType(plugin, constructorName) {
  return plugin.constructor && plugin.constructor.name === constructorName;
}
