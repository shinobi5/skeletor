const path = require('path');
const fs = require('fs-extra');
const prompt = require('prompt');
const { info, error } = require('hankey');

const manifestTemplate = require('./templates/manifest');
const serviceWorkerTemplate = require('./templates/service-worker');

const srcDir = path.join(process.cwd(), 'src');
const manifest = path.join(srcDir, `manifest.json`);
const serviceWorker = path.join(srcDir, `service-worker.js`);

prompt.start();

prompt.get(
    [
        {
            description: 'Project name',
            name: 'projectName',
            type: 'string',
            pattern: /^[a-zA-Z0-9\-]+$/,
            default: 'Skeletor',
        },
        {
            description: 'Description',
            name: 'description',
            type: 'string',
            pattern: /^[a-zA-Z0-9\-]+$/,
            default: '',
        },
        {
            description: 'Theme color',
            name: 'themeColor',
            type: 'string',
            pattern: /^#[0-9]+$/,
            message: 'Must be a hex value e.g. #222222',
            default: '#222222',
        },
        {
            description: 'Background color',
            name: 'backgroundColor',
            type: 'string',
            pattern: /^#[0-9]+$/,
            message: 'Must be a hex value e.g. #222222',
            default: '#222222',
        },
        {
            description: 'Enable offline service worker?',
            name: 'enableServiceWorker',
            type: 'boolean',
            default: false,
        },
    ],
    (err, result) => {
        if (err) {
            error(`:bomb: ${err}`);
            process.exit(1);
        } else {
            createPWA(result);
            process.exit();
        }
    }
);

function createPWA(config) {
    const {
        description,
        enableServiceWorker,
        projectName,
        themeColor,
        backgroundColor,
    } = config;

    if (fs.existsSync(manifest)) {
        error(`:bomb: ${manifest} already exists`);
        process.exit(1);
    }

    fs.writeFileSync(
        manifest,
        manifestTemplate(projectName, description, themeColor, backgroundColor)
    );

    if (fs.existsSync(serviceWorker)) {
        error(`:bomb: ${serviceWorker} already exists`);
        process.exit(1);
    }

    fs.writeFileSync(
        serviceWorker,
        serviceWorkerTemplate(projectName, enableServiceWorker)
    );

    info(`:floppy_disk: PWA files created`);
}
