const path = require('path');
const fs = require('fs-extra');
const prompts = require('prompts');
const colors = require('colors/safe');
const { info, error } = require('hankey');
const manifestTemplate = require('./templates/manifest');
const serviceWorkerTemplate = require('./templates/service-worker');

const srcDir = path.join(process.cwd(), 'src');
const manifest = path.join(srcDir, `manifest.json`);
const serviceWorker = path.join(srcDir, `service-worker.js`);

(async () => {
    const questions = [
        {
            name: 'projectName',
            type: 'text',
            message: colors.brightMagenta('Project name'),
            initial: 'Skeletor',
            validate: projectName => {
                const pattern = /^[a-zA-Z0-9\-]+$/;
                return pattern.test(projectName)
                    ? true
                    : colors.brightRed(
                          'Only letters, numbers and hyphens are valid'
                      );
            },
        },
        {
            name: 'description',
            type: 'text',
            message: colors.brightMagenta('Project description'),
            validate: description => {
                const pattern = /^[a-zA-Z0-9\-]+$/;
                return pattern.test(description)
                    ? true
                    : colors.brightRed(
                          'Only letters, numbers and hyphens are valid'
                      );
            },
        },
        {
            name: 'themeColor',
            type: prev => (prev ? 'text' : null),
            message: colors.brightMagenta('PWA: Theme color'),
            initial: '#000000',
            validate: hex => {
                const pattern = /^#[0-9]+$/;
                return pattern.test(hex)
                    ? true
                    : colors.brightRed('Only hex values are valid e.g #000000');
            },
        },
        {
            name: 'backgroundColor',
            type: prev => (prev ? 'text' : null),
            message: colors.brightMagenta('PWA: Background color'),
            initial: '#000000',
            validate: hex => {
                const pattern = /^#[0-9]+$/;
                return pattern.test(hex)
                    ? true
                    : colors.brightRed('Only hex values are valid e.g #000000');
            },
        },
        {
            name: 'enableServiceWorker',
            type: prev => (prev ? 'confirm' : null),
            message: colors.brightMagenta(
                'PWA: Enable offline service worker?'
            ),
            initial: false,
        },
    ];

    const response = await prompts(questions);

    createPWA(response);
})();

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
