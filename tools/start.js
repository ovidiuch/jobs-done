import serve from 'webpack-serve';
import { argv } from 'yargs';
import { getAppWebpackConfig } from './shared/webpack/webpackConfig';
import { renderIndex } from './shared/renderIndex';

start();

async function start() {
  const scriptFilename = 'main.js';
  const config = getAppWebpackConfig({
    path: '/',
    filename: scriptFilename,
    mode: 'development'
  });

  const { host = '0.0.0.0' } = argv;
  serve({ host }, { config }).then(result => {
    const { app } = result;

    app.use(async ctx => {
      ctx.body = renderIndex({ scriptFilename });
    });
  });
}
