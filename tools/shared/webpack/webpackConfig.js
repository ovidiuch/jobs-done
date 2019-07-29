import webpack from 'webpack';
import { getCosmosConfig } from 'react-cosmos/dist/config';
import { getDefaultWebpackConfig } from 'react-cosmos/dist/plugins/webpack/webpackConfig/default';
import { addNativeAlias } from './addNativeAlias';

export function getAppWebpackConfig({ path, filename, mode }) {
  // XXX: This is an experiment to see what would a Cosmos API for building
  // an app bundle would look like
  const { rootDir, globalImports } = getCosmosConfig();
  const defaultWebpackConfig = getDefaultWebpackConfig(webpack, rootDir);

  let webpackConfig = {
    ...defaultWebpackConfig,
    mode,
    devtool: mode === 'production' ? false : defaultWebpackConfig.devtool,
    entry: [...globalImports, require.resolve('../../../App.dom')],
    output: {
      path,
      filename,
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

  if (mode === 'production') {
    // Enable minimization
    webpackConfig = {
      ...webpackConfig,
      optimization: { minimize: true }
    };
  }

  return addNativeAlias(webpackConfig);
}

function isPluginType(plugin, constructorName) {
  return plugin.constructor && plugin.constructor.name === constructorName;
}
