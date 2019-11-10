const path = require('path');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const prompt = require('prompt');
const colors = require('colors/safe');
const { info, error } = require('hankey');

const packageJSONTemplate = require('./templates/package-json');
const manifestTemplate = require('./templates/manifest');
const serviceWorkerTemplate = require('./templates/service-worker');
const actionsTemplate = require('./templates/actions');
const reducersTemplate = require('./templates/reducers');
const storeTemplate = require('./templates/store');
const createComponentTemplate = require('./templates/create-component');
const indexTemplate = require('./templates/index');

const ROOT = process.cwd();
const srcDir = path.join(ROOT, 'src');
const scriptsDir = path.join(ROOT, 'scripts');
const stateDir = path.join(ROOT, 'src/state');
const actionsDir = path.join(stateDir, `actions`);
const reducersDir = path.join(stateDir, `reducers`);
const index = path.join(srcDir, 'index.html');
const createComponent = path.join(scriptsDir, 'create-component.js');
const packageJSON = path.join(ROOT, `package.json`);
const manifest = path.join(srcDir, `manifest.json`);
const serviceWorker = path.join(srcDir, `service-worker.js`);
const actionsFile = path.join(actionsDir, `index.js`);
const reducersFile = path.join(reducersDir, `index.js`);
const storeFile = path.join(stateDir, 'store.js');

prompt.start();

prompt.get(
    [
        {
            description: colors.brightMagenta('Project name'),
            name: 'projectName',
            type: 'string',
            pattern: /^[a-zA-Z0-9\-]+$/,
            default: 'Skeletor',
        },
        {
            description: colors.brightMagenta('Project description'),
            name: 'description',
            type: 'string',
            pattern: /^[a-zA-Z0-9\-]+$/,
            default: '',
        },
        {
            description: colors.brightMagenta('Global CSS?'),
            name: 'css',
            type: 'boolean',
            default: true,
        },
        {
            description: colors.brightMagenta('Web compoments prefix?'),
            name: 'elementPrefix',
            type: 'string',
            default: 'x',
        },
        {
            description: colors.brightMagenta('Router?'),
            name: 'router',
            type: 'boolean',
            default: false,
        },
        {
            description: colors.brightMagenta('Global state?'),
            name: 'state',
            type: 'boolean',
            default: false,
        },
        {
            description: colors.brightMagenta('State: Beedle or Redux?'),
            name: 'stateType',
            type: 'string',
            pattern: /beedle|redux$/,
            message: 'Must be either beedle or redux',
            default: 'redux',
            ask: () => prompt.history('state').value,
        },
        {
            description: colors.brightMagenta('Bundler?'),
            name: 'bundler',
            type: 'boolean',
            default: false,
        },
        {
            description: colors.brightMagenta(
                'Bundler: Either rollup or webpack for bundler'
            ),
            name: 'bundlerType',
            type: 'string',
            default: 'rollup',
            pattern: /rollup|webpack$/,
            message: 'Must be either rollup or webpack',
            ask: () => prompt.history('bundler').value,
        },
        {
            description: colors.brightMagenta('PWA?'),
            name: 'pwa',
            type: 'boolean',
            default: false,
        },
        {
            description: colors.brightMagenta('PWA: Theme color'),
            name: 'themeColor',
            type: 'string',
            pattern: /^#[0-9]+$/,
            message: 'Must be a hex value e.g. #222222',
            default: '#222222',
            ask: () => prompt.history('pwa').value,
        },
        {
            description: colors.brightMagenta('PWA: Background color'),
            name: 'backgroundColor',
            type: 'string',
            pattern: /^#[0-9]+$/,
            message: 'Must be a hex value e.g. #222222',
            default: '#222222',
            ask: () => prompt.history('pwa').value,
        },
        {
            description: colors.brightMagenta(
                'PWA: Enable offline service worker?'
            ),
            name: 'enableServiceWorker',
            type: 'boolean',
            default: false,
            ask: () => prompt.history('pwa').value,
        },
    ],
    (err, result) => {
        if (err) {
            error(`:bomb: ${err}`);
            process.exit(1);
        } else {
            setupProject(result);
            process.exit();
        }
    }
);

function setupProject(config) {
    const {
        backgroundColor,
        bundler,
        bundlerType,
        css,
        description,
        elementPrefix,
        enableServiceWorker,
        projectName,
        pwa,
        router,
        state,
        themeColor,
        webComponents,
    } = config;

    fs.writeFileSync(
        packageJSON,
        packageJSONTemplate(
            bundler,
            bundlerType,
            css,
            description,
            projectName,
            router,
            state,
            webComponents
        )
    );

    fs.writeFileSync(
        index,
        indexTemplate(bundler, css, description, projectName, pwa)
    );

    if (state) {
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
    }

    if (pwa) {
        if (fs.existsSync(manifest)) {
            error(`:bomb: ${manifest} already exists`);
            process.exit(1);
        }
        fs.writeFileSync(
            manifest,
            manifestTemplate(
                projectName,
                description,
                themeColor,
                backgroundColor
            )
        );

        if (fs.existsSync(serviceWorker)) {
            error(`:bomb: ${serviceWorker} already exists`);
            process.exit(1);
        }
        fs.writeFileSync(
            serviceWorker,
            serviceWorkerTemplate(projectName, enableServiceWorker)
        );
    }

    if (elementPrefix) {
        fs.writeFileSync(
            createComponent,
            createComponentTemplate(elementPrefix)
        );
    }

    info(`:floppy_disk: Project setup complete`);
}
