const dependencies = require('../../config/pkg.dependencies.js');
const scripts = require('../../config/pkg.scripts.js');

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
        "@babel/runtime": "${dependencies.babel.runtime}",
        ${beedle ? `"beedle": "${dependencies.beedle}",` : ''}
        ${redux ? `"redux": "${dependencies.redux}",` : ''}
        ${router ? `"router-component": "${dependencies.router}",` : ''}
        "haunted": "${dependencies.haunted}",
        "lit-html": "${dependencies.litHtml}"
    },
    "devDependencies": {
        "@babel/cli": "${dependencies.babel.cli}",
        "@babel/core": "${dependencies.babel.core}",
        "@babel/plugin-transform-runtime": "${
            dependencies.babel.pluginTransformRuntime
        }",
        "@babel/preset-env": "${dependencies.babel.presetEnv}",
        "@pika/web": "${dependencies.pika.web}",
        "clean-css-cli": "${dependencies.cleanCSSCli}",
        "colors": "${dependencies.colors}",
        "fs-extra": "${dependencies.fsExtra}",
        "glob": "${dependencies.glob}",
        "hankey": "${dependencies.hankey}",
        "husky": "${dependencies.husky}",
        "imagemin-cli": "${dependencies.imageMinCli}",
        "live-server": "${dependencies.liveServer}",
        "npm-run-all": "${dependencies.npmRunAll}",
        "onchange": "${dependencies.onChange}",
        "prettier": "${dependencies.prettier}",
        "pretty-quick": "${dependencies.prettyQuick}",
        ${rollup ? `"rollup": "${dependencies.rollup.rollup}",` : ''}
        ${
            rollup
                ? `"rollup-plugin-serve": "${dependencies.rollup.pluginServer}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-clear": "${dependencies.rollup.pluginClear}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-commonjs": "${dependencies.rollup.pluginCommonjs}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-copy": "${dependencies.rollup.pluginCopy}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-generate-html-template": "${dependencies.rollup.pluginGenerateHtmlTemplate}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-node-resolve": "${dependencies.rollup.pluginNodeResolve}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-terser": "${dependencies.rollup.pluginTerser}",`
                : ''
        }
        ${webpack ? `"webpack": "${dependencies.webpack.webpack}",` : ''}
        ${webpack ? `"webpack-cli": "${dependencies.webpack.cli}",` : ''}
        ${webpack ? `"webpack-merge": "${dependencies.webpack.merge}",` : ''}
        ${
            webpack
                ? `"clean-webpack-plugin": "${dependencies.webpack.cleanWbpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"webpack-bundle-analyzer": "${dependencies.webpack.bundleAnalyzer}",`
                : ''
        }
        ${
            webpack
                ? `"webpack-dev-server": "${dependencies.webpack.devServer}",`
                : ''
        }
        ${
            webpack
                ? `"optimize-css-assets-webpack-plugin": "${dependencies.webpack.optimizeCssAssetsWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"mini-css-extract-plugin": "${dependencies.webpack.miniCssExtractPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"imagemin-webpack-plugin": "${dependencies.webpack.imageminWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"html-webpack-plugin": "${dependencies.webpack.htmlWebpackPlugin}",`
                : ''
        }
        ${webpack ? `"file-loader": "${dependencies.webpack.fileLoader}",` : ''}
        ${webpack ? `"css-loader": "${dependencies.webpack.cssLoader}",` : ''}
        ${
            webpack
                ? `"copy-webpack-plugin": "${dependencies.webpack.copyWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"babel-loader": "${dependencies.webpack.babelLoader}",`
                : ''
        }
        "prompt": "${dependencies.prompt}"
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
