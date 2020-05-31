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
    try {
        const questions = [
            {
                name: 'projectName',
                type: 'text',
                message: colors.brightMagenta('Project name'),
                initial: 'Skeletor',
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
                type: 'text',
                message: colors.brightMagenta('PWA: Theme color'),
                initial: '#000000',
                validate: hex => {
                    const pattern = /^#[0-9]+$/;
                    return pattern.test(hex)
                        ? true
                        : colors.brightRed(
                              'Only hex values are valid e.g #000000'
                          );
                },
            },
            {
                name: 'backgroundColor',
                type: 'text',
                message: colors.brightMagenta('PWA: Background color'),
                initial: '#000000',
                validate: hex => {
                    const pattern = /^#[0-9]+$/;
                    return pattern.test(hex)
                        ? true
                        : colors.brightRed(
                              'Only hex values are valid e.g #000000'
                          );
                },
            },
            {
                name: 'enableServiceWorker',
                type: 'confirm',
                message: colors.brightMagenta(
                    'PWA: Enable offline service worker?'
                ),
                initial: false,
            },
        ];
        const response = await prompts(questions);
        createPWA(response);
    } catch (err) {
        error(`:bomb: ${err}`);
        process.exit(1);
    }
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
        manifestTemplate({
            backgroundColor,
            description,
            projectName,
            themeColor,
        })
    );

    if (fs.existsSync(serviceWorker)) {
        error(`:bomb: ${serviceWorker} already exists`);
        process.exit(1);
    }

    fs.writeFileSync(
        serviceWorker,
        serviceWorkerTemplate({
            enableServiceWorker,
            projectName,
        })
    );

    info(`:floppy_disk: PWA files created`);
}
