import { join } from 'path';
import { remove, mkdir, writeFile } from 'fs-extra';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRegistry } from 'react-native-web';
import webpack from 'webpack';
import { getAppWebpackConfig } from './cosmos-webpack-config';
import { App } from '../components/App';

const BUILD_PATH = join(__dirname, '..', 'build');

run();

async function run() {
  await clearPrevBuild();
  await generateIndexFile();
  await bundleModules();
}

async function clearPrevBuild() {
  await remove(getBuildPath());
  await mkdir(getBuildPath());
}

async function generateIndexFile() {
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
    <script src="main.js"></script>
  </body>
</html>`;

  await writeFile(getBuildPath('index.html'), page, 'utf8');
}

function getBuildPath(path = '.') {
  return join(BUILD_PATH, path);
}

async function bundleModules() {
  const webpackConfig = getAppWebpackConfig({
    path: getBuildPath(),
    mode: 'production'
  });

  await runWebpackCompiler(webpackConfig);
}

function runWebpackCompiler(webpackConfig) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}
