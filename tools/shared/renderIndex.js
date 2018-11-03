import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRegistry } from 'react-native-web';
import { StaticRouter } from 'react-router';
import { Routes } from '../../components/App/Routes';

const Root = () => (
  <StaticRouter location="/" context={{}}>
    <Routes />
  </StaticRouter>
);

export function renderIndex({ scriptFilename }) {
  AppRegistry.registerComponent('Main', () => Root);
  const { getStyleElement } = AppRegistry.getApplication('Main');

  const content = renderToStaticMarkup(<Root />);
  const style = renderToStaticMarkup(getStyleElement());

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Jobs Done!</title>
    <meta
      name="description"
      content="Ritual app for ending the work day"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#000915" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    ${style}
  </head>
  <body>
    <div id="root">${content}</div>
    <script src="${scriptFilename}"></script>
  </body>
</html>`;
}
