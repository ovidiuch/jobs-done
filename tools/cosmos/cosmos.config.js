const { addNativeAlias } = require('../shared/webpack/addNativeAlias');

module.exports = {
  rootPath: '../..',
  // The rest of the paths are relative to `rootPath`, so this project's root
  proxiesPath: 'tools/cosmos/cosmos.proxies.js',
  modulesPath: 'tools/cosmos/cosmos.modules.js',
  globalImports: ['./global.js'],
  webpack: config => addNativeAlias(config),
  plugin: {
    responsivePreview: {
      devices: [
        { label: 'iPhone 5', width: 320, height: 568 },
        { label: 'iPhone 6', width: 375, height: 667 },
        { label: 'iPhone 5X', width: 411, height: 731 },
        // { label: 'iPhone 6 Plus', width: 414, height: 736 },
        { label: 'Medium', width: 1024, height: 768 },
        { label: 'Large', width: 1440, height: 900 },
        { label: '1080p', width: 1920, height: 1080 }
      ]
    }
  }
};
