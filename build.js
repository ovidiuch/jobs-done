import { join } from 'path';
import { remove, mkdir, writeFile } from 'fs-extra';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRegistry } from 'react-native-web';
import App from './App.main';

const BUILD_DIR = 'build';

run();

async function run() {
  // Clear previous build
  await remove(getBuildDir());
  await mkdir(getBuildDir());

  // Generate index page
  const indexPage = await getIndexPage();
  await writeFile(getBuildDir('index.html'), indexPage, 'utf8');
}

async function getIndexPage() {
  AppRegistry.registerComponent('Main', () => App);
  const { getStyleElement } = AppRegistry.getApplication('Main');

  const content = renderToStaticMarkup(<App />);
  const style = renderToStaticMarkup(getStyleElement());

  // TODO: Build JS bundle with webpack and add to head

  let page = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
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
  </body>
</html>`;

  return page;
}

function getBuildDir(path = '.') {
  return join(BUILD_DIR, path);
}
