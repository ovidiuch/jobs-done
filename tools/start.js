import serve from 'webpack-serve';
import { getAppWebpackConfig } from './cosmos-webpack-config';
import { getIndexFile } from './index-file';

start();

async function start() {
  const argv = {};
  const scriptFilename = 'main.js';
  const config = getAppWebpackConfig({
    path: '/',
    filename: scriptFilename,
    mode: 'development'
  });

  serve(argv, { config }).then(result => {
    const { app } = result;

    app.use(async ctx => {
      ctx.body = getIndexFile({ scriptFilename });
    });
  });
}
