import { join } from 'path';
import { remove, copy, mkdir, writeFile } from 'fs-extra';
import webpack from 'webpack';
import cpy from 'cpy';
import { getAppWebpackConfig } from './shared/webpack/webpackConfig';
import { renderIndex } from './shared/renderIndex';

const BUILD_PATH = join(__dirname, '../build');
const STATIC_PATH = join(__dirname, '../static');

run();

async function run() {
  const buildId = Date.now();
  await clearPrevBuild();
  await generateIndexFile(buildId);
  await bundleModules(buildId);
  await copyNowConfig();
  await copyStatics();
}

async function clearPrevBuild() {
  await remove(getBuildPath());
  await mkdir(getBuildPath());
}

async function generateIndexFile(buildId) {
  console.log('Generating index file...');

  const indexFile = renderIndex({
    scriptFilename: `main-${buildId}.js`
  });
  await writeFile(getBuildPath('index.html'), indexFile, 'utf8');
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

async function copyStatics() {
  return cpy('**/*', '../build', {
    cwd: STATIC_PATH,
    parents: true
  });
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
