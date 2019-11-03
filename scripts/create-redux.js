const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const { info, error } = require('hankey');
const actionsTemplate = require('./templates/actions');
const reducersTemplate = require('./templates/reducers');
const storeTemplate = require('./templates/store');

const stateDir = path.join(process.cwd(), 'src/state');
const actionsDir = path.join(stateDir, `actions`);
const reducersDir = path.join(stateDir, `reducers`);
const actionsFile = path.join(actionsDir, `index.js`);
const reducersFile = path.join(reducersDir, `index.js`);
const storeFile = path.join(stateDir, 'store.js');

if (fs.existsSync(stateDir)) {
    error(`:bomb: ${stateDir} already exists`);
    process.exit(1);
}

mkdirp.sync(stateDir);
mkdirp.sync(actionsDir);
mkdirp.sync(reducersDir);

fs.writeFileSync(actionsFile, actionsTemplate());

fs.writeFileSync(reducersFile, reducersTemplate());

fs.writeFileSync(storeFile, storeTemplate());

info(`:floppy_disk: Redux boilerplate created in src/state`);
