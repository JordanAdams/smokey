const path = require('path');
const home = require('homedir')();

const configPath = path.join(home, '.smokey-config.json');

module.exports = Object.assign({}, require(configPath), {
  __configPath: configPath
});
