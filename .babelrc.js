const alias = require('./tools/shared/alias');

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
    // NOTE: This works for imports/requires in repo source, but doesn't alias
    // require calls from node_modules. Eg. require('react-native') in
    // styled-components should be replaced with require('react-native-web')
    ['module-resolver', { alias }]
  ]
};
