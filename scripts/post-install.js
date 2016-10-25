const path = require('path');
const homedir = require('homedir');
const fs = require('fs');

const src = path.resolve(__dirname, '..', 'fixtures', 'default-config.json');
const dest = path.join(homedir(), '.smokey-config.json');

fs.createReadStream(src).pipe(fs.createWriteStream(dest));
