const fs = require('fs-extra');

const src = 'src';
const dest = 'build';

const files = [
    'index.html',
    'app.js',
    'component-registry.js',
    'service-worker.js',
    'manifest.json',
    'styles.css',
    'favicon.ico',
];

const folders = ['js', 'font', 'img'];

const bundle = [...files, ...folders];

const copyToBuild = (files, src, dest) => {
    files.map(file => {
        fs.copySync(`${src}/${file}`, `${dest}/${file}`);
    });
};

copyToBuild(bundle, src, dest);
