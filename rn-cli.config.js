const blacklist = require('metro/src/blacklist');

module.exports = {
  getBlacklistRE() {
    // __fixtures__ are blacklisted by default
    return blacklist([]);
  }
};
