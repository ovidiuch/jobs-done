// Native entry point
module.exports = global.__DEV__
  ? require('./App.cosmos')
  : require('./components/App').App;
