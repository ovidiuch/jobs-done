const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver: {
    // __fixtures__ are blacklisted by default
    // https://github.com/facebook/react-native/issues/21093#issuecomment-422071177
    blacklistRE: blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  }
};
