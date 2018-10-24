import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRegistry } from 'react-native-web';
import { App } from '../components/App';

export function getIndexFile({ scriptFilename }) {
  AppRegistry.registerComponent('Main', () => App);
  const { getStyleElement } = AppRegistry.getApplication('Main');

  const content = renderToStaticMarkup(<App />);
  const style = renderToStaticMarkup(getStyleElement());

  return `<!DOCTYPE html>
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
    <div id="root">${content}</div>
    <script src="${scriptFilename}"></script>
  </body>
</html>`;
}
