const alias = require('./alias');

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['styled-components', { ssr: true, displayName: true, preprocess: false }]
    // FIXME: Does does do anything? I think it was meant for ESLint
    // ['module-resolver', { alias }]
  ]
};
