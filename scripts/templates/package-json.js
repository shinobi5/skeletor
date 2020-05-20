const deps = require('../../config/pkg.dependencies.js');
const scripts = require('../../config/pkg.scripts.js');

const defaultConfig = {
    isCSS: false,
    description: '',
    projectName: '',
    isRouter: false,
    isState: false,
    stateType: 'redux'
};

module.exports = (config = defaultConfig) => {
    const isRedux = config.isState && config.stateType === 'redux';
    const isBeedle = config.isState && config.stateType === 'beedle';

    return `{
    "name": "${config.projectName.split(' ').join('-').toLowerCase()}",
    "description": "${config.description}",
    "dependencies": {
        "@babel/runtime": "${deps.babel.runtime}",
        ${isBeedle ? `"beedle": "${deps.beedle}",` : ''}
        ${isRedux ? `"redux": "${deps.redux}",` : ''}
        ${isRouter ? `"router-component": "${deps.router}",` : ''}
        "haunted": "${deps.haunted}",
        "lit-html": "${deps.litHtml}"
    },
    "devDependencies": {
        "@babel/cli": "${deps.babel.cli}",
        "@babel/core": "${deps.babel.core}",
        "@babel/plugin-transform-runtime": "${deps.babel.pluginTransformRuntime}",
        "@babel/preset-env": "${deps.babel.presetEnv}",
        "clean-css-cli": "${deps.cleanCSSCli}",
        "colors": "${deps.colors}",
        "fs-extra": "${deps.fsExtra}",
        "glob": "${deps.glob}",
        "hankey": "${deps.hankey}",
        "husky": "${deps.husky}",
        "imagemin-cli": "${deps.imageMinCli}",
        "live-server": "${deps.liveServer}",
        "npm-run-all": "${deps.npmRunAll}",
        "onchange": "${deps.onChange}",
        "prettier": "${deps.prettier}",
        "pretty-quick": "${deps.prettyQuick}",
        "prompts": "${deps.prompts}",
        "snowpack": "${deps.snowpack}"
    },
    "scripts": {
        "babel": "npx babel src -d build --copy-files",
        ${config.isCSS ? scripts.build.css : scripts.build.basic}
        "copy": "node scripts/copy.js",
        "create:component": "node scripts/create-component.js",
        "create:pwa": "node scripts/create-pwa.js",
        "clean:modules": "rm -rf node_modules",
        "clean:build": "rm -rf build",
        ${config.isCSS ? scripts.css.concat : ''}
        ${config.isCSS ? scripts.css.minify : ''}
        ${config.isCSS ? scripts.css.watch : ''}
        "imagemin": "imagemin --out-dir=src/img src/img/**/*.{png,jpg,gif}",
        "prepare": "snowpack --dest src/js/web_modules --clean --optimize",
        "prettier:watch": "onchange '**/*.js' '**/*.css' -- prettier --write {{changed}}",
        "server:dev": "live-server --open=src",
        "server:build": "live-server --open=build",
        "setup": "npm install && npm run prepare && node scripts/setup.js && npx prettier --write **/*.{json,html,js} && npm install && npm run prepare",
        ${config.isCSS ? scripts.start.css : scripts.start.basic}
    },
    "husky": {
        "hooks": {
          "pre-commit": "pretty-quick --staged"
        }
    }
}
`;
};
