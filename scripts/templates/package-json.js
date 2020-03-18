const deps = require('../../config/pkg.dependencies.js');
const scripts = require('../../config/pkg.scripts.js');

module.exports = (
    isBundler,
    bundlerType,
    isCSS,
    description,
    projectName,
    isRouter,
    isState,
    stateType
) => {
    const isRollup = isBundler && bundlerType === 'rollup';
    const isWebpack = isBundler && bundlerType === 'webpack';
    const isRedux = isState && stateType === 'redux';
    const isBeedle = isState && stateType === 'beedle';

    return `{
    "name": "${projectName.split(' ').join('-').toLowerCase()}",
    "description": "${description}",
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
        ${isRollup ? `"rollup": "${deps.rollup.rollup}",` : ''}
        ${isRollup ? `"rollup-plugin-serve": "${deps.rollup.pluginServer}",` : ''}
        ${isRollup ? `"rollup-plugin-clear": "${deps.rollup.pluginClear}",` : ''}
        ${isRollup ? `"rollup-plugin-commonjs": "${deps.rollup.pluginCommonjs}",` : ''}
        ${isRollup ? `"rollup-plugin-copy": "${deps.rollup.pluginCopy}",` : ''}
        ${isRollup ? `"rollup-plugin-generate-html-template": "${deps.rollup.pluginGenerateHtmlTemplate}",` : ''}
        ${isRollup ? `"rollup-plugin-node-resolve": "${deps.rollup.pluginNodeResolve}",` : ''}
        ${isRollup ? `"rollup-plugin-terser": "${deps.rollup.pluginTerser}",` : ''}
        ${isWebpack ? `"webpack": "${deps.webpack.webpack}",` : ''}
        ${isWebpack ? `"webpack-cli": "${deps.webpack.cli}",` : ''}
        ${isWebpack ? `"webpack-merge": "${deps.webpack.merge}",` : ''}
        ${isWebpack ? `"clean-webpack-plugin": "${deps.webpack.cleanWbpackPlugin}",` : ''}
        ${isWebpack ? `"webpack-bundle-analyzer": "${deps.webpack.bundleAnalyzer}",` : ''}
        ${isWebpack ? `"webpack-dev-server": "${deps.webpack.devServer}",` : ''}
        ${isWebpack ? `"optimize-css-assets-webpack-plugin": "${deps.webpack.optimizeCssAssetsWebpackPlugin}",` : ''}
        ${isWebpack ? `"mini-css-extract-plugin": "${deps.webpack.miniCssExtractPlugin}",` : ''}
        ${isWebpack ? `"imagemin-webpack-plugin": "${deps.webpack.imageminWebpackPlugin}",` : ''}
        ${isWebpack ? `"html-webpack-plugin": "${deps.webpack.htmlWebpackPlugin}",` : ''}
        ${isWebpack ? `"file-loader": "${deps.webpack.fileLoader}",` : ''}
        ${isWebpack ? `"css-loader": "${deps.webpack.cssLoader}",` : ''}
        ${isWebpack ? `"copy-webpack-plugin": "${deps.webpack.copyWebpackPlugin}",` : ''}
        ${isWebpack ? `"babel-loader": "${deps.webpack.babelLoader}",` : ''}
        "snowpack": "${deps.snowpack}"
    },
    "scripts": {
        "babel": "npx babel src -d build --copy-files",
        ${
            !isBundler && !isCSS
                ? scripts.build.basic
                : isRollup && isCSS
                ? scripts.build.rollupCss
                : isRollup && !isCSS
                ? scripts.build.rollup
                : isWebpack && isCSS
                ? scripts.build.webpackCss
                : isWebpack && !isCSS
                ? scripts.build.webpack
                : scripts.build.css
        }
        "copy": "node scripts/copy.js",
        "create:component": "node scripts/create-component.js",
        "create:pwa": "node scripts/create-pwa.js",
        "clean:modules": "rm -rf node_modules",
        "clean:build": "rm -rf build",
        ${isCSS ? scripts.css.concat : ''}
        ${isCSS ? scripts.css.minify : ''}
        ${isCSS ? scripts.css.watch : ''}
        "imagemin": "imagemin --out-dir=src/img src/img/**/*.{png,jpg,gif}",
        "prepare": "snowpack --dest src/js/web_modules --clean --optimize",
        "prettier:watch": "onchange '**/*.js' '**/*.css' -- prettier --write {{changed}}",
        ${
            !isBundler
                ? scripts.server.dev
                : isRollup
                ? scripts.server.devRollup
                : scripts.server.devWebpack
        }
        "server:build": "live-server --open=build",
        "setup": "yarn && node scripts/setup.js && npx prettier --write **/*.{json,html,js} && yarn",
        ${isCSS ? scripts.start.css : scripts.start.basic}
    },
    "husky": {
        "hooks": {
          "pre-commit": "pretty-quick --staged"
        }
    }
}
`;
};
