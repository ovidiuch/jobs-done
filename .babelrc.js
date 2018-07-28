module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['styled-components', { ssr: true, displayName: true, preprocess: false }],
    [
      'module-resolver',
      {
        alias: {
          '^react-native$': 'react-native-web'
        }
      }
    ]
  ]
};
