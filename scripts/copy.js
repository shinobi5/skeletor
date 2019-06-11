const fs = require('fs-extra');

const src = 'src';
const dest = 'build';

const files = [
    'index.html',
    'index.js', 
    'component-registry.js',
    'service-worker.js', 
    'manifest.json',
    'styles.css',
    'favicon.ico',
];

const copyFiles = (files, src, dest) => {
    files.map(file => {
        fs.copySync(`${src}/${file}`, `${dest}/${file}`);
    });
};

const copyFolders = (src, dest) => {
    fs.copySync(`${src}/js`, `${dest}/js`);
    fs.copySync(`${src}/web_modules`, `${dest}/`);
};

copyFiles(files, src, dest);
copyFolders(src, dest);



