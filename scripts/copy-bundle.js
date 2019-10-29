const fs = require('fs-extra');

fs.copySync('src', 'build', { overwrite: false });
