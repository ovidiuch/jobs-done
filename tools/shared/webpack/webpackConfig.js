import { join } from 'path';
import { getCosmosConfig } from 'react-cosmos-config';
import getDefaultWebpackConfig from 'react-cosmos/dist/server/web/webpack/default-webpack-config';
import { addNativeAlias } from './addNativeAlias';

const ROOT_PATH = join(__dirname, '../../..');
const COSMOS_CONFIG_PATH = join(ROOT_PATH, 'tools/cosmos/cosmos.config.js');

export function getAppWebpackConfig({ path, filename, mode }) {
  // XXX: This is an experiment to see what would a Cosmos API for building
  // an app bundle would look like
  const { rootPath, globalImports } = getCosmosConfig(COSMOS_CONFIG_PATH);
  const defaultWebpackConfig = getDefaultWebpackConfig(rootPath);

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
