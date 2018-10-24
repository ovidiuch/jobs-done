import serve from 'webpack-serve';
import { argv } from 'yargs';
import { getAppWebpackConfig } from './cosmosWebpackConfig';
import { getIndexFile } from './indexFile';

start();

async function start() {
  const scriptFilename = 'main.js';
  const config = getAppWebpackConfig({
    path: '/',
    filename: scriptFilename,
    mode: 'development'
  });

  const { host = 'localhost' } = argv;
  serve({ host }, { config }).then(result => {
    const { app } = result;

    app.use(async ctx => {
      ctx.body = getIndexFile({ scriptFilename });
    });
  });
}
