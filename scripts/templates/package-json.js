const dependencies = require('../../config/dependencies.js');
const scripts = require('../../config/scripts.js');

module.exports = (
    bundler,
    bundlerType,
    css,
    description,
    projectName,
    router,
    state,
    stateType
) => {
    const rollup = bundler && bundlerType === 'rollup';
    const webpack = bundler && bundlerType === 'webpack';
    const redux = state && stateType === 'redux';
    const beedle = state && stateType === 'beedle';

    return `{
    "name": "${projectName.toLowerCase()}",
    "description": "${description}",
    "dependencies": {
        "@babel/runtime": "${dependencies.babelRuntime}",
        ${beedle ? `"beedle": "${dependencies.beedle}",` : ''}
        ${redux ? `"redux": "${dependencies.redux}",` : ''}
        ${router ? `"router-component": "${dependencies.router}",` : ''}
        "haunted": "${dependencies.haunted}",
        "lit-html": "${dependencies.litHtml}"
    },
    "devDependencies": {
        "@babel/cli": "${dependencies.dev.babel.cli}",
        "@babel/core": "${dependencies.dev.babel.core}",
        "@babel/plugin-transform-runtime": "${
            dependencies.dev.babel.pluginTransformRuntime
        }",
        "@babel/preset-env": "${dependencies.dev.babel.presetEnv}",
        "@pika/web": "${dependencies.dev.pika.web}",
        "clean-css-cli": "${dependencies.dev.cleanCSSCli}",
        "colors": "${dependencies.dev.colors}",
        "fs-extra": "${dependencies.dev.fsExtra}",
        "glob": "${dependencies.dev.glob}",
        "hankey": "${dependencies.dev.hankey}",
        "husky": "${dependencies.dev.husky}",
        "imagemin-cli": "${dependencies.dev.imageMinCli}",
        "live-server": "${dependencies.dev.liveServer}",
        "npm-run-all": "${dependencies.dev.npmRunAll}",
        "onchange": "${dependencies.dev.onChange}",
        "prettier": "${dependencies.dev.prettier}",
        "pretty-quick": "${dependencies.dev.prettyQuick}",
        ${rollup ? `"rollup": "${dependencies.dev.rollup.rollup}",` : ''}
        ${
            rollup
                ? `"rollup-plugin-serve": "${dependencies.dev.rollup.pluginServer}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-clear": "${dependencies.dev.rollup.pluginClear}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-commonjs": "${dependencies.dev.rollup.pluginCommonjs}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-copy": "${dependencies.dev.rollup.pluginCopy}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-generate-html-template": "${dependencies.dev.rollup.pluginGenerateHtmlTemplate}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-node-resolve": "${dependencies.dev.rollup.pluginNodeResolve}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-terser": "${dependencies.dev.rollup.pluginTerser}",`
                : ''
        }
        ${webpack ? `"webpack": "${dependencies.dev.webpack.webpack}",` : ''}
        ${webpack ? `"webpack-cli": "${dependencies.dev.webpack.cli}",` : ''}
        ${
            webpack
                ? `"webpack-merge": "${dependencies.dev.webpack.merge}",`
                : ''
        }
        ${
            webpack
                ? `"clean-webpack-plugin": "${dependencies.dev.webpack.cleanWbpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"webpack-bundle-analyzer": "${dependencies.dev.webpack.bundleAnalyzer}",`
                : ''
        }
        ${
            webpack
                ? `"webpack-dev-server": "${dependencies.dev.webpack.devServer}",`
                : ''
        }
        ${
            webpack
                ? `"optimize-css-assets-webpack-plugin": "${dependencies.dev.webpack.optimizeCssAssetsWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"mini-css-extract-plugin": "${dependencies.dev.webpack.miniCssExtractPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"imagemin-webpack-plugin": "${dependencies.dev.webpack.imageminWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"html-webpack-plugin": "${dependencies.dev.webpack.htmlWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"file-loader": "${dependencies.dev.webpack.fileLoader}",`
                : ''
        }
        ${
            webpack
                ? `"css-loader": "${dependencies.dev.webpack.cssLoader}",`
                : ''
        }
        ${
            webpack
                ? `"copy-webpack-plugin": "${dependencies.dev.webpack.copyWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"babel-loader": "${dependencies.dev.webpack.babelLoader}",`
                : ''
        }
        "prompt": "${dependencies.dev.prompt}"
    },
    "scripts": {
        "babel": "npx babel src -d build --copy-files",
        ${
            !bundler && !css
                ? scripts.build.build
                : rollup && css
                ? scripts.build.rollupCss
                : rollup && !css
                ? scripts.build.rollup
                : webpack && css
                ? scripts.build.webpackCss
                : webpack && !css
                ? scripts.build.webpack
                : scripts.build.css
        }
        "clean:modules": "rm -rf node_modules",
        "clean:build": "rm -rf build",
        ${css ? scripts.css.concat : ''}
        ${css ? scripts.css.minify : ''}
        ${css ? scripts.css.watch : ''}
        "imagemin": "imagemin --out-dir=src/img src/img/**/*.{png,jpg,gif}",
        "prepare": "pika-web --dest src/js/modules --clean --optimize",
        "prettier:watch": "onchange '**/*.js' '**/*.css' -- prettier --write {{changed}}",
        ${
            !bundler
                ? scripts.server.dev
                : rollup
                ? scripts.server.devRollup
                : scripts.server.devWebpack
        }
        "server:build": "live-server --open=build",
        "setup": "yarn && node scripts/setup.js && npx prettier --write **/*.{json,html,js} && yarn",
        ${css ? scripts.start.css : scripts.start.start}
    },
    "husky": {
        "hooks": {
          "pre-commit": "pretty-quick --staged"
        }
    }
}
`;
};
