/* eslint-disable no-console */

import { join } from 'path';
import { remove, copy, mkdir, writeFile } from 'fs-extra';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRegistry } from 'react-native-web';
import webpack from 'webpack';
import { getAppWebpackConfig } from './cosmos-webpack-config';
import { App } from '../components/App';

const BUILD_PATH = join(__dirname, '..', 'build');

run();

async function run() {
  const buildId = Date.now();
  await clearPrevBuild();
  await generateIndexFile(buildId);
  await bundleModules(buildId);
  await copyNowConfig();
}

async function clearPrevBuild() {
  await remove(getBuildPath());
  await mkdir(getBuildPath());
}

async function generateIndexFile(buildId) {
  console.log('Generating index file...');

  AppRegistry.registerComponent('Main', () => App);
  const { getStyleElement } = AppRegistry.getApplication('Main');

  const content = renderToStaticMarkup(<App />);
  const style = renderToStaticMarkup(getStyleElement());

  const page = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Jobs Done!</title>
    <meta
      name="description"
      content="A shutdown ritual app inspired by Deep Work"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#000915" />
    ${style}
  </head>
  <body>
    ${content}
    <div id="root"></div>
    <script src="main-${buildId}.js"></script>
  </body>
</html>`;

  await writeFile(getBuildPath('index.html'), page, 'utf8');
}

function getBuildPath(path = '.') {
  return join(BUILD_PATH, path);
}

async function bundleModules(buildId) {
  console.log('Bundling modules...');

  const webpackConfig = getAppWebpackConfig({
    path: getBuildPath(),
    filename: `main-${buildId}.js`,
    mode: 'production'
  });

  await runWebpackCompiler(webpackConfig);
}

async function copyNowConfig() {
  await copy('./now.json', getBuildPath('now.json'));
}

function runWebpackCompiler(webpackConfig) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    // Webpack error handling: https://webpack.js.org/api/node/#error-handling
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else if (stats.hasErrors()) {
        stats.toJson().errors.map(error => {
          console.log(error);
        });
        reject(new Error('webpack compilation failed'));
      } else {
        resolve(stats);
      }
    });
  });
}
