const path = require("path");
const fs = require("fs-extra");
const mkdirp = require("mkdirp");
const prompts = require("prompts");
const colors = require("colors/safe");
const { info, error } = require("hankey");
const { execSync } = require('child_process');

const packageJSONTemplate = require("./templates/package-json");
const manifestTemplate = require("./templates/manifest");
const serviceWorkerTemplate = require("./templates/service-worker");
const actionsTemplate = require("./templates/actions");
const reducersTemplate = require("./templates/reducers");
const storeTemplate = require("./templates/store");
const createComponentTemplate = require("./templates/create-component");
const indexTemplate = require("./templates/index");

const ROOT = process.cwd();
const srcDir = path.join(ROOT, "src");
const scriptsDir = path.join(ROOT, "scripts");
const cssDir = path.join(ROOT, "src/css");
const stateDir = path.join(ROOT, "src/state");
const actionsDir = path.join(stateDir, `actions`);
const reducersDir = path.join(stateDir, `reducers`);
const index = path.join(srcDir, "index.html");
const createComponent = path.join(scriptsDir, "create-component.js");
const packageJSON = path.join(ROOT, `package.json`);
const manifest = path.join(srcDir, `manifest.json`);
const serviceWorker = path.join(srcDir, `service-worker.js`);
const actionsFile = path.join(actionsDir, `index.js`);
const reducersFile = path.join(reducersDir, `index.js`);
const storeFile = path.join(stateDir, "store.js");

(async () => {
  try {
    fs.copySync(`${scriptsDir}/node/project`, ROOT);
    execSync(`yarn`);
    
    const questions = [
      {
        name: "projectName",
        type: "text",
        message: colors.brightMagenta("Project name"),
        initial: "Skeletor"
      },
      {
        name: "description",
        type: "text",
        message: colors.brightMagenta("Project description")
      },
      {
        name: "css",
        type: "confirm",
        message: colors.brightMagenta("Global CSS?"),
        initial: true
      },
      {
        name: "elementPrefix",
        type: "text",
        message: colors.brightMagenta("Web compoments prefix?"),
        initial: "x"
      },
      {
        name: "router",
        type: "confirm",
        message: colors.brightMagenta("Router?"),
        initial: false
      },
      {
        name: "state",
        type: "confirm",
        message: colors.brightMagenta("Global state?"),
        initial: false
      },
      {
        name: "stateType",
        type: prev => (prev ? "select" : null),
        message: colors.brightMagenta("State: Beedle or Redux?"),
        initial: 0,
        choices: [
          { title: "Redux", value: "redux" },
          { title: "Beedle", value: "beedle" }
        ]
      },
      {
        name: "bundler",
        type: "confirm",
        message: colors.brightMagenta("Bundler?"),
        initial: false
      },
      {
        name: "bundlerType",
        type: prev => (prev ? "select" : null),
        message: colors.brightMagenta("Bundler: Rollup or Webpack"),
        initial: 0,
        choices: [
          { title: "Rollup", value: "rollup" },
          { title: "Webpack", value: "webpack" }
        ]
      },
      {
        name: "pwa",
        type: "confirm",
        message: colors.brightMagenta("PWA?"),
        initial: false
      },
      {
        name: "themeColor",
        type: prev => (prev ? "text" : null),
        message: colors.brightMagenta("PWA: Theme color"),
        initial: "#000000",
        validate: hex => {
          const pattern = /^#[0-9]+$/;
          return pattern.test(hex)
            ? true
            : colors.brightRed("Only hex values are valid e.g #000000");
        }
      },
      {
        name: "backgroundColor",
        type: prev => (prev ? "text" : null),
        message: colors.brightMagenta("PWA: Background color"),
        initial: "#000000",
        validate: hex => {
          const pattern = /^#[0-9]+$/;
          return pattern.test(hex)
            ? true
            : colors.brightRed("Only hex values are valid e.g #000000");
        }
      },
      {
        name: "enableServiceWorker",
        type: prev => (prev ? "confirm" : null),
        message: colors.brightMagenta("PWA: Enable offline service worker?"),
        initial: false
      }
    ];
    const response = await prompts(questions);
    setupProject(response);
    execSync(`npx prettier --write **/*.{json,html,js} && yarn`);
  } catch (err) {
    error(`:bomb: ${err}`);
    process.exit(1);
  }
})();

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
    stateType,
    themeColor
  } = config;

  fs.writeFileSync(
    packageJSON,
    packageJSONTemplate({
      bundlerType,
      description,
      projectName,
      isCSS: css,
      isBundler: bundler,
      isRouter: router,
      isState: state,
      stateType
    })
  );

  fs.writeFileSync(
    index,
    indexTemplate({
      isBundler: bundler,
      isCSS: css,
      description,
      projectName,
      isPWA: pwa
    })
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
      manifestTemplate({
        backgroundColor,
        description,
        projectName,
        themeColor
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
        projectName
      })
    );
  }

  if (elementPrefix) {
    fs.writeFileSync(createComponent, createComponentTemplate(elementPrefix));
  }

  if (!css) fs.rmdirSync(cssDir, { recursive: true });

  info(`:floppy_disk: Project setup complete`);
};
